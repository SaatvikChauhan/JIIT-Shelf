import express from "express";
import AnalyticsDay from "../models/AnalyticsDay.js";
import { analyticsDay, createLimiter, eventTypes, hash, rangeDates, validateEvent } from "../lib/analytics.js";

const router = express.Router();
const limitBrowser = createLimiter(120);
const summaryCache = new Map();
const pending = new Map();

router.post("/events", express.json({ limit: "2kb" }), async (req, res) => {
  if (/bot|crawler|spider|headless/i.test(req.get("user-agent") || "")) return res.sendStatus(204);
  const event = validateEvent(req.body);
  if (!event) return res.status(400).json({ error: "Invalid analytics event" });
  if (!limitBrowser(event.browser)) return res.sendStatus(429);
  const date = analyticsDay();
  const browser = hash(event.browser);
  const _id = hash(`${date}:${browser}`);
  try {
    try {
      await AnalyticsDay.updateOne({ _id }, { $setOnInsert: { date, browser } }, { upsert: true });
    } catch (error) { if (error.code !== 11000) throw error; }
    const update = { $inc: { [`counts.${event.type}`]: 1 }, $addToSet: { seen: event.id, visits: hash(event.visit) } };
    if (event.type === "course_open") {
      update.$inc[`courses.${event.courseId}.count`] = 1;
      if (event.courseName !== "Course material") update.$set = { [`courses.${event.courseId}.name`]: event.courseName };
    }
    await AnalyticsDay.updateOne({ _id, seen: { $ne: event.id }, "seen.999": { $exists: false } }, update);
    res.sendStatus(204);
  } catch (error) {
    console.error("Analytics write failed:", error.name);
    res.status(503).json({ error: "Analytics temporarily unavailable" });
  }
});

async function summarize(days) {
  const trackingSince = "2026-09-29";
  const dates = rangeDates(days).filter((date) => date >= trackingSince);
  const totals = Object.fromEntries(eventTypes.map((type) => [type, { $sum: `$counts.${type}` }]));
  const result = await AnalyticsDay.aggregate([
      { $match: { date: { $gte: dates[0] || trackingSince, $lte: dates.at(-1) || trackingSince }, "seen.0": { $exists: true } } },
      { $facet: {
        totals: [{ $group: { _id: null, ...totals, visits: { $sum: { $size: "$visits" } } } }],
        browsers: [{ $group: { _id: "$browser" } }, { $count: "count" }],
        daily: [{ $group: { _id: "$date", ...totals, browsers: { $sum: 1 } } }, { $sort: { _id: 1 } }],
        courses: [
          { $project: { courses: { $objectToArray: { $ifNull: ["$courses", {}] } } } },
          { $unwind: "$courses" },
          { $group: { _id: "$courses.k", name: { $max: "$courses.v.name" }, opens: { $sum: "$courses.v.count" } } },
          { $sort: { opens: -1, _id: 1 } }, { $limit: 5 },
          { $project: { _id: 0, name: { $ifNull: ["$name", "Course material"] }, opens: 1 } },
        ],
      } },
    ]).option({ maxTimeMS: 5000 });
  const data = result[0] || { totals: [], browsers: [], daily: [], courses: [] };
  const total = data.totals[0] || {};
  const byDay = new Map(data.daily.map(({ _id, ...values }) => [_id, values]));
  return {
    days, timezone: "Asia/Kolkata", trackingSince, updatedAt: new Date().toISOString(),
    totals: { ...Object.fromEntries(eventTypes.map((type) => [type, total[type] || 0])), visits: total.visits || 0, browsers: data.browsers[0]?.count || 0 },
    daily: dates.map((date) => ({ date, ...Object.fromEntries(eventTypes.map((type) => [type, 0])), browsers: 0, ...byDay.get(date) })),
    courses: data.courses,
  };
}

router.get("/summary", async (req, res) => {
  const days = Number(req.query.days || 30);
  if (![7, 30, 90].includes(days)) return res.status(400).json({ error: "Choose 7, 30, or 90 days" });
  const key = `${analyticsDay()}:${days}`;
  try {
    let cached = summaryCache.get(key);
    if (!cached || Date.now() - cached.at > 60000) {
      if (!pending.has(key)) pending.set(key, summarize(days).then((data) => {
        if (summaryCache.size >= 3) summaryCache.delete(summaryCache.keys().next().value);
        const entry = { at: Date.now(), data }; summaryCache.set(key, entry); return entry;
      }).finally(() => pending.delete(key)));
      cached = await pending.get(key);
    }
    res.set("Cache-Control", "public, max-age=30").json(cached.data);
  } catch (error) {
    console.error("Analytics summary failed:", error.name);
    res.status(503).json({ error: "Stats temporarily unavailable" });
  }
});
export default router;

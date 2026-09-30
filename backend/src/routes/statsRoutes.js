import express from "express";
import SubjectClick from "../models/SubjectClick.js";
import { isDriveId, isNonEmptyString } from "../lib/validation.js";
import { clickIncrements, popularSemesterPipeline } from "../lib/popularity.js";
import { createCache } from "../lib/cache.js";

const router = express.Router();
const cached = createCache({ ttl: 60000, maxEntries: 4 });

router.post("/subject-click", async (req, res) => {
  const { subjectId, title, semester } = req.body ?? {};

  if (!isDriveId(subjectId) || !isNonEmptyString(title) || title.length > 200)
    return res.status(400).json({ error: "A valid subjectId and title are required" });

  let increments;
  try {
    increments = clickIncrements(semester);
  } catch {
    return res.status(400).json({ error: "A valid semester is required" });
  }

  const date = new Date().toISOString().slice(0, 10);

  try {
    try {
      await SubjectClick.updateOne(
        { subjectId, date },
        { $inc: increments, $setOnInsert: { subjectName: title } },
        { upsert: true, runValidators: true }
      );
    } catch (error) {
      if (error.code !== 11000) throw error;
      await SubjectClick.updateOne({ subjectId, date }, { $inc: increments });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Click log error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/trending-today", async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);

  try {
    const top = await cached(`trending:${date}`, () => SubjectClick.find({ date }).sort({ count: -1 }).limit(2).maxTimeMS(5000).lean());

    res.json(top);
  } catch (err) {
    console.error("Trending error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/popular-today", async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  res.set("Cache-Control", "public, max-age=30");
  try {
    const [courses, semesters] = await cached(`popular:${date}`, () => Promise.all([
      SubjectClick.find({ date }).select("subjectId subjectName count -_id")
        .sort({ count: -1, subjectId: 1 }).limit(2).maxTimeMS(5000).lean(),
      SubjectClick.aggregate(popularSemesterPipeline(date)).option({ maxTimeMS: 5000 }),
    ]));
    const top = semesters[0];
    res.json({ courses, semester: top ? { number: Number(top._id), count: top.count } : null });
  } catch (error) {
    console.error("Popularity lookup failed:", error.name);
    res.status(500).json({ error: "Could not load today's activity" });
  }
});

export default router;

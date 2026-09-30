import { createHash } from "node:crypto";

export const eventTypes = ["page_view", "course_open", "material_open", "sgpa_calculated", "community_join"];
const token = /^[a-zA-Z0-9_-]{16,80}$/;
export const hash = (value) => createHash("sha256").update(value).digest("hex");
export const analyticsDay = (now = new Date()) => new Date(now.getTime() + 19800000).toISOString().slice(0, 10);
export function validateEvent(body) {
  if (!body || !eventTypes.includes(body.type) || ![body.id, body.browser, body.visit].every((value) => typeof value === "string" && token.test(value))) return null;
  const event = { id: body.id, browser: body.browser, visit: body.visit, type: body.type };
  if (body.type === "course_open") {
    if (typeof body.courseId !== "string" || !/^[\w-]{10,100}$/.test(body.courseId) || ["constructor", "prototype", "__proto__"].includes(body.courseId) || typeof body.courseName !== "string" || !body.courseName.trim() || body.courseName.length > 160) return null;
    event.courseId = body.courseId;
    event.courseName = body.courseName.trim();
  }
  return event;
}
export function rangeDates(days, now = new Date()) {
  const end = analyticsDay(now);
  const dates = [];
  for (let offset = days - 1; offset >= 0; offset--) {
    dates.push(new Date(Date.parse(`${end}T00:00:00Z`) - offset * 86400000).toISOString().slice(0, 10));
  }
  return dates;
}

export function createLimiter(limit, maxKeys = 10000) {
  const windows = new Map();
  let lastSweep = 0;
  return (key, now = Date.now()) => {
    if (now - lastSweep >= 60000) {
      for (const [id, entry] of windows) if (entry.until <= now) windows.delete(id);
      lastSweep = now;
    }
    const entry = windows.get(key);
    if (!entry || entry.until <= now) {
      if (!entry && windows.size >= maxKeys) return false;
      windows.set(key, { until: now + 60000, count: 1 });
      return true;
    }
    entry.count++;
    return entry.count <= limit;
  };
}

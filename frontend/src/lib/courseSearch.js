import { getCourseCatalog } from "./driveCache.js";
import { semIdMap } from "../data/data.js";
import { parseSubjectName } from "./utils.js";

let pending;
export function loadCourses() {
  if (pending) return pending;
  pending = (async () => {
    const entries = Object.entries(semIdMap);
    const catalog = await getCourseCatalog();
    const courses = new Map();
    for (const [key, id] of entries) {
      const [group, semester] = key.split("-");
      for (const course of catalog[id] || []) {
        if (!parseSubjectName(course.name).title) continue;
        const existing = courses.get(course.id);
        const context = `${group === "common" ? "All branches" : group} · Semester ${semester}`;
        if (existing) existing.contexts.push(context);
        else courses.set(course.id, { ...course, semester, contexts: [context] });
      }
    }
    return { courses: [...courses.values()], incomplete: entries.some(([, id]) => !catalog[id]) };
  })().finally(() => { pending = null; });
  return pending;
}


import test from "node:test";
import assert from "node:assert/strict";
import { analyticsDay, createLimiter, rangeDates, validateEvent } from "../src/lib/analytics.js";

const valid = { id: "event-0123456789012345", browser: "browser-0123456789012345", visit: "visit-0123456789012345", type: "page_view" };
test("analytics accepts only known events and discards unrelated/private properties", () => {
  assert.deepEqual(validateEvent({ ...valid, handle: "private", marks: [90], path: "/search?secret=value" }), valid);
  assert.equal(validateEvent({ ...valid, type: "arbitrary" }), null);
  assert.equal(validateEvent({ ...valid, browser: {} }), null);
  assert.equal(validateEvent({ ...valid, visit: "" }), null);
});
test("course events require safe field keys and bounded names", () => {
  const course = { ...valid, type: "course_open", courseId: "course_0123456789", courseName: "Data Structures" };
  assert.deepEqual(validateEvent(course), course);
  for (const courseId of ["bad.key.path", "$operator00000", {}, ""]) assert.equal(validateEvent({ ...course, courseId }), null);
  assert.equal(validateEvent({ ...course, courseName: "a".repeat(161) }), null);
});
test("daily ranges follow midnight IST and cross year boundaries", () => {
  assert.equal(analyticsDay(new Date("2026-09-29T18:29:59Z")), "2026-09-29");
  assert.equal(analyticsDay(new Date("2026-09-29T18:30:00Z")), "2026-09-30");
  assert.deepEqual(rangeDates(3, new Date("2026-01-01T12:00:00Z")), ["2025-12-30", "2025-12-31", "2026-01-01"]);
});
test("rate limiter rejects excess traffic, resets, and bounds memory", () => {
  const allow = createLimiter(2, 1);
  assert.equal(allow("a", 0), true);
  assert.equal(allow("a", 1), true);
  assert.equal(allow("a", 2), false);
  assert.equal(allow("b", 3), false);
  assert.equal(allow("b", 60000), true);
});

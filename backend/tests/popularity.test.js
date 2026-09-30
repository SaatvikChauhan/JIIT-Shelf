import test from "node:test";
import assert from "node:assert/strict";
import { clickIncrements } from "../src/lib/popularity.js";

test("old clients still count toward courses without inventing a semester", () => {
  assert.deepEqual(clickIncrements(undefined), { count: 1 });
});

test("a click increments both the course and the explicitly selected semester", () => {
  assert.deepEqual(clickIncrements("2"), { count: 1, "semesterCounts.2": 1 });
  assert.deepEqual(clickIncrements(4), { count: 1, "semesterCounts.4": 1 });
});

test("invalid semester input cannot introduce arbitrary update paths", () => {
  for (const value of [null, "", 0, 9, 1.5, "2.extra", "__proto__", {}, [], [2]]) {
    assert.throws(() => clickIncrements(value), TypeError);
  }
});

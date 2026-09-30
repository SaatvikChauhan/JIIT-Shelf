import test from "node:test";
import assert from "node:assert/strict";
import { getExamCountdown } from "../src/lib/examCountdown.js";
import { examSchedule } from "../src/data/examSchedule.js";

test("each exam counts down until exactly 9 AM IST and stays active through its last day", () => {
  for (const exam of examSchedule) {
    const start = Date.parse(exam.startsAt);
    const end = Date.parse(exam.endExclusive);
    assert.deepEqual(getExamCountdown(start - 1000), {
      status: "upcoming", exam: exam.name, days: 0, hours: 0, minutes: 0, seconds: 1,
    });
    assert.equal(getExamCountdown(start).status, "active");
    assert.equal(getExamCountdown(end - 1).status, "active");
    assert.equal(getExamCountdown(end - 1).exam, exam.name);
    assert.equal(getExamCountdown(start - 1).seconds, 1);
  }
});

test("the day after each exam switches to the next countdown or completes the term", () => {
  assert.equal(getExamCountdown(Date.parse("2026-09-09T00:00:00+05:30")).exam, "T2");
  assert.equal(getExamCountdown(Date.parse("2026-10-20T00:00:00+05:30")).exam, "T3");
  assert.equal(getExamCountdown(Date.parse("2026-09-29T12:00:00+05:30")).status, "upcoming");
  assert.deepEqual(getExamCountdown(Date.parse("2026-12-15T00:00:00+05:30")), {
    status: "completed", exam: null, days: 0, hours: 0, minutes: 0, seconds: 0,
  });
});

test("countdown uses IST rather than the browser's local timezone", () => {
  const utc = getExamCountdown(Date.parse("2026-10-12T03:29:00Z"));
  assert.equal(utc.exam, "T2");
  assert.equal(utc.minutes, 1);
  assert.equal(utc.status, "upcoming");
  assert.equal(getExamCountdown(Date.parse("2026-10-12T03:30:00Z")).status, "active");
});

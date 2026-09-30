import { examSchedule } from "../data/examSchedule.js";

export function getExamCountdown(now) {
  const exam = examSchedule.find((entry) => now < Date.parse(entry.endExclusive));
  const secondsLeft = exam ? Math.max(0, Math.ceil((Date.parse(exam.startsAt) - now) / 1000)) : 0;
  return {
    status: !exam ? "completed" : now < Date.parse(exam.startsAt) ? "upcoming" : "active",
    exam: exam?.name ?? null,
    days: Math.floor(secondsLeft / 86400),
    hours: Math.floor(secondsLeft / 3600) % 24,
    minutes: Math.floor(secondsLeft / 60) % 60,
    seconds: secondsLeft % 60,
  };
}

export function clickIncrements(semester) {
  if (semester === undefined) return { count: 1 };
  if (!((typeof semester === "string" || typeof semester === "number") && /^[1-8]$/.test(String(semester)))) {
    throw new TypeError("Semester must be between 1 and 8");
  }
  return { count: 1, [`semesterCounts.${semester}`]: 1 };
}

export function popularSemesterPipeline(date) {
  return [
    { $match: { date } },
    { $project: { semesters: { $objectToArray: { $ifNull: ["$semesterCounts", {}] } } } },
    { $unwind: "$semesters" },
    { $group: { _id: "$semesters.k", count: { $sum: "$semesters.v" } } },
    { $sort: { count: -1, _id: 1 } },
    { $limit: 1 },
  ];
}

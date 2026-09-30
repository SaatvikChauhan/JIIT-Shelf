import { parseSubjectName } from "./utils.js";

const aliases = {
  sdf: "software development fundamentals",
  dcd: "digital circuit design",
  dbms: "database management systems",
  oop: "object oriented programming",
  ds: "data structures",
  toc: "theory of computation",
};
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
export function matchesCourse(course, query) {
  const { title, code } = parseSubjectName(course.name);
  const words = normalize(title).split(" ");
  const initials = words.filter((word) => !["and", "of", "for", "the", "using"].includes(word)).map((word) => word[0]).join("");
  let terms = `${normalize(title)} ${normalize(code)} ${initials}`;
  for (const [short, long] of Object.entries(aliases)) {
    if (normalize(title).includes(long) || words.includes(short)) terms += ` ${short} ${long}`;
  }
  return normalize(query).split(" ").every((word) => terms.includes(word));
}

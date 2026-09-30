import test from "node:test";
import assert from "node:assert/strict";
import { matchesCourse } from "../src/lib/courseMatch.js";
import { compareNames, compareSections, materialLabel } from "../src/lib/materials.js";

test("course search supports names, initials, aliases, and course codes", () => {
  const sdf = { name: "15B11CI111__SDF I__laptop__4" };
  const dcd = { name: "18B11EC215__Digital Circuit Design__cpu__4" };
  assert.ok(matchesCourse(sdf, "software development fundamentals"));
  assert.ok(matchesCourse(sdf, "sdf"));
  assert.ok(matchesCourse(dcd, "DCD"));
  assert.ok(matchesCourse(dcd, "18b11ec215"));
  assert.ok(matchesCourse({ name: "CODE__Probability and Random Processes__folder__4" }, "prp"));
  assert.equal(matchesCourse(dcd, "physics"), false);
});

test("section ordering keeps groups and naturally orders any number of modules", () => {
  const names = ["Books", "Module 10", "PYQs", "Module 2", "Module 1", "Lectures-T3", "Tutorials", "Lectures-T1", "Unit 10", "Unit 2"];
  assert.deepEqual(names.map((name) => ({ name })).sort(compareSections).map((item) => item.name), ["Lectures-T1", "Lectures-T3", "Module 1", "Module 2", "Module 10", "Tutorials", "PYQs", "Books", "Unit 2", "Unit 10"]);
  assert.deepEqual(["Lecture 10.pdf", "Lecture 2.pdf"].map((name) => ({ name })).sort(compareNames).map((item) => item.name), ["Lecture 2.pdf", "Lecture 10.pdf"]);
});

test("file labels remove extensions and identify PYQ years only in PYQ sections", () => {
  assert.deepEqual(materialLabel("T1 2025.PDF", true), { title: "T1 2025", type: "PDF", year: "2025", credit: null });
  assert.deepEqual(materialLabel("Module 2.pptx"), { title: "Module 2", type: "PPTX", year: null, credit: null });
  assert.equal(materialLabel("Notes 2025.pdf").year, null);
  assert.equal(materialLabel("Read me").title, "Read me");
});

test("accepted contribution names show the material title and contributor", () => {
  assert.deepEqual(
    materialLabel("ECE__3__18B11EC215 - Digital Circuit Design__PYQ__T1 2026__credits=Saatvik Chauhan.pdf", true),
    { title: "T1 2026", type: "PDF", year: "2026", credit: "Saatvik Chauhan" }
  );
});

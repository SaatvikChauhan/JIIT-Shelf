import test from "node:test";
import assert from "node:assert/strict";
import { contributionDetails, hasExpectedSignature } from "../src/lib/contributions.js";

test("contribution filenames preserve review metadata", () => {
  assert.deepEqual(contributionDetails({
    branch: "ECE", semester: "3", course: "18B11EC215 - Digital Circuit Design",
    type: "lec", originalName: "Module 1.pdf", credit: "Saatvik Chauhan",
  }), {
    mimeType: "application/pdf", extension: "pdf",
    name: "ECE__3__18B11EC215 - Digital Circuit Design__Lec__Module 1__credits=Saatvik Chauhan.pdf",
  });
});

test("unsafe separators and unsupported metadata are rejected or cleaned", () => {
  const result = contributionDetails({ branch: "ECE", semester: 3, course: "DCD__notes", type: "pyq", originalName: "T1__2026.pdf", credit: "A/B" });
  assert.equal(result.name, "ECE__3__DCD-notes__PYQ__T1-2026__credits=A B.pdf");
  for (const value of [
    { branch: "Unknown", semester: 3, course: "DCD", type: "lec", originalName: "x.pdf", credit: "A" },
    { branch: "ECE", semester: 8, course: "DCD", type: "lec", originalName: "x.pdf", credit: "A" },
    { branch: "ECE", semester: 3, course: "DCD", type: "image", originalName: "x.jpg", credit: "A" },
  ]) assert.equal(contributionDetails(value), null);
});

test("file signatures must match PDF or PPTX", () => {
  assert.equal(hasExpectedSignature(Buffer.from("%PDF-1.7"), "pdf"), true);
  assert.equal(hasExpectedSignature(Buffer.from([0x50, 0x4b, 0x03, 0x04]), "pptx"), true);
  assert.equal(hasExpectedSignature(Buffer.from("image"), "pdf"), false);
});

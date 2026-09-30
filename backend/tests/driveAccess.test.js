import test from "node:test";
import assert from "node:assert/strict";
import { createDriveAccess } from "../src/lib/driveAccess.js";

const folder = id => ({ id, mimeType: "application/vnd.google-apps.folder" });
test("shared courses and sections are authorized without parent metadata", async () => {
  const tree = { root: [folder("course")], course: [folder("lectures"), { id: "youtube" }], lectures: [{ id: "pdf" }] };
  const calls = [];
  const authorize = createDriveAccess({ roots: ["root"], listChildren: async id => { calls.push(id); return tree[id]; } });
  await authorize("course");
  await authorize("youtube");
  await authorize("pdf");
  await authorize("lectures");
  assert.deepEqual(calls, ["root", "course", "lectures"]);
  await assert.rejects(authorize("unrelated"), { status: 403 });
  assert.equal(calls.includes("unrelated"), false);
});
test("concurrent discovery is shared and folder cycles terminate", async () => {
  let calls = 0;
  const authorize = createDriveAccess({ roots: ["root"], listChildren: async () => { calls++; return [folder("root"), { id: "file" }]; } });
  await Promise.all([authorize("file"), authorize("file")]);
  assert.equal(calls, 1);
  await assert.rejects(authorize("outside"), { status: 403 });
});
test("failed discovery is retryable and bounded", async () => {
  let attempts = 0;
  const authorize = createDriveAccess({ roots: ["root"], maxFolders: 1, listChildren: async () => {
    if (++attempts === 1) throw new Error("temporary upstream error");
    return [folder("course")];
  } });
  await assert.rejects(authorize("course"), /temporary/);
  await authorize("course");
  await assert.rejects(authorize("deep"), { status: 503 });
});
test("an inaccessible root does not block an accessible semester", async () => {
  const authorize = createDriveAccess({ roots: ["missing", "root"], listChildren: async id => {
    if (id === "missing") throw Object.assign(new Error("not found"), { code: 404 });
    return [folder("course")];
  } });
  await authorize("course");
});
test("a verified listing immediately authorizes its sections and preserves metadata", async () => {
  const calls = [];
  const authorize = createDriveAccess({ roots: ["root"], listChildren: async id => {
    calls.push(id);
    return id === "root" ? [folder("course"), folder("unrelated")] : [];
  } });
  await authorize("course");
  const lecture = { id: "lecture", name: "Lectures", mimeType: "application/vnd.google-apps.folder" };
  assert.equal(authorize.rememberChildren("course", [lecture]), true);
  assert.equal(await authorize("lecture"), lecture);
  assert.deepEqual(calls, ["root"]);
  assert.equal(authorize.rememberChildren("unknown", [folder("forged")]), false);
});

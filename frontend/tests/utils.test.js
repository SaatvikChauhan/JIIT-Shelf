import test from "node:test";
import assert from "node:assert/strict";
import { isDriveItemList, parseSubjectName, parseYouTubeText } from "../src/lib/utils.js";

test("cached lists reject valid JSON with invalid item shapes", () => {
  assert.equal(isDriveItemList([{ id: "abc", name: "Lecture" }]), true);
  for (const value of [null, {}, [null], [1], [{ id: "abc", name: {} }]]) {
    assert.equal(isDriveItemList(value), false);
  }
});

test("subject metadata tolerates missing names and unusable credits", () => {
  assert.deepEqual(parseSubjectName(null), { code: "", title: "", icon: "Folder", credits: 0 });
  assert.equal(parseSubjectName({ name: "wrong shape" }).credits, 0);
  assert.deepEqual(parseSubjectName("CS101__Programming__book-open__4"), {
    code: "CS101", title: "Programming", icon: "BookOpen", credits: 4,
  });
  for (const credit of ["NaN", "Infinity", "-2", "missing"]) {
    assert.equal(parseSubjectName(`CS101__Programming__book__${credit}`).credits, 0);
  }
});

test("resource parser rejects executable links and unsafe image URLs", () => {
  assert.deepEqual(parseYouTubeText(null), []);
  assert.deepEqual(parseYouTubeText("Bad channel\njavascript:alert(1)\nhttps://example.com/logo.png"), []);
  assert.deepEqual(parseYouTubeText("Channel\nhttps://youtube.com/example\ndata:image/svg+xml,bad"), [
    { title: "Channel", link: "https://youtube.com/example", logo: "" },
  ]);
  assert.deepEqual(parseYouTubeText("Channel\nhttps://youtube.com/example\nhttps://example.com/logo.png"), [
    { title: "Channel", link: "https://youtube.com/example", logo: "https://example.com/logo.png" },
  ]);
});

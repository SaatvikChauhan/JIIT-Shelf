import test from "node:test";
import assert from "node:assert/strict";
import { isDriveId, isNonEmptyString, isObjectId } from "../src/lib/validation.js";

test("Drive IDs reject query fragments and MongoDB operator objects", () => {
  assert.equal(isDriveId("1Ab_cd-Ef23"), true);
  for (const value of [undefined, null, {}, { $ne: null }, [], "", "a/b", "a' or trashed=false"]) {
    assert.equal(isDriveId(value), false);
  }
});

test("message IDs require a full hexadecimal ObjectId string", () => {
  assert.equal(isObjectId("507f1f77bcf86cd799439011"), true);
  for (const value of [null, {}, 123, "123", "g".repeat(24), "a".repeat(25)]) {
    assert.equal(isObjectId(value), false);
  }
});

test("message fields reject blank and non-string payloads", () => {
  assert.equal(isNonEmptyString(" Hello "), true);
  for (const value of [null, undefined, {}, [], 0, "", " \n\t"]) {
    assert.equal(isNonEmptyString(value), false);
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { allowedRooms } from "../src/config/chatRooms.js";
import { isChatModerator, messageDeleteFilter } from "../src/lib/chatPermissions.js";
import { branchSemMap } from "../../frontend/src/data/data.js";

test("backend rooms exactly match frontend choices plus All-Years", () => {
  const rooms = Object.entries(branchSemMap).flatMap(([branch, semesters]) =>
    semesters.map((semester) => `${branch} Sem-${semester}`)
  );
  assert.deepEqual([...allowedRooms].sort(), [...rooms, "All-Years"].sort());
});

test("moderator handle is read from server configuration", () => {
  const previous = process.env.CHAT_MODERATOR_HANDLE;
  process.env.CHAT_MODERATOR_HANDLE = "configured moderator";
  assert.equal(isChatModerator(" configured moderator "), true);
  for (const name of [null, {}, "", "student", "Configured moderator", "configured moderator extra"])
    assert.equal(isChatModerator(name), false);
  if (previous === undefined) delete process.env.CHAT_MODERATOR_HANDLE;
  else process.env.CHAT_MODERATOR_HANDLE = previous;
});

test("ordinary deletions are owner-scoped; moderator deletions remain room-scoped", () => {
  const payload = {
    messageId: "507f1f77bcf86cd799439011", room: "All-Years", clientId: "student-1",
  };
  assert.deepEqual(messageDeleteFilter(payload), {
    _id: payload.messageId, room: payload.room, senderId: payload.clientId,
  });
  assert.deepEqual(messageDeleteFilter(payload, true), {
    _id: payload.messageId, room: payload.room,
  });
  assert.equal(messageDeleteFilter({ ...payload, clientId: undefined }), null);
  assert.equal(messageDeleteFilter({ ...payload, messageId: "invalid" }), null);
});

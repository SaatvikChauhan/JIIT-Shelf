import test from "node:test";
import assert from "node:assert/strict";
import { allowedRooms } from "../src/config/chatRooms.js";
import { isChatModerator, messageDeleteFilter } from "../src/lib/chatPermissions.js";
import { branchSemMap } from "../../frontend/src/data/data.js";
import { isChatModerator as clientModerator } from "../../frontend/src/lib/chatPermissions.js";

test("backend rooms exactly match frontend choices plus All-Years", () => {
  const rooms = Object.entries(branchSemMap).flatMap(([branch, semesters]) =>
    semesters.map((semester) => `${branch} Sem-${semester}`)
  );
  assert.deepEqual([...allowedRooms].sort(), [...rooms, "All-Years"].sort());
});

test("moderator username is exact after trimming, on both client and server", () => {
  for (const name of ["radhavallabh shri harivansh", " radhavallabh shri harivansh "]) {
    assert.equal(isChatModerator(name), true);
    assert.equal(clientModerator(name), true);
  }
  for (const name of [null, {}, "", "student", "Radhavallabh shri harivansh", "radhavallabh shri harivansh extra"]) {
    assert.equal(isChatModerator(name), false);
    assert.equal(clientModerator(name), false);
  }
});

test("ordinary deletions are owner-scoped; moderator deletions remain room-scoped", () => {
  const payload = {
    messageId: "507f1f77bcf86cd799439011", room: "All-Years",
    clientId: "student-1", senderName: "Student",
  };
  assert.deepEqual(messageDeleteFilter(payload), {
    _id: payload.messageId, room: payload.room, senderId: payload.clientId,
  });
  assert.deepEqual(messageDeleteFilter({ ...payload, senderName: "radhavallabh shri harivansh" }), {
    _id: payload.messageId, room: payload.room,
  });
  assert.equal(messageDeleteFilter({ ...payload, clientId: undefined }), null);
  assert.equal(messageDeleteFilter({ ...payload, messageId: "invalid" }), null);
});

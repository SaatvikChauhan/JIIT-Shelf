import { isNonEmptyString, isObjectId } from "./validation.js";

export function isChatModerator(username) {
  return typeof username === "string" && username.trim() === "radhavallabh shri harivansh";
}

export function messageDeleteFilter({ messageId, room, clientId, senderName }) {
  if (!isObjectId(messageId) || !isNonEmptyString(clientId)) return null;
  return {
    _id: messageId,
    room,
    ...(isChatModerator(senderName) ? {} : { senderId: clientId }),
  };
}

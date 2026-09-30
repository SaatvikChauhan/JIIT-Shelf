import { timingSafeEqual } from "node:crypto";
import { isNonEmptyString, isObjectId } from "./validation.js";

export function isChatModerator(username) {
  const configuredHandle = process.env.CHAT_MODERATOR_HANDLE?.trim();
  if (!configuredHandle || typeof username !== "string") return false;
  const submitted = Buffer.from(username.trim());
  const configured = Buffer.from(configuredHandle);
  return submitted.length === configured.length && timingSafeEqual(submitted, configured);
}

export function messageDeleteFilter({ messageId, room, clientId }, canModerate = false) {
  if (!isObjectId(messageId) || !isNonEmptyString(clientId)) return null;
  return { _id: messageId, room, ...(canModerate ? {} : { senderId: clientId }) };
}

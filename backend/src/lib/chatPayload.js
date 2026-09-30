export function chatPayload(message) {
  const value = message.toObject ? message.toObject() : message;
  return {
    _id: value._id, room: value.room, createdAt: value.createdAt,
    updatedAt: value.updatedAt, edited: Boolean(value.edited),
    senderName: String(value.senderName || "").slice(0, 80),
    senderId: String(value.senderId || "").slice(0, 128),
    content: String(value.content || "").slice(0, 2000),
    likes: (value.likes || []).slice(0, 100).map(id => String(id).slice(0, 128)),
  };
}

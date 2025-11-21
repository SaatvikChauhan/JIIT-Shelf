import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    senderName: { type: String, required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: [String], default: [] },
    edited: { type: Boolean, default: false },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

MessageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// delete the message as soon as the expiresAt is reached

const Message = mongoose.model("Message", MessageSchema);
export default Message;

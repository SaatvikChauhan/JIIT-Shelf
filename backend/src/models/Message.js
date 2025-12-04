import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    senderName: { type: String, required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: [String], default: [] },
    edited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    senderName: { type: String, required: true, maxlength: 80 },
    senderId: { type: String, required: true, maxlength: 128 },
    content: { type: String, required: true, maxlength: 2000 },
    likes: { type: [String], default: [] },
    edited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MessageSchema.index({ room: 1, _id: -1 });
const Message = mongoose.model("Message", MessageSchema);
export default Message;

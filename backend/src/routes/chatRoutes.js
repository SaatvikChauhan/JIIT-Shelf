import express from "express";
import Message from "../models/Message.js";
import { allowedRooms } from "../config/chatRooms.js";
import { isObjectId } from "../lib/validation.js";
import { chatPayload } from "../lib/chatPayload.js";

const router = express.Router();

router.get("/:room", async (req, res) => {
  const { room } = req.params;

  if (!allowedRooms.has(room)) {
    return res.status(400).json({ error: "Invalid chat room" });
  }

  try {
    const before = req.query.before;
    if (before && !isObjectId(before)) return res.status(400).json({ error: "Invalid history cursor" });
    const messages = await Message.find({ room, ...(before ? { _id: { $lt: before } } : {}) })
      .select({ likes: { $slice: 100 } }).sort({ _id: -1 }).limit(21).maxTimeMS(5000).lean();
    let bytes = 0;
    const page = [];
    for (const message of messages.slice(0, 20)) {
      const payload = chatPayload(message);
      bytes += Buffer.byteLength(JSON.stringify(payload));
      if (bytes > 256 * 1024) break;
      page.push(payload);
    }
    const hasMore = messages.length > page.length;
    page.reverse();
    res.set("Cache-Control", "no-store").json({ messages: page, before: hasMore ? String(page[0]._id) : null });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;

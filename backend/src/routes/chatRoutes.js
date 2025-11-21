import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/:room", async (req, res) => {
  const { room } = req.params;

  try {
    const messages = await Message.find({ room }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;

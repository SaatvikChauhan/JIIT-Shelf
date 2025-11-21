import express from "express";
import SubjectClick from "../models/SubjectClick.js";

const router = express.Router();

router.post("/subject-click", async (req, res) => {
  const { subjectId, title } = req.body;

  if (!subjectId)
    return res.status(400).json({ error: "subjectId is required" });

  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    const existing = await SubjectClick.findOne({ subjectId, date });

    if (existing) {
      existing.count += 1;
      await existing.save();
    } else {
      try {
        await SubjectClick.create({ subjectId, subjectName: title, date, count: 1 });
      } catch (error) {
        console.error(error);
        await SubjectClick.updateOne(
          { subjectId, date },
          { $inc: { count: 1 } }
        );
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Click log error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/trending-today", async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);

  try {
    const top = await SubjectClick.find({ date }).sort({ count: -1 }).limit(2);

    res.json(top);
  } catch (err) {
    console.error("Trending error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

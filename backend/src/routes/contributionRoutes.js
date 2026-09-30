import express from "express";
import { contributionDetails, hasExpectedSignature } from "../lib/contributions.js";
import { uploadContribution } from "../services/googleDrive.js";
import { limiter } from "../lib/protection.js";

const router = express.Router();
const allowUpload = limiter(30, 3600000);

router.post("/", express.raw({ type: () => true, limit: "15mb" }), async (req, res) => {
  if (!allowUpload("uploads")) return res.set("Retry-After", "3600").status(429).json({ error: "Contribution uploads are busy. Please try again later." });
  const details = contributionDetails(req.query);
  if (!details) return res.status(400).json({ error: "Choose valid contribution details and a PDF or PPTX file." });
  if (!req.body?.length || !hasExpectedSignature(req.body, details.extension)) return res.status(400).json({ error: "The uploaded file does not match its PDF or PPTX extension." });
  try {
    const file = await uploadContribution({ name: details.name, mimeType: details.mimeType, data: req.body });
    res.status(201).json({ id: file.id, name: file.name });
  } catch (error) {
    const reason = error.response?.data?.error?.errors?.[0]?.reason || error.response?.data?.error?.message || error.message;
    console.error("Contribution upload failed:", error.code || error.name, reason);
    const message = error.code === "CONFIG"
      ? "Contribution uploads are not configured on the server."
      : "The contribution could not be uploaded. Please try again.";
    res.status(503).json({ error: message });
  }
});

export default router;

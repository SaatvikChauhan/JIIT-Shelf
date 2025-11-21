import express from "express";
import { listFolderContents } from "../services/googleDrive.js";

const router = express.Router();

router.get("/:folderId", async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const contents = await listFolderContents(folderId);
    res.json(contents);
  } catch (error) {
    console.error("Error fetching Drive contents:", error);
    res.status(500).json({ message: "Failed to fetch folder contents" });
  }
});

export default router;

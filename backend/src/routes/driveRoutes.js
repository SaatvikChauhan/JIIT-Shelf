import express from "express";
import { listFolderContents } from "../services/googleDrive.js";
import { driveRoots } from "../config/driveRoots.js";
const router = express.Router();
function failure(error, res) {
  const status = error.status || (Number(error.code) === 404 ? 404 : 502);
  res.set("Cache-Control", "no-store").status(status).json({ message: status === 503 ? "Service busy. Please try again shortly." : "Material is unavailable or exceeds the public listing limits." });
}
router.get("/catalog", async (req, res) => {
  try {
    const results = await Promise.allSettled(driveRoots.map(async id => [id, (await listFolderContents(id)).filter(item => item.type === "folder")]));
    const entries = results.filter(result => result.status === "fulfilled").map(result => result.value);
    if (!entries.length) throw Object.assign(new Error("Catalog unavailable"), { status: 503 });
    res.set("Cache-Control", entries.length === driveRoots.length ? "public, max-age=300" : "no-store").json(Object.fromEntries(entries));
  } catch (error) { failure(error, res); }
});
router.get("/:folderId", async (req, res) => {
  try { res.set("Cache-Control", "public, max-age=300").json(await listFolderContents(req.params.folderId)); }
  catch (error) { failure(error, res); }
});
export default router;

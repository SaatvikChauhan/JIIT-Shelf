import cron from "node-cron";
import SubjectClick from "../models/SubjectClick.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    await SubjectClick.deleteMany({ date: { $ne: today } });
    console.log("🔄 SubjectClick stats reset for a new day");
  } catch (err) {
    console.error("Cron error:", err);
  }
});

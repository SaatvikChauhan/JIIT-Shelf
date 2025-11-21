import mongoose from "mongoose";

const SubjectClickSchema = new mongoose.Schema({
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  date: { type: String, required: true },
  count: { type: Number, default: 1 },
});

SubjectClickSchema.index({ subjectId: 1, date: 1 }, { unique: true });

const SubjectClick = mongoose.model("SubjectClick", SubjectClickSchema);
export default SubjectClick;

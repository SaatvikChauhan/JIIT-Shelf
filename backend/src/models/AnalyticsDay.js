import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  date: { type: String, index: true, required: true },
  browser: { type: String, required: true },
  counts: {
    page_view: { type: Number, default: 0 },
    course_open: { type: Number, default: 0 },
    material_open: { type: Number, default: 0 },
    sgpa_calculated: { type: Number, default: 0 },
    community_join: { type: Number, default: 0 },
  },
  visits: { type: [String], default: [] },
  seen: { type: [String], default: [] },
  courses: { type: Map, of: new mongoose.Schema({ name: String, count: Number }, { _id: false }) },
});
export default mongoose.model("AnalyticsDay", schema);

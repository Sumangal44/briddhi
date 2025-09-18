import mongoose from "mongoose";
const IssueSchema = new mongoose.Schema({
  title: { type: String, required: false },
  type: { type: String, required: false },
  description: { type: String, required: true },
  images: [{ type: String }], // Cloudinary URLs
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }
  },
  address: { type: String },
  status: { type: String, enum: ["pending", "in_progress", "resolved"], default: "pending" },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

IssueSchema.index({ location: "2dsphere" });

const issueModel = mongoose.models.Issue || mongoose.model("Issue", IssueSchema);
export default issueModel;
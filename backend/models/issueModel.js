import mongoose from "mongoose";
const IssueSchema = new mongoose.Schema({
  description: { type: String, required: true },
  imageUrl: { type: String },
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

const issueModel = mongoose.model.Issue || mongoose.model("Issue", IssueSchema);
export default issueModel;
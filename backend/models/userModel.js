import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse: true },
  phone: { type: String, required: true , unique: true, sparse: true},
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["citizen", "admin"], default: "citizen" },
  createdAt: { type: Date, default: Date.now },
});
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

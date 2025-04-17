import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["file", "folder"], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, default: "" }, // Only for files
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.File || mongoose.model("File", fileSchema);

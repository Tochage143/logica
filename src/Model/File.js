// models/File.ts
import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['file', 'folder'], required: true },
    content: { type: String, default: '' },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
    isExpanded: { type: Boolean, default: false },
    dateModified: { type: String, default: '' },
    children: { type: [mongoose.Schema.Types.Mixed], default: [] }, // Optional: Flattened hierarchy
  },
  { timestamps: true }
);

export default mongoose.models.File || mongoose.model("File", FileSchema);

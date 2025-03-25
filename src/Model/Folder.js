import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: String,
  content: String,
});

const FolderSchema = new mongoose.Schema({
  name: String,
  files: [FileSchema], // Folders contain files
  createdAt: { type: Date, default: Date.now },
});

export const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);

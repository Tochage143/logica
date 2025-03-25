import { connectDB } from "../../lib/mongodb";
import { Folder } from "../../models/Folder";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { name, files } = req.body;

    try {
      const newFolder = new Folder({ name, files });
      await newFolder.save();
      return res.status(201).json({ success: true, folder: newFolder });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const folders = await Folder.find();
      return res.status(200).json({ success: true, folders });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

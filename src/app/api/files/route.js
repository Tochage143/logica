import { connectToDatabase } from "@/lib/mongodb";
import File from "@/models/File";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = token.sub;
    const { name, type, parent, content } = await req.json();

    const newFile = await File.create({
      name,
      type,
      parent: parent || null,
      owner: userId,
      content: type === "file" ? content || "" : undefined,
    });

    return NextResponse.json(newFile, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating file/folder" }, { status: 500 });
  }
}

// 📌 GET FILES / FOLDERS
export async function GET(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = token.sub;
    const { searchParams } = new URL(req.url);
    const parent = searchParams.get("parent") || null;

    const files = await File.find({ owner: userId, parent });

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching files" }, { status: 500 });
  }
}

// 📌 UPDATE FILE / FOLDER (Rename or Update Content)
export async function PATCH(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { fileId, newName, content } = await req.json();
    const updateData = {};

    if (newName) updateData.name = newName;
    if (content !== undefined) updateData.content = content;

    const file = await File.findByIdAndUpdate(fileId, updateData, { new: true });

    return NextResponse.json(file, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating file/folder" }, { status: 500 });
  }
}

// 📌 DELETE FILE / FOLDER
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { fileId } = await req.json();
    await File.findByIdAndDelete(fileId);

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting file/folder" }, { status: 500 });
  }
}

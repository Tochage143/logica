import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@database/connectDB";
import File from "@models/File";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const { name, content } = await req.json();

  const updatedFile = await File.findOneAndUpdate(
    { _id: params.id, user: session.user.id },
    {
      ...(name && { name }),
      ...(content && { content }),
      dateModified: new Date().toISOString(),
    },
    { new: true }
  );

  return NextResponse.json({ file: updatedFile });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const targetFile = await File.findOne({
    _id: params.id,
    user: session.user.id,
  });
  if (!targetFile)
    return NextResponse.json({ error: "File not found" }, { status: 404 });

  async function deleteRecursively(fileId: mongoose.Types.ObjectId) {
    const children = await File.find({ parentId: fileId });
    for (const child of children) {
      await deleteRecursively(child._id);
    }
    await File.findByIdAndDelete(fileId);
  }

  await deleteRecursively(targetFile._id);

  return NextResponse.json({ message: "Deleted successfully" });
}

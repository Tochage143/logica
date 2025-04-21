import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@database/connectDB";
import File from "@models/File";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const file = await File.findById(params.id);

  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (file.user.toString() !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(file);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const file = await File.findById(params.id);
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (file.user.toString() !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const updated = await File.findByIdAndUpdate(
    params.id,
    {
      content: body.content,
      dateModified: new Date().toISOString(),
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

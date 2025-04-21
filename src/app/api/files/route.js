import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@database/connectDB";
import File from "@models/File";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectDB();
    const { id } = session.user;

    // Fetch all items (files & folders) belonging to this user
    const items = await File.find({ user: id }).lean();

    // Map items and prepare for tree conversion
    const itemMap = new Map();

    items.forEach((item) => {
      const itemId = item._id.toString();
      item.id = itemId;
      item.isFolder = item.type === "folder";
      item.items = []; // for consistency with desired output
      delete item._id;
      delete item.type;
      itemMap.set(itemId, item);
    });

    // Build hierarchical tree structure
    const rootItems = [];

    items.forEach((item) => {
      if (item.parentId) {
        const parent = itemMap.get(item.parentId.toString());
        if (parent) {
          parent.items.push(item);
        }
      } else {
        rootItems.push(item);
      }
    });

    // Wrap everything inside a root folder
    const folderData = {
      id: "1",
      name: "root",
      isFolder: true,
      items: rootItems,
    };

    return new Response(
      JSON.stringify({
        message: "Success",
        folderData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error", error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectDB();
    const { id: userId } = session.user;

    const body = await request.json();
    const { name, type, parentId } = body;

    // Validation
    if (!name || !type || !["file", "folder"].includes(type)) {
      return new Response(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newFile = await File.create({
      name,
      type,
      parentId: parentId || null,
      user: userId,
    });

    return new Response(
      JSON.stringify({ message: "Created successfully", file: newFile }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error", error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// app/api/auth/register/route.js
import { connectDB } from "@database/connectDB";
import User from "@models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, username, password } = body;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, username, password: hashedPassword });
    await newUser.save();

    return Response.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Registration error", error: err.message }, { status: 500 });
  }
}

import User from "@models/User";
import { connectDB } from "@database/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "User does not exist" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Compare hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ error: "Password is incorrect" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "There is a problem", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export  function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" ,__dirname,__filename}),
    { status: 200, headers: { "Content-Type": "application/json",__dirname } }
  );
}
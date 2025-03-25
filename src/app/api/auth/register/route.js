import User from "@models/User";
import { connectDB } from "@database/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB(); // ✅ Correct database connection execution

    const { name, email, password, username } = await request.json();

    if (!name || !email || !password || !username) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400, // ✅ Fixed status type (number, not string)
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id, // ✅ Corrected email reference
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        token,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "There is a problem",
        details: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

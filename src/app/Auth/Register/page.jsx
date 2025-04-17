"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if logged in
  if (session) {
    router.replace("/");
    return null;
  }

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      // Register the user
      await axios.post("/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Automatically sign in the user after registration
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        alert("Registered and logged in successfully!");
        router.push("/"); // Redirect to home page
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[{ label: "Name", name: "name" }, { label: "Username", name: "username" }, { label: "Email", name: "email" }].map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label className="mb-1 text-gray-300">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          {["password", "confirmPassword"].map((field) => (
            <div className="flex flex-col relative" key={field}>
              <label className="mb-1 text-gray-300">{field === "password" ? "Password" : "Confirm Password"}</label>
              <input
                type={showPassword[field] ? "text" : "password"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="p-2 pr-10 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))}
              >
                {showPassword[field] ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
          ))}
          <button type="submit" className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

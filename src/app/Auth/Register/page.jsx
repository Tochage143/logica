'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      setError("Failed to register. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 bg-[#0f172a] text-white rounded-lg outline-none"
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-3 bg-[#0f172a] text-white rounded-lg outline-none"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-3 bg-[#0f172a] text-white rounded-lg outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              className="w-full p-3 bg-[#0f172a] text-white rounded-lg pr-10 outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-3.5 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white p-3 rounded-lg font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="Login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

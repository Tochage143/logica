"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0f2c]">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e293b] p-8 rounded-xl shadow-2xl space-y-4 w-full sm:w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Login
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-blue-400 bg-[#0f172a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            required
          />
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-blue-400 bg-[#0f172a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-blue-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {error && (
          <p className="text-red-400 text-center text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className={`w-full p-3 rounded-md text-white font-semibold transition duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-blue-200 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="Register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

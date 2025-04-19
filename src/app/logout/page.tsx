"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, 1500); // Delay for animation to show

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center animate-pulse">
        <h1 className="text-4xl font-bold text-white mb-4">Logging Out...</h1>
        <p className="text-gray-400 text-lg">Please wait while we redirect you.</p>
        <div className="mt-6 flex justify-center">
          <div className="w-10 h-10 border-4 border-t-white border-gray-700 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-xl text-gray-300 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const { user } = session;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-white transition-all duration-300 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">👤 Your Profile</h2>
        <div className="space-y-4 text-lg">
          <div>
            <span className="text-gray-400">Name:</span>
            <p className="font-medium text-white">{user?.name || "No name provided"}</p>
          </div>
          <div>
            <span className="text-gray-400">Email:</span>
            <p className="font-medium text-white">{user?.email}</p>
          </div>
          {user?.image && (
            <div className="flex justify-center mt-6">
              <img
                src={user.image}
                alt="Profile Image"
                className="w-24 h-24 rounded-full ring-4 ring-blue-500 shadow-md transition-transform hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

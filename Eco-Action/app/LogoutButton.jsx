"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        // Redirect home page
        router.push("/");

        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-3 py-2 text-black rounded-md hover:bg-white hover:bg-opacity-20"
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </button>
  );
}

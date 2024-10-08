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
      className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md flex items-center"
    >
      <LogOut className="h-5 w-5 mr-2" />
      Logout
    </button>
  );
}

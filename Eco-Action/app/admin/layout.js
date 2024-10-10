import React from "react";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-green-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

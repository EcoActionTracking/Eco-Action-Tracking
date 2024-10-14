"use client";

import React from "react";
import { Leaf, BarChart2, Users, Sun, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Overview", icon: Leaf, path: "/admin" },
  { name: "Users", icon: BarChart2, path: "/admin/users" },
  { name: "Products", icon: Users, path: "/admin/products" },
  { name: "Challenges", icon: Sun, path: "/admin/challenges" },
  { name: "Articles", icon: Settings, path: "/admin/Articles" },
  { name: "Add Articles", icon: Settings, path: "/admin/AddArticles" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen p-4 text-white bg-green-800">
      <h1 className="mb-8 text-2xl font-bold">Eco Action Tracking</h1>
      <nav>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-2 w-full p-2 mb-2 rounded ${
                pathname === item.path ? "bg-green-700" : "hover:bg-green-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

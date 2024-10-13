"use client";

import React from "react";
import {
  PieChart,
  Users,
  Package,
  Flag,
  FileText,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Overview", icon: PieChart, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Challenges", icon: Flag, path: "/admin/challenges" },
  { name: "Articles", icon: FileText, path: "/admin/articles" },
  { name: "Contacts", icon: PhoneCall, path: "/admin/contacts" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-green-800 text-white p-4 h-screen">
      <h1 className="text-2xl font-bold mb-8">Eco Action Tracking</h1>
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

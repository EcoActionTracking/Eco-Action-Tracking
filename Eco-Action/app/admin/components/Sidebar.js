"use client";

import React from "react";
import {
  PieChart,
  Users,
  Package,
  Flag,
  FileText,
  PhoneCall,
  ShoppingCart, // New import for Orders
} from "lucide-react"; // Add your chosen icon here
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [

  { name: "Overview", icon: PieChart, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Challenges", icon: Flag, path: "/admin/challenges" },
  { name: "Add Articles", icon: Settings, path: "/admin/AddArticles" },
  { name: "Contacts", icon: PhoneCall, path: "/admin/contacts" },

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

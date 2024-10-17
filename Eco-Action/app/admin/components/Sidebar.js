"use client";

import React from "react";
import {
  PieChart,
  Users,
  Package,
  Flag,
  FileText,
  PhoneCall,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Import motion for animations

const sidebarItems = [
  { name: "Overview", icon: PieChart, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Challenges", icon: Flag, path: "/admin/challenges" },
  { name: "Articles", icon: Flag, path: "/admin/articles" },
  { name: "Contacts", icon: PhoneCall, path: "/admin/contacts" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#116A7B] text-white p-4 h-screen shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Eco Action Tracking</h1>

      <nav>
        {sidebarItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link key={item.name} href={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 w-full p-2 mb-2 rounded transition duration-300 ${
                  isActive ? "bg-[#122e33]" : "hover:bg-[#C2DEDC]"
                } ${isActive ? "text-white" : "text-white hover:text-[#333]"}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

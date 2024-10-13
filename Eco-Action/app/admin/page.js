"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ShoppingBag, Award, TrendingUp, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <Card
    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${gradient}`}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <Icon className="h-4 w-4 text-white" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [data, setData] = useState({ users: [], products: [], challenges: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, productsRes, challengesRes] = await Promise.all([
        axios.get("/api/admin/users"),
        axios.get("/api/admin/products"),
        axios.get("/api/admin/challenges"),
      ]);

      setData({
        users: usersRes.data,
        products: productsRes.data,
        challenges: challengesRes.data,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eco-friendly color gradients
  const gradients = [
    "bg-gradient-to-r from-green-600 to-green-400", // Forest green
    "bg-gradient-to-r from-blue-500 to-green-400", // Ocean to forest
    "bg-gradient-to-r from-yellow-400 to-green-500", // Sunlight to leaves
    "bg-gradient-to-r from-teal-500 to-green-400", // Teal to green
  ];

  const chartData = [
    { name: "Users", value: data.users.length },
    { name: "Products", value: data.products.length },
    { name: "Challenges", value: data.challenges.length },
  ];

  const filteredChartData =
    activeTab === "all"
      ? chartData
      : chartData.filter((item) => item.name.toLowerCase() === activeTab);

  return (
    <div className="p-6 space-y-6 bg-green-50 dark:bg-green-900">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={data.users.length}
          icon={Users}
          gradient={gradients[0]}
        />
        <StatCard
          title="Total Products"
          value={data.products.length}
          icon={ShoppingBag}
          gradient={gradients[1]}
        />
        <StatCard
          title="Active Challenges"
          value={data.challenges.length}
          icon={Award}
          gradient={gradients[2]}
        />
        <StatCard
          title="Eco Impact"
          value="Positive"
          icon={TrendingUp}
          gradient={gradients[3]}
        />
      </div>
      <Card className="overflow-hidden bg-white dark:bg-green-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800 dark:text-green-100">
            Overview Statistics
          </CardTitle>
          <div className="flex space-x-2 mt-2">
            {["all", "users", "products", "challenges"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "bg-green-600 hover:bg-green-700"
                    : "text-green-600 border-green-600 hover:bg-green-100"
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#a7f3d0" />
              <XAxis dataKey="name" stroke="#047857" />
              <YAxis stroke="#047857" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ecfdf5",
                  borderColor: "#10b981",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="value"
                fill="url(#colorGradient)"
                animationDuration={1000}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          onClick={fetchData}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            "Refresh Data"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

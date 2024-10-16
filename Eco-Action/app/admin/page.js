"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ShoppingBag, Award, Loader2, Leaf } from "lucide-react";
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

const ImpactCard = () => {
  const [stats, setStats] = useState({
    totalCarbonReduced: 0,
    totalCompletedChallenges: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/impact-statistics");
        const data = await response.json();
        if (data.success) {
          setStats(data.statistics);
        }
      } catch (error) {
        console.error("Failed to fetch impact statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-[#116A7B] to-[#122e33]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-white">
          Carbon impact
        </CardTitle>
        <Leaf className="h-4 w-4 text-white" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold text-white">
          {stats.totalCarbonReduced} kg Carbon Reduced
        </div>
        <div className="text-sm text-gray-200 mt-1">
          {stats.totalCompletedChallenges} challenges completed
        </div>
      </CardContent>
    </Card>
  );
};

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

  // Color gradients
  const gradients = [
    "bg-gradient-to-r from-[#116A7B] to-[#122e33]", // Custom blue-green gradient
    "bg-gradient-to-r from-[#122e33] to-gray-600", // Darker tones
    "bg-gradient-to-r from-gray-600 to-[#C2DEDC]", // Neutral transition
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
    <div className="p-6 space-y-6 bg-[#9ebdc2] dark:bg-[#9ebdc2]">
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
          gradient={gradients[1]}
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
          gradient={gradients[1]}
        />
        <ImpactCard />
      </div>
      <Card className="overflow-hidden bg-white dark:bg-gray-600">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#122e33] dark:text-[#C2DEDC]">
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
                    ? "bg-[#116A7B] hover:bg-[#122e33] text-white"
                    : "text-[#116A7B] border-[#116A7B] hover:bg-[#C2DEDC]"
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
              <CartesianGrid strokeDasharray="3 3" stroke="#C2DEDC" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#C2DEDC",
                  borderColor: "#122e33",
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
                  <stop offset="5%" stopColor="#116A7B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#122e33" stopOpacity={0.8} />
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
          className="bg-[#116A7B] hover:bg-[#122e33] text-white"
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

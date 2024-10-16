"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImpactStatistics = () => {
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
          // Ensure totalCarbonReduced is treated as a float
          setStats({
            totalCarbonReduced:
              parseFloat(data.statistics.totalCarbonReduced) || 0,
            totalCompletedChallenges:
              data.statistics.totalCompletedChallenges || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch impact statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Impact Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{stats.totalCarbonReduced} kg</p>
            <p className="text-sm text-gray-500">Carbon Emissions Reduced</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {stats.totalCompletedChallenges}
            </p>
            <p className="text-sm text-gray-500">Challenges Completed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactStatistics;

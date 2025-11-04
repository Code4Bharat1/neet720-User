"use client";

import React, { useEffect, useState } from "react";
import {
  RadialBarChart, 
  RadialBar, 
  Legend, 
  ResponsiveContainer, 
  Tooltip,
} from "recharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

const SuccessRateCard = ({ selectedFilter }) => {
  const [data, setData] = useState({
    physics: 0,
    chemistry: 0,
    biology: 0,
    prevRate: 0,
  });
  const [successRate, setSuccessRate] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [trendPercentage, setTrendPercentage] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/success`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filtered = response.data.filter((t) => withinRange(selectedFilter, t.updatedAt));
        
        // Calculate average success rates
        const avg = filtered.reduce(
          (acc, t) => {
            acc.Physics += t.Physics || 0;
            acc.Chemistry += t.Chemistry || 0;
            acc.Biology += t.Biology || 0;
            return acc;
          },
          { Physics: 0, Chemistry: 0, Biology: 0 }
        );

        const count = filtered.length || 1;
        const physicsAvg = avg.Physics / count;
        const chemistryAvg = avg.Chemistry / count;
        const biologyAvg = avg.Biology / count;

        // Format data for radial chart
        const formatted = [
          { name: "Physics", value: Math.min(physicsAvg, 100), fill: "#1E66F5" },
          { name: "Chemistry", value: Math.min(chemistryAvg, 100), fill: "#FFA500" },
          { name: "Biology", value: Math.min(biologyAvg, 100), fill: "#FF3B30" },
        ];
        setChartData(formatted);

        // Calculate overall success rate
        const avgSuccessRate = Math.min(
          Math.round((physicsAvg + chemistryAvg + biologyAvg) / 3),
          100
        );

        // Trend calculation
        const prevRate = data.prevRate || 0;
        const isTrendIncreasing = avgSuccessRate > prevRate;
        const trendPercent = Math.min(
          (((avgSuccessRate - prevRate) / (prevRate || 1)) * 100).toFixed(1),
          100
        );

        setIsIncreasing(isTrendIncreasing);
        setTrendPercentage(trendPercent);
        setSuccessRate(avgSuccessRate);
        setData({ 
          physics: physicsAvg, 
          chemistry: chemistryAvg, 
          biology: biologyAvg, 
          prevRate: avgSuccessRate 
        });
        setError(null);

      } catch (err) {
        console.error("Error fetching success rate data:", err);
        setError("Unable to load success rate data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  const trendColor = isIncreasing ? "text-green-500" : "text-red-500";
  const TrendIcon = isIncreasing ? FaArrowUp : FaArrowDown;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
          <CardDescription>Average success per subject</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div>Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
          <CardDescription>Average success per subject</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
          <CardDescription>Average success per subject</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div className="text-gray-400">No data for {selectedFilter}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Rate</CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-500">SUCCESS RATE</span>
            <span className={`flex items-center text-sm font-medium ${trendColor}`}>
              <TrendIcon className="mr-1" />
              {Math.abs(trendPercentage)}% {isIncreasing ? "Increase" : "Decrease"}
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2">{successRate}%</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-auto min-h-[320px]">
        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="20%" 
            outerRadius="100%" 
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <RadialBar 
              background 
              dataKey="value" 
              cornerRadius={5} 
            />
            <Legend />
            <Tooltip 
              formatter={(value) => `${Math.round(value)}%`}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SuccessRateCard;
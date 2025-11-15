"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

const SuccessRateCard = ({ selectedFilter }) => {
  const [data, setData] = useState({
    physics: 0,
    chemistry: 0,
    biology: 0,
    botany: 0,
    zoology: 0,
  });
  const [viewFilter, setViewFilter] = useState(selectedFilter || "This Year");
  const [successRate, setSuccessRate] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [trendPercentage, setTrendPercentage] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setViewFilter(selectedFilter || "This Year");
  }, [selectedFilter]);

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

        const filtered = response.data.filter((t) => withinRange(viewFilter, t.updatedAt));

        if (filtered.length === 0) {
          setChartData([]);
          setSuccessRate(0);
          return;
        }

        // Calculate average success rates per subject
        const avg = filtered.reduce(
          (acc, t) => {
            acc.Physics += t.Physics || 0;
            acc.Chemistry += t.Chemistry || 0;
            acc.Biology += t.Biology || 0;
            acc.Botany += t.Botany || 0;
            acc.Zoology += t.Zoology || 0;
            return acc;
          },
          { Physics: 0, Chemistry: 0, Biology: 0, Botany: 0, Zoology: 0 }
        );

        const count = filtered.length;
        const physicsAvg = Math.min((avg.Physics / count) || 0, 100);
        const chemistryAvg = Math.min((avg.Chemistry / count) || 0, 100);
        const biologyAvg = Math.min((avg.Biology / count) || 0, 100);
        const botanyAvg = Math.min((avg.Botany / count) || 0, 100);
        const zoologyAvg = Math.min((avg.Zoology / count) || 0, 100);

        // Prepare radial chart data
        const formatted = [
          { name: "Physics", value: Math.round(physicsAvg), fill: "#1E66F5" },
          { name: "Chemistry", value: Math.round(chemistryAvg), fill: "#FFA500" },
          { name: "Biology", value: Math.round(biologyAvg), fill: "#FF3B30" },
          ...(botanyAvg > 0 ? [{ name: "Botany", value: Math.round(botanyAvg), fill: "#8B5CF6" }] : []),
          ...(zoologyAvg > 0 ? [{ name: "Zoology", value: Math.round(zoologyAvg), fill: "#F59E0B" }] : []),
        ];
        setChartData(formatted);

        // Calculate overall success rate
        const subjects = [physicsAvg, chemistryAvg, biologyAvg, botanyAvg, zoologyAvg].filter((v) => v > 0);
        const avgSuccessRate = Math.round(subjects.reduce((a, b) => a + b, 0) / (subjects.length || 1));

        // Trend calculation
        const firstHalf = filtered.slice(0, Math.ceil(filtered.length / 2));
        const secondHalf = filtered.slice(Math.ceil(filtered.length / 2));

        const firstAvg =
          firstHalf.reduce((sum, t) => sum + (t.Physics || 0) + (t.Chemistry || 0) + (t.Biology || 0), 0) /
          (firstHalf.length * 3);
        const secondAvg =
          secondHalf.reduce((sum, t) => sum + (t.Physics || 0) + (t.Chemistry || 0) + (t.Biology || 0), 0) /
          (secondHalf.length * 3);

        const isTrendIncreasing = secondAvg >= firstAvg;
        const trendPercent = Math.abs(((secondAvg - firstAvg) / (firstAvg || 1)) * 100).toFixed(1);

        setIsIncreasing(isTrendIncreasing);
        setTrendPercentage(trendPercent);
        setSuccessRate(avgSuccessRate);
        setData({
          physics: Math.round(physicsAvg),
          chemistry: Math.round(chemistryAvg),
          biology: Math.round(biologyAvg),
          botany: Math.round(botanyAvg),
          zoology: Math.round(zoologyAvg),
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
  }, [viewFilter]);

  const trendColor = isIncreasing ? "text-green-500" : "text-red-500";
  const TrendIcon = isIncreasing ? FaArrowUp : FaArrowDown;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
          <CardDescription>Average success per subject</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
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
        <CardContent className="h-72 flex items-center justify-center">
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
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <p className="font-medium">No data available</p>
            <p className="text-sm">Complete tests to track success rate</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-3 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Success Rate</CardTitle>
        <CardDescription>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
            <span className="text-xs sm:text-sm font-bold text-gray-600">OVERALL SUCCESS RATE</span>
            <span className={`flex items-center text-xs sm:text-sm font-medium ${trendColor}`}>
              <TrendIcon className="mr-1" />
              {Math.abs(trendPercentage)}% {isIncreasing ? "Increase" : "Decrease"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3">{successRate}%</h2>
          <p className="text-xs text-gray-500 mt-1">{viewFilter}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-3 py-4 sm:px-6 sm:py-5">
        {/* Radial Chart */}
        <ResponsiveContainer width="100%" height={chartData.length > 3 ? 240 : 220}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="90%"
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <RadialBar background dataKey="value" cornerRadius={8} />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              formatter={(value) => `${value}%`}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Subject Progress Bars */}
        <div className="mt-6 space-y-3 pt-4 border-t">
          <p className="text-xs sm:text-sm font-semibold text-gray-700">Subject Breakdown</p>

          {Object.entries(data)
            .filter(([_, score]) => score > 0)
            .map(([subject, score], idx) => {
              const colors = {
                physics: "bg-blue-500",
                chemistry: "bg-yellow-500",
                biology: "bg-red-500",
                botany: "bg-purple-500",
                zoology: "bg-amber-500",
              };

              return (
                <div key={subject}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-700 capitalize truncate">{subject}</span>
                    <span className="text-xs font-bold text-gray-600">{score}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[subject]} transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessRateCard;
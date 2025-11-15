"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { withinRange } from "@/lib/dateFilters";

const SpeedCard = ({ selectedFilter }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewFilter, setViewFilter] = useState(selectedFilter || "This Year");

  useEffect(() => {
    setViewFilter(selectedFilter || "This Year");
  }, [selectedFilter]);

  useEffect(() => {
    const fetchAverageMarks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/average`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter by date range
        const filtered = response.data.filter((t) =>
          withinRange(viewFilter, t.updatedAt)
        );

        if (filtered.length === 0) {
          setChartData([]);
          setError(null);
          return;
        }

        // Process data for chart
        const processedData = filtered.map((test, idx) => ({
          name: `Test ${idx + 1}`,
          Physics: test.Physics || 0,
          Chemistry: test.Chemistry || 0,
          Biology: test.Biology || 0,
          Botany: test.Botany || 0,
          Zoology: test.Zoology || 0,
          overall: Math.round(
            (test.Physics + test.Chemistry + test.Biology + (test.Botany || 0) + (test.Zoology || 0)) / 5
          ),
        }));

        setChartData(processedData);

        setError(null);
      } catch (err) {
        console.error("Error fetching average marks:", err);
        setError("Failed to load performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAverageMarks();
  }, [viewFilter]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Performance</CardTitle>
          <CardDescription>Subject-wise average marks over time</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading performance data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Performance</CardTitle>
          <CardDescription>Subject-wise average marks over time</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-red-500 flex gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Performance</CardTitle>
          <CardDescription>Subject-wise average marks over time</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <p className="font-medium">No test data available</p>
            <p className="text-sm">Complete tests to see performance trends</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate summary statistics
  const avgPhysics = chartData.reduce((sum, t) => sum + (t.Physics || 0), 0) / chartData.length;
  const avgChemistry = chartData.reduce((sum, t) => sum + (t.Chemistry || 0), 0) / chartData.length;
  const avgBiology = chartData.reduce((sum, t) => sum + (t.Biology || 0), 0) / chartData.length;
  const avgBotany = chartData.reduce((sum, t) => sum + (t.Botany || 0), 0) / chartData.length;
  const avgZoology = chartData.reduce((sum, t) => sum + (t.Zoology || 0), 0) / chartData.length;

  const avgOverall = Math.round((avgPhysics + avgChemistry + avgBiology + avgBotany + avgZoology) / 5);

  const firstHalf = chartData.slice(0, Math.ceil(chartData.length / 2));
  const secondHalf = chartData.slice(Math.ceil(chartData.length / 2));

  const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d.overall, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d.overall, 0) / secondHalf.length;
  const trend = Math.round(((secondHalfAvg - firstHalfAvg) / (firstHalfAvg || 1)) * 100);
  const isImproving = secondHalfAvg >= firstHalfAvg;

  const trendColor = isImproving ? "text-green-600" : "text-red-600";
  const TrendIcon = isImproving ? TrendingUp : TrendingDown;

  return (
    <Card>
      <CardHeader className="px-3 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">Average Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Subject-wise average marks over time</CardDescription>
          </div>
          <div className={`flex items-center gap-1 font-semibold text-sm sm:text-base ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span>{isImproving ? "+" : "-"}{Math.abs(trend)}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 px-3 py-4 sm:px-6 sm:py-5">
        {/* Main Score Display */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 border border-blue-200">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Overall Average ({viewFilter})</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">{avgOverall}%</p>
            <p className="text-xs text-gray-600">
              {isImproving ? "Improving trend" : "Declining trend"}
            </p>
          </div>
        </div>

        {/* Subject Averages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {[
            ["Physics", Math.round(avgPhysics)],
            ["Chemistry", Math.round(avgChemistry)],
            ["Biology", Math.round(avgBiology)],
            ["Botany", Math.round(avgBotany)],
            ["Zoology", Math.round(avgZoology)],
          ].map(([subject, score]) => (
            score > 0 && (
              <div
                key={subject}
                className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200 text-center"
              >
                <p className="text-xs font-semibold text-gray-600 mb-1 truncate">{subject}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">{score}%</p>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${Math.min(score, 100)}%` }}
                  />
                </div>
              </div>
            )
          ))}
        </div>

        {/* Bar Chart */}
        <div className="mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Performance Across Tests</p>
          <ResponsiveContainer width="100%" height={chartData.length > 5 ? 240 : 220}>
            <BarChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: chartData.length > 5 ? 50 : 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                angle={chartData.length > 5 ? -45 : 0}
                textAnchor={chartData.length > 5 ? "end" : "middle"}
                height={chartData.length > 5 ? 60 : 25}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                ticks={[0, 25, 50, 75, 100]}
                domain={[0, 100]}
                label={{ value: "Score (%)", angle: -90, position: "insideLeft", offset: 5 }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              <Bar dataKey="Physics" fill="#0E5FD9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Chemistry" fill="#0FAF62" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Biology" fill="#E84646" radius={[4, 4, 0, 0]} />
              {chartData.some((d) => d.Botany > 0) && (
                <Bar dataKey="Botany" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              )}
              {chartData.some((d) => d.Zoology > 0) && (
                <Bar dataKey="Zoology" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Info */}
        <div className="text-xs text-gray-500 text-center pt-2 sm:pt-4 border-t">
          <p className="text-xs sm:text-sm">Showing {chartData.length} test{chartData.length !== 1 ? "s" : ""} • {viewFilter}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeedCard;
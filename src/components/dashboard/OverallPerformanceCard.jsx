"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

const OverallPerformanceCard = ({ selectedFilter = "This Year" }) => {
  const [data, setData] = useState([]);
  const [avgPerformance, setAvgPerformance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewFilter, setViewFilter] = useState(selectedFilter || "This Year");

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
          setData([]);
          setAvgPerformance(0);
          return;
        }

        const points = filtered.map((t, i) => {
          const avg = ((t.Physics || 0) + (t.Chemistry || 0) + (t.Biology || 0) + (t.Botany || 0) + (t.Zoology || 0)) / 5;
          return {
            name: `Test ${i + 1}`,
            Score: Math.round(avg),
            Physics: t.Physics || 0,
            Chemistry: t.Chemistry || 0,
            Biology: t.Biology || 0,
          };
        });

        // Calculate average performance
        const totalPerformance = points.reduce((sum, item) => sum + item.Score, 0);
        const avgPerformance = Math.round(totalPerformance / points.length) || 0;
        setAvgPerformance(avgPerformance);
        setData(points);
        setError(null);
      } catch (err) {
        setError("Failed to load performance data");
        console.error("Error fetching performance data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewFilter]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Trend of average score over time</CardDescription>
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
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Trend of average score over time</CardDescription>
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

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Trend of average score over time</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <p className="font-medium">No performance data</p>
            <p className="text-sm">Take tests to see trends</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isImproving = data.length >= 2 ? data[data.length - 1].Score > data[0].Score : false;

  const trendPercentage =
    data.length >= 2
      ? Math.abs(((data[data.length - 1].Score - data[0].Score) / (data[0].Score || 1)) * 100).toFixed(1)
      : 0;

  const maxScore = Math.max(...data.map((d) => d.Score), 100);

  return (
    <Card>
      <CardHeader className="px-3 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">Overall Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Trend of average score over time</CardDescription>
          </div>
          <div className={`flex items-center gap-1 font-semibold text-sm ${isImproving ? "text-green-600" : "text-red-600"}`}>
            {isImproving ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{trendPercentage}%</span>
          </div>
        </div>
      </CardHeader>

      {/* Average Score Box */}
      <CardContent className="space-y-4 px-3 py-4 sm:px-6 sm:py-5">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <p className="text-xs text-gray-600 font-medium">Average Score ({viewFilter})</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mt-2">{avgPerformance}%</p>
            </div>
            <div
              className={`text-center px-2 sm:px-3 py-2 rounded-lg ${
                isImproving
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <p className="text-xs font-semibold">Trend</p>
              <p className="text-xs sm:text-sm font-bold">{isImproving ? "↑" : "↓"} {trendPercentage}%</p>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        <div className="w-full overflow-hidden">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Overall Trend</p>
          <ResponsiveContainer width="100%" height={data.length > 5 ? 220 : 200}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: data.length > 5 ? 50 : 35 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E66F5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1E66F5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9 }}
                angle={data.length > 5 ? -45 : 0}
                textAnchor={data.length > 5 ? "end" : "middle"}
                height={data.length > 5 ? 70 : 30}
              />
              <YAxis
                tick={{ fontSize: 9 }}
                domain={[0, maxScore * 1.1]}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
                formatter={(value) => `${value}%`}
              />
              <Area
                type="monotone"
                dataKey="Score"
                stroke="#1E66F5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
                dot={{ fill: "#1E66F5", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-4 border-t">
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Highest Score</p>
            <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">
              {Math.max(...data.map((d) => d.Score))}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Average</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1">{avgPerformance}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Latest Score</p>
            <p className="text-lg sm:text-xl font-bold text-purple-600 mt-1">
              {data[data.length - 1]?.Score}%
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-gray-500 text-center px-3 py-3 sm:px-6 sm:py-4">
        <p className="text-xs sm:text-sm">Showing {data.length} test{data.length !== 1 ? "s" : ""} • {viewFilter}</p>
      </CardFooter>
    </Card>
  );
};

export default OverallPerformanceCard;
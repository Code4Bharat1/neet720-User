"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { withinRange } from "@/lib/dateFilters";

const AccuracyCard = ({ selectedFilter }) => {
  const [data, setData] = useState([]);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [isImproving, setIsImproving] = useState(false);
  const [trendPercentage, setTrendPercentage] = useState(0);
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

        const rawData = response.data.filter((t) => withinRange(viewFilter, t.updatedAt));

        if (rawData.length === 0) {
          setData([]);
          setAvgAccuracy(0);
          setIsImproving(false);
          setTrendPercentage(0);
          return;
        }

        // Transform data into subject-wise points
        const performanceData = rawData.map((t, i) => ({
          name: `Test ${i + 1}`,
          Physics: t.Physics || 0,
          Chemistry: t.Chemistry || 0,
          Biology: t.Biology || 0,
          Botany: t.Botany || 0,
          Zoology: t.Zoology || 0,
        }));

        setData(performanceData);

        // Calculate average accuracy
        const totalScores = rawData.reduce(
          (acc, t) =>
            acc + (t.Physics || 0) + (t.Chemistry || 0) + (t.Biology || 0) + (t.Botany || 0) + (t.Zoology || 0),
          0
        );

        const count = rawData.length;
        const avgAccuracyCalc = Math.round(totalScores / (count * 5));

        setAvgAccuracy(avgAccuracyCalc);

        // Trend calculation
        if (performanceData.length >= 2) {
          const firstHalf = performanceData.slice(0, Math.ceil(performanceData.length / 2));
          const secondHalf = performanceData.slice(Math.ceil(performanceData.length / 2));

          const firstAvg =
            firstHalf.reduce((sum, d) => sum + d.Physics + d.Chemistry + d.Biology + (d.Botany || 0) + (d.Zoology || 0), 0) /
            (firstHalf.length * 5);

          const secondAvg =
            secondHalf.reduce((sum, d) => sum + d.Physics + d.Chemistry + d.Biology + (d.Botany || 0) + (d.Zoology || 0), 0) /
            (secondHalf.length * 5);

          const isUp = secondAvg > firstAvg;
          setIsImproving(isUp);
          setTrendPercentage(Math.round(Math.abs((secondAvg - firstAvg) / (firstAvg || 1) * 100)));
        }
      } catch (err) {
        console.error("Error fetching accuracy data:", err);
        setError("Unable to load accuracy data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewFilter]);

  const trendColor = isImproving === null ? "text-gray-500" : isImproving ? "text-green-500" : "text-red-500";
  const TrendIcon = isImproving === null ? null : isImproving ? FaArrowUp : FaArrowDown;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Overview</CardTitle>
          <CardDescription>Subject-wise accuracy across tests</CardDescription>
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
          <CardTitle>Accuracy Overview</CardTitle>
          <CardDescription>Subject-wise accuracy across tests</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Overview</CardTitle>
          <CardDescription>Subject-wise accuracy across tests</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <p className="font-medium">No data available</p>
            <p className="text-sm">Complete tests to track accuracy</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-3 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Accuracy Overview</CardTitle>
        <CardDescription>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
            <span className="text-xs sm:text-sm font-bold text-gray-600">ACCURACY TREND</span>
            <span className={`flex items-center text-xs sm:text-sm font-medium ${trendColor}`}>
              {TrendIcon && <TrendIcon className="mr-1" />}
              {trendPercentage > 0 ? `${trendPercentage}%` : "0%"}
              {isImproving !== null && (isImproving ? " Increase" : " Decrease")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3">{avgAccuracy}%</h2>
          <p className="text-xs text-gray-500 mt-1">{viewFilter} Performance</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-3 py-4 sm:px-6 sm:py-5">
        <ResponsiveContainer width="100%" height={data.length > 5 ? 220 : 200}>
          <LineChart data={data} margin={{ top: 10, right: 5, left: -25, bottom: data.length > 5 ? 50 : 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              angle={data.length > 5 ? -45 : 0}
              textAnchor={data.length > 5 ? "end" : "middle"}
              height={data.length > 5 ? 60 : 25}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft", offset: 5 }}
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
            <Line
              type="monotone"
              dataKey="Physics"
              stroke="#0E5FD9"
              strokeWidth={3}
              dot={{ fill: "#0E5FD9", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Chemistry"
              stroke="#0FAF62"
              strokeWidth={3}
              dot={{ fill: "#0FAF62", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Biology"
              stroke="#E84646"
              strokeWidth={3}
              dot={{ fill: "#E84646", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Summary Stats */}
        <div className="mt-4 pt-4 border-t space-y-2">
          <p className="text-xs text-gray-600 font-medium">Subject Performance ({viewFilter}):</p>
          <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs text-gray-600">Physics</p>
              <p className="text-sm font-bold text-blue-600">
                {Math.round(
                  data.reduce((sum, d) => sum + d.Physics, 0) / data.length
                )}%
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-gray-600">Chemistry</p>
              <p className="text-sm font-bold text-green-600">
                {Math.round(
                  data.reduce((sum, d) => sum + d.Chemistry, 0) / data.length
                )}%
              </p>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <p className="text-xs text-gray-600">Biology</p>
              <p className="text-sm font-bold text-red-600">
                {Math.round(
                  data.reduce((sum, d) => sum + d.Biology, 0) / data.length
                )}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
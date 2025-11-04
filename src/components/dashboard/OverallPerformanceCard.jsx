"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
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

        const points = filtered.map((t, i) => ({
          name: `Test ${i + 1}`,
          Score: ((t.Physics + t.Chemistry + t.Biology) / 3).toFixed(2),
        }));

        // Calculate average performance
        const totalPerformance = points.reduce(
          (sum, item) => sum + parseFloat(item.Score),
          0
        );
        const avgPerformance = totalPerformance / points.length || 0;
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
  }, [selectedFilter]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Trend of average score over time</CardDescription>
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
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Trend of average score over time</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div className="text-red-500">{error}</div>
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
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div className="text-gray-400">No data for {selectedFilter}</div>
        </CardContent>
      </Card>
    );
  }

  const isImproving = data.length >= 2 
    ? parseFloat(data[data.length - 1].Score) > parseFloat(data[0].Score)
    : false;
    
  const trendPercentage = data.length >= 2
    ? Math.abs(((parseFloat(data[data.length - 1].Score) - parseFloat(data[0].Score)) / parseFloat(data[0].Score) * 100)).toFixed(1)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Performance</CardTitle>
        <CardDescription>Trend of average score over time</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-auto min-h-[320px]">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart 
            data={data} 
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
            <Line
              type="monotone"
              dataKey="Score"
              stroke="#1E66F5"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div
          className={`flex gap-2 font-medium leading-none ${
            isImproving ? "text-green-500" : "text-red-500"
          }`}
        >
          {isImproving ? "Performance up" : "Performance down"} by{" "}
          {trendPercentage}%
          {isImproving ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing performance trend for <strong>{selectedFilter}</strong>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OverallPerformanceCard;
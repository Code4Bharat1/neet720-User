"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

const PerformanceSummaryCard = ({ selectedFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewFilter, setViewFilter] = useState(selectedFilter || "This Year");
  const [summaryStats, setSummaryStats] = useState({
    avgPhysics: 0,
    avgChemistry: 0,
    avgBiology: 0,
    maxScore: 0,
  });

  useEffect(() => {
    setViewFilter(selectedFilter || "This Year");
  }, [selectedFilter]);

  useEffect(() => {
    const fetchData = async () => {
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

        const filtered = response.data.filter((t) => withinRange(viewFilter, t.updatedAt));

        if (filtered.length === 0) {
          setData([]);
          setSummaryStats({
            avgPhysics: 0,
            avgChemistry: 0,
            avgBiology: 0,
            maxScore: 0,
          });
          return;
        }

        const formatted = filtered.map((t, i) => ({
          name: `Test ${i + 1}`,
          Physics: t.Physics || 0,
          Chemistry: t.Chemistry || 0,
          Biology: t.Biology || 0,
          Botany: t.Botany || 0,
          Zoology: t.Zoology || 0,
          Total: Math.round(
            ((t.Physics || 0) + (t.Chemistry || 0) + (t.Biology || 0) + (t.Botany || 0) + (t.Zoology || 0)) / 5
          ),
        }));

        setData(formatted);

        // Calculate averages
        const avgPhysics = Math.round(
          filtered.reduce((sum, t) => sum + (t.Physics || 0), 0) / filtered.length
        );
        const avgChemistry = Math.round(
          filtered.reduce((sum, t) => sum + (t.Chemistry || 0), 0) / filtered.length
        );
        const avgBiology = Math.round(
          filtered.reduce((sum, t) => sum + (t.Biology || 0), 0) / filtered.length
        );
        const maxScore = Math.max(
          ...formatted.map((f) => f.Total),
          100
        );

        setSummaryStats({
          avgPhysics,
          avgChemistry,
          avgBiology,
          maxScore,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError("Unable to load performance data");
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
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Combined subject performance overview</CardDescription>
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
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Combined subject performance overview</CardDescription>
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
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Combined subject performance overview</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <p className="font-medium">No performance data available</p>
            <p className="text-sm">Complete tests to track performance</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-3 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Performance Summary</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Combined subject performance across all tests</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-3 py-4 sm:px-6 sm:py-5">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-200 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">Physics Avg</p>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">{summaryStats.avgPhysics}%</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 sm:p-3 border border-green-200 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">Chemistry Avg</p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">{summaryStats.avgChemistry}%</p>
          </div>
          <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-200 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">Biology Avg</p>
            <p className="text-lg sm:text-2xl font-bold text-red-600">{summaryStats.avgBiology}%</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Subject Performance Across Tests</p>
          <ResponsiveContainer width="100%" height={data.length > 5 ? 240 : 220}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 5, left: -25, bottom: data.length > 5 ? 50 : 30 }}
            >
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
              <Bar dataKey="Physics" fill="#1E66F5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Chemistry" fill="#FFA500" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Biology" fill="#FF3B30" radius={[4, 4, 0, 0]} />
              {data.some((d) => d.Botany > 0) && (
                <Bar dataKey="Botany" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              )}
              {data.some((d) => d.Zoology > 0) && (
                <Bar dataKey="Zoology" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Trend */}
        <div className="mt-4 sm:mt-6 pt-4 border-t w-full overflow-hidden">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Overall Trend</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" hide={true} />
              <YAxis hide={true} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="Total" fill="#667EEA" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.Total >= 70 ? "#10B981" : entry.Total >= 50 ? "#F59E0B" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center pt-2 sm:pt-4 border-t">
          <p className="text-xs sm:text-sm">Showing {data.length} test{data.length !== 1 ? "s" : ""} • {viewFilter}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummaryCard;
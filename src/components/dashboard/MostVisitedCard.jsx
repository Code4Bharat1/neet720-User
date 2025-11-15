"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { withinRange } from "@/lib/dateFilters";

const MostVisitedCard = ({ selectedFilter }) => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTests, setTotalTests] = useState(0);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/testcount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          setError("Invalid response format");
          return;
        }

        // Categorize tests
        const testTypeMap = {
          "Full Test": response.data.fullTestResults?.totalTests || 0,
          "System Test": response.data.recommendedTests?.totalTests || 0,
          "Quick Test": response.data.meTests?.totalTests || 0,
          "Admin Test": response.data.adminTests?.totalTests || 0,
        };

        const total = Object.values(testTypeMap).reduce((a, b) => a + b, 0);
        setTotalTests(total);

        // Prepare table data
        const tableData = Object.entries(testTypeMap)
          .filter(([_, count]) => count > 0)
          .map(([name, count]) => {
            const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
            return {
              name,
              count,
              percentage: parseFloat(percentage),
            };
          });

        setData(tableData);

        // Prepare pie chart data with colors
        const chartColors = {
          "Full Test": "#1E66F5",
          "System Test": "#FFA500",
          "Quick Test": "#FF3B30",
          "Admin Test": "#8B5CF6",
        };

        const pieData = tableData.map((item) => ({
          name: item.name,
          value: item.count,
          fill: chartColors[item.name] || "#999",
        }));

        setGraphData(pieData);
      } catch (err) {
        console.error("Error fetching test data:", err);
        setError("Failed to load test statistics");
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
          <CardTitle>Test Statistics</CardTitle>
          <CardDescription>Overview of test data</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading test statistics...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Statistics</CardTitle>
          <CardDescription>Overview of test data</CardDescription>
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
          <CardTitle>Test Statistics</CardTitle>
          <CardDescription>Overview of test data</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <p className="font-medium">No test data available</p>
            <p className="text-sm">Complete tests to see statistics</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-3 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Test Statistics</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Overview of completed tests</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-3 py-4 sm:px-6 sm:py-5 overflow-hidden">
        {/* Total Tests Card */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-purple-200">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Tests ({viewFilter})</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mt-2">{totalTests}</p>
            <p className="text-xs text-gray-600 mt-1">Across all categories</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Test Distribution</p>
          <div style={{ width: "100%", height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={graphData}
                  cx="50%"
                  cy="45%"
                  labelLine={true}
                  label={({ name, value, percent }) => `${name}: ${value}`}
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value} test${value !== 1 ? "s" : ""}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="border-t pt-4 w-full overflow-x-auto">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Test Breakdown</p>
          <div className="space-y-2">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 flex-shrink-0"
                    style={{ backgroundColor: graphData[idx]?.fill }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate" title={item.name}>{item.name}</p>
                    <p className="text-xs text-gray-600">{item.count} test{item.count !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 pl-2 ml-2">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">{item.count}</p>
                  <p
                    className={`text-xs font-semibold whitespace-nowrap ${
                      item.percentage >= 50
                        ? "text-green-600"
                        : item.percentage >= 25
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center pt-2 sm:pt-4 border-t">
          <p className="text-xs sm:text-sm">Data for: {viewFilter}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MostVisitedCard;
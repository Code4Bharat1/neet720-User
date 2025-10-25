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

const MostVisitedPageCard = ({ selectedFilter }) => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTests, setTotalTests] = useState(0);

  // Enhanced date helpers with daily support
  const getStartOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // Sunday = 0, Monday = 1, ...
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    const start = new Date(d.setDate(diff));
    start.setHours(0, 0, 0, 0); // ✅ normalize to start of day (local)
    return start;
  };


  const isSameDay = (testDate, currentDate) => {
    const test = getStartOfDay(testDate);
    const current = getStartOfDay(currentDate);
    return test.getTime() === current.getTime();
  };

  const isSameWeek = (testDate, currentDate) => {
    const test = new Date(testDate);
    const current = new Date(currentDate);
    const weekStart = getStartOfWeek(current);
    const testWeekStart = getStartOfWeek(test);
    return weekStart.getTime() === testWeekStart.getTime();
  };

  const isSameMonth = (testDate, currentDate) => {
    const test = new Date(testDate);
    const current = new Date(currentDate);
    return test.getFullYear() === current.getFullYear() &&
      test.getMonth() === current.getMonth();
  };

  const isSameYear = (testDate, currentDate) =>
    new Date(testDate).getFullYear() === new Date(currentDate).getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/testcount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        const rawData = response.data;

        // Check if we have valid data structure
        if (!rawData || typeof rawData !== 'object') {
          setError("Invalid data format received");
          setLoading(false);
          return;
        }

        const currentDate = new Date();

        // Process each test type with better error handling
        const testTypes = [
          {
            key: 'fullTestResults',
            name: 'Full Tests',
            color: "#1E66F5",
            
          },
          {
            key: 'recommendedTests',
            name: 'Recommended Tests',
            color: "#FFA500"
          },
          {
            key: 'meTests',
            name: 'ME Tests',
            color: "#FF3B30"
          }
        ];

        let filteredTests = [];

        testTypes.forEach(testType => {
          const testData = rawData[testType.key];

          if (testData && typeof testData === 'object') {
            let shouldInclude = false;

            // Apply date filtering based on selectedFilter
            switch (selectedFilter) {
              case "Today": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameDay(localUpdatedAt, currentDate);
                break;
              }
              case "This Week": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameWeek(localUpdatedAt, currentDate);
                break;
              }
              case "This Month": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameMonth(localUpdatedAt, currentDate);
                break;
              }
              case "This Year": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameYear(localUpdatedAt, currentDate);
                break;
              }
              default:
                shouldInclude = true;
            }

            if (shouldInclude && testData.totalTests > 0) {
              filteredTests.push({
                name: testType.name,
                totalTests: testData.totalTests || 0,
                color: testType.color
              });
            }
          }
        });

        console.log("Filtered tests:", filteredTests);

        // Calculate total tests
        const total = filteredTests.reduce((sum, test) => sum + test.totalTests, 0);
        setTotalTests(total);

        if (total === 0) {
          setData([]);
          setGraphData([]);
          setLoading(false);
          return;
        }

        // Prepare data for table (percentages)
        const tableData = filteredTests.map(test => ({
          name: test.name,
          value: ((test.totalTests / total) * 100).toFixed(1),
          color: test.color,
          totalTests: test.totalTests
        }));

        // Prepare data for graph (absolute values)
        const pieData = filteredTests.map(test => ({
          name: test.name,
          value: test.totalTests,
          color: test.color
        }));

        setData(tableData);
        setGraphData(pieData);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching test statistics:", err);
        setError(err.response?.data?.message || "Failed to load test statistics");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  // Add real-time updates - refetch data every 30 seconds to catch new tests
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("authToken");
      if (token && !loading) {
        // Silently refresh data without showing loading state
        fetchDataSilently();
      }
    }, 30000); // Refresh every 30 seconds

    const fetchDataSilently = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/testcount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = response.data;
        const currentDate = new Date();

        const testTypes = [
          { key: 'fullTestResults', name: 'Full Tests', color: "#1E66F5" },
          { key: 'recommendedTests', name: 'Recommended Tests', color: "#FFA500" },
          { key: 'meTests', name: 'ME Tests', color: "#FF3B30" }
        ];

        let filteredTests = [];

        testTypes.forEach(testType => {
          const testData = rawData[testType.key];

          if (testData && typeof testData === 'object') {
            let shouldInclude = false;

            switch (selectedFilter) {
              case "Today": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameDay(localUpdatedAt, currentDate);
                break;
              }
              case "This Week": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameWeek(localUpdatedAt, currentDate);
                break;
              }
              case "This Month": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameMonth(localUpdatedAt, currentDate);
                break;
              }
              case "This Year": {
                const localUpdatedAt = new Date(testData.updatedAt);
                shouldInclude = testData.updatedAt && isSameYear(localUpdatedAt, currentDate);
                break;
              }
              default:
                shouldInclude = true;
            }

            if (shouldInclude && testData.totalTests > 0) {
              filteredTests.push({
                name: testType.name,
                totalTests: testData.totalTests || 0,
                color: testType.color
              });
            }
          }
        });

        const total = filteredTests.reduce((sum, test) => sum + test.totalTests, 0);
        setTotalTests(total);

        if (total === 0) {
          setData([]);
          setGraphData([]);
          return;
        }

        const tableData = filteredTests.map(test => ({
          name: test.name,
          value: ((test.totalTests / total) * 100).toFixed(1),
          color: test.color,
          totalTests: test.totalTests
        }));

        const pieData = filteredTests.map(test => ({
          name: test.name,
          value: test.totalTests,
          color: test.color
        }));

        setData(tableData);
        setGraphData(pieData);
      } catch (err) {
        console.error("Error silently refreshing test statistics:", err);
        // Don't set error state for silent refresh to avoid disrupting user experience
      }
    };

    return () => clearInterval(interval);
  }, [selectedFilter, loading]);

  // Render loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Statistics</CardTitle>
          <CardDescription>
            Overview of test data based on selection
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <div className="text-center text-blue-500">Loading test statistics...</div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Statistics</CardTitle>
          <CardDescription>
            Overview of test data based on selection
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <div className="text-center text-red-500">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  // Render no data state
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Statistics</CardTitle>
          <CardDescription>
            Overview of test data based on selection
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <div className="text-center text-gray-500">
            No test data found for {selectedFilter.toLowerCase()}
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Take some tests to see statistics
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Statistics</CardTitle>
        <CardDescription>
          Overview of test data based on selection
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Total Tests Summary */}
        <div className="w-full text-center mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalTests}</div>
          <div className="text-sm text-gray-600">Total Tests ({selectedFilter})</div>
        </div>

        {/* Chart */}
        <div className="w-full h-full md:h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={graphData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {graphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} tests`, 'Count']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div className="w-full mt-4">
          <div className="flex justify-between border-b pb-2 text-gray-500 text-sm font-medium">
            <span>TEST NAME</span>
            <span>TOTAL TESTS (%)</span>
          </div>
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-gray-700 text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {item.totalTests} tests
                </div>
                <div className={`text-xs ${parseFloat(item.value) < 33 ? "text-red-500" :
                  parseFloat(item.value) < 66 ? "text-yellow-500" : "text-green-500"
                  }`}>
                  {item.value}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Period Info */}
        <div className="w-full mt-4 text-center">
          <div className="text-xs text-gray-400">
            Showing data for: {selectedFilter}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Updates automatically every 30 seconds
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MostVisitedPageCard;
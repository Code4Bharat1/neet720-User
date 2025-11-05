"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

const AccuracyCard = ({ selectedFilter }) => {
  const [data, setData] = useState([]);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [isImproving, setIsImproving] = useState(false);
  const [trendPercentage, setTrendPercentage] = useState(0);
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
        console.log("response :", response.data);

        const rawData = response.data.filter((t) => withinRange(selectedFilter, t.updatedAt));
        const currentDate = new Date();

        const isSameYear = (date) =>
          new Date(date).getFullYear() === currentDate.getFullYear();
        const isSameMonth = (date) =>
          isSameYear(date) &&
          new Date(date).getMonth() === currentDate.getMonth();
        const isSameWeek = (date) => {
          const testDate = new Date(date);
          const weekStart = new Date(currentDate);
          weekStart.setDate(currentDate.getDate() - currentDate.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return testDate >= weekStart && testDate <= weekEnd;
        };

        let performanceData = [];
        
        if (selectedFilter === "This Year") {
          const monthLabels = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
          ];

          // FIXED: Always create all 12 months, even with 0 data
          performanceData = monthLabels.map((month, index) => {
            const filtered = rawData.filter((item) => {
              const testDate = new Date(item.updatedAt);
              return isSameYear(testDate) && testDate.getMonth() === index;
            });

            const totalPhysics = filtered.reduce((sum, item) => sum + (item.Physics || 0), 0);
            const totalChemistry = filtered.reduce((sum, item) => sum + (item.Chemistry || 0), 0);
            const totalBiology = filtered.reduce((sum, item) => sum + (item.Biology || 0), 0);

            return {
              order: index,
              label: month,
              physics: totalPhysics, // Will be 0 if no data for this month
              chemistry: totalChemistry, // Will be 0 if no data for this month
              biology: totalBiology, // Will be 0 if no data for this month
            };
          });

        } else if (selectedFilter === "This Month") {
          // FIXED: Always create all weeks for the month
          const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
          
          performanceData = weekLabels.map((week, index) => {
            const filtered = rawData.filter((item) => {
              const testDate = new Date(item.updatedAt);
              if (!isSameMonth(testDate)) return false;
              
              const day = testDate.getDate();
              const weekNumber = Math.ceil(day / 7) - 1; // 0-indexed week number
              return weekNumber === index;
            });

            const totalPhysics = filtered.reduce((sum, item) => sum + (item.Physics || 0), 0);
            const totalChemistry = filtered.reduce((sum, item) => sum + (item.Chemistry || 0), 0);
            const totalBiology = filtered.reduce((sum, item) => sum + (item.Biology || 0), 0);

            return {
              order: index,
              label: week,
              physics: totalPhysics, // Will be 0 if no data for this week
              chemistry: totalChemistry, // Will be 0 if no data for this week
              biology: totalBiology, // Will be 0 if no data for this week
            };
          });

        } else if (selectedFilter === "This Week") {
          // FIXED: Always create all 7 days
          const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          
          performanceData = dayLabels.map((day, index) => {
            const filtered = rawData.filter((item) => {
              const testDate = new Date(item.updatedAt);
              return isSameWeek(testDate) && testDate.getDay() === index;
            });

            const totalPhysics = filtered.reduce((sum, item) => sum + (item.Physics || 0), 0);
            const totalChemistry = filtered.reduce((sum, item) => sum + (item.Chemistry || 0), 0);
            const totalBiology = filtered.reduce((sum, item) => sum + (item.Biology || 0), 0);

            return {
              order: index,
              label: day,
              physics: totalPhysics, // Will be 0 if no data for this day
              chemistry: totalChemistry, // Will be 0 if no data for this day
              biology: totalBiology, // Will be 0 if no data for this day
            };
          });
        }

        // Sort by order to ensure proper chronological sequence
        performanceData.sort((a, b) => a.order - b.order);
        
        setData(performanceData);

        // Calculate average accuracy - only count periods with actual data
        const dataPointsWithValues = performanceData.filter(item => 
          item.physics > 0 || item.chemistry > 0 || item.biology > 0
        );
        
        const totalScores = dataPointsWithValues.reduce(
          (acc, item) => acc + item.physics + item.chemistry + item.biology,
          0
        );
        
        const totalSubjects = dataPointsWithValues.length * 3;
        const avgAccuracyCalc = totalSubjects > 0 ? Math.round(totalScores / totalSubjects) : 0;

        setAvgAccuracy(avgAccuracyCalc);

        // Trend calculation - only use periods with data
        if (dataPointsWithValues.length >= 2) {
          const last = dataPointsWithValues[dataPointsWithValues.length - 1];
          const prev = dataPointsWithValues[dataPointsWithValues.length - 2];

          const lastTotal = (last.physics + last.chemistry + last.biology) / 3;
          const prevTotal = (prev.physics + prev.chemistry + prev.biology) / 3;

          const trendDiff = lastTotal - prevTotal;
          const trendPercent = prevTotal !== 0 ? ((trendDiff / prevTotal) * 100).toFixed(1) : 0;

          setIsImproving(trendDiff > 0 ? true : trendDiff < 0 ? false : null);
          setTrendPercentage(Math.abs(trendPercent));
        } else {
          setIsImproving(null);
          setTrendPercentage(0);
        }

      } catch (err) {
        console.error("Error fetching accuracy data:", err);
        setError("Unable to load accuracy data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  // Determine trend icon and color
  const trendColor = isImproving === null ? "text-gray-500" : 
                     isImproving ? "text-green-500" : "text-red-500";
  const TrendIcon = isImproving === null ? null : 
                    isImproving ? FaArrowUp : FaArrowDown;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Overview</CardTitle>
          <CardDescription>Subject-wise accuracy across tests</CardDescription>
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
          <CardTitle>Accuracy Overview</CardTitle>
          <CardDescription>Subject-wise accuracy across tests</CardDescription>
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
          <CardTitle>Accuracy Overview</CardTitle>
          <CardDescription>Subject-wise accuracy across tests</CardDescription>
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
        <CardTitle>ACCURACY</CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-500">ACCURACY</span>
            <span className={`flex items-center text-sm font-medium ${trendColor}`}>
              {TrendIcon && <TrendIcon className="mr-1" />}
              {trendPercentage > 0 ? `${trendPercentage}%` : '0%'} 
              {isImproving !== null && (isImproving ? " Increase" : " Decrease")}
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2">{avgAccuracy}%</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-auto min-h-[320px]">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart 
            data={data} 
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="label" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              interval={0} // Show all labels
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#374151',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value, name) => [
                `${value}%`, 
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Line
              type="monotone"
              dataKey="physics"
              stroke="#0E5FD9"
              strokeWidth={3}
              dot={{ fill: '#0E5FD9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0E5FD9', strokeWidth: 2 }}
              connectNulls={false} // Don't connect lines through zero values
            />
            <Line
              type="monotone"
              dataKey="chemistry"
              stroke="#0FAF62"
              strokeWidth={3}
              dot={{ fill: '#0FAF62', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0FAF62', strokeWidth: 2 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="biology"
              stroke="#E84646"
              strokeWidth={3}
              dot={{ fill: '#E84646', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#E84646', strokeWidth: 2 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
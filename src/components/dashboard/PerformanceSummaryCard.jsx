"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

const PerformanceSummaryCard = ({ selectedFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const filtered = response.data.filter((t) => withinRange(selectedFilter, t.updatedAt));
        const formatted = filtered.map((t, i) => ({
          name: `Test ${i + 1}`,
          Physics: t.Physics || 0,
          Chemistry: t.Chemistry || 0,
          Biology: t.Biology || 0,
          Total: ((t.Physics + t.Chemistry + t.Biology) / 3).toFixed(2),
        }));
        
        setData(formatted);
        setError(null);
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError("Unable to load performance data");
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
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Combined subject performance overview</CardDescription>
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
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Combined subject performance overview</CardDescription>
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
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Combined subject performance overview</CardDescription>
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
        <CardTitle>Performance Summary</CardTitle>
        <CardDescription>Combined subject performance overview</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-auto min-h-[320px]">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart 
            data={data} 
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'Total') return [`${value}%`, 'Average'];
                return [`${value}%`, name];
              }}
            />
            <Legend />
            <Bar dataKey="Physics" barSize={20} fill="#1E66F5" />
            <Bar dataKey="Chemistry" barSize={20} fill="#FFA500" />
            <Bar dataKey="Biology" barSize={20} fill="#FF3B30" />
            <Line 
              type="monotone" 
              dataKey="Total" 
              stroke="#00C49F" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummaryCard;
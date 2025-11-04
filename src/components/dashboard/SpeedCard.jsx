import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { withinRange } from "@/lib/dateFilters";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpeedCard = ({ changeDate }) => {
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]); // Store all data for filtering
  const [error, setError] = useState(null);

  // Enhanced date helpers with better period handling
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start of week
    return new Date(d.setDate(diff));
  };

  const getStartOfMonth = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  };

  const getStartOfYear = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), 0, 1);
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

  // More robust date formatting
  const asISODate = (dateString) => {
    const date = new Date(dateString);
    // Adjust for timezone to get local date
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
  };

  // Format date for display based on period
  const formatDateForDisplay = (dateString, period) => {
    const date = new Date(dateString);
    switch (period) {
      case "This Week":
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      case "This Month":
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case "This Year":
        return date.toLocaleDateString('en-US', { month: 'short' });
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Fetch all data initially
  useEffect(() => {
    const fetchAverageMarks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.warn("No token found in localStorage");
          setAllData([]);
          setDaily([]);
          setError("No authentication token found");
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/average`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", res.data);
        const raw = Array.isArray(res.data) ? res.data : [];
        setAllData(raw);
        setError(null);
        
      } catch (error) {
        console.error("Error fetching average marks:", error);
        setAllData([]);
        setDaily([]);
        setError("Unable to load average marks data");
      } finally {
        setLoading(false);
      }
    };

    fetchAverageMarks();
  }, []);

  // Process data when changeDate or allData changes
  useEffect(() => {
    if (allData.length === 0) {
      setDaily([]);
      return;
    }

    // Use withinRange for filtering
    const filtered = allData.filter((t) => withinRange(changeDate, t.updatedAt));

    console.log("Filtered data for", changeDate, ":", filtered);

    // Group by day with improved logic
    const byDay = new Map();
    
    filtered.forEach((test) => {
      const testDate = asISODate(test.updatedAt);
      
      if (!byDay.has(testDate)) {
        byDay.set(testDate, {
          Physics: [],
          Chemistry: [],
          Biology: [],
          Botany: [],
          Zoology: [],
          count: 0
        });
      }
      
      const dayData = byDay.get(testDate);
      
      // Collect all scores for each subject
      if (test.Physics !== undefined && test.Physics !== null) {
        dayData.Physics.push(test.Physics);
      }
      if (test.Chemistry !== undefined && test.Chemistry !== null) {
        dayData.Chemistry.push(test.Chemistry);
      }
      if (test.Biology !== undefined && test.Biology !== null) {
        dayData.Biology.push(test.Biology);
      }
      if (test.Botany !== undefined && test.Botany !== null) {
        dayData.Botany.push(test.Botany);
      }
      if (test.Zoology !== undefined && test.Zoology !== null) {
        dayData.Zoology.push(test.Zoology);
      }
      dayData.count += 1;
    });

    // Calculate averages and create final array
    const rows = Array.from(byDay.entries())
      .map(([date, dayData]) => {
        const calculateAverage = (scores) => {
          if (scores.length === 0) return 0;
          const sum = scores.reduce((a, b) => a + b, 0);
          return +(sum / scores.length).toFixed(2);
        };

        const Physics = calculateAverage(dayData.Physics);
        const Chemistry = calculateAverage(dayData.Chemistry);
        const Biology = calculateAverage(dayData.Biology);
        const Botany = calculateAverage(dayData.Botany);
        const Zoology = calculateAverage(dayData.Zoology);
        
        // Calculate overall average from available subjects
        const subjectsWithData = [Physics, Chemistry, Biology, Botany, Zoology].filter(score => score > 0);
        const overall = subjectsWithData.length > 0 
          ? +(subjectsWithData.reduce((a, b) => a + b, 0) / subjectsWithData.length).toFixed(2)
          : 0;
        
        return { 
          date, 
          Physics, 
          Chemistry, 
          Biology, 
          Botany,
          Zoology,
          overall,
          count: dayData.count 
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date ascending

    console.log("Processed daily data for", changeDate, ":", rows);
    setDaily(rows);
  }, [allData, changeDate]);

  // Improved trend calculation
  const last = daily.length > 0 ? daily[daily.length - 1] : null;
  const prev = daily.length > 1 ? daily[daily.length - 2] : null;
  
  const currentAvg = last ? last.overall.toFixed(2) : "0.00";
  const prevAvg = prev ? prev.overall : last ? last.overall : 0;
  const isImproving = last && last.overall >= prevAvg;
  const trendColor = isImproving ? "text-green-500" : "text-red-500";
  const TrendIcon = isImproving ? FaArrowUp : FaArrowDown;

  // Prepare chart data with all subjects
  const chartData = {
    labels: daily.map((r) => formatDateForDisplay(r.date, changeDate)),
    datasets: [
      {
        label: "Physics",
        data: daily.map((r) => r.Physics),
        backgroundColor: "#16DBCC",
        borderRadius: 6,
        hidden: daily.every(r => r.Physics === 0), // Hide if no data
      },
      {
        label: "Chemistry",
        data: daily.map((r) => r.Chemistry),
        backgroundColor: "#FFBB38",
        borderRadius: 6,
        hidden: daily.every(r => r.Chemistry === 0),
      },
      {
        label: "Biology",
        data: daily.map((r) => r.Biology),
        backgroundColor: "#FE5C73",
        borderRadius: 6,
        hidden: daily.every(r => r.Biology === 0),
      },
      {
        label: "Botany",
        data: daily.map((r) => r.Botany),
        backgroundColor: "#4CAF50",
        borderRadius: 6,
        hidden: daily.every(r => r.Botany === 0),
      },
      {
        label: "Zoology",
        data: daily.map((r) => r.Zoology),
        backgroundColor: "#8BC34A",
        borderRadius: 6,
        hidden: daily.every(r => r.Zoology === 0),
      },
    ].filter(dataset => !dataset.hidden), // Remove completely hidden datasets
  };

  // Count available subjects for the current period
  const availableSubjects = useMemo(() => {
    const subjects = ['Physics', 'Chemistry', 'Biology', 'Botany', 'Zoology'];
    return subjects.filter(subject => 
      daily.some(day => day[subject] > 0)
    ).length;
  }, [daily]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Marks</CardTitle>
          <CardDescription>Average marks across subjects</CardDescription>
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
          <CardTitle>Average Marks</CardTitle>
          <CardDescription>Average marks across subjects</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (daily.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Marks</CardTitle>
          <CardDescription>Average marks across subjects</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto min-h-[320px] flex items-center justify-center">
          <div className="text-gray-400">No data for {changeDate}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Marks ({changeDate})</CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-500">AVERAGE MARKS ({changeDate})</span>
            <span className={`flex items-center text-sm font-medium ${trendColor}`}>
              <TrendIcon className="mr-1" />
              {isImproving ? "Improved" : "Dropped"}
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2">{currentAvg}%</h2>
          <p className="text-xs text-gray-500">
            {last ? `Latest: ${formatDateForDisplay(last.date, changeDate)}` : "No data available"}
            {last && last.count > 1 && ` (${last.count} tests)`}
            {availableSubjects > 0 && ` • ${availableSubjects} subject${availableSubjects > 1 ? 's' : ''}`}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-auto min-h-[320px]">
        <div className="w-full h-64 mt-4">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: { mode: "index", intersect: false },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: (v) => v + "%",
                  },
                  grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    maxRotation: daily.length > 7 ? 45 : 0,
                    minRotation: daily.length > 7 ? 45 : 0,
                    autoSkip: true,
                    maxTicksLimit: daily.length > 10 ? 10 : undefined,
                  },
                },
              },
              plugins: {
                legend: { 
                  display: true, 
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                    padding: 15,
                    boxWidth: 8,
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || '';
                      const value = context.parsed.y;
                      return `${label}: ${value}%`;
                    },
                    afterLabel: (context) => {
                      const index = context.dataIndex;
                      const dayData = daily[index];
                      const testsCount = dayData?.count;
                      return testsCount > 1 ? `Based on ${testsCount} tests` : '';
                    }
                  },
                },
              },
            }}
          />
        </div>

        {/* Status messages */}
        {!loading && daily.length === 0 && (
          <p className="mt-2 text-xs text-gray-500 text-center">No test records found for {changeDate.toLowerCase()}.</p>
        )}
        
        {/* Period info */}
        <div className="mt-2 text-xs text-gray-400 text-center">
          <p>Showing {daily.length} day{daily.length !== 1 ? 's' : ''} • {changeDate}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeedCard;
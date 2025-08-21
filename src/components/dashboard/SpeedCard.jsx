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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpeedCard = ({ changeDate }) => {
  const [daily, setDaily] = useState([]); // [{ date:'YYYY-MM-DD', Physics, Chemistry, Biology, overall }]
  const [loading, setLoading] = useState(false);

  // Helpers for time windows
  const now = useMemo(() => new Date(), []);
  const isSameYear = (d) => new Date(d).getFullYear() === now.getFullYear();
  const isSameMonth = (d) =>
    isSameYear(d) && new Date(d).getMonth() === now.getMonth();
  const isSameWeek = (d) => {
    const dt = new Date(d);
    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(now.getDate() - weekStart.getDay()); // Sun start (adjust if Mon needed)
    return dt >= weekStart;
  };

  // Format date -> YYYY-MM-DD (local midnight safe)
  const asISODate = (d) => {
    const x = new Date(d);
    const yyyy = x.getFullYear();
    const mm = String(x.getMonth() + 1).padStart(2, "0");
    const dd = String(x.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const fetchAverageMarks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.warn("No token found in localStorage");
          setDaily([]);
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/average`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("response :", res.data)

        const raw = Array.isArray(res.data) ? res.data : [];
        const filtered = raw.filter((t) => {
          if (!t?.updatedAt) return false;
          if (changeDate === "This Year") return isSameYear(t.updatedAt);
          if (changeDate === "This Month") return isSameMonth(t.updatedAt);
          if (changeDate === "This Week") return isSameWeek(t.updatedAt);
          return true; // default: no filter / all time
        });

        // Group by day
        const byDay = new Map();
        for (const item of filtered) {
          const key = asISODate(item.updatedAt);
          const acc = byDay.get(key) || {
            PhysicsSum: 0,
            ChemistrySum: 0,
            BiologySum: 0,
            count: 0,
          };
          acc.PhysicsSum += item.Physics || 0;
          acc.ChemistrySum += item.Chemistry || 0;
          acc.BiologySum += item.Biology || 0;
          acc.count += 1;
          byDay.set(key, acc);
        }

        // Build daily rows sorted asc by date
        const rows = Array.from(byDay.entries())
          .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
          .map(([date, v]) => {
            const Physics = v.count ? +(v.PhysicsSum / v.count).toFixed(2) : 0;
            const Chemistry = v.count ? +(v.ChemistrySum / v.count).toFixed(2) : 0;
            const Biology = v.count ? +(v.BiologySum / v.count).toFixed(2) : 0;
            const overall = +(((Physics + Chemistry + Biology) / 3) || 0).toFixed(2);
            return { date, Physics, Chemistry, Biology, overall };
          });

        setDaily(rows);
      } catch (e) {
        console.error("Error fetching average marks:", e);
        setDaily([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageMarks();
  }, [changeDate]);

  // Derive headline + trend from last two days
  const last = daily.length ? daily[daily.length - 1] : null;
  const prev = daily.length > 1 ? daily[daily.length - 2] : null;
  const currentAvg = last ? last.overall.toFixed(2) : "0.00";
  const prevAvg = prev ? prev.overall : 0;
  const isImproving = last && last.overall >= prevAvg;
  const trendColor = isImproving ? "text-green-500" : "text-red-500";
  const TrendIcon = isImproving ? FaArrowUp : FaArrowDown;

  // Chart.js dataset: daily bars per subject
  const chartData = {
    labels: daily.map((r) => r.date), // e.g. 2025-08-01
    datasets: [
      {
        label: "Physics",
        data: daily.map((r) => r.Physics),
        backgroundColor: "#16DBCC",
        borderRadius: 6,
      },
      {
        label: "Chemistry",
        data: daily.map((r) => r.Chemistry),
        backgroundColor: "#FFBB38",
        borderRadius: 6,
      },
      {
        label: "Biology",
        data: daily.map((r) => r.Biology),
        backgroundColor: "#FE5C73",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="w-full max-w-sm p-5 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-500">AVERAGE MARKS (Day-by-Day)</h3>
        <span className={`flex items-center text-sm font-medium ${trendColor}`}>
          <TrendIcon className="mr-1" />
          {isImproving ? "Improved" : "Dropped"}
        </span>
      </div>

      {/* Latest day's overall */}
      <h2 className="text-2xl font-bold mt-2">{currentAvg}%</h2>
      <p className="text-xs text-gray-500">
        {last ? `Latest: ${last.date}` : "No data"}
      </p>

      {/* Chart */}
      <div className="w-full h-48 mt-4">
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
              },
              x: {
                ticks: {
                  maxRotation: 0,
                  autoSkip: true,
                  autoSkipPadding: 8,
                },
              },
            },
            plugins: {
              legend: { display: true, position: "bottom" },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
                },
              },
              title: { display: false },
            },
          }}
        />
      </div>

      {/* Loading state */}
      {loading && (
        <p className="mt-2 text-xs text-gray-500">Loading day-by-day data…</p>
      )}
      {!loading && daily.length === 0 && (
        <p className="mt-2 text-xs text-gray-500">No records in this period.</p>
      )}
    </div>
  );
};

export default SpeedCard;

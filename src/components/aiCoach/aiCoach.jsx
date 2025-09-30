"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Atom,
  FlaskConical,
  Dna,
  Brain,
  Target,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  CalendarClock,
  ListChecks,
  ChevronDown,
  Loader2,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  Printer,
} from "lucide-react";
import Sidebar from "../layout/sidebar/sidebar";
import ToggleBar from "../layout/togglebar/togglebar";
import BottomNavbar from "../layout/bottomnav/bottomnav";
import NavBar from "../layout/navbar/navbar";

/**
 * AI Coach Plan - Enhanced UI
 * - Beautiful, responsive design optimized for mobile
 * - Bold chapter names and structured content
 * - Modern card layouts with improved visual hierarchy
 */
const SUBJECT_META = {
  Biology: {
    icon: Dna,
    bg: "bg-emerald-50",
    pill: "text-emerald-700 bg-emerald-100 border-emerald-200",
    ring: "ring-emerald-200",
    accent: "border-l-emerald-500",
  },
  Chemistry: {
    icon: FlaskConical,
    bg: "bg-amber-50",
    pill: "text-amber-700 bg-amber-100 border-amber-200",
    ring: "ring-amber-200",
    accent: "border-l-amber-500",
  },
  Physics: {
    icon: Atom,
    bg: "bg-indigo-50",
    pill: "text-indigo-700 bg-indigo-100 border-indigo-200",
    ring: "ring-indigo-200",
    accent: "border-l-indigo-500",
  },
};

// Simple JWT decoder without external library
function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Token decode failed:", e);
    return null;
  }
}

// Simple toast system
function showToast(message, type = "success") {
  // In a real app, you'd implement a proper toast system
  console.log(`${type.toUpperCase()}: ${message}`);
  if (window.alert) {
    window.alert(message);
  }
}

function useStudentAuth() {
  const [auth, setAuth] = useState({ id: null, token: null });
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const keys = ["authToken"];
      let token = null;
      for (const k of keys) {
        const v = localStorage.getItem(k);
        if (v) {
          token = v;
          break;
        }
      }
      if (!token) return;
      const payload = decodeJWT(token);
      if (payload && payload.id) {
        setAuth({ id: payload.id, token });
      }
    } catch (e) {
      console.error("Token decode failed:", e);
    }
  }, []);
  return auth;
}

function SectionHeader({ icon: Icon, title, subtitle, className = "" }) {
  return (
    <div className={`flex items-start gap-3 mb-4 ${className}`}>
      <div className="shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value, className = "" }) {
  return (
    <div
      className={`w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-gray-800 to-gray-900 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// Transform API response to match component's expected structure
function transformApiData(candidate) {
  // If data is already in expected format, return as is
  if (typeof candidate.summary === "string") {
    return candidate;
  }

  // Transform summary object to string
  const summaryString = `Overall performance: ${
    candidate.summary.overall_last5
  }. Subjects: ${candidate.summary.subjects
    .map((s) => `${s.name}: ${s.score} (last 5: ${s.last5})`)
    .join(
      ", "
    )}. Primary weak subjects: ${candidate.summary.primary_weak_subjects.join(
    ", "
  )}.`;

  // Transform focus array to object
  const focusObject = {};
  candidate.focus.forEach((item) => {
    const chaptersText = item.chapters
      .map((ch) => `${ch.name} (${ch.why})`)
      .join(", ");
    focusObject[item.subject] = chaptersText;
  });

  // Transform plan to phases
  const planObject = {
    "Phase 1": {
      duration: "1 week",
      description:
        "Focus on the next 7 days plan. Complete daily learning and quiz blocks to improve your understanding.",
    },
    "Phase 2": {
      duration: "Until ready",
      description:
        "Achieve the test readiness targets: " +
        candidate.plan.test_readiness_rules
          .map((rule) => `${rule.metric} ${rule.op} ${rule.value}`)
          .join(", "),
    },
  };

  // Transform tasks to weeks structure
  const tasksObject = {
    week1: candidate.tasks.map((task) => ({
      subject: task.subject,
      chapter: task.chapters.join(", "),
      task: `Complete ${task.type} for ${task.chapters.join(", ")}. Target: ${
        task.target_percent
      }% after ${task.attempts_required} attempts. Status: ${task.status}.`,
    })),
  };

  // Transform coach notes to string
  const coachNotes = candidate.tone_coach_notes.join(". ");

  return {
    summary: summaryString,
    tone_coach_notes: coachNotes,
    focus: focusObject,
    plan: planObject,
    tasks: tasksObject,
  };
}

export default function AiCoachPlan() {
  const { id: studentId, token } = useStudentAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState(null);
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3085/api";
  const storageKey = useMemo(
    () => (studentId ? `ai_plan_progress_${studentId}` : null),
    [studentId]
  );
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {}
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (e) {}
  }, [progress, storageKey]);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!studentId) return;
      setLoading(true);
      setError("");
      try {
        const url = `${API_BASE}/coach/ai/coach/plan?studentId=${studentId}`;
        const response = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const payload = await response.json();
        if (!payload) throw new Error("Empty AI plan response");
        let candidate = null;
        if (payload.ai_plan !== undefined) {
          if (typeof payload.ai_plan === "string" && payload.ai_plan.trim()) {
            try {
              candidate = JSON.parse(payload.ai_plan);
            } catch (e) {
              console.error("Failed to parse ai_plan string:", e);
            }
          } else if (payload.ai_plan && typeof payload.ai_plan === "object") {
            candidate = payload.ai_plan;
          }
        }
        if (!candidate && payload.data?.ai_plan !== undefined) {
          const ap = payload.data.ai_plan;
          if (typeof ap === "string" && ap.trim()) {
            try {
              candidate = JSON.parse(ap);
            } catch (e) {
              console.error("Failed to parse data.ai_plan string:", e);
            }
          } else if (ap && typeof ap === "object") {
            candidate = ap;
          }
        }
        if (!candidate && (payload.data?.summary || payload.data?.tasks)) {
          candidate = payload.data;
        }
        if (!candidate && (payload.summary || payload.tasks)) {
          candidate = payload;
        }
        if (!candidate) throw new Error("AI plan not found in API response");

        // Transform the data to match expected structure
        const transformedCandidate = transformApiData(candidate);
        setPlan(transformedCandidate);
        console.log("Transformed AI Coach Plan:", transformedCandidate);
      } catch (err) {
        console.error(err);
        setError(err?.message || "Failed to load AI plan");
        showToast("Failed to load AI Plan", "error");
      } finally {
        setLoading(false);
      }
    };

    // Demo data for testing
    // if (!studentId) {
    //   setPlan(candidate)
    //   setLoading(false);
    //   return;
    // }
    fetchPlan();
  }, [studentId, token, API_BASE]);

  const weeks = useMemo(() => {
    if (!plan?.tasks) return [];
    return Object.entries(plan.tasks)
      .map(([weekKey, items]) => ({
        index: Number(String(weekKey).replace(/\D/g, "")) || 0,
        weekKey,
        items: Array.isArray(items) ? items : [],
      }))
      .sort((a, b) => a.index - b.index);
  }, [plan]);

  const percentComplete = useMemo(() => {
    if (!weeks.length) return 0;
    const total = weeks.reduce((acc, w) => acc + w.items.length, 0);
    if (!total) return 0;
    const done = weeks.reduce((acc, w) => {
      const doneSet = progress[w.weekKey] || {};
      return acc + Object.values(doneSet).filter(Boolean).length;
    }, 0);
    return (done / total) * 100;
  }, [weeks, progress]);

  function toggleTask(weekKey, idx) {
    setProgress((prev) => {
      const w = prev[weekKey] ? { ...prev[weekKey] } : {};
      w[idx] = !w[idx];
      return { ...prev, [weekKey]: w };
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm">
        <NavBar></NavBar>
      </div>
      <Sidebar />
      <ToggleBar />
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-5 lg:px-8 py-6 sm:py-8">
          {/* Enhanced Page Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    AI Coach Plan
                  </h1>
                </div>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
                  {studentId ? (
                    <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span>📚 Personalized study roadmap for</span>
                      <Pill className="bg-blue-100 text-blue-700 border-blue-200 w-fit">
                        Student ID: {studentId}
                      </Pill>
                    </span>
                  ) : (
                    "🔄 Demo mode - showing sample AI plan"
                  )}
                </p>
              </div>

              {/* Enhanced Progress Section */}
              <div className="w-full lg:w-80">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Overall Progress
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {Math.round(percentComplete)}%
                    </span>
                  </div>
                  <ProgressBar value={percentComplete} />
                  <p className="text-xs text-gray-600 mt-2">
                    Keep going! You're making great progress 🎯
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Loading State */}
          {loading && (
            <div className="flex items-center gap-3 text-gray-700 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-sm font-medium">
                Fetching your personalized AI plan…
              </span>
            </div>
          )}
          {/* Error State */}
          {!loading && error && (
            <div className="flex items-start gap-3 text-red-700 bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
              <AlertTriangle className="w-6 h-6 mt-0.5 text-red-600" />
              <div className="space-y-1">
                <p className="font-semibold">Unable to load your plan</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}
          {!loading && !error && plan && (
            <div className="space-y-8">
              {/* Enhanced Summary Section */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                  <SectionHeader
                    icon={Brain}
                    title="📝 Study Summary"
                    subtitle="AI-generated insights based on your current performance"
                  />
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 leading-relaxed text-base font-medium">
                        {plan.summary}
                      </p>
                    </div>
                    {plan.tone_coach_notes && (
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <div className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">
                              Coach Notes
                            </h4>
                            <p className="text-sm text-blue-700">
                              {plan.tone_coach_notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              {/* Enhanced Subject Focus */}
              {plan.focus && (
                <section className="space-y-6">
                  <SectionHeader
                    icon={Target}
                    title="🎯 Subject Focus Areas"
                    subtitle="Priority topics to concentrate on for maximum improvement"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(plan.focus).map(([subject, text]) => {
                      const meta = SUBJECT_META[subject] || {
                        icon: ClipboardList,
                        bg: "bg-gray-50",
                        pill: "text-gray-700 bg-gray-100 border-gray-200",
                        ring: "ring-gray-200",
                        accent: "border-l-gray-500",
                      };
                      const Icon = meta.icon;
                      return (
                        <div
                          key={subject}
                          className={`bg-white rounded-2xl border border-gray-200 ${meta.bg} shadow-sm hover:shadow-md transition-shadow duration-200`}
                        >
                          <div className={`h-1 ${meta.accent} rounded-t-2xl`} />
                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200">
                                <Icon className="w-5 h-5 text-gray-800" />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h3 className="font-bold text-gray-900 text-lg">
                                  {subject}
                                </h3>
                                <Pill className={meta.pill}>High Priority</Pill>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {(() => {
                                // Extract chapter names from parentheses
                                const chapterRegex = /\(([^)]+)\)/g;
                                const chapters = [];
                                let match;
                                while (
                                  (match = chapterRegex.exec(text)) !== null
                                ) {
                                  chapters.push(match[1]);
                                }

                                // Get text without parentheses for description
                                const description =
                                  typeof text === "string"
                                    ? text
                                        .replace(/\([^)]+\)/g, "")
                                        .replace(/\s+/g, " ")
                                        .trim()
                                    : "";

                                return (
                                  <>
                                    {chapters.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold text-gray-800 text-sm mb-2">
                                          Key Chapters:
                                        </h4>
                                        <ul className="space-y-1">
                                          {chapters.map((chapter, idx) => (
                                            <li
                                              key={idx}
                                              className="text-sm leading-relaxed flex items-start gap-2"
                                            >
                                              <span className="text-gray-400 mt-1">
                                                •
                                              </span>
                                              <span className="font-bold text-gray-900">
                                                {chapter}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {description && (
                                      <div>
                                        <h4 className="font-semibold text-gray-800 text-sm mb-2">
                                          Focus Description:
                                        </h4>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                          {description}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
              {/* Enhanced Phased Plan */}
              {plan.plan && (
                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <SectionHeader
                      icon={CalendarClock}
                      title="📅 Phased Study Roadmap"
                      subtitle="Step-by-step timeline designed for your success"
                    />
                    <div className="space-y-4">
                      {Object.entries(plan.plan).map(
                        ([phaseKey, info], idx) => (
                          <div
                            key={phaseKey}
                            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex gap-4">
                              <div className="shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white flex items-center justify-center font-bold shadow-lg">
                                  {idx + 1}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                  <h4 className="font-bold text-gray-900 text-lg capitalize">
                                    {phaseKey}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                    <Pill className="bg-white text-gray-700 border-gray-300">
                                      {info?.duration || "—"}
                                    </Pill>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h5 className="font-semibold text-gray-800 text-sm">
                                    Phase Overview:
                                  </h5>
                                  <ul className="space-y-1">
                                    {info?.description
                                      ?.split(".")
                                      .filter((item) => item.trim())
                                      .map((point, idx) => (
                                        <li
                                          key={idx}
                                          className="text-sm text-gray-700 leading-relaxed flex items-start gap-2"
                                        >
                                          <span className="text-gray-400 mt-1">
                                            •
                                          </span>
                                          <span>{point.trim()}</span>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </section>
              )}
              {/* Enhanced Weekly Tasks */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                  <SectionHeader
                    icon={ListChecks}
                    title="📋 Weekly Task Breakdown"
                    subtitle="Interactive checklist to track your daily progress"
                  />
                  <div className="space-y-4">
                    {weeks.map((w) => {
                      const completedTasks = progress[w.weekKey]
                        ? Object.values(progress[w.weekKey]).filter(Boolean)
                            .length
                        : 0;
                      const totalTasks = w.items.length;
                      const weekProgress = totalTasks
                        ? (completedTasks / totalTasks) * 100
                        : 0;

                      return (
                        <details
                          key={w.weekKey}
                          className="group bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                          <summary className="list-none cursor-pointer p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white text-lg font-bold flex items-center justify-center shadow-lg">
                                  {w.index}
                                </div>
                                <div className="space-y-1">
                                  <h3 className="font-bold text-gray-900 text-lg capitalize">
                                    {w.weekKey.replace(
                                      /(week)(\d+)/i,
                                      "Week $2"
                                    )}
                                  </h3>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">
                                      {completedTasks} / {totalTasks} completed
                                    </span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-green-500 transition-all duration-300"
                                        style={{ width: `${weekProgress}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ChevronDown className="w-6 h-6 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
                            </div>
                          </summary>

                          <div className="px-4 sm:px-6 pb-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Tasks for this week:
                              </h4>
                              <ul className="space-y-3">
                                {w.items.map((t, idx) => {
                                  const done = !!progress[w.weekKey]?.[idx];
                                  const meta = SUBJECT_META[t.subject] || {
                                    pill: "bg-gray-100 text-gray-700 border-gray-200",
                                    accent: "border-l-gray-400",
                                  };

                                  return (
                                    <li
                                      key={idx}
                                      className={`flex items-start gap-4 p-4 rounded-xl border-l-4 transition-all duration-200 ${
                                        done
                                          ? "bg-green-50 border-green-500 border border-green-200"
                                          : `bg-gray-50 ${meta.accent} border border-gray-200 hover:shadow-sm`
                                      }`}
                                    >
                                      <button
                                        onClick={() =>
                                          toggleTask(w.weekKey, idx)
                                        }
                                        className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                          done
                                            ? "border-green-500 bg-green-500 text-white shadow-lg"
                                            : "border-gray-300 bg-white hover:border-gray-400"
                                        }`}
                                        aria-label={
                                          done
                                            ? "Mark as not done"
                                            : "Mark as done"
                                        }
                                      >
                                        {done && (
                                          <CheckCircle2 className="w-4 h-4" />
                                        )}
                                      </button>

                                      <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <Pill className={meta.pill}>
                                            {t.subject}
                                          </Pill>
                                          <span className="font-bold text-gray-900 text-base">
                                            {t.chapter}
                                          </span>
                                        </div>
                                        <div className="space-y-1">
                                          <h5 className="font-semibold text-gray-800 text-sm">
                                            Task Details:
                                          </h5>
                                          <ul className="space-y-1">
                                            {t.task
                                              .split(".")
                                              .filter((item) => item.trim())
                                              .map((point, pointIdx) => (
                                                <li
                                                  key={pointIdx}
                                                  className="text-sm text-gray-700 leading-relaxed flex items-start gap-2"
                                                >
                                                  <span className="text-gray-400 mt-1">
                                                    •
                                                  </span>
                                                  <span>{point.trim()}</span>
                                                </li>
                                              ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </details>
                      );
                    })}
                    {!weeks.length && (
                      <div className="text-center py-12 text-gray-600">
                        <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium">
                          No weekly tasks found
                        </p>
                        <p className="text-sm">
                          Tasks will appear here once your AI plan is generated.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              {/* Enhanced Footer Actions */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Quick Actions
                    </h3>
                    <p className="text-sm text-gray-600 max-w-2xl">
                      💡 <strong>Pro tip:</strong> Click each week to expand
                      tasks and check off items as you complete them. Your
                      progress is automatically saved!
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        if (!weeks.length) return;
                        setProgress({});
                        showToast("Progress reset for all weeks", "success");
                      }}
                      className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Progress
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Print Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

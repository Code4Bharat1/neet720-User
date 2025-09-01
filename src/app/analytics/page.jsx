"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  AlertCircle,
  Calendar,
  Target,
  Brain,
  Clock,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trophy,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/dashboard");
  };

  // Mock data based on your backend response structure
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Replace with your actual API call
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/analytics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Using your provided backend response structure
        const mockData = {
          message: "User test analytics retrieved successfully",
          summary: {
            totalTests: 30,
            averageScore: 8.24,
            highestScore: 38.46,
            lowestScore: 0,
            improvementRate: -100,
          },
          subjectPerformance: {
            Physics: {
              totalQuestions: 82,
              correctAnswers: 0,
              testsCount: 10,
              averageAccuracy: "0.00",
            },
            Chemistry: {
              totalQuestions: 0,
              correctAnswers: 0,
              testsCount: 0,
              averageAccuracy: 0,
            },
            Biology: {
              totalQuestions: 0,
              correctAnswers: 0,
              testsCount: 0,
              averageAccuracy: 0,
            },
          },
          improvementAreas: {
            weakSubjects: [
              { subject: "Physics", accuracy: 0, testsCount: 10 },
              { subject: "Chemistry", accuracy: 0, testsCount: 0 },
              { subject: "Biology", accuracy: 0, testsCount: 0 },
            ],
            recommendations: [
              "Focus on fundamental concepts as overall performance needs improvement",
              "Strengthen Physics fundamentals (current accuracy: 0%)",
              "Strengthen Chemistry fundamentals (current accuracy: 0%)",
              "Strengthen Biology fundamentals (current accuracy: 0%)",
            ],
            overallAccuracy: 0,
          },
          progressTrends: {
            trend: "stable",
            monthlyTrends: [
              {
                month: "2025-8",
                averageScore: 8.235000000000001,
                testCount: 30,
              },
            ],
            message: "Your performance is stable, keep practicing to improve",
          },
          detailedSubjectAnalytics: {
            subjects: {
              Physics: {
                totalQuestions: 82,
                correctAnswers: 0,
                averageAccuracy: "0.00",
                testCount: 10,
                topicPerformance: {
                  General: {
                    total: 40,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  "The international system of units": {
                    total: 6,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  "Specific Heat Capicity": {
                    total: 2,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  LED: {
                    total: 2,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  "Simple Harmonic motion and Uniform circular motion": {
                    total: 4,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                },
                unitPerformance: {
                  General: {
                    total: 40,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  "Unit and measurement": {
                    total: 17,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  "Thermal Properties of Matter": {
                    total: 2,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                  "Semiconductor Electronics": {
                    total: 2,
                    correct: 0,
                    percentage: "0.00",
                    mastery: "Needs Improvement",
                  },
                },
                improvementRate: -5,
                difficultyDistribution: {
                  easy: { total: 0, correct: 0, percentage: 0 },
                  medium: { total: 82, correct: 0, percentage: "0.00" },
                  hard: { total: 0, correct: 0, percentage: 0 },
                },
                timeSpent: 0,
                averageTimePerQuestion: "0.00",
                topicMastery: {
                  Mastered: 0,
                  Proficient: 0,
                  Developing: 0,
                  "Needs Improvement": 16,
                },
                unitMastery: {
                  Mastered: 0,
                  Proficient: 0,
                  Developing: 0,
                  "Needs Improvement": 10,
                },
              },
              Chemistry: {
                totalQuestions: 0,
                correctAnswers: 0,
                averageAccuracy: 0,
                testCount: 0,
                topicPerformance: {},
                unitPerformance: {},
                topicMastery: {
                  Mastered: 0,
                  Proficient: 0,
                  Developing: 0,
                  "Needs Improvement": 0,
                },
                unitMastery: {
                  Mastered: 0,
                  Proficient: 0,
                  Developing: 0,
                  "Needs Improvement": 0,
                },
                difficultyDistribution: {
                  easy: { total: 0, correct: 0, percentage: 0 },
                  medium: { total: 0, correct: 0, percentage: 0 },
                  hard: { total: 0, correct: 0, percentage: 0 },
                },
              },
              Biology: {
                totalQuestions: 0,
                correctAnswers: 0,
                averageAccuracy: 0,
                testCount: 0,
                topicPerformance: {},
                unitPerformance: {},
                topicMastery: {
                  Mastered: 0,
                  Proficient: 0,
                  Developing: 0,
                  "Needs Improvement": 0,
                },
                unitMastery: {
                  Mastered: 0,
                  Proficient: 0,
                  Developing: 0,
                  "Needs Improvement": 0,
                },
                difficultyDistribution: {
                  easy: { total: 0, correct: 0, percentage: 0 },
                  medium: { total: 0, correct: 0, percentage: 0 },
                  hard: { total: 0, correct: 0, percentage: 0 },
                },
              },
            },
            recommendations: [
              {
                subject: "Physics",
                priority: "high",
                message:
                  "Focus on fundamental Physics concepts. Start with basic principles before moving to complex problems.",
                topics: ["Significant Figures", "Electric Field"],
                units: ["General", "Unit and measurement"],
              },
              {
                subject: "Chemistry",
                priority: "high",
                message:
                  "Strengthen Chemistry basics. Focus on understanding periodic table trends and chemical reactions.",
                topics: [],
                units: [],
              },
            ],
          },
          recentTests: [
            {
              id: 157,
              type: "fulltest",
              date: "2025-08-28T09:34:11.000Z",
              score: 0,
            },
            {
              id: 87,
              type: "meTest",
              date: "2025-08-28T09:46:30.000Z",
              score: 0,
            },
            {
              id: 88,
              type: "meTest",
              date: "2025-08-28T09:51:58.000Z",
              score: 0,
            },
            {
              id: 89,
              type: "meTest",
              date: "2025-08-28T09:52:11.000Z",
              score: 0,
            },
            {
              id: 54,
              type: "generate",
              date: "2025-08-28T09:53:54.000Z",
              score: 0,
            },
          ],
        };
        console.log(response.data);
        setTimeout(() => {
          setAnalyticsData(response.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch analytics data");
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  //       <div className="bg-white p-8 rounded-lg shadow-lg text-center">
  //         <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
  //         <p className="text-red-600">{error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  const {
    summary,
    subjectPerformance,
    improvementAreas,
    progressTrends,
    recentTests,
    detailedSubjectAnalytics,
  } = analyticsData;

  // Get mastery level color
  const getMasteryColor = (mastery) => {
    switch (mastery) {
      case "Mastered":
        return "text-green-600 bg-green-100";
      case "Proficient":
        return "text-blue-600 bg-blue-100";
      case "Developing":
        return "text-yellow-600 bg-yellow-100";
      case "Needs Improvement":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  // Prepare chart data
  const subjectData = Object.entries(subjectPerformance).map(
    ([subject, data]) => ({
      subject,
      accuracy: parseFloat(data.averageAccuracy) || 0,
      testsCount: data.testsCount,
      totalQuestions: data.totalQuestions,
      correctAnswers: data.correctAnswers,
    })
  );

  // Mastery distribution data for selected subject
  const selectedSubjectData =
    detailedSubjectAnalytics.subjects[selectedSubject];
  const masteryData = selectedSubjectData
    ? Object.entries(selectedSubjectData.topicMastery).map(
        ([level, count]) => ({
          name: level,
          value: count,
          color:
            level === "Mastered"
              ? "#10B981"
              : level === "Proficient"
              ? "#3B82F6"
              : level === "Developing"
              ? "#F59E0B"
              : "#EF4444",
        })
      )
    : [];

  // Difficulty distribution for selected subject
  const difficultyData = selectedSubjectData
    ? Object.entries(selectedSubjectData.difficultyDistribution).map(
        ([level, data]) => ({
          name: level.charAt(0).toUpperCase() + level.slice(1),
          total: data.total,
          correct: data.correct,
          percentage: parseFloat(data.percentage) || 0,
        })
      )
    : [];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="text-blue-600 mb-4 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Enhanced Test Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Comprehensive analysis of your performance across Biology,
            Chemistry, and Physics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-3xl font-bold text-gray-900">
                  {summary.totalTests}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Score
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {summary.averageScore.toFixed(1)}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Highest Score
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {summary.highestScore}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Overall Accuracy
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {improvementAreas.overallAccuracy}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(detailedSubjectAnalytics.subjects).map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedSubject === subject
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Subject Analytics */}
        {selectedSubjectData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Mastery Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Topic Mastery - {selectedSubject}
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={masteryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {masteryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {masteryData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Difficulty Analysis
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={difficultyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#E5E7EB" name="Total" />
                  <Bar dataKey="correct" fill="#10B981" name="Correct" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Subject Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedSubject} Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Total Questions</span>
                  <span className="font-bold text-blue-600">
                    {selectedSubjectData.totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Correct Answers</span>
                  <span className="font-bold text-green-600">
                    {selectedSubjectData.correctAnswers}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Test Count</span>
                  <span className="font-bold text-purple-600">
                    {selectedSubjectData.testCount}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700">Accuracy</span>
                  <span className="font-bold text-yellow-600">
                    {selectedSubjectData.averageAccuracy}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Topic and Unit Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Topic Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Topic Performance - {selectedSubject}
            </h3>
            <div className="max-h-80 overflow-y-auto space-y-3">
              {selectedSubjectData &&
                Object.entries(selectedSubjectData.topicPerformance).map(
                  ([topic, data]) => (
                    <div
                      key={topic}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {topic}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getMasteryColor(
                            data.mastery
                          )}`}
                        >
                          {data.mastery}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-2">
                        <div>Total: {data.total}</div>
                        <div>Correct: {data.correct}</div>
                        <div>Score: {data.percentage}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(
                              1,
                              parseFloat(data.percentage)
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>

          {/* Unit Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Unit Performance - {selectedSubject}
            </h3>
            <div className="max-h-80 overflow-y-auto space-y-3">
              {selectedSubjectData &&
                Object.entries(selectedSubjectData.unitPerformance).map(
                  ([unit, data]) => (
                    <div
                      key={unit}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {unit}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getMasteryColor(
                            data.mastery
                          )}`}
                        >
                          {data.mastery}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-2">
                        <div>Total: {data.total}</div>
                        <div>Correct: {data.correct}</div>
                        <div>Score: {data.percentage}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(
                              1,
                              parseFloat(data.percentage)
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>

        {/* Detailed Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Priority Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Priority Recommendations
            </h3>
            <div className="space-y-4">
              {detailedSubjectAnalytics.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getPriorityColor(
                    rec.priority
                  )}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{rec.subject}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getPriorityColor(
                        rec.priority
                      )}`}
                    >
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm mb-3">{rec.message}</p>

                  {rec.topics.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        Focus Topics:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {rec.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {rec.units.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        Focus Units:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {rec.units.map((unit, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs"
                          >
                            {unit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Progress Overview
            </h3>

            {/* Progress Status */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-blue-900">
                  Current Status
                </span>
              </div>
              <p className="text-blue-800">{progressTrends.message}</p>
            </div>

            {/* Subject Comparison */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">
                Subject Comparison
              </h4>
              {Object.entries(subjectPerformance).map(([subject, data]) => (
                <div
                  key={subject}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        subject === "Physics"
                          ? "bg-blue-500"
                          : subject === "Chemistry"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                    <span className="font-medium">{subject}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      {parseFloat(data.averageAccuracy) || 0}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {data.testsCount} tests
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Test History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-gray-600 font-medium">Test ID</th>
                  <th className="pb-3 text-gray-600 font-medium">Type</th>
                  <th className="pb-3 text-gray-600 font-medium">Date</th>
                  <th className="pb-3 text-gray-600 font-medium">Score</th>
                  <th className="pb-3 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTests.map((test) => (
                  <tr
                    key={test.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-3 font-medium">#{test.id}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          test.type === "fulltest"
                            ? "bg-green-100 text-green-800"
                            : test.type === "meTest"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {test.type}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">
                      {new Date(test.date).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-gray-900">
                        {test.score}
                      </span>
                    </td>
                    <td className="py-3">
                      {test.score > 50 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : test.score > 0 ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaChevronRight,
  FaSpinner,
  FaExclamationCircle,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaTimes
} from "react-icons/fa";
import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CHART_COLORS = {
  correct: "#10b981",
  incorrect: "#ef4444",
  unattempted: "#94a3b8"
};

const ITEMS_PER_PAGE = 9;

const PastTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [showScoreFilter, setShowScoreFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [testTypeFilter, setTestTypeFilter] = useState("all");

  // Refs for detecting clicks outside
  const scoreFilterRef = useRef(null);
  const typeFilterRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (scoreFilterRef.current && !scoreFilterRef.current.contains(event.target)) {
        setShowScoreFilter(false);
      }
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target)) {
        setShowTypeFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPastTests = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/test/pasttest`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        const fullTest = response.data.fullTests.map(test => ({ ...test, type: "fullTest" }));
        const meTest = response.data.meTests.map(test => ({ ...test, type: "meTest" }));
        const generatedTest = response.data.generatedTests.map(test => ({ ...test, type: 'generatedTest' }));

        const allTests = [
          ...fullTest,
          ...meTest,
          ...generatedTest,
        ];

        allTests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTestResults(allTests);
      } catch (err) {
        setError("Failed to fetch past test results");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPastTests();
  }, []);

  const calculateScore = (test) => {
    const hasMainData = test.correct !== undefined && test.incorrect !== undefined && test.unattempted !== undefined;
    const hasAltData = test.correctAnswersCount !== undefined && test.wrongAnswersCount !== undefined && test.notAttemptedCount !== undefined;

    let correctValue, totalQuestions;

    if (hasMainData) {
      correctValue = test.correct;
      totalQuestions = test.correct + test.incorrect + test.unattempted;
    } else if (hasAltData) {
      correctValue = test.correctAnswersCount;
      totalQuestions = test.correctAnswersCount + test.wrongAnswersCount + test.notAttemptedCount;
    } else {
      return 0;
    }

    return totalQuestions > 0 ? Math.round((correctValue / totalQuestions) * 100) : 0;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  const filteredResults = testResults.filter((test) => {
    const matchesSearch = searchQuery === "" ||
      (test.testName && test.testName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (test.testId && test.testId.toString().toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesScoreFilter = (() => {
      const score = calculateScore(test);
      if (filterOption === "best") return score >= 80;
      if (filterOption === "lowest") return score < 50;
      return true;
    })();

    const matchesType = testTypeFilter === "all" || test.type === testTypeFilter;

    return matchesSearch && matchesScoreFilter && matchesType;
  });

  const sortedResults = [...filteredResults];

  const totalPages = Math.ceil(sortedResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResults = sortedResults.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterOption, testTypeFilter]);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border-2 border-teal-200">
          <p className="text-sm font-medium text-gray-700">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-teal-600">
        <FaSpinner className="animate-spin text-3xl mb-4" />
        <p className="text-lg">Loading past tests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <FaExclamationCircle className="text-3xl mb-4" />
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 p-4 md:p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Your Past Tests
          </h1>
          <p className="text-gray-600">Review your performance and track your progress</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
            <input
              type="text"
              placeholder="Search by test name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-600"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Score Filter Button */}
          <div className="relative" ref={scoreFilterRef}>
            <button
              onClick={() => {
                setShowScoreFilter(prev => !prev);
                setShowTypeFilter(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors shadow-sm"
            >
              <FaFilter className="text-teal-500" />
              <span className="text-gray-700 font-medium">
                {filterOption === "all" ? "All Tests" :
                  filterOption === "best" ? "Best Performance" :
                    "Lowest Performance"}
              </span>
            </button>

            {/* Score Filter Dropdown */}
            {showScoreFilter && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border-2 border-teal-200 py-2 z-50 w-56">
                <button
                  onClick={() => {
                    setFilterOption("all");
                    setShowScoreFilter(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-teal-50 transition-colors ${filterOption === "all" ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-700"
                    }`}
                >
                  All Tests
                </button>
                <button
                  onClick={() => {
                    setFilterOption("best");
                    setShowScoreFilter(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-teal-50 transition-colors ${filterOption === "best" ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-700"
                    }`}
                >
                  Best Performance (80%+)
                </button>
                <button
                  onClick={() => {
                    setFilterOption("lowest");
                    setShowScoreFilter(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-teal-50 transition-colors ${filterOption === "lowest" ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-700"
                    }`}
                >
                  Lowest Performance (&lt;50%)
                </button>
              </div>
            )}
          </div>

          {/* Type Filter Button */}
          <div className="relative" ref={typeFilterRef}>
            <button
              onClick={() => {
                setShowTypeFilter(prev => !prev);
                setShowScoreFilter(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors shadow-sm"
            >
              <FaFilter className="text-teal-500" />
              <span className="text-gray-700 font-medium">
                {testTypeFilter === "all"
                  ? "All Test Types"
                  : testTypeFilter === "fullTest"
                    ? "Full Tests"
                    : testTypeFilter === "meTest"
                      ? "Me Tests"
                      : "Generated Tests"}
              </span>
            </button>

            {/* Test Type Filter Dropdown */}
            {showTypeFilter && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border-2 border-teal-200 py-2 z-50 w-56">
                {["all", "fullTest", "meTest", "generatedTest"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTestTypeFilter(type);
                      setShowTypeFilter(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left hover:bg-teal-50 transition-colors ${testTypeFilter === type ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-700"
                      }`}
                  >
                    {type === "all"
                      ? "All Test Types"
                      : type === "fullTest"
                        ? "Full Tests"
                        : type === "meTest"
                          ? "Me Tests"
                          : "Generated Tests"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="text-center mt-4 text-sm text-teal-700 font-medium">
          Showing {startIndex + 1}-{Math.min(endIndex, sortedResults.length)} of {sortedResults.length} tests
        </div>
      </motion.div>

      {/* Test Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {paginatedResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border-2 border-teal-200">
              <p className="text-gray-500 text-lg">
                {searchQuery || filterOption !== "all" || testTypeFilter !== "all"
                  ? "No tests match your search criteria."
                  : "No past tests found."}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {searchQuery || filterOption !== "all" || testTypeFilter !== "all"
                  ? "Try adjusting your search or filter options."
                  : "Your completed tests will appear here."}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedResults.map((test, index) => {
              const hasMainData = test.correct !== undefined && test.incorrect !== undefined && test.unattempted !== undefined;
              const hasAltData = test.correctAnswersCount !== undefined && test.wrongAnswersCount !== undefined && test.notAttemptedCount !== undefined;

              let correctValue, incorrectValue, unattemptedValue, totalQuestions;

              if (hasMainData) {
                correctValue = test.correct;
                incorrectValue = test.incorrect;
                unattemptedValue = test.unattempted;
                totalQuestions = test.correct + test.incorrect + test.unattempted;
              } else if (hasAltData) {
                correctValue = test.correctAnswersCount;
                incorrectValue = test.wrongAnswersCount;
                unattemptedValue = test.notAttemptedCount;
                totalQuestions = test.correctAnswersCount + test.wrongAnswersCount + test.notAttemptedCount;
              } else {
                correctValue = 0;
                incorrectValue = 0;
                unattemptedValue = 0;
                totalQuestions = 0;
              }

              const chartData = [
                { name: "Correct", value: correctValue, color: CHART_COLORS.correct },
                { name: "Incorrect", value: incorrectValue, color: CHART_COLORS.incorrect },
                { name: "Unattempted", value: unattemptedValue, color: CHART_COLORS.unattempted },
              ];

              const scorePercentage = calculateScore(test);

              return (
                <motion.div
                  key={`${test.testId}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden border-2 border-teal-100">
                    {/* Card Header */}
                    <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold mb-1 flex flex-col">
                            <span>{test.testName || "Unnamed Test"}</span>
                            {test.createdAt && (
                              <span className="text-sm font-normal text-teal-100">
                                {formatDateTime(test.createdAt)}
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription className="text-cyan-100">
                            {test.subjects ? test.subjects.join(", ") : "No subjects"}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            {scorePercentage}%
                          </div>
                          <div className="text-xs text-cyan-100">Score</div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      {/* Test Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                          <label className="text-xs text-teal-600 uppercase tracking-wider block mb-1 font-semibold">
                            Test ID
                          </label>
                          <span className="text-sm font-medium text-gray-900">
                            {(index + 1) || "N/A"}
                          </span>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                          <label className="text-xs text-teal-600 uppercase tracking-wider block mb-1 font-semibold">
                            Difficulty
                          </label>
                          <span className="text-sm font-medium text-gray-900">
                            {test.difficultyLevel || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Analytics Section */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Performance Stats */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-gray-600 mb-3">Performance</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                              <span className="text-sm text-emerald-800 font-medium">Correct</span>
                              <span className="font-semibold text-emerald-900">{correctValue}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                              <span className="text-sm text-red-800 font-medium">Incorrect</span>
                              <span className="font-semibold text-red-900">{incorrectValue}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                              <span className="text-sm text-gray-800 font-medium">Skipped</span>
                              <span className="font-semibold text-gray-900">{unattemptedValue}</span>
                            </div>
                          </div>
                        </div>

                        {/* Chart */}
                        <div className="flex items-center justify-center">
                          {totalQuestions > 0 ? (
                            <PieChart width={130} height={130}>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={55}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                <Label
                                  value={totalQuestions}
                                  position="center"
                                  className="text-lg font-bold fill-gray-900"
                                  dy={-8}
                                />
                                <Label
                                  value="Questions"
                                  position="center"
                                  className="text-xs fill-gray-500"
                                  dy={8}
                                />
                              </Pie>
                              <Tooltip content={customTooltip} />
                            </PieChart>
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm border-2 border-gray-200">
                              No data
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6">
                        <Link
                          href={`/review-test-mistake/${test.testType}/${test.testId}`}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Review Mistakes
                          <FaChevronRight className="text-xs" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center items-center gap-4"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-teal-700 hover:bg-teal-50 border-2 border-teal-200"
                }`}
            >
              <FaChevronLeft className="text-sm" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-semibold ${currentPage === page
                        ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-teal-50 border-2 border-teal-200"
                        }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="text-teal-400">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-teal-700 hover:bg-teal-50 border-2 border-teal-200"
                }`}
            >
              Next
              <FaChevronRight className="text-sm" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PastTest;
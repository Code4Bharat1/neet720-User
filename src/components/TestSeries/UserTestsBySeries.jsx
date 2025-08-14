"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function UserTestsBySeries() {
  const router = useRouter();
  const { seriesId } = useParams(); // get seriesId from URL
  const [tests, setTests] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!seriesId) return;

    const fetchTests = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/test-series/test-series-test/${seriesId}/tests`
        );
        if (res.data.success) {
          setTests(res.data.data);
          setSeriesDetails(res.data.seriesDetails || null);
        } else {
          setError(res.data.message || "Failed to load tests.");
        }
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError("Error fetching tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [seriesId]);

  const getTestStatus = (test) => {
    const now = new Date();
    const openDate = test.openDate ? new Date(test.openDate) : null;
    const closeDate = test.closeDate ? new Date(test.closeDate) : null;

    if (openDate && now < openDate) return "upcoming";
    if (closeDate && now > closeDate) return "expired";
    return "available";
  };

  const getAvailableTestsCount = () => {
    return tests.filter((test) => getTestStatus(test) === "available").length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Header Skeleton */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-6 sm:h-8 bg-slate-200 rounded-lg w-48 sm:w-64 mb-2 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-slate-200 rounded w-64 sm:w-96 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Series Details Skeleton */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-6 sm:mb-8 animate-pulse">
            <div className="h-5 sm:h-6 bg-slate-200 rounded w-60 sm:w-80 mb-3"></div>
            <div className="h-3 sm:h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-3 sm:h-4 bg-slate-200 rounded w-2/3"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 animate-pulse"
              >
                <div className="h-5 sm:h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 sm:h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 sm:h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                <div className="h-2 sm:h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 sm:h-9 bg-slate-200 rounded-lg w-24 sm:w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6 sm:p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Error Loading Tests
          </h3>
          <p className="text-gray-600 text-center mb-4 text-sm sm:text-base">
            {error}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/test-series")}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => router.push("/test-series")}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                Test Series
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Choose and take tests from this series
              </p>
            </div>
          </div>
        </div>

        {/* Series Details Section */}
        {seriesDetails && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              {/* Icon Section */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="mb-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {seriesDetails.name}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-1">
                    {seriesDetails.description ||
                      "Explore and take tests from this comprehensive test series."}
                  </p>
                </div>

                {/* Test Stats */}
                <div className="flex flex-wrap gap-3 mt-2 text-sm">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    {getAvailableTestsCount()} Available
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    {tests.length} Total Tests
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tests Section Header */}
        {/* <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Available Tests
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Select any test below to start your assessment
          </p>
        </div> */}

        {/* Tests Content */}
        {tests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gray-100 rounded-full">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No Tests Available
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              This test series doesn't have any tests yet. Please check back
              later.
            </p>
            <button
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg font-medium text-sm sm:text-base"
              onClick={() => router.push("/test-series")}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Test Series
            </button>
          </div>
        ) : (
          <>
            {/* Stats Bar */}

            {/* Tests Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tests.map((test) => {
                const testStatus = getTestStatus(test);

                return (
                  <div
                    key={test.id}
                    className={`group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200 overflow-hidden ${
                      testStatus === "available"
                        ? "hover:border-green-200 cursor-pointer"
                        : testStatus === "upcoming"
                        ? "hover:border-yellow-200"
                        : "hover:border-red-200 opacity-75"
                    }`}
                    onClick={() =>
                      testStatus === "available" &&
                      router.push(`/test-series/test/${test.id}`)
                    }
                  >
                    {/* Card Header */}
                    <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            testStatus === "available"
                              ? "bg-gradient-to-br from-green-500 to-green-600"
                              : testStatus === "upcoming"
                              ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
                              : "bg-gradient-to-br from-red-400 to-red-500"
                          }`}
                        >
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h2.586a1 1 0 00.707-.293l.707-.707A1 1 0 0111.414 3h1.172a1 1 0 01.707.293l.707.707A1 1 0 0014.414 4H17a2 2 0 012 2v12a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            testStatus === "available"
                              ? "bg-green-100 text-green-800"
                              : testStatus === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {testStatus === "available" && "Available"}
                          {testStatus === "upcoming" && "Coming Soon"}
                          {testStatus === "expired" && "Expired"}
                        </div>
                      </div>

                      <h3
                        className={`text-base sm:text-lg font-semibold text-gray-900 mb-2 transition-colors line-clamp-2 ${
                          testStatus === "available"
                            ? "group-hover:text-green-600"
                            : ""
                        }`}
                      >
                        {test.testName}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          <span className="font-medium">Subject:</span>
                          <span className="truncate">
                            {test.subject || "General"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">Duration:</span>
                          <span>{test.durationMinutes} minutes</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-1 text-gray-500 mb-1">
                              <svg
                                className="w-3 h-3 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="truncate">Opens</span>
                            </div>
                            <p className="font-medium text-gray-900 text-xs">
                              {test.openDate
                                ? new Date(test.openDate).toLocaleDateString()
                                : "Available"}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-gray-500 mb-1">
                              <svg
                                className="w-3 h-3 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="truncate">Closes</span>
                            </div>
                            <p className="font-medium text-gray-900 text-xs">
                              {test.closeDate
                                ? new Date(test.closeDate).toLocaleDateString()
                                : "No limit"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 text-xs sm:text-sm ${
                          testStatus === "available"
                            ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-md"
                            : testStatus === "upcoming"
                            ? "bg-yellow-100 text-yellow-800 cursor-not-allowed"
                            : "bg-red-100 text-red-800 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (testStatus === "available") {
                            router.push(`/test-series/test/${test.id}`);
                          }
                        }}
                        disabled={testStatus !== "available"}
                      >
                        {testStatus === "available" && (
                          <>
                            <span className="truncate text-base">Start Test</span>
                          </>
                        )}
                        {testStatus === "upcoming" && (
                          <>
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="truncate">
                              Opens{" "}
                              {test.openDate
                                ? new Date(test.openDate).toLocaleDateString()
                                : "Soon"}
                            </span>
                          </>
                        )}
                        {testStatus === "expired" && (
                          <>
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 18.364"
                              />
                            </svg>
                            <span className="truncate">Expired</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom Motivational Section */}
        {tests.length > 0 && getAvailableTestsCount() > 0 && (
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center border border-green-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Ready to Test Your Skills?
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {getAvailableTestsCount()} test
              {getAvailableTestsCount() !== 1 ? "s are" : " is"} waiting for
              you. Challenge yourself and track your progress!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Progress Tracking
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

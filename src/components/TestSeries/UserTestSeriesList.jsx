"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function UserTestSeriesList() {
  const [testSeries, setTestSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { seriesId } = useParams();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE}/test-series`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setTestSeries(res.data.data);
        } else {
          setError(res.data.message || "Failed to load test series.");
        }
      } catch (err) {
        console.error("Error fetching test series:", err);
        setError("Error fetching test series.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-6 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded-lg w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded w-96 animate-pulse"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-100 animate-pulse"
              >
                <div className="h-6 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded w-2/3 mb-4"></div>
                <div className="h-3 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gradient-to-r from-teal-200/50 to-cyan-200/50 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-200 p-8 max-w-md mx-4">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl shadow-lg">
            <svg
              className="w-10 h-10 text-red-600"
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
          <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
            Error Loading Test Series
          </h3>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border-2 border-teal-200 text-teal-700 rounded-xl hover:bg-white hover:border-teal-300 hover:shadow-lg hover:shadow-teal-200/50 transition-all text-sm font-semibold"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Test Series
            </h1>
            <p className="text-gray-600 text-lg">
              Choose from our collection of test series and start practicing
            </p>
          </div>
        </div>

        {/* Content Section */}
        {testSeries.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-100 p-16 text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl shadow-lg">
              <svg
                className="w-12 h-12 text-teal-500"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Test Series Available
            </h3>
            <p className="text-gray-600 text-lg">
              Check back later for new test series
            </p>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-200 p-8 mb-10">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-teal-400/30">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Total Available</p>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      {testSeries.length} Test Series
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Series Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {testSeries.map((series) => (
                <div
                  key={series.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-200/50 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02]"
                  onClick={() => router.push(`/test-series/${series.id}`)}
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-400/30 group-hover:shadow-xl group-hover:shadow-teal-400/40 transition-all">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-teal-100 to-cyan-100 px-3 py-1.5 rounded-full border border-teal-200">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-teal-700 font-semibold">
                          Available
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {series.name}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {series.description ||
                        "Test your knowledge with this comprehensive series."}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                        <svg
                          className="w-4 h-4 text-teal-400"
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
                        Updated{" "}
                        {new Date(series.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <button
                      className="w-full px-4 py-3 text-base bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-xl hover:from-teal-500 hover:to-cyan-500 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-400/30 group-hover:shadow-xl group-hover:shadow-teal-400/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/test-series/${series.id}`);
                      }}
                    >
                      <span>Start Tests</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom CTA Section */}
        {testSeries.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-10 text-center border-2 border-teal-200 shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                Ready to Test Your Knowledge?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Choose any test series above and start your learning journey today.
              </p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow-md">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow-md">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Progress Tracking</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow-md">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Detailed Analytics</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
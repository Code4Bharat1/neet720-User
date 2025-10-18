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

  // Replace with your API base URL
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const res = await axios.get(`${API_BASE}/test-series`);
        if (res.data.success) {
          setTestSeries(res.data.data);
          console.log(res.data.data)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-slate-200 rounded-lg w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-96 animate-pulse"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse"
              >
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-9 bg-slate-200 rounded-lg w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md mx-4">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <svg
              className="w-8 h-8 text-red-600"
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
            Error Loading Test Series
          </h3>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          {/* Back button aligned to the left */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
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
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Title and Description centered */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Test Series
            </h1>
            <p className="text-gray-600">
              Choose from our collection of test series and start practicing
            </p>
          </div>
        </div>

        {/* Content Section */}
        {testSeries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full">
              <svg
                className="w-10 h-10 text-gray-400"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Test Series Available
            </h3>
            <p className="text-gray-500 mb-6">
              Check back later for new test series
            </p>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {testSeries.length} Available Test Series
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
                  className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200 overflow-hidden hover:border-green-200 cursor-pointer"
                  onClick={() => router.push(`/test-series/${series.id}`)}
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
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
                      <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-700 font-medium">
                          Available
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {series.name}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {series.description ||
                        "Test your knowledge with this comprehensive series."}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg
                          className="w-4 h-4"
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
                      className="w-full px-4 py-2.5 text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 group-hover:shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/test-series/${series.id}`);
                      }}
                    >
                      Start Tests
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom CTA Section */}
        {testSeries.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center border border-green-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Test Your Knowledge?
            </h3>
            <p className="text-gray-600 mb-4">
              Choose any test series above and start your learning journey
              today.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant Results
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-blue-500"
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
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Detailed Analytics
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  Award,
  FileText,
  Play,
  BarChart3,
  Activity,
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [testStats, setTestStats] = useState(null);
  const [pendingTests, setPendingTests] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        // Decode token to get student ID
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id || decodedToken.studentId;
        setStudentId(userId);

        // Fetch test count statistics
        const statsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/testcount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch test statistics");
        }

        const statsData = await statsResponse.json();
        setTestStats(statsData);

        // Fetch pending tests for the student
        const pendingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/${userId}/pending-tests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!pendingResponse.ok) {
          throw new Error("Failed to fetch pending tests");
        }

        const pendingData = await pendingResponse.json();
        if (pendingData.success && pendingData.data) {
          setPendingTests(pendingData.data || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStartTest = (testId) => {
    localStorage.setItem("testid", testId);
    router.push("/testinterfaceGT");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const completedTests = testStats
    ? testStats.totalTests - pendingTests.length
    : 0;
  const completionRate = testStats
    ? ((completedTests / testStats.totalTests) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-lg">
            Here's an overview of your test performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Total Tests */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {testStats?.totalTests || 0}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Tests</div>
          </div>

          {/* Completed Tests */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {completedTests}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Tests Completed
            </div>
          </div>

          {/* Pending Tests */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <AlertCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {pendingTests.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Pending Tests
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {completionRate}%
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Completion Rate
            </div>
          </div>
        </div>

        {/* Test Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Test Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {testStats?.adminTests || 0}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Admin Tests
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {testStats?.userTests || 0}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                User Tests
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {testStats?.examPlanTests || 0}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Exam Plan Tests
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {testStats?.fullTests || 0}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Full Tests
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tests Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-600" />
              Pending Tests
            </h2>
            {pendingTests.length > 0 && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                {pendingTests.length} pending
              </span>
            )}
          </div>

          {pendingTests.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                All Caught Up!
              </h3>
              <p className="text-gray-600">
                You have no pending tests at the moment. Great job!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTests.map((test) => (
                <div
                  key={test.testId}
                  className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 sm:p-6 border border-orange-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <FileText className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Test ID: {test.testId}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                            {test.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartTest(test.testId)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Start Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Section */}
        {testStats && testStats.totalTests > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Your Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Overall Completion
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {completionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {completedTests}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {pendingTests.length}
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
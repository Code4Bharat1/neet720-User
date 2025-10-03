"use client";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  BookOpen,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Play,
  X,
  TrendingUp,
  Award,
  Target,
  FileText,
} from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function BatchInfoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const batchId = useParams().batchId;
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submittedTestIds, setSubmittedTestIds] = useState(new Set());
  const [attemptedTests, setAttemptedTests] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        if (!token || !batchId) {
          setLoading(false);
          return;
        }

        // Fetch batch details
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/batches/batchesInfo/${batchId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Batch Data:", data);

        if (data.success) {
          setBatchData(data);

          // ✅ get student ID from token
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const studentId = decodedToken.id;

          // ✅ check attempt status for each test
          const statusPromises = data.tests.map(async (test) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/batches/${test.id}/student/${studentId}/status`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const attemptData = await res.json();
            return { 
              testId: test.id, 
              attempted: attemptData.attempted,
              result: attemptData.result 
            };
          });

          const statuses = await Promise.all(statusPromises);

          // ✅ save in state as { testId: { attempted, result } }
          const attemptMap = {};
          statuses.forEach((s) => {
            attemptMap[s.testId] = {
              attempted: s.attempted,
              result: s.result
            };
          });
          setAttemptedTests(attemptMap);
        }
      } catch (error) {
        console.error("Failed to fetch batch details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchDetails();
  }, [batchId]);

  const fetchSubmittedTests = async (email, token) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/getUserSubmittedTestsByEmail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (data.tests && data.tests.length > 0) {
        const submittedIds = new Set(
          data.tests
            .map(
              (test) =>
                test.testId || test.id || test.test_id || test.generateTestId
            )
            .filter((id) => id !== undefined && id !== null)
        );
        setSubmittedTestIds(submittedIds);
      }
    } catch (error) {
      console.error("Failed to fetch submitted tests:", error);
    }
  };

  const handleStartTest = (testId, testName) => {
    localStorage.setItem("testid", testId);
    localStorage.setItem("testName", testName);
    router.push("/testinterfaceGT");
  };

  const handleViewResult = (testId) => {
    const resultData = attemptedTests[testId]?.result;
    if (resultData) {
      setSelectedResult(resultData);
      setShowResultModal(true);
    }
  };

  const getTestStatus = (test) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(test.exam_start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(test.exam_end_date);
    endDate.setHours(23, 59, 59, 999);

    const testId = test.id;
    const isSubmitted = attemptedTests[testId]?.attempted;

    if (isSubmitted) {
      return {
        status: "completed",
        label: "Completed",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="w-4 h-4" />,
        canStart: false,
      };
    }

    if (today >= startDate && today <= endDate) {
      return {
        status: "active",
        label: "Active Now",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Clock className="w-4 h-4" />,
        canStart: true,
      };
    }

    if (today < startDate) {
      return {
        status: "scheduled",
        label: "Scheduled",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: <Calendar className="w-4 h-4" />,
        canStart: false,
      };
    }

    return {
      status: "expired",
      label: "Expired",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertCircle className="w-4 h-4" />,
      canStart: false,
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const parseSubjectWiseMarks = (marksString) => {
    try {
      return JSON.parse(marksString);
    } catch {
      return {};
    }
  };

  const ResultModal = () => {
    if (!selectedResult) return null;

    const subjectMarks = parseSubjectWiseMarks(selectedResult.subjectWiseMarks);
    const percentage = ((selectedResult.score / selectedResult.overallmarks) * 100).toFixed(2);
    const accuracy = ((selectedResult.correctAnswers / selectedResult.totalquestions) * 100).toFixed(2);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Test Results</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedResult.testname}</p>
            </div>
            <button
              onClick={() => setShowResultModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Score Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                    {selectedResult.score}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Score Obtained</div>
                  <div className="text-xs text-gray-500">out of {selectedResult.overallmarks}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-600">
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Percentage</div>
                  <div className="text-xs text-gray-500">Accuracy: {accuracy}%</div>
                </div>
              </div>
            </div>

            {/* Question Statistics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {selectedResult.correctAnswers}
                </div>
                <div className="text-xs text-gray-600 mt-1">Correct</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {selectedResult.incorrectAnswers}
                </div>
                <div className="text-xs text-gray-600 mt-1">Incorrect</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-600">
                  {selectedResult.unattempted}
                </div>
                <div className="text-xs text-gray-600 mt-1">Unattempted</div>
              </div>
            </div>

            {/* Subject-wise Performance */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Subject-wise Performance
              </h3>
              <div className="space-y-3">
                {Object.entries(subjectMarks).map(([subject, marks]) => (
                  <div key={subject} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{subject}</span>
                      <span className={`text-lg font-bold ${marks >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {marks > 0 ? '+' : ''}{marks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Details */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Test Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-medium text-gray-800 ml-2">
                    {selectedResult.totalquestions}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600 ml-2">
                    {selectedResult.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="font-medium text-gray-800 ml-2">
                    {formatDate(selectedResult.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
            <button
              onClick={() => setShowResultModal(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!batchData) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 sm:p-12 text-center">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Batch Not Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              The batch you're looking for doesn't exist or you don't have
              access to it.
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { batch, tests } = batchData;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Batches
        </button>

        {/* Batch Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="bg-blue-100 p-3 sm:p-4 rounded-lg flex-shrink-0">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
                  {batch.batchName}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                  {batch.batchId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-around sm:justify-end">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {tests?.length || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Tests</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {batch.no_of_students}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              Available Tests
            </h2>
          </div>

          {tests && tests.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {tests.map((test) => {
                const status = getTestStatus(test);
                return (
                  <div
                    key={test.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Test Header */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 break-words">
                              {test.testname}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium border ${status.color} self-start`}
                            >
                              {status.icon}
                              {status.label}
                            </span>
                          </div>

                          {/* Test Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2">
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span>{test.no_of_questions} Questions</span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span>{test.duration} Minutes</span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span className="truncate">
                                Start: {formatDate(test.exam_start_date)}
                              </span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span className="truncate">
                                End: {formatDate(test.exam_end_date)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2">
                            <span className="text-xs text-gray-500">
                              Subject: {test.subject}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-end sm:justify-end w-full">
                        {status.canStart ? (
                          <button
                            onClick={() =>
                              handleStartTest(test.id, test.testname)
                            }
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Test
                          </button>
                        ) : status.status === "completed" ? (
                          <button
                            onClick={() => handleViewResult(test.id)}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
                          >
                            <Award className="w-4 h-4 mr-2" />
                            View Result
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed font-medium text-sm sm:text-base"
                          >
                            {status.status === "expired"
                              ? "Expired"
                              : `Starts ${formatDate(test.exam_start_date)}`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                No Tests Available
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                There are no tests scheduled for this batch yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      {showResultModal && <ResultModal />}
    </div>
  );
}
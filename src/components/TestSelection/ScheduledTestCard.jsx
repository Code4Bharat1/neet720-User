"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Clock,
  X,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ScheduledTestCard = () => {
  const [batchData, setBatchData] = useState([]);
  const [submittedTestIds, setSubmittedTestIds] = useState(new Set());
  const [showInstructions, setShowInstructions] = useState(false);
  const [timer, setTimer] = useState(60);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [expandedBatches, setExpandedBatches] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const bgColors = [
    "bg-pink-200",
    "bg-teal-400",
    "bg-gray-800",
    "bg-yellow-400",
    "bg-purple-500",
    "bg-orange-400",
  ];

  const batchColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-indigo-500",
  ];

  // Fetch submitted tests by email
  const fetchSubmittedTests = async (email, token) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/getUserSubmittedTestsByEmail`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Submitted tests response:", res.data);

      if (res.data.tests && res.data.tests.length > 0) {
        const submittedIds = new Set(
          res.data.tests
            .map((test) => {
              return (
                test.testId || test.id || test.test_id || test.generateTestId
              );
            })
            .filter((id) => id !== undefined && id !== null)
        );

        console.log("Extracted submitted test IDs:", Array.from(submittedIds));
        setSubmittedTestIds(submittedIds);
      } else {
        console.log("No submitted tests found for user");
        setSubmittedTestIds(new Set());
      }
    } catch (error) {
      console.error("Failed to fetch submitted tests:", error);
      setSubmittedTestIds(new Set());
    }
  };

  useEffect(() => {
    const fetchTestsByBatch = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const email = decodedToken.email;

        // Fetch both scheduled tests and submitted tests
        // WRONG - This creates an array with Promise.all as first element
        // CORRECT - Pass array to Promise.all
        const [testsResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/getStudentTestDetails`, // Use correct endpoint
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetchSubmittedTests(email, token),
        ]);
        console.log("Test response", testsResponse);

        // Handle the new response structure
        const { tests, message } = testsResponse.data;

        console.log("Tests : ",tests)

        // If no tests are available
        if (!tests || tests.length === 0) {
          console.log("No tests available:", message);
          setBatchData([]);
          setLoading(false);
          return;
        }

        console.log("Available tests:", tests);
        console.log(
          "Current submitted test IDs:",
          Array.from(submittedTestIds)
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Group tests by batch since they all belong to the same batch
        const batchTestsMap = {};

        tests.forEach((test, testIndex) => {
          const startDate = new Date(test.exam_start_date);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(test.exam_end_date);
          endDate.setHours(23, 59, 59, 999);

          // Skip tests that have ended
          if (today > endDate) return;

          const testId = String(test.id);
          const isSubmitted =
            submittedTestIds.has(testId) || submittedTestIds.has(test.id);
          const isActive =
            today >= startDate && today <= endDate && !isSubmitted;

          console.log(`Test ${test.testname} (ID: ${testId}):`, {
            isSubmitted,
            isActive,
            submittedIds: Array.from(submittedTestIds),
          });

          const formattedTest = {
            id: test.id,
            name: test.testname,
            questions: `${test.no_of_questions} QUESTIONS`,
            date: startDate.toLocaleDateString("en-GB"),
            rawStartDate: startDate,
            rawEndDate: endDate,
            isActive: isActive,
            isSubmitted: isSubmitted,
            isScheduled: today < startDate && !isSubmitted,
            bgColor: bgColors[testIndex % bgColors.length],
            subject: test.subject,
            duration: test.duration,
            marks: test.marks,
            difficulty: test.difficulty,
            instruction: test.instruction,
          };

          // Group by batchId
          const batchId = test.batchId;
          const batchName = test.batch_name || `Batch ${batchId}`;

          if (!batchTestsMap[batchId]) {
            batchTestsMap[batchId] = {
              batchId: batchId,
              batchName: batchName,
              batchColor:
                batchColors[
                  Object.keys(batchTestsMap).length % batchColors.length
                ],
              tests: [],
              testCount: 0,
              studentCount: 0, // We don't have this info in the new API response
            };
          }

          batchTestsMap[batchId].tests.push(formattedTest);
        });

        // Convert map to array and sort tests within each batch
        const batchTestData = Object.values(batchTestsMap)
          .map((batch) => ({
            ...batch,
            testCount: batch.tests.length,
            tests: batch.tests.sort((a, b) => a.rawStartDate - b.rawStartDate),
          }))
          .filter((batch) => batch.tests.length > 0);

        setBatchData(batchTestData);

        // Auto-expand batches with active tests
        const initialExpanded = {};
        batchTestData.forEach((batch) => {
          const hasActiveTests = batch.tests.some((test) => test.isActive);
          initialExpanded[batch.batchId] = hasActiveTests;
        });
        setExpandedBatches(initialExpanded);
      } catch (error) {
        console.error("Failed to fetch test data:", error);
        if (error.response && error.response.status === 401) {
          console.error(
            "Authentication error. Token might be expired or invalid."
          );
        }
        // Handle case where user is not in any batch
        if (error.response && error.response.status === 200) {
          setBatchData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTestsByBatch();
  }, []);

  useEffect(() => {
    if (showInstructions && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && selectedTestId) {
      router.push("/testinterfaceGT");
    }
  }, [showInstructions, timer, selectedTestId, router]);

  const handleStartTest = (testId, testName) => {
    setSelectedTestId(testId);
    localStorage.setItem("testid", testId);
    localStorage.setItem("testName", testName);
    setShowInstructions(true);
    setTimer(60);
  };

  const handleCancel = () => {
    setShowInstructions(false);
    setSelectedTestId(null);
    setTimer(60);
  };

  const handleProceedNow = () => {
    router.push("/testinterfaceGT");
  };

  const toggleBatchExpansion = (batchId) => {
    setExpandedBatches((prev) => ({
      ...prev,
      [batchId]: !prev[batchId],
    }));
  };

  const getTestStatus = (test) => {
    if (test.isSubmitted) {
      return {
        label: "Completed",
        className: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
      };
    } else if (test.isActive) {
      return {
        label: "Available Now",
        className: "bg-blue-100 text-blue-800 animate-pulse",
        icon: <Clock className="w-4 h-4" />,
      };
    } else if (test.isScheduled) {
      return {
        label: "Scheduled",
        className: "bg-gray-100 text-gray-600",
        icon: <Clock className="w-4 h-4" />,
      };
    }
    return null;
  };

  const getButtonConfig = (test) => {
    if (test.isSubmitted) {
      return {
        text: "Test Completed",
        className: "bg-green-500 text-white cursor-not-allowed",
        disabled: true,
        onClick: null,
      };
    } else if (test.isActive) {
      return {
        text: "Start Test",
        className: "bg-red-500 text-white hover:bg-red-600",
        disabled: false,
        onClick: () => handleStartTest(test.id, test.name),
      };
    } else {
      return {
        text: `Scheduled ${test.date}`,
        className: "bg-[#718EBF] text-white cursor-not-allowed",
        disabled: true,
        onClick: null,
      };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <div className="border-2 rounded-md bg-gray-50 text-gray-700 text-lg md:text-2xl font-bold text-center py-5">
          Admin Created Tests
        </div>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Instruction Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Test Instructions</h2>
              </div>
              <button onClick={handleCancel}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li>Once the test starts, do not exit full screen mode</li>
                <li>Do not switch tabs or windows — this may disqualify you</li>
                <li>Use only the on-screen options to navigate questions</li>
                <li>Answer all questions carefully; there's no going back</li>
              </ul>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-300 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700 font-medium">
                    Test will begin in
                  </span>
                  <div className="text-xl font-bold text-white bg-red-500 px-3 py-1 rounded-lg">
                    {timer}
                  </div>
                  <span className="text-gray-700 font-medium">seconds</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedNow}
                  disabled={timer > 0}
                  className={`w-1/2 px-4 py-2 rounded-lg font-semibold text-white ${
                    timer > 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Start Test
                </button>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  style={{ width: `${((60 - timer) / 60) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-2 rounded-md bg-gray-50 text-gray-700 text-lg md:text-2xl font-bold text-center py-5">
        Admin Created Tests
      </div>

      {batchData.map((batch) => (
        <div
          key={batch.batchId}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Batch Header */}
          <div
            className={`${batch.batchColor} text-white p-4 cursor-pointer hover:opacity-90 transition-opacity`}
            onClick={() => toggleBatchExpansion(batch.batchId)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaUsers className="text-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{batch.batchName}</h3>
                  <p className="text-sm opacity-90">
                    {batch.testCount} test{batch.testCount !== 1 ? "s" : ""}{" "}
                    available
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {batch.tests.some((test) => test.isActive) && (
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                    ACTIVE
                  </div>
                )}
                {batch.tests.some((test) => test.isSubmitted) && (
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    COMPLETED
                  </div>
                )}
                {expandedBatches[batch.batchId] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

          {/* Tests List */}
          {expandedBatches[batch.batchId] && (
            <div className="divide-y divide-gray-200">
              {batch.tests.map((test, testIndex) => {
                const status = getTestStatus(test);
                const buttonConfig = getButtonConfig(test);

                return (
                  <div
                    key={testIndex}
                    className={`p-4 transition-colors ${
                      test.isSubmitted
                        ? "bg-green-50"
                        : test.isActive
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Desktop Icon */}
                      <div
                        className={`hidden md:flex items-center justify-center w-12 h-12 rounded-md ${test.bgColor} relative`}
                      >
                        <FaClipboardList className="text-white text-lg" />
                        {test.isSubmitted && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col w-full md:pl-4">
                        {/* Mobile Layout */}
                        <div className="md:hidden">
                          <div className="flex items-center space-x-3 mb-3">
                            <div
                              className={`flex items-center justify-center h-10 w-10 rounded-md ${test.bgColor} relative`}
                            >
                              <FaClipboardList className="text-white" />
                              {test.isSubmitted && (
                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-800">
                                {test.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {test.questions}
                              </p>
                            </div>
                          </div>

                          <div className="mb-3 space-y-1">
                            <div className="text-xs text-blue-600 font-medium">
                              {test.subject}
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-600">
                              <span>⏱️ {test.duration} min</span>
                              <span>📊 {test.marks} marks</span>
                              <span
                                className={`px-2 py-1 rounded-full text-white text-xs ${
                                  test.difficulty === "Easy"
                                    ? "bg-green-500"
                                    : test.difficulty === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {test.difficulty}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            {status && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.className}`}
                              >
                                {status.icon}
                                {status.label}
                              </span>
                            )}
                            <button
                              onClick={buttonConfig.onClick}
                              disabled={buttonConfig.disabled}
                              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${buttonConfig.className}`}
                            >
                              {buttonConfig.text}
                            </button>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex md:items-center md:justify-between w-full">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {test.name}
                            </h4>
                          </div>

                          <div className="h-6 border-l border-gray-300 mx-4" />
                          <div className="flex-1">
                            <div className="text-gray-600 text-sm space-y-1">
                              <div className="font-semibold">
                                {test.questions}
                              </div>
                              <div className="text-blue-600">
                                {test.subject}
                              </div>
                              <div className="flex space-x-3 text-xs">
                                <span>⏱️ {test.duration} min</span>
                                <span>📊 {test.marks} marks</span>
                                <span
                                  className={`px-2 py-1 rounded-full text-white text-xs ${
                                    test.difficulty === "Easy"
                                      ? "bg-green-500"
                                      : test.difficulty === "Medium"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                >
                                  {test.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="h-6 border-l border-gray-300 mx-4" />
                          <div className="flex items-center space-x-3">
                            {status && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.className}`}
                              >
                                {status.icon}
                                {status.label}
                              </span>
                            )}
                            <button
                              onClick={buttonConfig.onClick}
                              disabled={buttonConfig.disabled}
                              className={`px-4 py-2 rounded-md text-center w-[200px] transition-colors ${buttonConfig.className}`}
                            >
                              {buttonConfig.text}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {expandedBatches[batch.batchId] && batch.tests.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FaClipboardList className="mx-auto text-4xl mb-4 opacity-50" />
              <p>No tests available for this batch</p>
            </div>
          )}
        </div>
      ))}

      {/* Empty State for No Batches */}
      {batchData.length === 0 && (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <FaUsers className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Active Tests Available
          </h3>
          <p className="text-gray-500">
            You don't have any active tests at the moment. Tests will appear
            here when they become available.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduledTestCard;

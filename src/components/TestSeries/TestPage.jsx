"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Flag,
  Eraser,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TakeTest() {
  const router = useRouter();
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenExited, setFullscreenExited] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ========================================
  // FULLSCREEN FUNCTIONALITY
  // ========================================
  const enterFullscreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );

      setIsFullscreen(isCurrentlyFullscreen);

      // If user exits fullscreen during test, end the test
      if (!isCurrentlyFullscreen && testStarted && !testCompleted) {
        setFullscreenExited(true);
        // Use setTimeout to defer toast to avoid render conflicts
        setTimeout(() => {
          toast.error("Test ended due to fullscreen exit!", {
            duration: 5000,
          });
        }, 0);
        handleSubmitTest();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [testStarted, testCompleted]);

  // Prevent right-click and key shortcuts during test
  useEffect(() => {
    if (testStarted && !testCompleted) {
      const handleContextMenu = (e) => e.preventDefault();
      const handleKeyDown = (e) => {
        // Prevent F12, Ctrl+Shift+I, Ctrl+U, etc.
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.shiftKey && e.key === "C") ||
          (e.ctrlKey && e.key === "u")
        ) {
          e.preventDefault();
          // Use setTimeout to defer toast to avoid render conflicts
          setTimeout(() => toast.error("Developer tools are disabled during test!"), 0);
        }
      };

      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [testStarted, testCompleted]);

  // Prevent back/forward navigation after test is completed
  useEffect(() => {
    if (!testCompleted || !showResults) return;

    // Push a new history state to block back button
    window.history.pushState(null, null, window.location.href);

    const handlePopState = (event) => {
      // Prevent going back
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [testCompleted, showResults]);

  // ========================================
  // ORIGINAL FUNCTIONALITY
  // ========================================
  useEffect(() => {
    if (!testId) return;

    const fetchTestData = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/test-series/test-series-question/${testId}`
        );

        if (res.data.success) {
          setTest(res.data.testDetails || null);
          const formattedQuestions = res.data.data.map((q) => ({
            ...q,
            options: JSON.parse(q.options || "[]"),
          }));
          setQuestions(formattedQuestions);
          setTimeLeft((res.data.testDetails?.durationMinutes || 60) * 60);
        } else {
          setError(res.data.message || "Failed to load test details.");
        }
      } catch (err) {
        console.error("Error fetching test details:", err);
        setError("Error fetching test details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [testId, API_BASE]);

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, testCompleted, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const startTest = () => {
    setTestStarted(true);
    enterFullscreen();
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // ========================================
  // NEW FUNCTIONALITY
  // ========================================
  const toggleMarkForReview = (questionId) => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
        // Use setTimeout to defer toast to next tick
        setTimeout(() => toast.success("Removed from review list"), 0);
      } else {
        newSet.add(questionId);
        // Use setTimeout to defer toast to next tick
        setTimeout(() => toast.success("Marked for review"), 0);
      }
      return newSet;
    });
  };

  const clearResponse = (questionId) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    // Use setTimeout to defer toast to next tick
    setTimeout(() => toast.success("Response cleared"), 0);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowNavigator(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctAnswers = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer === question.correctAnswer) {
        totalScore += question.marks || 1;
        correctAnswers++;
      } else if (userAnswer) {
        totalScore -= question.negativeMarks || 0;
      }
    });
    return { totalScore, correctAnswers };
  };

  const handleSubmitTest = async () => {
    setShowSubmitDialog(false);
    setTestCompleted(true);
    exitFullscreen();
    const results = calculateScore();
    setScore(results);
    setShowResults(true);

    try {
      const token = localStorage.getItem("authToken");
      const decode = jwtDecode(token);
      const studentId = decode.id;

      if (!studentId) {
        console.error("No student ID found");
        return;
      }

      await axios.post(`${API_BASE}/test-series/test-result`, {
        studentId: parseInt(studentId),
        testId: parseInt(testId),
        totalMarks: questions.reduce((sum, q) => sum + (q.marks || 1), 0),
        marksObtained: results.totalScore,
        correctAnswers: results.correctAnswers,
        incorrectAnswers: Object.keys(answers).filter((id) => {
          const q = questions.find((q) => q.id === parseInt(id));
          return q && answers[id] !== q.correctAnswer && answers[id] !== null;
        }).length,
        unattempted: questions.length - Object.keys(answers).length,
        timeTaken: test.durationMinutes * 60 - timeLeft,
      });
      
      if (!fullscreenExited) {
        // Use setTimeout to defer toast to avoid render conflicts
        setTimeout(() => toast.success("Test submitted successfully!"), 0);
      }
    } catch (err) {
      console.error("Error submitting test:", err);
      setTimeout(() => toast.error("Error submitting test results"), 0);
    }
  };

  const getAnswerStatus = (questionId) => {
    const hasAnswer = answers[questionId];
    const isMarked = markedForReview.has(questionId);
    
    if (hasAnswer && isMarked) return "answered-marked";
    if (hasAnswer) return "answered";
    if (isMarked) return "marked";
    return "unanswered";
  };

  // Calculate question statistics for the confirmation dialog
  const getQuestionStats = () => {
    const attempted = Object.keys(answers).length;
    const skipped = questions.length - attempted;
    const marked = markedForReview.size;
    const answeredAndMarked = Array.from(markedForReview).filter(id => answers[id]).length;

    return {
      attempted,
      skipped,
      marked,
      answeredAndMarked
    };
  };

  // ========================================
  // LOADING AND ERROR STATES
  // ========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6 sm:p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Error Loading Test
          </h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 max-w-md w-full text-center">
          <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Test Not Available
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            This test has no questions or could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Show results screen
  if (showResults && score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 max-w-2xl w-full">
          <div className="text-center mb-6 sm:mb-8">
            {fullscreenExited ? (
              <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto mb-4" />
            ) : (
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4" />
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {fullscreenExited ? "Test Terminated" : "Test Completed!"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {fullscreenExited 
                ? "Test was ended due to fullscreen exit"
                : `Here are your results for ${test.testName}`
              }
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white text-center">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Your Score
              </h3>
              <p className="text-3xl sm:text-4xl font-bold">
                {score.totalScore}
              </p>
              <p className="text-blue-100 text-sm">points</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white text-center">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Correct Answers
              </h3>
              <p className="text-3xl sm:text-4xl font-bold">
                {score.correctAnswers}
              </p>
              <p className="text-green-100 text-sm">
                out of {questions.length}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Test Summary
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-semibold">
                  {((score.correctAnswers / questions.length) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-semibold">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attempted:</span>
                <span className="font-semibold">
                  {Object.keys(answers).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Marked for Review:</span>
                <span className="font-semibold">{markedForReview.size}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/test-series")}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base"
            >
              Back to Tests
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
            >
              Retake Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pre-test instructions screen
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {test.testName}
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base">
                Ready to begin your test?
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Test Info */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Duration
                  </h3>
                  <p className="text-blue-600 font-bold text-sm sm:text-base">
                    {test.durationMinutes} minutes
                  </p>
                </div>

                <div className="text-center p-4 sm:p-6 bg-green-50 rounded-xl">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Questions
                  </h3>
                  <p className="text-green-600 font-bold text-sm sm:text-base">
                    {questions.length} questions
                  </p>
                </div>

                <div className="text-center p-4 sm:p-6 bg-purple-50 rounded-xl sm:col-span-2 lg:col-span-1">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Subject
                  </h3>
                  <p className="text-purple-600 font-bold text-sm sm:text-base">
                    {test.subject || "General"}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-yellow-800 mb-4">
                  Test Instructions
                </h3>
                <ul className="space-y-2 text-yellow-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      You have {test.durationMinutes} minutes to complete this test
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      The test will start in fullscreen mode and must remain fullscreen
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      Exiting fullscreen will automatically end the test
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      You can mark questions for review and clear responses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>
                      Navigate between questions freely during the test
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Once submitted, you cannot change your answers</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={startTest}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-base sm:text-lg"
                >
                  Start Test (Fullscreen)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test interface
  const currentQuestion = questions[currentQuestionIndex];
  const stats = getQuestionStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with timer */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <button
                onClick={() => setShowNavigator(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                  {test.testName}
                </h1>
                <div className="text-xs sm:text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              <div
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm ${
                  timeLeft < 300
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-mono font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={isFullscreen ? exitFullscreen : enterFullscreen}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              <button
                onClick={() => setShowSubmitDialog(true)}
                className="px-3 sm:px-6 py-1 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-xs sm:text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
        <div className="flex gap-8">
          {/* Question Panel */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8">
              {/* Question */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                    {currentQuestionIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed">
                      {currentQuestion.questionText}
                    </p>
                    {currentQuestion.marks && (
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-600">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          +{currentQuestion.marks} marks
                        </span>
                        {currentQuestion.negativeMarks > 0 && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                            -{currentQuestion.negativeMarks} marks
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 sm:space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const isSelected =
                      answers[currentQuestion.id] === optionLetter ||
                      answers[currentQuestion.id] === option;

                    return (
                      <label
                        key={index}
                        className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={optionLetter}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswerSelect(currentQuestion.id, optionLetter)
                          }
                          className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 flex-shrink-0"
                        />
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0 ${
                            isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {optionLetter}
                        </div>
                        <span
                          className={`flex-1 text-sm sm:text-base ${
                            isSelected
                              ? "text-indigo-900 font-medium"
                              : "text-gray-800"
                          }`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6 border-t border-gray-200 pt-6">
                <button
                  onClick={() => toggleMarkForReview(currentQuestion.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    markedForReview.has(currentQuestion.id)
                      ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  {markedForReview.has(currentQuestion.id)
                    ? "Unmark Review"
                    : "Mark for Review"
                  }
                </button>

                <button
                  onClick={() => clearResponse(currentQuestion.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                  disabled={!answers[currentQuestion.id]}
                >
                  <Eraser className="w-4 h-4" />
                  Clear Response
                </button>

                <button
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      toggleMarkForReview(currentQuestion.id);
                      nextQuestion();
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  <Flag className="w-4 h-4" />
                  Mark & Next
                </button>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 sm:pt-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <span className="text-xs sm:text-sm text-gray-600">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>

                <button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Question Navigator Sidebar */}
          <div className="hidden lg:block w-80">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Question Navigator
              </h3>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((_, index) => {
                  const status = getAnswerStatus(questions[index].id);
                  const isCurrentQuestion = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all relative ${
                        isCurrentQuestion
                          ? "bg-indigo-600 text-white ring-2 ring-indigo-300"
                          : status === "answered"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : status === "marked"
                          ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                          : status === "answered-marked"
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                      {markedForReview.has(questions[index].id) && (
                        <Flag className="w-3 h-3 absolute -top-1 -right-1 text-orange-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-100 rounded border"></div>
                  <span className="text-gray-600">
                    Answered ({stats.attempted})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-100 rounded border relative">
                    <Flag className="w-2 h-2 absolute top-0 right-0 text-orange-600" />
                  </div>
                  <span className="text-gray-600">
                    Marked for Review ({stats.marked})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-100 rounded border relative">
                    <Flag className="w-2 h-2 absolute top-0 right-0 text-purple-600" />
                  </div>
                  <span className="text-gray-600">
                    Answered & Marked ({stats.answeredAndMarked})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-100 rounded border"></div>
                  <span className="text-gray-600">
                    Not Answered ({stats.skipped})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-indigo-600 rounded border"></div>
                  <span className="text-gray-600">Current Question</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Progress:</span>
                    <span className="font-semibold">
                      {Math.round((stats.attempted / questions.length) * 100)}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowSubmitDialog(true)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Question Navigator Modal */}
      {showNavigator && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] rounded-t-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Question Navigator
              </h3>
              <button
                onClick={() => setShowNavigator(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-6">
              {questions.map((_, index) => {
                const status = getAnswerStatus(questions[index].id);
                const isCurrentQuestion = index === currentQuestionIndex;

                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all relative ${
                      isCurrentQuestion
                        ? "bg-indigo-600 text-white ring-2 ring-indigo-300"
                        : status === "answered"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : status === "marked"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : status === "answered-marked"
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                    {markedForReview.has(questions[index].id) && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 text-orange-600" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-100 rounded border"></div>
                <span className="text-gray-600">
                  Answered ({stats.attempted})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-100 rounded border relative">
                  <Flag className="w-2 h-2 absolute top-0 right-0 text-orange-600" />
                </div>
                <span className="text-gray-600">
                  Marked for Review ({stats.marked})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-100 rounded border relative">
                  <Flag className="w-2 h-2 absolute top-0 right-0 text-purple-600" />
                </div>
                <span className="text-gray-600">
                  Answered & Marked ({stats.answeredAndMarked})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-100 rounded border"></div>
                <span className="text-gray-600">
                  Not Answered ({stats.skipped})
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span className="font-semibold">
                    {Math.round((stats.attempted / questions.length) * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSubmitDialog(true)}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Submit Test?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Are you sure you want to submit your test? This action cannot be undone.
              </p>
            </div>

            {/* Test Statistics */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 text-center">
                Test Summary
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {stats.attempted}
                  </div>
                  <div className="text-gray-600">Attempted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-600">
                    {stats.skipped}
                  </div>
                  <div className="text-gray-600">Skipped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                    {stats.marked}
                  </div>
                  <div className="text-gray-600">Marked for Review</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {stats.answeredAndMarked}
                  </div>
                  <div className="text-gray-600">Answered & Marked</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
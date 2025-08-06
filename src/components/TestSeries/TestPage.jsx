"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Clock, CheckCircle, AlertCircle, BookOpen } from "lucide-react";

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
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

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
          setTimeLeft((res.data.testDetails?.durationMinutes || 60) * 60); // Convert to seconds
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
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctAnswers = 0;

    questions.forEach(question => {
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
    setTestCompleted(true);
    const results = calculateScore();
    setScore(results);
    setShowResults(true);

    // Here you would typically submit the results to your backend
    try {
      await axios.post(`${API_BASE}/test-series/submit-test`, {
        testId,
        answers,
        score: results.totalScore,
        correctAnswers: results.correctAnswers,
        totalQuestions: questions.length
      });
    } catch (err) {
      console.error("Error submitting test:", err);
    }
  };

  const getAnswerStatus = (questionId) => {
    return answers[questionId] ? 'answered' : 'unanswered';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md mx-4 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Test</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-4 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Not Available</h3>
          <p className="text-gray-600">This test has no questions or could not be found.</p>
        </div>
      </div>
    );
  }

  // Show results screen
  if (showResults && score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h2>
            <p className="text-gray-600">Here are your results for {test.testName}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Your Score</h3>
              <p className="text-4xl font-bold">{score.totalScore}</p>
              <p className="text-blue-100">points</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Correct Answers</h3>
              <p className="text-4xl font-bold">{score.correctAnswers}</p>
              <p className="text-green-100">out of {questions.length}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Summary</h3>
            <div className="space-y-2">
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
                <span className="font-semibold">{Object.keys(answers).length}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push('/test-series')}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
            >
              Back to Tests
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{test.testName}</h1>
              <p className="text-indigo-100">Ready to begin your test?</p>
            </div>

            <div className="p-8">
              {/* Test Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Duration</h3>
                  <p className="text-blue-600 font-bold">{test.durationMinutes} minutes</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Questions</h3>
                  <p className="text-green-600 font-bold">{questions.length} questions</p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Subject</h3>
                  <p className="text-purple-600 font-bold">{test.subject || 'General'}</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">Test Instructions</h3>
                <ul className="space-y-2 text-yellow-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>You have {test.durationMinutes} minutes to complete this test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>You can navigate between questions freely during the test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Make sure to submit your test before time runs out</span>
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
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg"
                >
                  Start Test
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with timer */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">{test.testName}</h1>
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex gap-8">
          {/* Question Panel */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              {/* Question */}
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {currentQuestionIndex + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900 leading-relaxed">
                      {currentQuestion.questionText}
                    </p>
                    {currentQuestion.marks && (
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
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
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const isSelected = answers[currentQuestion.id] === optionLetter || answers[currentQuestion.id] === option;
                    
                    return (
                      <label
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 ${
                          isSelected 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={optionLetter}
                          checked={isSelected}
                          onChange={() => handleAnswerSelect(currentQuestion.id, optionLetter)}
                          className="w-5 h-5 text-indigo-600"
                        />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isSelected 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {optionLetter}
                        </div>
                        <span className={`flex-1 ${isSelected ? 'text-indigo-900 font-medium' : 'text-gray-800'}`}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>

                <button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigator</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((_, index) => {
                  const status = getAnswerStatus(questions[index].id);
                  const isCurrentQuestion = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        isCurrentQuestion
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                          : status === 'answered'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-100 rounded border"></div>
                  <span className="text-gray-600">Answered ({Object.keys(answers).length})</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-100 rounded border"></div>
                  <span className="text-gray-600">Not Answered ({questions.length - Object.keys(answers).length})</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-indigo-600 rounded border"></div>
                  <span className="text-gray-600">Current Question</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmitTest}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
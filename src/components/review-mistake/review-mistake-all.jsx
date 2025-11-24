"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const TestReview = () => {
  const router = useRouter();
  const params = useParams();
  const testType = params["test-type"];
  const testId = params["test-id"];

  const [questions, setQuestions] = useState([]); // questions from backend
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [questionFilter, setQuestionFilter] = useState("all"); // "all" | "attempted" | "notAttempted"

  // Pagination states (per section)
  const [correctPage, setCorrectPage] = useState(1);
  const [wrongPage, setWrongPage] = useState(1);
  const [notAttemptedPage, setNotAttemptedPage] = useState(1);
  const questionsPerPage = 10;

  const handleBackClick = () => {
    router.push("/pasttest");
  };

  useEffect(() => {
    if (!testType || !testId) {
      setError("Test type and test ID are required");
      setLoading(false);
      return;
    }

    const fetchTestData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/alltest/${testType}/${testId}`
        );

        if (response.status === 200) {
          setTestData(response.data.testData);
          setQuestions(response.data.questions || []);
        } else {
          setError(response.data.message || "Failed to fetch test data");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || "An error occurred while fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [testType, testId]);

  // Pagination helper
  const paginate = (items, page) => {
    const start = (page - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    return items.slice(start, end);
  };

  // Pagination controls component
  const PaginationControls = ({ total, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(total / questionsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-6 space-x-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <p className="px-3 py-2 bg-white border rounded-md text-sm">
          Page {currentPage} of {totalPages}
        </p>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  // Helpers for parsing structures
  const parseWrongAnswers = (wrongAnswersString) => {
    try {
      const parsed = JSON.parse(wrongAnswersString);
      return parsed.map((answer) => ({
        id: answer[0],
        subject: answer[1],
        chapter: answer[2],
        userAnswer: answer[3],
        correctAnswer: answer[4],
        score: answer[5],
        timestamp: answer[6],
      }));
    } catch {
      return [];
    }
  };

  const parseDetailedAnswers = (detailedAnswersString) => {
    try {
      const parsed = JSON.parse(detailedAnswersString);
      const explanationsMap = {};
      parsed.forEach((detail) => {
        explanationsMap[detail[0]] = detail[1];
      });
      return explanationsMap;
    } catch {
      return {};
    }
  };

  const parseMeTestAnswers = (answersString) => {
    try {
      return JSON.parse(answersString);
    } catch {
      return {};
    }
  };

  const parseGenerateTestAnswers = (answersString) => {
    try {
      return JSON.parse(answersString);
    } catch {
      return [];
    }
  };

  const parseNotAttempted = (notAttemptedString) => {
    try {
      const parsed = JSON.parse(notAttemptedString);
      return parsed.map((item) => ({
        id: item[0],
        subject: item[1],
        chapter: item[2],
        userAnswer: "",
        correctAnswer: "",
        score: 0,
        timestamp: item[3],
      }));
    } catch {
      return [];
    }
  };

  const renderFullTestReview = () => {
    if (!testData) return null;

    const correctAnswers = parseWrongAnswers(testData.correctAnswers);
    const wrongAnswers = parseWrongAnswers(testData.wrongAnswers);
    const notAttempted = parseNotAttempted(testData.notAttempted);
    const explanations = parseDetailedAnswers(testData.detailedAnswers);

    // Subject list
    const allSubjects = [
      ...new Set([
        ...correctAnswers.map((q) => q.subject),
        ...wrongAnswers.map((q) => q.subject),
        ...notAttempted.map((q) => q.subject),
      ]),
    ];

    const subjectMatch = (q) =>
      selectedSubject === "All" || q.subject === selectedSubject;

    // Apply subject + status filters
    const filteredCorrect =
      questionFilter === "notAttempted"
        ? []
        : correctAnswers.filter(subjectMatch);

    const filteredWrong =
      questionFilter === "notAttempted"
        ? []
        : wrongAnswers.filter(subjectMatch);

    const filteredNotAttempted =
      questionFilter === "attempted"
        ? []
        : notAttempted.filter(subjectMatch);

    // Paginate
    const paginatedCorrect = paginate(filteredCorrect, correctPage);
    const paginatedWrong = paginate(filteredWrong, wrongPage);
    const paginatedNotAttempted = paginate(
      filteredNotAttempted,
      notAttemptedPage
    );

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Test Review - {testData.testName}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-600 font-semibold">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-700">
                {testData.wrongAnswersCount}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 font-semibold">Correct Answers</p>
              <p className="text-2xl font-bold text-green-700">
                {testData.correctAnswersCount}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-semibold">Total Score</p>
              <p className="text-2xl font-bold text-blue-700">
                {testData.marksObtained}/{testData.totalMarks}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 font-semibold">Not Attempted</p>
              <p className="text-2xl font-bold text-gray-700">
                {testData.notAttemptedCount}
              </p>
            </div>
          </div>

          {/* Filters row */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Subject Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Subject:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setCorrectPage(1);
                  setWrongPage(1);
                  setNotAttemptedPage(1);
                }}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="All">All Subjects</option>
                {allSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Status:
              </label>
              <select
                value={questionFilter}
                onChange={(e) => {
                  setQuestionFilter(e.target.value);
                  setCorrectPage(1);
                  setWrongPage(1);
                  setNotAttemptedPage(1);
                }}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="all">All Questions</option>
                <option value="attempted">Attempted Only</option>
                <option value="notAttempted">Not Attempted Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* ✅ Correct Answers Section */}
        {filteredCorrect.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800">
              ✅ Correct Answers ({filteredCorrect.length})
            </h2>

            {paginatedCorrect.map((question, index) => {
              const fullQuestion = questions.find((q) => q.id === question.id);
              const questionNumber =
                (correctPage - 1) * questionsPerPage + index + 1;

              return (
                <div
                  key={`correct-${question.id}`}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
                >
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">
                      {question.subject}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {question.chapter}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Question #{questionNumber}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Question: {fullQuestion?.question_text || "Question not found"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-700 mb-1">
                        Your Answer (Correct):
                      </p>
                      <p
                        className="text-green-800"
                        dangerouslySetInnerHTML={{ __html: question.userAnswer }}
                      />
                    </div>

                    {explanations[question.id] && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 mb-1">
                          Explanation:
                        </p>
                        <p className="text-blue-800">
                          {explanations[question.id]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-right">
                    <span className="text-sm text-green-600">
                      Score: +{question.score}
                    </span>
                  </div>
                </div>
              );
            })}

            <PaginationControls
              total={filteredCorrect.length}
              currentPage={correctPage}
              setCurrentPage={setCorrectPage}
            />
          </div>
        )}

        {/* ❌ Wrong Answers Section */}
        {filteredWrong.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-red-800">
              ❌ Wrong Answers ({filteredWrong.length})
            </h2>

            {paginatedWrong.map((question, index) => {
              const fullQuestion = questions.find((q) => q.id === question.id);
              const questionNumber =
                (wrongPage - 1) * questionsPerPage + index + 1;

              return (
                <div
                  key={`wrong-${question.id}`}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500"
                >
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">
                      {question.subject}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {question.chapter}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Question #{questionNumber}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Question: {fullQuestion?.question_text || "Question not found"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-red-700 mb-1">
                        Your Answer:
                      </p>
                      <p
                        className="text-red-800"
                        dangerouslySetInnerHTML={{ __html: question.userAnswer }}
                      />
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-700 mb-1">
                        Correct Answer:
                      </p>
                      <p
                        className="text-green-800"
                        dangerouslySetInnerHTML={{ __html: question.correctAnswer }}
                      />
                    </div>

                    {explanations[question.id] && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 mb-1">
                          Explanation:
                        </p>
                        <p className="text-blue-800">
                          {explanations[question.id]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-right">
                    <span className="text-sm text-red-600">
                      Score: {question.score}
                    </span>
                  </div>
                </div>
              );
            })}

            <PaginationControls
              total={filteredWrong.length}
              currentPage={wrongPage}
              setCurrentPage={setWrongPage}
            />
          </div>
        )}

        {/* ⏸️ Not Attempted Section */}
        {questionFilter !== "attempted" && filteredNotAttempted.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              ⏸️ Not Attempted ({filteredNotAttempted.length})
            </h2>

            {paginatedNotAttempted.map((question, index) => {
              const fullQuestion = questions.find((q) => q.id === question.id);
              const questionNumber =
                (notAttemptedPage - 1) * questionsPerPage + index + 1;

              return (
                <div
                  key={`not-attempted-${question.id}`}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400"
                >
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">
                      {question.subject}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {question.chapter}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Question #{questionNumber}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Question: {fullQuestion?.question_text || "Question not found"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Status:</p>
                    <p className="text-gray-600">This question was not attempted</p>
                  </div>

                  <div className="mt-3 text-right">
                    <span className="text-sm text-gray-600">Score: 0</span>
                  </div>
                </div>
              );
            })}

            <PaginationControls
              total={filteredNotAttempted.length}
              currentPage={notAttemptedPage}
              setCurrentPage={setNotAttemptedPage}
            />
          </div>
        )}
      </div>
    );
  };

  const renderMeTestReview = () => {
    if (!testData) return null;
    const answers = parseMeTestAnswers(testData.answers);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Me Test Review - {testData.testName.replace(/"/g, "")}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-600 font-semibold">Incorrect</p>
              <p className="text-2xl font-bold text-red-700">{testData.incorrect}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 font-semibold">Correct</p>
              <p className="text-2xl font-bold text-green-700">{testData.correct}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-semibold">Score</p>
              <p className="text-2xl font-bold text-blue-700">{testData.score}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 font-semibold">Total Questions</p>
              <p className="text-2xl font-bold text-gray-700">
                {testData.totalQuestions}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">All Answers Review</h2>
          {Object.entries(answers).map(([question, userAnswer], index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
            >
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Question #{index + 1}
                </h3>
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: question }}
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-700 mb-1">Your Answer:</p>
                <p
                  className="text-blue-800"
                  dangerouslySetInnerHTML={{ __html: userAnswer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGenerateTestReview = () => {
    if (!testData) return null;
    const answers = parseGenerateTestAnswers(testData.answers);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Generate Test Review - {testData.testname}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-600 font-semibold">Incorrect</p>
              <p className="text-2xl font-bold text-red-700">
                {testData.incorrectAnswers}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 font-semibold">Correct</p>
              <p className="text-2xl font-bold text-green-700">
                {testData.correctAnswers}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-semibold">Score</p>
              <p className="text-2xl font-bold text-blue-700">{testData.score}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 font-semibold">Total Questions</p>
              <p className="text-2xl font-bold text-gray-700">
                {testData.totalquestions}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Questions Review</h2>
          {answers.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500"
            >
              <div className="mb-3">
                <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                  {item.subject}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Question #{index + 1}
                </h3>
                <p className="text-gray-700">{item.question}</p>
              </div>

              {item.correctAnswer && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Correct Answer:
                  </p>
                  <p className="text-green-800">{item.correctAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center">
            <div className="text-red-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {testType === "fulltest" && renderFullTestReview()}
        {testType === "meTest" && renderMeTestReview()}
        {testType === "generate" && renderGenerateTestReview()}
      </div>
    </div>
  );
};

export default TestReview;

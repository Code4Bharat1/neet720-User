"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFlask,
  FaAtom,
  FaDna,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaFlag,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";

// ---- examplan helpers ----
const readExamplan = () => {
  try {
    const raw = localStorage.getItem("examplan") ?? "[]";
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeExamplan = (arr) => {
  localStorage.setItem("examplan", JSON.stringify(arr));
};

const upsertExamplanEntry = (entry) => {
  const saved = readExamplan();
  const idx = saved.findIndex((x) => x.question_id === entry.question_id);
  if (idx >= 0) {
    saved[idx] = { ...saved[idx], ...entry };
  } else {
    saved.push(entry);
  }
  writeExamplan(saved);
};

// Build a normalized entry for a question (answered or unattempted)
const makeEntry = ({
  subject,
  question,
  question_id,
  chapterName,
  selectedAnswer, // null => unattempted
  correctAnswer,
}) => {
  const isCorrect = selectedAnswer != null && selectedAnswer === correctAnswer;
  return {
    subject,
    question,
    question_id,
    chapterName,
    selectedAnswer, // null means unattempted
    isCorrect,
    correctAnswer,
  };
};

const subjects = [
  { name: "Physics", icon: <FaAtom className="text-lg text-blue-500" /> },
  { name: "Chemistry", icon: <FaFlask className="text-lg text-green-500" /> },
  { name: "Biology", icon: <FaDna className="text-lg text-red-500" /> },
];

const TestInterface = () => {
  const router = useRouter();

  // State
  const [questionsData, setQuestionsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSubject, setCurrentSubject] = useState("Physics");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timer, setTimer] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [allocatedQuestions, setAllocatedQuestions] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [testEndTime, setTestEndTime] = useState(null);

  // For mobile overlays
  const [showNavModal, setShowNavModal] = useState(false);

  // Ensure an "unattempted" placeholder exists for (subject, qIndex)
  const ensureUnattemptedEntry = (
    questionsData,
    subject,
    qIndex,
    questionInfo = []
  ) => {
    const q = questionsData?.[subject]?.[qIndex];
    if (!q) return;

    const saved = readExamplan();
    const exists = saved.some((x) => x.question_id === q.id);
    if (exists) return;

    const info = Array.isArray(questionInfo) ? questionInfo : [];
    const map = new Map(info.map((i) => [i.questionIds, i.chapterName]));
    const chapterName = map.get(q.id) || "Unknown Chapter";

    const entry = makeEntry({
      subject,
      question: q.question,
      question_id: q.id,
      chapterName,
      selectedAnswer: null, // <-- unattempted
      correctAnswer: q.correctOption,
    });

    upsertExamplanEntry(entry);
  };

  // Ensure first question has an unattempted entry once data & subject are ready
  useEffect(() => {
    if (!questionsData[currentSubject]) return;
    const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || [];
    ensureUnattemptedEntry(questionsData, currentSubject, 0, questionInfo);
  }, [questionsData, currentSubject]);

  // Handle full screen escape
  // useEffect(() => {
  //   const handleFullScreenChange = () => {
  //     if (
  //       !document.fullscreenElement &&
  //       !document.webkitFullscreenElement &&
  //       !document.mozFullscreenElement &&
  //       !document.msFullscreenElement
  //     ) {
  //       router.push("/testselection");
  //     }
  //   };
  //   document.addEventListener("fullscreenchange", handleFullScreenChange);
  //   document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
  //   document.addEventListener("mozfullscreenchange", handleFullScreenChange);
  //   document.addEventListener("MSFullscreenChange", handleFullScreenChange);

  //   return () => {
  //     document.removeEventListener("fullscreenchange", handleFullScreenChange);
  //     document.removeEventListener(
  //       "webkitfullscreenchange",
  //       handleFullScreenChange
  //     );
  //     document.removeEventListener(
  //       "mozfullscreenchange",
  //       handleFullScreenChange
  //     );
  //     document.removeEventListener(
  //       "MSFullscreenChange",
  //       handleFullScreenChange
  //     );
  //   };
  // }, [router]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/question/fetch-questions`
        );
        const data = response.data;
        const subjectWiseQuestions = {
          Physics: [],
          Chemistry: [],
          Biology: [],
        };

        data.questions.forEach((item) => {
          const subject = item.question.subject;
          subjectWiseQuestions[subject]?.push({
            id: item.question.id,
            question: item.question.question_text,
            options: item.options.map((opt) => opt.option_text),
            correctOption: item.options.find((opt) => opt.is_correct)
              ?.option_text,
          });
        });
        setQuestionsData(subjectWiseQuestions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const startTestData = JSON.parse(localStorage.getItem("startTest"));
    if (startTestData) {
      setCurrentSubject(startTestData.subject);
      const allocatedQuestions = startTestData.allocatedQuestions || 0;
      setAllocatedQuestions(allocatedQuestions);
      setTimer(allocatedQuestions * 60);
      const endTime = new Date();
      endTime.setSeconds(endTime.getSeconds() + allocatedQuestions * 60);
      setTestEndTime(endTime);
      setLastIndex(allocatedQuestions);

      const filteredSubject = subjects.filter(
        (subject) => subject.name === startTestData.subject
      );
      setSelectedSubjects(filteredSubject);
      setVisitedQuestions({ [`${startTestData.subject}-0`]: true });
    }
  }, []);

  useEffect(() => {
    if (testEndTime) {
      const countdown = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((testEndTime - now) / 1000);
        if (diff <= 0) {
          clearInterval(countdown);
          setTimer(0);
          handleSubmit();
        } else {
          setTimer(diff);
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [testEndTime]);

  const formattedTime = {
    hours: Math.floor(timer / 3600),
    minutes: Math.floor((timer % 3600) / 60),
    seconds: timer % 60,
  };

  const handleOptionClick = (index) => {
    const questionData = questionsData[currentSubject][currentQuestion];
    const selectedAnswer = questionData.options[index];
    const correctAnswer = questionData.correctOption;
    const isCorrect = selectedAnswer === correctAnswer;
    const questionId = questionData.id;

    const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || [];
    const chapterInfo = questionInfo.find(
      (item) => item.questionIds === questionId
    );
    const chapterName = chapterInfo
      ? chapterInfo.chapterName
      : "Unknown Chapter";

    const entry = makeEntry({
      subject: currentSubject,
      question: questionData.question,
      question_id: questionData.id,
      chapterName,
      selectedAnswer, // answered now
      correctAnswer,
    });
    upsertExamplanEntry(entry);

    setAnswers({ ...answers, [`${currentSubject}-${currentQuestion}`]: index });
    setVisitedQuestions({
      ...visitedQuestions,
      [`${currentSubject}-${currentQuestion}`]: true,
    });
  };

  const handleNavigation = (direction) => {
    const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || [];

    if (direction === "next") {
      const nextIndex =
        currentQuestion >= lastIndex - 1 ? 0 : currentQuestion + 1;

      // ensure placeholder for target
      ensureUnattemptedEntry(
        questionsData,
        currentSubject,
        nextIndex,
        questionInfo
      );

      setCurrentQuestion(nextIndex);
      setVisitedQuestions({
        ...visitedQuestions,
        [`${currentSubject}-${nextIndex}`]: true,
      });
    } else if (direction === "prev" && currentQuestion > 0) {
      const prevIndex = currentQuestion - 1;

      ensureUnattemptedEntry(
        questionsData,
        currentSubject,
        prevIndex,
        questionInfo
      );

      setCurrentQuestion(prevIndex);
      setVisitedQuestions({
        ...visitedQuestions,
        [`${currentSubject}-${prevIndex}`]: true,
      });
    }
  };

  const handleReviewLater = () => {
    setMarkedForReview({
      ...markedForReview,
      [`${currentSubject}-${currentQuestion}`]: true,
    });
    handleNavigation("next");
  };

  const handleClearResponse = () => {
    // Clear in UI
    const updatedAnswers = { ...answers };
    delete updatedAnswers[`${currentSubject}-${currentQuestion}`];
    setAnswers(updatedAnswers);

    // Upsert unattempted placeholder (instead of deleting from localStorage)
    const q = questionsData[currentSubject][currentQuestion];
    const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || [];
    const chapterInfo = questionInfo.find((item) => item.questionIds === q.id);
    const chapterName = chapterInfo
      ? chapterInfo.chapterName
      : "Unknown Chapter";

    const entry = makeEntry({
      subject: currentSubject,
      question: q.question,
      question_id: q.id,
      chapterName,
      selectedAnswer: null, // mark as unattempted
      correctAnswer: q.correctOption,
    });
    upsertExamplanEntry(entry);
  };

  const handleSubmit = async () => {
    // Ensure all questions are tracked
    const ensureAllQuestionsTracked = () => {
      const questionInfo =
        JSON.parse(localStorage.getItem("questionInfo")) || [];
      for (let i = 0; i < lastIndex; i++) {
        ensureUnattemptedEntry(questionsData, currentSubject, i, questionInfo);
      }
    };
    ensureAllQuestionsTracked();

    if (isSubmitting) return;

    // const confirmSubmit = window.confirm(
    //   "Are you sure you want to submit this test?"
    // );
    // if (!confirmSubmit) return;

    setIsSubmitting(true);
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.error("Authentication failed! Please log in again.", {
        duration: 5000,
      });
      setIsSubmitting(false);
      return;
    }

    const endTime = new Date().toISOString();
    const startTime =
      localStorage.getItem("testStartTime") || new Date().toISOString();

    let correctAnswers = [],
      wrongAnswers = [],
      notAttempted = [];
    let totalMarks = 0;

    const savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];

    savedAnswers.forEach((answer) => {
      const {
        question_id,
        selectedAnswer,
        correctAnswer,
        isCorrect,
        subject,
        chapterName,
      } = answer;

      const marks = isCorrect ? 4 : selectedAnswer == null ? 0 : -1;
      const questionData = [
        question_id,
        subject,
        chapterName,
        selectedAnswer,
        correctAnswer,
        marks,
        0,
      ];

      if (selectedAnswer == null) {
        notAttempted.push([question_id, subject, chapterName]);
      } else if (isCorrect) {
        correctAnswers.push(questionData);
      } else {
        wrongAnswers.push(questionData);
      }
      totalMarks += marks;
    });

    // ✅ Create testName dynamically (example: "System Assigned Test - <date>")
    const testName =
      localStorage.getItem("currentTestName") ||
      `System Test - ${new Date().toLocaleDateString("en-GB")}`;

    const testResults = {
      correctAnswers,
      wrongAnswers,
      notAttempted,
      startTime,
      endTime,
      total_marks: totalMarks,
      testName, // ✅ Send to backend
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/fulltest/submit`,
        testResults,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Test submitted successfully!", { duration: 5000 });
        window.location.href = "/result";
      } else {
        toast.error("Failed to submit test.", { duration: 5000 });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error(
        `Error: ${error.response?.data?.error || "Something went wrong"}`,
        { duration: 5000 }
      );
      setIsSubmitting(false);
    }
  };

  const getAnsweredCount = () =>
    Object.keys(answers).filter((key) => key.startsWith(currentSubject)).length;
  const getMarkedForReviewCount = () =>
    Object.keys(markedForReview).filter((key) => key.startsWith(currentSubject))
      .length;
  const getNotVisitedCount = () =>
    lastIndex -
    Object.keys(visitedQuestions).filter((key) =>
      key.startsWith(currentSubject)
    ).length;

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">
            <FaTimesCircle className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {" "}
            No Tests Found
          </h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  // MOBILE RENDER STARTS HERE
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white py-3 px-4 shadow-sm flex items-center justify-between">
        <img src="/neet720_logo.jpg" alt="Logo" className="h-12" />
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <FaRegClock className="text-xl text-blue-600" />
            <span className="font-mono bg-blue-600 text-white px-2 py-0.5 rounded">
              {String(formattedTime.hours).padStart(2, "0")}
            </span>
            <span className="text-blue-900 font-bold">:</span>
            <span className="font-mono bg-blue-600 text-white px-2 py-0.5 rounded">
              {String(formattedTime.minutes).padStart(2, "0")}
            </span>
            <span className="text-blue-900 font-bold">:</span>
            <span className="font-mono bg-blue-600 text-white px-2 py-0.5 rounded">
              {String(formattedTime.seconds).padStart(2, "0")}
            </span>
          </div>
          {/* Subject tabs */}
          {selectedSubjects.map((subject) => (
            <button
              key={subject.name}
              className={`px-2 py-1 rounded transition-all text-xs flex items-center gap-1 ${
                currentSubject === subject.name
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                setCurrentSubject(subject.name);
                setCurrentQuestion(0);
              }}
            >
              {subject.icon} {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Question Box */}
      <div className="flex-1 flex flex-col px-1 pt-2">
        <div className="bg-white rounded-xl shadow border mx-1 mt-2 flex flex-col overflow-hidden">
          {/* Question progress */}
          <div className="px-4 py-2 flex justify-between items-center border-b bg-gray-50">
            <span className="text-xs text-blue-600 font-bold">
              Q {currentQuestion + 1} / {lastIndex}
            </span>
            <span
              className={`text-xs rounded px-2 py-0.5 font-semibold ${
                markedForReview[`${currentSubject}-${currentQuestion}`]
                  ? "bg-amber-100 text-amber-800"
                  : answers[`${currentSubject}-${currentQuestion}`] !==
                    undefined
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {markedForReview[`${currentSubject}-${currentQuestion}`]
                ? "Marked for Review"
                : answers[`${currentSubject}-${currentQuestion}`] !== undefined
                ? "Answered"
                : "Not Answered"}
            </span>
          </div>
          {/* Question */}
          <div className="p-4">
            <div className="mb-3 flex items-center">
              <img
                src="/question.png"
                alt="Q"
                className="h-10 w-10 rounded object-contain mr-2 border"
              />
              <span className="text-md font-medium">
                {questionsData[currentSubject]?.[currentQuestion]?.question ||
                  "No Question Available"}
              </span>
            </div>
            {/* Options */}
            <div className="space-y-2 mt-4">
              {questionsData[currentSubject]?.[currentQuestion]?.options.map(
                (option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-3 py-3 rounded-lg border flex items-center ${
                      answers[`${currentSubject}-${currentQuestion}`] === index
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white border-gray-200"
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    <span
                      className={`w-6 h-6 mr-3 flex items-center justify-center rounded-full border ${
                        answers[`${currentSubject}-${currentQuestion}`] ===
                        index
                          ? "border-white bg-white/20"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <div className="border-4 border-gray-50 rounded-full"></div>
                    </span>
                    <span>{option}</span>
                  </button>
                )
              )}
            </div>
            {/* Actions: Clear/Review */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleClearResponse}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs"
              >
                Clear Response
              </button>
              <button
                onClick={handleReviewLater}
                className="flex-1 py-2 bg-amber-500 text-white rounded-lg text-xs flex items-center justify-center"
              >
                <FaFlag className="mr-1" />
                Mark for Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Nav */}
      <div className="fixed left-0 right-0 bottom-0 bg-white shadow-lg border-t z-40 flex items-center justify-between px-1 py-2">
        <button
          onClick={() => handleNavigation("prev")}
          disabled={currentQuestion === 0}
          className={`flex-1 mx-1 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm ${
            currentQuestion === 0 && "opacity-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setShowNavModal(true)}
          className="flex-1 mx-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm"
        >
          Questions
        </button>
        <button
          onClick={() => handleNavigation("next")}
          className="flex-1 mx-1 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm"
        >
          Next
        </button>
        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={isSubmitting}
          className="flex-1 mx-1 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-bold text-sm"
        >
          {isSubmitting ? (
            <div className="mx-auto h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>

      {/* Questions Navigation Modal */}
      {showNavModal && (
        <div className="fixed z-50 inset-0 bg-black/50 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-4 pb-12 max-h-[65vh]">
            <div className="flex items-center mb-2">
              <span className="text-lg font-bold flex-1">
                Questions Overview
              </span>
              <button
                onClick={() => setShowNavModal(false)}
                className="text-2xl px-2"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>Answered (
                {getAnsweredCount()})
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>Not Answered (
                {allocatedQuestions - getAnsweredCount() - getNotVisitedCount()}
                )
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>Not Visited (
                {getNotVisitedCount()})
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-500 rounded"></div>For Review (
                {getMarkedForReviewCount()})
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: allocatedQuestions }).map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center text-xs rounded-md ${
                    currentQuestion === index
                      ? "bg-blue-600 text-white border-2 border-blue-700"
                      : markedForReview[`${currentSubject}-${index}`]
                      ? "bg-amber-500 text-white"
                      : answers[`${currentSubject}-${index}`] !== undefined
                      ? "bg-green-500 text-white"
                      : visitedQuestions[`${currentSubject}-${index}`]
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => {
                    const questionInfo =
                      JSON.parse(localStorage.getItem("questionInfo")) || [];
                    // ✅ ensure an 'unattempted' placeholder exists before jumping
                    ensureUnattemptedEntry(
                      questionsData,
                      currentSubject,
                      index,
                      questionInfo
                    );

                    setCurrentQuestion(index);
                    setShowNavModal(false);
                    if (!visitedQuestions[`${currentSubject}-${index}`]) {
                      setVisitedQuestions({
                        ...visitedQuestions,
                        [`${currentSubject}-${index}`]: true,
                      });
                    }
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Confirm Submit Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Test Submission
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this test? Once submitted, you
              cannot change your answers.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowConfirmModal(false);
                  await handleSubmit();
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterface;

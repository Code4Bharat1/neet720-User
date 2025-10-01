"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaAtom,
  FaFlask,
  FaDna,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaEraser,
  FaBolt,
} from "react-icons/fa";
import { MdFlag, MdDone, MdVisibility } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";

const subjectIcons = {
  Physics: {
    icon: FaAtom,
    color: "text-blue-600",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
  },
  Chemistry: {
    icon: FaFlask,
    color: "text-green-600",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
  },
  Biology: {
    icon: FaDna,
    color: "text-red-600",
    gradientFrom: "from-red-400",
    gradientTo: "to-red-600",
  },
};

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return { hours: hrs, minutes: mins, seconds: secs };
};

const TestInterfacePYQ = () => {
  const router = useRouter();

  const [questionsData, setQuestionsData] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours
  const [submitted, setSubmitted] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(null);
  const [showQuestionPanel, setShowQuestionPanel] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const selectedYear = localStorage.getItem("selectedYear");
        if (!selectedYear) {
          setError("No year selected. Please go back and choose a year.");
          setLoading(false);
          return;
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/pyq-questions`,
          { year: selectedYear }
        );
        setQuestionsData(response.data);
        setSelectedSubjects(Object.keys(response.data));
        setCurrentSubject(Object.keys(response.data)[0]);
      } catch (err) {
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Clear marks at start
    localStorage.removeItem("marks");
    localStorage.removeItem("wrongQuestions"); // reset mistakes for a fresh test
    localStorage.removeItem("scoreSummary"); // reset mistakes for a fresh test
    localStorage.removeItem("scoreTotal"); // reset mistakes for a fresh test
    localStorage.removeItem("scoreMax"); // reset mistakes for a fresh test
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [submitted]);

  // --- Normalizers & resolver ---
  const canonical = (s) => (s ?? "").toString().replace(/\s+/g, " ").trim();

  const resolveCorrectKey = (options, correctAnswer) => {
    // 1) If API gives a letter (A/B/C/D)
    const ca = canonical(correctAnswer);
    if (/^[A-D]$/i.test(ca)) return ca.toLowerCase(); // "B" -> "b"

    // 2) If API gives the FULL option text (with random spaces)
    for (const [k, v] of Object.entries(options || {})) {
      if (canonical(v) === ca) return k.toLowerCase(); // match by cleaned text
    }

    // 3) Couldn’t resolve (bad/missing data) → return null and skip scoring
    return null;
  };

  // ---- Wrong answers storage helpers ----
  const WRONG_KEY = "wrongQuestions";

  const readWrong = () => {
    try {
      return JSON.parse(localStorage.getItem(WRONG_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const writeWrong = (list) => {
    localStorage.setItem(WRONG_KEY, JSON.stringify(list));
  };

  // Add or update a wrong-answer entry
  const upsertWrong = ({
    subject,
    qIdx,
    question,
    options,
    selectedKey,
    correctKey,
  }) => {
    const list = readWrong();
    const id = `${subject}-${qIdx}`;
    const entry = {
      id,
      subject,
      qIdx,
      question,
      options, // keep full options object for review screen
      selectedKey, // what user chose
      correctKey, // the correct option key
      at: Date.now(), // timestamp for sorting
    };
    const i = list.findIndex((x) => x.id === id);
    if (i >= 0) list[i] = entry;
    else list.push(entry);
    writeWrong(list);
  };

  // Remove an entry (e.g., if user corrected the answer or cleared it)
  const removeWrong = (subject, qIdx) => {
    const id = `${subject}-${qIdx}`;
    writeWrong(readWrong().filter((x) => x.id !== id));
  };

  // Helper to store marks live (prevents double counting)
  const updateMarks = (subject, qIdx, selectedKey) => {
    const q = questionsData[subject][qIdx];
    if (!q) return;

    const correctKey = resolveCorrectKey(q.options, q.correctAnswer);
    if (!correctKey) return; // skip if we can't resolve

    const sel = (selectedKey || "").toLowerCase();
    const key = `${subject}-${qIdx}`;
    const prev = (answers[key] || "").toLowerCase();

    let marks = JSON.parse(localStorage.getItem("marks") || "{}");
    if (!(subject in marks)) marks[subject] = 0;

    // Undo previous effect
    if (prev) {
      marks[subject] += prev === correctKey ? -4 : +1;
    }
    // Apply new pick
    marks[subject] += sel === correctKey ? +4 : -1;

    localStorage.setItem("marks", JSON.stringify(marks));
  };

  const handleOptionClick = (subject, qIdx, selectedKey) => {
    if (submitted) return;
    const currentQ = questionsData[subject][qIdx];
    const correctKey = currentQ.correctAnswer;

    setAnswers((prev) => ({
      ...prev,
      [`${subject}-${qIdx}`]: selectedKey,
    }));
    setVisitedQuestions((prev) => ({
      ...prev,
      [`${subject}-${qIdx}`]: true,
    }));

    // marks update (your existing logic)
    updateMarks(subject, qIdx, selectedKey, correctKey);

    // ---- wrong-answers bookkeeping ----
    if (selectedKey !== correctKey) {
      upsertWrong({
        subject,
        qIdx,
        question: currentQ.question,
        options: currentQ.options,
        selectedKey,
        correctKey,
      });
    } else {
      // user corrected it to the right answer → remove from mistakes
      removeWrong(subject, qIdx);
    }
  };

  const handleNavigation = (direction) => {
    const numQuestions = questionsData[currentSubject]?.length || 0;
    if (direction === "next" && currentQuestion < numQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === "next" && currentQuestion === numQuestions - 1) {
      // next subject
      const currIdx = selectedSubjects.indexOf(currentSubject);
      if (currIdx < selectedSubjects.length - 1) {
        setCurrentSubject(selectedSubjects[currIdx + 1]);
        setCurrentQuestion(0);
      }
    } else if (direction === "prev" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReviewLater = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [`${currentSubject}-${currentQuestion}`]:
        !prev[`${currentSubject}-${currentQuestion}`],
    }));
  };

  const handleClearResponse = () => {
    const key = `${currentSubject}-${currentQuestion}`;
    const subject = currentSubject;
    const qIdx = currentQuestion;

    // adjust marks (your existing code)
    if (answers[key] !== undefined) {
      const currentQ = questionsData[subject][qIdx];
      let marks = JSON.parse(localStorage.getItem("marks") || "{}");
      if (answers[key] === currentQ.correctAnswer) marks[subject] -= 4;
      else marks[subject] += 1;
      localStorage.setItem("marks", JSON.stringify(marks));
    }

    // remove stored answer
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    // ---- also remove from mistakes store ----
    removeWrong(subject, qIdx);
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const wrong = [];
    const marksBySubject = {};
    const countsBySubject = {};
    let grandTotal = 0;
    let totalQuestions = 0;
    let totalAttempted = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    for (const subject of selectedSubjects) {
      const list = questionsData[subject] || [];
      totalQuestions += list.length;

      let subjMarks = 0;
      let subjAttempted = 0;
      let subjCorrect = 0;
      let subjWrong = 0;

      list.forEach((q, idx) => {
        const picked = (answers[`${subject}-${idx}`] || "").toLowerCase();
        const correctKey = resolveCorrectKey(q.options, q.correctAnswer);
        if (!picked || !correctKey) return;

        subjAttempted++;
        if (picked === correctKey) {
          subjCorrect++;
          subjMarks += 4;
        } else {
          subjWrong++;
          subjMarks -= 1;
          // Blind storage: don't include the correct answer here
          wrong.push({
            id: `${subject}-${idx}`,
            subject,
            qIdx: idx,
            question: q.question,
            options: q.options,
            chosen: picked,
            at: Date.now(),
          });
        }
      });

      marksBySubject[subject] = subjMarks;
      countsBySubject[subject] = {
        attempted: subjAttempted,
        correct: subjCorrect,
        wrong: subjWrong,
        unattempted: list.length - subjAttempted,
        questions: list.length,
        max: list.length * 4,
      };

      grandTotal += subjMarks;
      totalAttempted += subjAttempted;
      totalCorrect += subjCorrect;
      totalWrong += subjWrong;
    }

    const maxMarks = totalQuestions * 4;

    // Store everything for /resultPYQ
    localStorage.setItem("wrongQuestions", JSON.stringify(wrong));
    localStorage.setItem("finalMarks", JSON.stringify(marksBySubject));
    localStorage.setItem(
      "scoreSummary",
      JSON.stringify({
        total: grandTotal,
        max: maxMarks,
        totalQuestions,
        attempted: totalAttempted,
        correct: totalCorrect,
        wrong: totalWrong,
        unattempted: totalQuestions - totalAttempted,
        bySubject: countsBySubject,
      })
    );

    // (Optional) simple keys if you prefer:
    localStorage.setItem("scoreTotal", String(grandTotal));
    localStorage.setItem("scoreMax", String(maxMarks));

    router.push("/resultPYQ");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentQuestion > 0) {
        handleNavigation("prev");
      } else if (event.key === "ArrowRight") {
        handleNavigation("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const optsObj =
        questionsData[currentSubject]?.[currentQuestion]?.options || {};
      const entries = Object.entries(optsObj);
      if (!entries.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedOptionIndex((prev) =>
          prev === null || prev === entries.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedOptionIndex((prev) =>
          prev === null || prev === 0 ? entries.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && focusedOptionIndex !== null) {
        const [key] = entries[focusedOptionIndex];
        handleOptionClick(currentSubject, currentQuestion, key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedOptionIndex, currentQuestion, currentSubject, questionsData]);

  useEffect(() => {
    setFocusedOptionIndex(null);
  }, [currentQuestion]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-red-600">!</span>
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const numQuestions = questionsData[currentSubject]?.length || 0;
  const currentQuestionData = questionsData[currentSubject]?.[currentQuestion];
  const subjectConfig = subjectIcons[currentSubject] || subjectIcons.Physics;
  const isLowTime = timeLeft < 300; // Less than 5 min
  const formattedTime = formatTime(timeLeft);

  // Stats
  const getQuestionStats = () => {
    const total = numQuestions;
    const answered = Object.keys(answers).filter((key) =>
      key.startsWith(`${currentSubject}-`)
    ).length;
    const marked = Object.keys(markedForReview).filter(
      (key) => key.startsWith(`${currentSubject}-`) && markedForReview[key]
    ).length;
    const visited = Object.keys(visitedQuestions).filter((key) =>
      key.startsWith(`${currentSubject}-`)
    ).length;
    const notVisited = total - visited;
    return { total, answered, marked, visited, notVisited };
  };
  const stats = getQuestionStats();

  // --- overall max marks across all subjects (safe to show) ---
  const totalQuestionsAll = Object.values(questionsData).reduce(
    (sum, arr) => sum + ((arr && arr.length) || 0),
    0
  );
  const totalMaxMarks = totalQuestionsAll * 4; // NEET pattern: +4 per question

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            {/* Timer */}
            <div className="relative w-full sm:w-auto flex justify-center sm:justify-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`p-2 rounded-full ${
                    isLowTime ? "bg-red-100 animate-pulse" : "bg-blue-100"
                  }`}
                >
                  <FaClock
                    className={`text-lg sm:text-xl ${
                      isLowTime ? "text-red-600" : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex gap-1">
                  <div
                    className={`${
                      isLowTime ? "bg-red-600 animate-pulse" : "bg-gray-900"
                    } text-white px-2 sm:px-3 py-1 rounded-lg font-mono text-sm sm:text-base min-w-[2.5rem] sm:min-w-[3rem] text-center`}
                  >
                    {formattedTime.hours}
                  </div>
                  <span className="text-gray-600 self-center font-bold text-sm sm:text-base">
                    :
                  </span>
                  <div
                    className={`${
                      isLowTime ? "bg-red-600 animate-pulse" : "bg-gray-900"
                    } text-white px-2 sm:px-3 py-1 rounded-lg font-mono text-sm sm:text-base min-w-[2.5rem] sm:min-w-[3rem] text-center`}
                  >
                    {formattedTime.minutes}
                  </div>
                  <span className="text-gray-600 self-center font-bold text-sm sm:text-base">
                    :
                  </span>
                  <div
                    className={`${
                      isLowTime ? "bg-red-600 animate-pulse" : "bg-gray-900"
                    } text-white px-2 sm:px-3 py-1 rounded-lg font-mono text-sm sm:text-base min-w-[2.5rem] sm:min-w-[3rem] text-center`}
                  >
                    {formattedTime.seconds}
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Tabs */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {/* Subject Tabs */}
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0 px-1">
                {selectedSubjects.map((subject) => {
                  const SubjectIcon = subjectIcons[subject]?.icon || FaAtom;
                  const isActive = currentSubject === subject;
                  const config = subjectIcons[subject] || subjectIcons.Physics;
                  return (
                    <button
                      key={subject}
                      onClick={() => {
                        setCurrentSubject(subject);
                        setCurrentQuestion(0);
                      }}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all transform hover:scale-105 whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                        isActive
                          ? `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white shadow-lg`
                          : "bg-white/80 text-gray-700 hover:bg-white/90 shadow border border-gray-200"
                      }`}
                    >
                      <SubjectIcon
                        className={`text-base sm:text-lg ${
                          isActive ? "text-white" : config.color
                        }`}
                      />
                      <span className="font-medium">{subject}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-white" : config.color
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={submitted}
              className="relative overflow-hidden px-4 sm:px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
            >
              <FaBolt className="text-sm" />
              Submit Test
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="max-w-7xl mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 relative">
        {/* Mobile Toggle Button for Question Map */}
        <button
          onClick={() => setShowQuestionPanel(!showQuestionPanel)}
          className="lg:hidden fixed bottom-20 right-4 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
        >
          {showQuestionPanel ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <MdVisibility className="text-2xl" />
          )}
        </button>

        {/* Question section */}
        <div
          className={`lg:col-span-2 select-none ${
            showQuestionPanel ? "hidden lg:block" : "block"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
                <div className="w-full">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${subjectConfig.gradientFrom} ${subjectConfig.gradientTo} flex items-center justify-center text-white shadow-lg`}
                    >
                      <span className="text-lg sm:text-xl">?</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        <span
                          className={`font-semibold ${subjectConfig.color}`}
                        >
                          {currentSubject}
                        </span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span className="text-gray-500">
                          Question {currentQuestion + 1} of {numQuestions}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleReviewLater}
                      className={`p-2 sm:p-3 rounded-xl transition-all transform hover:scale-110 flex-shrink-0 ${
                        markedForReview[`${currentSubject}-${currentQuestion}`]
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title="Mark for review"
                    >
                      <MdFlag className="text-base sm:text-lg" />
                    </button>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-medium text-gray-900 leading-relaxed">
                    {currentQuestionData?.question}
                  </h2>
                  {currentQuestionData?.diagramUrl && (
                    <img
                      src={currentQuestionData.diagramUrl}
                      alt="Diagram"
                      className="my-3 sm:my-4 max-w-full sm:max-w-xs rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {currentQuestionData &&
                currentQuestionData.options &&
                typeof currentQuestionData.options === "object" ? (
                  Object.entries(currentQuestionData.options).map(
                    ([key, value], idx) => {
                      const isSelected =
                        answers[`${currentSubject}-${currentQuestion}`] === key;
                      const serialLetter = String.fromCharCode(65 + idx);
                      const inputName = `option-${currentSubject}-${currentQuestion}`;
                      return (
                        <div key={key} className="flex items-center">
                          <input
                            type="radio"
                            id={`${inputName}-${key}`}
                            name={inputName}
                            value={key}
                            checked={isSelected}
                            onChange={() =>
                              handleOptionClick(
                                currentSubject,
                                currentQuestion,
                                key
                              )
                            }
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`${inputName}-${key}`}
                            className={`flex items-start cursor-pointer w-full p-3 sm:p-5 rounded-xl border-2 transition-all hover:scale-[1.01] relative overflow-hidden select-none
  border-gray-200 bg-white hover:border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
  peer-checked:border-blue-500 peer-checked:bg-gradient-to-r peer-checked:from-blue-50 peer-checked:to-indigo-50 peer-checked:text-blue-900
  ${focusedOptionIndex === idx ? "ring-2 ring-blue-400" : ""}
`}
                          >
                            <span
                              className={`
      w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 font-bold text-base sm:text-lg mr-3 sm:mr-4 flex-shrink-0
      ${
        isSelected
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-gray-200 text-blue-600 border-gray-300"
      }
      peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500
      transition-all duration-200
    `}
                            >
                              {serialLetter}
                            </span>
                            <span className="text-sm sm:text-base leading-relaxed">
                              {value}
                            </span>
                          </label>
                        </div>
                      );
                    }
                  )
                ) : (
                  <p className="text-red-500 text-sm">Invalid options</p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            {!submitted && (
              <div className="relative z-10 pt-4 border-t border-gray-100">
                {/* Mobile Layout */}
                <div className="flex flex-col sm:hidden gap-3">
                  <button
                    onClick={handleClearResponse}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all transform hover:scale-105 w-full font-medium"
                  >
                    <FaEraser className="text-sm" />
                    Clear Response
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleNavigation("prev")}
                      disabled={currentQuestion === 0}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm font-medium"
                    >
                      <FaChevronLeft className="text-sm" />
                      Previous
                    </button>
                    <button
                      onClick={() => handleNavigation("next")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                    >
                      Next
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                  <button
                    onClick={() => setShowQuestionPanel(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                  >
                    <MdVisibility className="text-lg" />
                    View Question Map
                  </button>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex justify-between items-center">
                  <button
                    onClick={handleClearResponse}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all transform hover:scale-105"
                  >
                    <FaEraser className="text-sm" />
                    Clear Response
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleNavigation("prev")}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
                    >
                      <FaChevronLeft className="text-sm" />
                      Previous
                    </button>
                    <button
                      onClick={() => handleNavigation("next")}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Next
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Slides in on mobile */}
        <div
          className={`
    fixed lg:relative inset-0 lg:inset-auto
    lg:col-span-1
    bg-black bg-opacity-50 lg:bg-transparent
    z-50 lg:z-auto
    transition-all duration-300 ease-in-out
    ${showQuestionPanel ? "block" : "hidden lg:block"}
  `}
        >
          <div
            className={`
      absolute lg:relative
      right-0 top-0 bottom-0
      w-[85%] sm:w-96 lg:w-full
      bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 lg:bg-transparent
      shadow-2xl lg:shadow-none
      h-full
      transform transition-transform duration-300 ease-in-out
      overflow-y-auto
      ${
        showQuestionPanel
          ? "translate-x-0"
          : "translate-x-full lg:translate-x-0"
      }
    `}
          >
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
              {/* Close button for mobile */}
              <button
                onClick={() => setShowQuestionPanel(false)}
                className="lg:hidden absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-800 bg-white rounded-full p-2 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Progress Card */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <HiOutlineSparkles className="text-lg sm:text-xl" />
                    <h3 className="font-bold text-base sm:text-lg">
                      Test Progress
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MdDone className="text-green-300 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm">Answered</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold">
                        {stats.answered}/{stats.total}
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MdFlag className="text-red-300 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm">Marked</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold">
                        {stats.marked}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-white/20 rounded-full h-2">
                    <div
                      className="h-full bg-yellow-300 rounded-full transition-all duration-500"
                      style={{
                        width: `${(stats.answered / stats.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-center mt-2">
                    {Math.round((stats.answered / stats.total) * 100)}% complete
                  </p>
                  <p className="text-[11px] text-center mt-1 opacity-90">
                    Max Marks (All Subjects):{" "}
                    <span className="font-semibold">{totalMaxMarks}</span>
                  </p>
                </div>
              </div>

              {/* Question Map */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                    <MdVisibility className="text-sm sm:text-base" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    Question Map
                  </h3>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {questionsData[currentSubject]?.map((_, index) => {
                    const isCurrentQuestion = currentQuestion === index;
                    const isAnswered =
                      answers[`${currentSubject}-${index}`] !== undefined;
                    const isMarked =
                      markedForReview[`${currentSubject}-${index}`];
                    const isVisited =
                      visitedQuestions[`${currentSubject}-${index}`];
                    let buttonClass =
                      "w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all transform hover:scale-110 relative ";
                    if (isCurrentQuestion) {
                      buttonClass +=
                        "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg scale-110";
                    } else if (isMarked) {
                      buttonClass +=
                        "bg-gradient-to-br from-red-500 to-pink-500 text-white";
                    } else if (isAnswered) {
                      buttonClass +=
                        "bg-gradient-to-br from-green-500 to-emerald-500 text-white";
                    } else if (isVisited) {
                      buttonClass +=
                        "bg-gradient-to-br from-orange-400 to-pink-400 text-white";
                    } else {
                      buttonClass +=
                        "bg-gray-100 text-gray-600 hover:bg-gray-200";
                    }
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentQuestion(index);
                          setShowQuestionPanel(false); // Close panel on mobile
                        }}
                        className={buttonClass}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CSS for shimmer/floats */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Submit Test?
              </h3>

              {/* Description */}
              <div className="mb-6">
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Are you sure you want to submit your test? Once submitted, you
                  won't be able to change your answers.
                </p>

                {/* Stats Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-semibold text-green-600">
                      {stats.answered} / {stats.total}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Marked for Review:</span>
                    <span className="font-semibold text-amber-600">
                      {stats.marked}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Not Visited:</span>
                    <span className="font-semibold text-gray-600">
                      {stats.notVisited}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    handleSubmit();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-lg text-sm sm:text-base order-1 sm:order-2"
                >
                  Yes, Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterfacePYQ;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { FaFlask, FaAtom, FaDna, FaEye } from "react-icons/fa";

// Icon and background color mappings for subjects
const subjectMapping = {
  Physics: {
    icon: <FaAtom className="text-red-500 text-xl" />,
    bgColor: "bg-red-100",
  },
  Chemistry: {
    icon: <FaFlask className="text-yellow-500 text-xl" />,
    bgColor: "bg-yellow-100",
  },
  Biology: {
    icon: <FaDna className="text-green-500 text-xl" />,
    bgColor: "bg-green-100",
  },
  Botany: {
    icon: <FaEye className="text-purple-500 text-xl" />,
    bgColor: "bg-purple-100",
  },
};

// -------- helpers ----------
const readJSON = (key, fallback) => {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
};

// convert milliseconds to "mm:ss"
const msToClock = (ms) => {
  if (!ms || ms < 0) return "00:00";
  const sec = Math.round(ms / 1000);
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
};

// keep latest attempt per (subject + question)
const dedupeAnswers = (answers) => {
  const byKey = new Map();
  for (const a of answers) {
    const key = `${a.subject}::${a.question}`;
    const prev = byKey.get(key);
    if (!prev || new Date(a.timestamp) > new Date(prev.timestamp)) {
      byKey.set(key, a);
    }
  }
  return Array.from(byKey.values());
};

const ResultPage = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [totalPossibleMarks, setTotalPossibleMarks] = useState(0);
  const [timeTakenStr, setTimeTakenStr] = useState("00:00");

  useEffect(() => {
    // 1) Read all storages
    const rawAnswers = readJSON("testAnswers", []);
    const answers = dedupeAnswers(Array.isArray(rawAnswers) ? rawAnswers : []);

    const timeSpentObj = readJSON("timeSpent", {}); // { "Physics-0": 1755..., ... }
    // handle either key: "visitedQuestions" or "visited questions"
    const visitedObj =
      readJSON("visitedQuestions", null) ??
      readJSON("visited questions", {}) ??
      {};

    // marks per correct question (you shared 5)
    let marksPerQuestion = 4;
    const storedTM = localStorage.getItem("totalMarks");
    if (storedTM !== null) {
      const n = Number(storedTM);
      marksPerQuestion = Number.isFinite(n) && n > 0 ? n : 4;
    }

    // 2) Time taken (first to last interaction)
    const ts = Object.values(timeSpentObj)
      .map(Number)
      .filter((v) => Number.isFinite(v));
    const totalDuration =
      ts.length >= 2 ? Math.max(...ts) - Math.min(...ts) : 0;
    setTimeTakenStr(msToClock(totalDuration));

    // 3) Overall score (+marksPerQuestion / -1)
    const totalScore = answers.reduce(
      (s, a) => s + (a.isCorrect ? marksPerQuestion : -1),
      0
    );
    setScore(totalScore);

    // 4) Per-subject aggregates
    const answeredCountBySubj = {};
    const scoreBySubj = {};
    for (const a of answers) {
      answeredCountBySubj[a.subject] =
        (answeredCountBySubj[a.subject] || 0) + 1;
      scoreBySubj[a.subject] =
        (scoreBySubj[a.subject] || 0) + (a.isCorrect ? marksPerQuestion : -1);
    }

    const visitedCountBySubj = {};
    Object.entries(visitedObj).forEach(([key, v]) => {
      if (!v) return;
      const subj = key.split("-")[0];
      visitedCountBySubj[subj] = (visitedCountBySubj[subj] || 0) + 1;
    });

    // Prefer selectedSubjects if present
    const selectedSubjects = readJSON("selectedSubjects", []);
    const allSubjects = (
      selectedSubjects.length
        ? selectedSubjects
        : Array.from(
            new Set([
              ...Object.keys(answeredCountBySubj),
              ...Object.keys(visitedCountBySubj),
            ])
          )
    ).filter(Boolean);

    const subjectRows = allSubjects.map((subj) => {
      const qCount = Math.max(
        visitedCountBySubj[subj] || 0,
        answeredCountBySubj[subj] || 0
      );
      const map = subjectMapping[subj] || {};
      return {
        name: subj,
        score: scoreBySubj[subj] || 0,
        max: qCount * marksPerQuestion,
        icon: map.icon || <FaAtom className="text-gray-500 text-xl" />,
        bgColor: map.bgColor || "bg-gray-100",
      };
    });
    setSubjects(subjectRows);

    // 5) Overall max marks
    const totalVisited = Object.values(visitedObj).filter(Boolean).length;
    const totalAnswered = answers.length;
    const totalQuestions = Math.max(totalVisited, totalAnswered);
    const overallMax = totalQuestions * marksPerQuestion;
    setTotalPossibleMarks(overallMax);

    // 6) Confetti
    let timer;
    if (overallMax > 0 && (totalScore / overallMax) * 100 >= 70) {
      setShowConfetti(true);
      timer = setTimeout(() => setShowConfetti(false), 6000);
    }
    return () => timer && clearTimeout(timer);
  }, []);

  const handleRetakeTest = () => {
    router.replace("/testinterfaceGT");
    localStorage.removeItem("testAnswers");
  };

  return (
    <div className="min-h-screen w-full overflow-auto flex items-center justify-center bg-gray-100 relative p-4 sm:p-0">
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )}

      <div className="w-full max-w-6xl min-h-screen sm:min-h-0 sm:h-auto flex flex-col md:flex-row bg-white shadow-lg rounded-2xl sm:rounded-2xl overflow-hidden my-4 sm:my-0">
        {/* Left Section - Overall Score Display */}
        <motion.div
          className="w-full md:w-[40%] min-h-[40vh] md:min-h-full bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] flex flex-col items-center justify-center text-white p-6 sm:p-8 rounded-t-3xl md:rounded-t-none md:rounded-r-3xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Your Result
          </motion.h2>
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-gradient-to-b from-[#ADE8F4] to-[#0077B6] rounded-full flex flex-col items-center justify-center mt-4 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.span className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {score}
            </motion.span>
            <motion.span className="text-base sm:text-lg md:text-xl">
              of {totalPossibleMarks}
            </motion.span>
          </motion.div>
          <motion.h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 text-center px-4">
            {totalPossibleMarks > 0 && (score / totalPossibleMarks) * 100 >= 70
              ? "Excellent 🎉"
              : "Keep Improving 💪"}
          </motion.h3>
          <motion.p className="text-sm sm:text-base text-center px-4 sm:px-6 mt-2">
            Your percentage:{" "}
            <span className="font-bold text-lg sm:text-xl">
              {totalPossibleMarks > 0
                ? Math.round((score / totalPossibleMarks) * 100)
                : 0}
              %
            </span>
          </motion.p>
          <motion.p className="text-sm sm:text-base opacity-90 mt-1">
            Time taken: <span className="font-semibold">{timeTakenStr}</span>
          </motion.p>
        </motion.div>

        {/* Right Section - Subject Summary and Actions */}
        <motion.div
          className="w-full md:w-[60%] min-h-[60vh] md:min-h-full p-4 sm:p-6 md:p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-4 sm:mb-6 text-center md:text-left">
            Summary
          </motion.h2>

          {/* Render Subject Scores */}
          <div className="w-full space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name || index}
                className={`w-full p-3 sm:p-4 rounded-2xl sm:rounded-3xl ${subject.bgColor} shadow-sm`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.45 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-lg sm:text-xl">{subject.icon}</div>
                    <span className="font-semibold text-gray-700 text-sm sm:text-base">
                      {subject.name}
                    </span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">
                    {subject.score} / {subject.max}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 items-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button
              className="bg-[#303B59] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl w-full sm:w-72 md:w-64 text-center hover:bg-gray-800 transition-all shadow-md font-medium text-sm sm:text-base"
              onClick={()=>{handleRetakeTest();
                localStorage.removeItem("testAnswers");
                localStorage.removeItem("questionTime");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retake Test
            </motion.button>
            <motion.button
              className="bg-[#303B59] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl w-full sm:w-72 md:w-64 text-center hover:bg-gray-800 transition-all shadow-md font-medium text-sm sm:text-base"
              onClick={() => {router.replace("/testselection");
                localStorage.removeItem("testAnswers");
                localStorage.removeItem("questionTime");
                localStorage.removeItem("selectedChapters");
                localStorage.removeItem("testName");
                localStorage.removeItem("testid");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;

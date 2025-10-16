"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { FaFlask, FaAtom, FaDna } from "react-icons/fa";

// ======= Scoring config =======
const MARKS_CORRECT = 4;
const MARKS_WRONG = 0; // change to -1 if you want negative marking

// ======= Subjects metadata (icons and colors) =======
const subjectIcons = {
  Physics: <FaAtom className="text-red-500 text-xl" />,
  Chemistry: <FaFlask className="text-yellow-500 text-xl" />,
  Biology: <FaDna className="text-green-500 text-xl" />,
  Botany: <FaDna className="text-green-500 text-xl" />,
  Zoology: <FaDna className="text-green-500 text-xl" />,
};
const subjectBgColors = {
  Physics: "bg-red-100",
  Chemistry: "bg-yellow-100",
  Biology: "bg-green-100",
  Botany: "bg-green-100",
  Zoology: "bg-green-100",
};

function normalizeExamplan(rawVal) {
  // Accept:
  // - Array of entries
  // - Single entry object
  // - Object keyed by question_id → entry
  try {
    const parsed = typeof rawVal === "string" ? JSON.parse(rawVal) : rawVal;
    if (!parsed) return [];
    if (Array.isArray(parsed)) return parsed;

    // If it looks like a single entry with 'subject' and 'question_id'
    if (parsed.subject && parsed.question_id) return [parsed];

    // If it's a dictionary keyed by IDs
    const vals = Object.values(parsed);
    if (vals.length && typeof vals[0] === "object" && "subject" in vals[0]) {
      return vals;
    }

    return [];
  } catch {
    return [];
  }
}

// put this near normalizeExamplan()
function getStartTest() {
  try {
    const raw = localStorage.getItem("startTest");
    if (!raw) return null;
    const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!obj?.subject || !obj?.chapter || obj?.allocatedQuestions == null)
      return null;
    return obj;
  } catch {
    return null;
  }
}

const TestPlanResultPage = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [subjects, setSubjects] = useState([]); // [{name, icon, bgColor, score, max, correct, wrong, unattempted}]
  const [totalScore, setTotalScore] = useState(0);
  const [totalMax, setTotalMax] = useState(0);

  // ⛔ BLOCK BROWSER BACK/FORWARD BUTTONS COMPLETELY
  useEffect(() => {
    // Prevent any navigation away from this page using browser buttons
    const blockNavigation = (event) => {
      // Store the current scroll position
      window.history.pushState(null, "", window.location.href);
    };

    // Push current state to history and set up blocker
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, []);

  // SECOND useEffect - Process exam results
  useEffect(() => {
    // Read from localStorage (support "examplan" and "examPlan")
    const raw =
      localStorage.getItem("examplan") ??
      localStorage.getItem("examPlan") ??
      "[]";

    const entries = normalizeExamplan(raw);

    // Get allocated questions from startTest
    const startTest = JSON.parse(localStorage.getItem("startTest")) || null;
    const allocatedQuestions = startTest?.allocatedQuestions || 0;
    const subjectName = startTest?.subject || "Unknown";

    // Aggregate subject-wise stats
    const stats = {};
    if (entries.length === 0 && allocatedQuestions > 0) {
      // User didn't attempt any question, create default stat
      stats[subjectName] = { correct: 0, wrong: 0 };
    } else {
      for (const e of entries) {
        const subject = (e.subject || "Unknown").trim();
        const hasSelection =
          e.selectedAnswer !== undefined &&
          e.selectedAnswer !== null &&
          String(e.selectedAnswer).trim() !== "";

        if (!stats[subject]) {
          stats[subject] = { correct: 0, wrong: 0 };
        }

        if (hasSelection && e.isCorrect === true) {
          stats[subject].correct += 1;
        } else if (hasSelection) {
          stats[subject].wrong += 1;
        }
      }
    }

    // Build subjects array based on allocatedQuestions
    const subjectsArray = Object.keys(stats).map((subject) => {
      const s = stats[subject];
      const total = allocatedQuestions;
      const unattempted = total - (s.correct + s.wrong);

      const score = s.correct * MARKS_CORRECT + s.wrong * MARKS_WRONG;
      const max = total * MARKS_CORRECT;

      return {
        name: subject,
        icon: subjectIcons[subject] ?? (
          <FaDna className="text-gray-500 text-xl" />
        ),
        bgColor: subjectBgColors[subject] ?? "bg-gray-100",
        score,
        max,
        correct: s.correct,
        wrong: s.wrong,
        unattempted,
        total,
      };
    });

    subjectsArray.sort((a, b) => b.score - a.score);

    setSubjects(subjectsArray);
    const total = subjectsArray.reduce((acc, subj) => acc + subj.score, 0);
    const max = subjectsArray.reduce((acc, subj) => acc + subj.max, 0);
    setTotalScore(total);
    setTotalMax(max);

    if (max && (total / max) * 100 >= 70) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRetakeTest = () => {
    // Instead of going back to test, redirect to examplan like Exit button
    router.push("/examplan");
    localStorage.removeItem("selectedSubjects");
    localStorage.removeItem("startTest");
    localStorage.removeItem("examplan");
    localStorage.removeItem("testStartTime");
  };

  const percent = totalMax ? Math.round((totalScore / totalMax) * 100) : 0;

  return (
    <div className="h-screen w-screen overflow-hidden max-sm:overflow-auto max-sm:h-full flex items-center justify-center bg-gray-100 relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )}

      <div className="w-full h-full flex flex-col md:flex-row bg-white shadow-lg">
        {/* Left Section - Overall Score */}
        <motion.div
          className="w-full md:w-[40%] h-full bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] flex flex-col items-center justify-center text-white p-6 rounded-r-3xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-lg font-semibold">Your Result</motion.h2>
          <motion.div
            className="w-40 h-40 bg-gradient-to-b from-[#ADE8F4] to-[#0077B6] rounded-full flex flex-col items-center justify-center mt-4 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.span className="text-4xl font-bold">
              {totalScore}
            </motion.span>
            <motion.span className="text-lg">of {totalMax}</motion.span>
          </motion.div>
          <motion.h3 className="text-xl font-semibold mt-4">
            {totalMax && percent >= 70 ? "Excellent 🎉" : "Keep Improving 💪"}
          </motion.h3>
          <motion.p className="text-sm text-center px-6 mt-2">
            Your percentage: {percent}%
          </motion.p>
        </motion.div>

        {/* Right Section - Subject Summary */}
        <motion.div
          className="w-full md:w-[60%] h-full p-6 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-4xl text-center font-bold text-gray-700 mb-4">
            Summary
          </motion.h2>

          {subjects.length === 0 && (
            <div className="text-center text-gray-500">
              No exam data found in <code>localStorage["examplan"]</code>.
            </div>
          )}

          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className={`w-full md:w-3/4 p-4 mb-3 rounded-3xl ${subject.bgColor} shadow-sm mx-auto`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.45 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {subject.icon}
                  <span className="font-semibold text-gray-700">
                    {subject.name}
                  </span>
                </div>
                <span className="font-bold">
                  {subject.score} / {subject.max}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-700 flex gap-4 justify-between">
                <span>
                  Correct: <b>{subject.correct}</b>
                </span>
                <span>
                  Wrong: <b>{subject.wrong}</b>
                </span>
                {/* <span>
                  Unattempted: <b>{subject.unattempted}</b>
                </span> */}
                <span>
                  Total: <b>{subject.total}</b>
                </span>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="flex flex-col gap-3 mt-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={() => router.push("/review-test-plan")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Review Mistake
            </motion.button>
            <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={handleRetakeTest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retake Test
            </motion.button>
            {/* <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={() => router.push("/analytics")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Analytics
            </motion.button> */}
            <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={() => {
                router.push("/examplan");
                localStorage.removeItem("selectedSubjects");
                localStorage.removeItem("startTest");
                localStorage.removeItem("examplan");
                localStorage.removeItem("testStartTime");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Exit
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestPlanResultPage;
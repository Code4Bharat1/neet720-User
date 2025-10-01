"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { FaFlask, FaAtom, FaDna, FaEye } from "react-icons/fa";

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

const ResultPYQPage = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [totalPossibleMarks, setTotalPossibleMarks] = useState(0);

  useEffect(() => {
    // NEW: preferred keys written on submit
    const summary = JSON.parse(localStorage.getItem("scoreSummary") || "null");
    const finalMarks = JSON.parse(localStorage.getItem("finalMarks") || "{}");

    if (summary) {
      // Totals
      setScore(Number(summary.total || 0));
      setTotalPossibleMarks(Number(summary.max || 0));

      // Per-subject rows
      const subjArr = Object.keys(summary.bySubject || {}).map((name) => {
        const s = summary.bySubject[name] || {};
        const score = Number(finalMarks[name] || 0);
        return {
          name,
          score,
          max: Number(s.max || s.questions * 4 || 0),
          icon: subjectMapping[name]?.icon || (
            <FaAtom className="text-gray-500 text-xl" />
          ),
          bgColor: subjectMapping[name]?.bgColor || "bg-gray-100",
        };
      });

      // Keep original subject order if you want (optional):
      // subjArr.sort((a, b) => a.name.localeCompare(b.name));

      setSubjects(subjArr);

      // Confetti based on percentage
      const pct =
        summary.max > 0
          ? (Number(summary.total) / Number(summary.max)) * 100
          : 0;
      if (pct >= 70) {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 6000);
        return () => clearTimeout(t);
      }
      return;
    }

    // ---- Fallback for older runs (when only "marks" existed) ----
    const marksLegacy = JSON.parse(localStorage.getItem("marks") || "{}");
    const questionsData = JSON.parse(
      localStorage.getItem("questionsData") || "{}"
    );

    const subjArrLegacy = Object.entries(marksLegacy).map(([name, sc]) => {
      const max = (questionsData?.[name]?.length || 0) * 4;
      return {
        name,
        score: Number(sc || 0),
        max,
        icon: subjectMapping[name]?.icon || (
          <FaAtom className="text-gray-500 text-xl" />
        ),
        bgColor: subjectMapping[name]?.bgColor || "bg-gray-100",
      };
    });

    const totalScoreLegacy = Object.values(marksLegacy).reduce(
      (a, b) => Number(a) + Number(b),
      0
    );
    const totalMaxLegacy = subjArrLegacy.reduce((s, r) => s + r.max, 0);

    setSubjects(subjArrLegacy);
    setScore(totalScoreLegacy);
    setTotalPossibleMarks(totalMaxLegacy);

    const pctLegacy =
      totalMaxLegacy > 0 ? (totalScoreLegacy / totalMaxLegacy) * 100 : 0;
    if (pctLegacy >= 70) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleRetakeTest = () => {
    router.push("/testinterfacePYQ");
    localStorage.removeItem("marks");
  };

  return (
    <div className="min-h-screen w-full overflow-auto flex items-center justify-center bg-gray-100 relative p-4 sm:p-0 ">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )}
      <div className="w-full max-w-6xl min-h-screen sm:min-h-0 sm:h-auto flex flex-col md:flex-row bg-white shadow-lg rounded-3xl sm:rounded-2xl overflow-hidden my-4 sm:my-0">
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
                key={index}
                className={`w-full p-3 sm:p-4 rounded-2xl sm:rounded-3xl ${subject.bgColor} shadow-sm`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
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
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.button
              className="bg-[#303B59] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl w-full sm:w-72 md:w-64 text-center hover:bg-gray-800 transition-all shadow-md font-medium text-sm sm:text-base"
              onClick={() => router.push("/review-mistakePYQ")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Review Mistake
            </motion.button>
            <motion.button
              className="bg-[#303B59] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl w-full sm:w-72 md:w-64 text-center hover:bg-gray-800 transition-all shadow-md font-medium text-sm sm:text-base"
              onClick={()=>{handleRetakeTest();
                localStorage.removeItem("scoreSummary");
                localStorage.removeItem("finalMarks");
                localStorage.removeItem("marks");
                localStorage.removeItem("wrongQuestions");
                localStorage.removeItem("scoreTotal");
                localStorage.removeItem("scoreMax");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retake Test
            </motion.button>
            <motion.button
              className="bg-[#303B59] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl w-full sm:w-72 md:w-64 text-center hover:bg-gray-800 transition-all shadow-md font-medium text-sm sm:text-base"
              onClick={() => {router.push("/previousyearquestions");
                                localStorage.removeItem("scoreSummary");
                localStorage.removeItem("finalMarks");
                localStorage.removeItem("marks");
                localStorage.removeItem("wrongQuestions");
                localStorage.removeItem("scoreTotal");
                localStorage.removeItem("scoreMax");
                localStorage.removeItem("selectedYear");
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

export default ResultPYQPage;

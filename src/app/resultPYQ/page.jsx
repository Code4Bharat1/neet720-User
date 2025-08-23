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

const ResultPage = () => {
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
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gray-100 relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )}
      <div className="w-full h-full flex flex-col md:flex-row bg-white shadow-lg">
        {/* Left Section - Overall Score Display */}
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
            <motion.span className="text-4xl font-bold">{score}</motion.span>
            <motion.span className="text-lg">
              of {totalPossibleMarks}
            </motion.span>
          </motion.div>
          <motion.h3 className="text-xl font-semibold mt-4">
            {totalPossibleMarks > 0 && (score / totalPossibleMarks) * 100 >= 70
              ? "Excellent 🎉"
              : "Keep Improving 💪"}
          </motion.h3>
          <motion.p className="text-sm text-center px-6 mt-2">
            Your percentage:{" "}
            {totalPossibleMarks > 0
              ? Math.round((score / totalPossibleMarks) * 100)
              : 0}
            %
          </motion.p>
        </motion.div>
        {/* Right Section - Subject Summary and Actions */}
        <motion.div
          className="w-full md:w-[60%] h-full p-6 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-4xl font-bold text-gray-700 mb-4">
            Summary
          </motion.h2>
          {/* Render Subject Scores */}
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className={`w-20 md:w-3/4 p-4 mb-2 rounded-3xl ${subject.bgColor} shadow-sm mx-auto`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
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
            </motion.div>
          ))}
          {/* Action Buttons */}
          <motion.div
            className="flex flex-col gap-3 mt-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={() => router.push("/review-mistakePYQ")}
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
            <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={() => router.push("/previousyearquestions")}
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

export default ResultPage;

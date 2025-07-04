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
    // Get marks per subject
    const marks = JSON.parse(localStorage.getItem("marks")) || {};
    // To get total possible marks, you need to know how many questions per subject
    // Here, we try to get from your previous session: you can adapt this logic
    const questionsData = JSON.parse(localStorage.getItem("questionsData")) || {};
    let totalMarks = 0;
    let subjArr = [];
    Object.entries(marks).forEach(([subject, subjScore]) => {
      // Assume each question = 4 marks
      let numQuestions = 0;
      if (questionsData[subject]) numQuestions = questionsData[subject].length;
      const max = numQuestions * 4;
      totalMarks += max;
      subjArr.push({
        name: subject,
        score: subjScore,
        max: max,
        icon: subjectMapping[subject]?.icon || <FaAtom className="text-gray-500 text-xl" />,
        bgColor: subjectMapping[subject]?.bgColor || "bg-gray-100",
      });
    });
    setSubjects(subjArr);
    setScore(Object.values(marks).reduce((a, b) => a + b, 0));
    setTotalPossibleMarks(totalMarks);

    // Confetti if >= 70%
    if (totalMarks > 0 && (Object.values(marks).reduce((a, b) => a + b, 0) / totalMarks) * 100 >= 70) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRetakeTest = () => {
    router.push("/testinterface");
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
              : 0}%
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
              onClick={() => router.push("/review-mistakeCT")}
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
              onClick={() => router.push("/viewanalyticsCT")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Analytics
            </motion.button>
            <motion.button
              className="bg-[#303B59] text-white py-2 px-8 rounded-md w-64 text-center hover:bg-gray-800"
              onClick={() => router.push("/dashboard")}
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

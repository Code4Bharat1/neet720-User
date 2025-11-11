"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const subjectImages = {
  Mathematics: "/test.png",
  Physics: "/pyq.png",
  Chemistry: "/collage.png",
  Biology: "/online.png",
  English: "/image.png",
  History: "/a+.png",
};

function PYQCard({ title, subject, text2, index }) {
  const [flipped, setFlipped] = useState(false);

  // Inline 3D styles - avoids needing extra Tailwind utilities
  const containerStyle = {
    width: "100%",
    height: "100%",
    perspective: "1200px",
  };

  const innerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)", 
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    willChange: "transform",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    overflow: "hidden",
  };

  const backStyle = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    textAlign: "center",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="w-full mx-auto"
      style={{ height: "20rem" }} // matches previous h-80
    >
      <div style={containerStyle} className="h-full relative cursor-pointer">
        <div style={innerStyle}>
          {/* FRONT */}
          <Card style={faceStyle} className="bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col justify-between">
            <div className="aspect-video bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300" />
              <img
                src={subjectImages[subject] || "/images/pyq-illustration.png"}
                alt={`${subject} PYQ Illustration`}
                className="max-h-full max-w-full object-contain transition-all duration-300 relative z-10"
              />
            </div>

            <div className="bg-gradient-to-r from-[#129EA0] to-[#0d7a7c] px-4 py-4 transition-all duration-300">
              <h2 className="text-white text-base sm:text-lg md:text-xl font-bold text-center">
                {title}
              </h2>
            </div>
          </Card>

          {/* BACK */}
          <Card style={backStyle} className="bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-slate-700 text-sm sm:text-base md:text-lg font-semibold leading-relaxed px-2">
                {text2}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoreFeatureComponent() {
  const pyqData = [
    { title: "FULL TEST ", subject: "Mathematics", text2: "Access And Practice Questions From Previous Years." },
    { title: "SUBJECT WISE MARKS ANALYSIS", subject: "Physics", text2: "View Detailed Dashboard With Subject Performance Analysis." },
    { title: "NEET COLLEGE PREDICTION", subject: "Chemistry", text2: "Predict Neet Rank And Explore Suitable College Options." },
    { title: "CREATE TEST", subject: "Biology", text2: "Customize Tests To Focus On Specific Topics For Revision." },
    { title: "FAST QUIZ", subject: "English", text2: "Review Neet PYQs Quickly And Effectively." },
    { title: "RESULT SECTION", subject: "History", text2: "Track And View Test Results With Insights." },
  ];


  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2e44] via-[#103F5D] to-[#0a2e44] px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-6 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
              Core Features
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white">Previous Year Questions</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto">
            Everything you need to ace your exams in one place
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pyqData.map((item, index) => (
            <PYQCard
              key={index}
              title={item.title}
              subject={item.subject}
              text2={item.text2}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

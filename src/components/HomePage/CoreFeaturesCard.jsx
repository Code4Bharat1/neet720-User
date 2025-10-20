"use client";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group w-full mx-auto overflow-hidden bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative rounded-2xl border border-slate-200">
        {/* Image Section */}
        <div className="aspect-video bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6 transition-all duration-300 group-hover:bg-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <img
            src={subjectImages[subject] || "/images/pyq-illustration.png"}
            alt={`${subject} PYQ Illustration`}
            className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:opacity-0 group-hover:scale-110 relative z-10"
          />
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-[#129EA0] to-[#0d7a7c] px-4 py-4 transition-all duration-300 group-hover:bg-white relative">
          <h2 className="text-white text-base sm:text-lg md:text-xl font-bold text-center opacity-100 group-hover:opacity-0 transition-all duration-300">
            {title}
          </h2>
        </div>

        {/* Hover Text */}
        <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-sm">
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
        </div>
      </Card>
    </motion.div>
  );
}

export default function CoreFeatureComponent() {
  const pyqData = [
    { title: "Mathematics PYQ", subject: "Mathematics", text2: "Access And Practice Questions From Previous Years." },
    { title: "SUBJECT WISE MARKS ANALYSIS", subject: "Physics", text2: "View Detailed Dashboard With Subject Performance Analysis." },
    { title: "NEET COLLEGE PREDICTION", subject: "Chemistry", text2: "Predict NEET Rank And Explore Suitable College Options." },
    { title: "CREATE TEST", subject: "Biology", text2: "Customize Tests To Focus On Specific Topics For Revision." },
    { title: "FAST QUIZ", subject: "English", text2: "Review English PYQs Quickly And Effectively." },
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Explore All Features
          </motion.button> */}
        </motion.div>
      </div>
    </div>
  );
}
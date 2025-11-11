"use client";

import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const benefits = [
  "Over 100k+ questions",
  "Easy progress tracking",
  "AI Doubt Solver",
  "20 years+ PYQ questions",
  "Adaptive Practice Test",
  "Rank College Predictor",
];

const faqs = [
  {
    question: "What is NEET720 ?",
    answer:
      "NEET720 is an all-in-one online platform that helps students prepare for the NEET exam through mock tests, PYQs, analytics, AI-based doubt-solving, and more.",
  },
  {
    question: "Is NEET720 free to use ?",
    answer:
      "NEET720 offers both free and premium plans. Many features like PYQs, Fast Quizzes, and basic mock tests are free. Premium plans unlock full analytics, AI assistant, college predictor, and more.",
  },
  {
    question: "How accurate is the College Predictor?",
    answer:
      "Our college predictor uses AI-backed historical data and ranking algorithms to offer highly accurate results. Accuracy improves with more data input.",
  },
  {
    question: "What kind of tests are available on NEET720?",
    answer:
      "You can access mock tests, subject-wise tests, full-length NEET simulations, past year papers, and topic-wise practice sets.",
  },
  {
    question: "Can I track my performance over time?",
    answer:
      "Yes, NEET720 provides visual performance analytics with charts and progress tracking over time.",
  },
  {
    question: "How does the AI Assistant work?",
    answer:
      "The AI assistant helps solve doubts instantly and guides your test strategy based on performance trends.",
  },
  {
    question: "Are Previous Year Questions (PYQs) available?",
    answer:
      "Yes, NEET720 provides over 20 years of PYQs categorized by topic and year.",
  },
  {
    question: "Can I compete with other students?",
    answer:
      "Yes, you can view leaderboards, join contests, and compare your scores with peers.",
  },
  {
    question: "Will I get a detailed result after each test?",
    answer:
      "Each test provides deep analytics, time per question, subject accuracy, and improvement tips.",
  },
  {
    question: "How can I contact support if I face any issues?",
    answer:
      "You can reach our support via in-app chat, email, or contact form available in the help section.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 flex flex-col items-center overflow-x-hidden">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4"
        >
          <span className="bg-gradient-to-r from-[#149C9F] to-[#103F5D] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
            Why Choose Us
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Why Choose
          <span className="block mt-2 bg-gradient-to-r from-[#149C9F] to-[#103F5D] bg-clip-text text-transparent">
            NEET 720?
          </span>
        </motion.h2>

        <motion.p
          className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Our AI-backed assessment software helps your students excel in IIT–JEE & NEET and achieve top ranks. It enhances educational quality with smart benefits:
        </motion.p>
      </div>

      {/* Benefits Grid - CUSTOM COLOR GRADIENT */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl w-full mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-[#149C9F] to-[#103F5D] text-white font-medium px-4 sm:px-6 py-3 sm:py-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 border border-white/30">
              <Check size={18} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-sm sm:text-base md:text-lg font-semibold">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#149C9F] to-[#103F5D] hover:opacity-90 text-white rounded-full shadow-2xl hover:shadow-[#149C9F]/50 text-sm sm:text-base md:text-lg font-bold transition-all duration-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/signup")}
      >
        Schedule A Demo Now →
      </motion.button>

      {/* FAQ Section */}
      <motion.div
        className="mt-24 sm:mt-28 md:mt-32 w-full max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#149C9F] to-[#103F5D] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
              Got Questions?
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Frequently Asked
            <span className="block mt-2 bg-gradient-to-r from-[#149C9F] to-[#103F5D] bg-clip-text text-transparent">
              Questions
            </span>
          </h3>
        </div>

        <motion.div
          className="space-y-4 sm:space-y-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 hover:border-[#149C9F] transition-all duration-300 overflow-hidden"
              variants={itemVariants}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 sm:px-6 md:px-8 py-5 sm:py-6 text-left flex justify-between items-center font-semibold text-sm sm:text-base md:text-lg text-slate-800 hover:text-[#149C9F] transition-colors duration-200 group"
              >
                <span className="pr-4">{faq.question}</span>
                <div
                  className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${
                    openIndex === index
                      ? "from-[#149C9F] to-[#103F5D]"
                      : "from-slate-200 to-slate-300 group-hover:from-[#149C9F]/20 group-hover:to-[#103F5D]/20"
                  } flex items-center justify-center transition-all duration-300`}
                >
                  {openIndex === index ? (
                    <X size={18} className="text-white" strokeWidth={2.5} />
                  ) : (
                    <Plus
                      size={18}
                      className={
                        openIndex === index ? "text-white" : "text-slate-600"
                      }
                      strokeWidth={2.5}
                    />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-gradient-to-br from-blue-50/60 to-blue-100/60">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

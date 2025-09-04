// export default page
'use client';
import React, { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const benefits = [
  "Over 100k+ questions",
  "Easy progress tracking",
  "Ai Doubt Solver",
  "20 years+ PYQ questions",
  "Adaptive Practice Test",
  "Rank College Predictor",
];

const faqs = [
  {
    question: "What is NEET720 ?",
    answer: "NEET720 is an all-in-one online platform that helps students prepare for the NEET exam through mock tests, PYQs, analytics, AI-based doubt-solving, and more.",
  },
  {
    question: "Is NEET720 free to use ?",
    answer: "NEET720 offers both free and premium plans. Many features like PYQs, Fast Quizzes, and basic mock tests are free. Premium plans unlock full analytics, AI assistant, college predictor, and more.",
  },
  {
    question: "How accurate is the College Predictor?",
    answer: "Our college predictor uses AI-backed historical data and ranking algorithms to offer highly accurate results. Accuracy improves with more data input.",
  },
  {
    question: "What kind of tests are available on NEET720?",
    answer: "You can access mock tests, subject-wise tests, full-length NEET simulations, past year papers, and topic-wise practice sets.",
  },
  {
    question: "Can I track my performance over time?",
    answer: "Yes, NEET720 provides visual performance analytics with charts and progress tracking over time.",
  },
  {
    question: "How does the AI Assistant work?",
    answer: "The AI assistant helps solve doubts instantly and guides your test strategy based on performance trends.",
  },
  {
    question: "Are Previous Year Questions (PYQs) available?",
    answer: "Yes, NEET720 provides over 20 years of PYQs categorized by topic and year.",
  },
  {
    question: "Can I compete with other students?",
    answer: "Yes, you can view leaderboards, join contests, and compare your scores with peers.",
  },
  {
    question: "Will I get a detailed result after each test?",
    answer: "Each test provides deep analytics, time per question, subject accuracy, and improvement tips.",
  },
  {
    question: "How can I contact support if I face any issues?",
    answer: "You can reach our support via in-app chat, email, or contact form available in the help section.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
// };
const itemVariants = {
  hidden: { opacity: 0, y: -30 }, // 👈 upar se niche
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16 flex flex-col items-center text-center">
      {/* Heading */}
      <motion.h2
        className="text-3xl font-bold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose NEET 720?
      </motion.h2>

      {/* Subtext */}
      <motion.p
        className="text-gray-600 max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Our AI-backed assessment software helps your students excel in IIT–JEE & NEET and achieve top ranks.
        It enhances educational quality with smart benefits:
      </motion.p>

      {/* Benefits */}
<motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full"
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }} // 👈 runs when part of the grid is in view
>
  {benefits.map((item, index) => (
    <motion.div
      key={index}
      className="flex items-center gap-3  text-white px-6 py-4 rounded-md shadow-md"
        style={{
    background: "linear-gradient(to right, #149C9F, #103F5D)",
  }}
      variants={itemVariants}
      >
      <div className="w-6 h-6 min-w-6 min-h-6 rounded-full bg-white flex items-center justify-center">
        <Check size={16} className="text-teal-600" strokeWidth={3} />
      </div>
      <span className="text-sm font-medium">{item}</span>
    </motion.div>
  ))}
</motion.div>


      {/* CTA Button */}
      <motion.button
        className="mt-12 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-md text-sm font-semibold transition"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={() => window.location.href = '/signup'}      >
        Schedule A Demo Now
      </motion.button>

      {/* FAQ Section */}
      <motion.div
        className="mt-20 w-full max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-teal-600 text-white rounded"
              variants={itemVariants}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-base"
              >
                {faq.question}
                {openIndex === index ? <X size={18} /> : <Plus size={18} />}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-sm text-white overflow-hidden"
                  >
                    {faq.answer}
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
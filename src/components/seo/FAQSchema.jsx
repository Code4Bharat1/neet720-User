"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Script from "next/script";

const faqs = [
  // 🔹 Product FAQs (NEET720)
  {
    question: "What is NEET720?",
    answer:
      "NEET720 is an all-in-one online platform that helps students prepare for the NEET exam through mock tests, previous year questions, performance analytics, AI-based doubt solving, and more.",
  },
  {
    question: "Is NEET720 free to use?",
    answer:
      "NEET720 offers both free and premium plans. Many features like PYQs, fast quizzes, and basic mock tests are available for free, while premium plans unlock advanced analytics and AI tools.",
  },
  {
    question: "How accurate is the NEET720 College Predictor?",
    answer:
      "The NEET720 college predictor uses AI-backed historical data and ranking algorithms to provide highly accurate predictions, which improve further with detailed score inputs.",
  },
  {
    question: "What kind of tests are available on NEET720?",
    answer:
      "NEET720 provides mock tests, subject-wise tests, full-length NEET simulations, topic-wise practice sets, and previous year question papers.",
  },
  {
    question: "Can I track my performance over time?",
    answer:
      "Yes, NEET720 offers detailed performance tracking with visual analytics, accuracy reports, and time management insights after every test.",
  },
  {
    question: "How does the AI Assistant work?",
    answer:
      "The AI assistant helps students instantly solve doubts and suggests personalized improvement strategies based on test performance and learning patterns.",
  },
  {
    question: "Are Previous Year Questions (PYQs) available on NEET720?",
    answer:
      "Yes, NEET720 provides more than 20 years of NEET previous year questions, categorized by subject, topic, and exam year.",
  },
  {
    question: "Can I compete with other students?",
    answer:
      "Yes, students can participate in leaderboards, contests, and comparative analysis to benchmark their performance against peers.",
  },
  {
    question: "Will I get a detailed result after each test?",
    answer:
      "After every test, NEET720 provides in-depth analytics including time per question, subject-wise accuracy, and personalized improvement tips.",
  },
  {
    question: "How can I contact NEET720 support?",
    answer:
      "You can contact NEET720 support through in-app chat, email support, or the contact form available in the help section.",
  },

  // 🔹 People Also Ask (PAA) – English (SEO Focused)
  {
    question: "What is the NEET exam?",
    answer:
      "NEET is a national-level medical entrance examination conducted for admission to MBBS, BDS, and AYUSH courses in India. The exam is conducted by the National Testing Agency (NTA).",
  },
  {
    question: "What is the full form of NEET?",
    answer:
      "The full form of NEET is National Eligibility cum Entrance Test.",
  },
  {
    question: "What is the eligibility for the NEET exam?",
    answer:
      "To be eligible for the NEET exam, candidates must have passed Class 12 with Physics, Chemistry, and Biology from a recognized board.",
  },
  {
    question: "What is the age limit for the NEET exam?",
    answer:
      "The minimum age to appear for the NEET exam is 17 years. As per the latest guidelines, there is currently no upper age limit.",
  },
  {
    question: "What is the syllabus of the NEET exam?",
    answer:
      "The NEET syllabus is based on Class 11 and Class 12 topics of Physics, Chemistry, and Biology as prescribed by the National Testing Agency.",
  },
  {
    question: "What is the exam pattern of NEET?",
    answer:
      "The NEET exam consists of 200 multiple-choice questions, out of which candidates must attempt 180 questions from Physics, Chemistry, and Biology.",
  },
  {
    question: "What are the best preparation tips for the NEET exam?",
    answer:
      "The best preparation tips for NEET include studying NCERT textbooks thoroughly, practicing previous year questions, taking regular mock tests, and focusing on time management.",
  },
];

// 🔹 Dynamic FAQ Schema (Auto-sync with UI)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      {/* ✅ SEO FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* ⬇️ UI (UNCHANGED) */}
      <section className="min-h-screen py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              Frequently Asked Questions
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
              Got Questions? We’ve Got Answers.
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Everything you need to know about NEET720 and the NEET exam.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 cursor-pointer transition-all hover:shadow-md"
                onClick={() => toggle(index)}
              >
                {/* Question */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>

                  <ChevronDown
                    size={22}
                    className={`text-gray-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Answer */}
                <div
                  className={`mt-3 text-gray-600 overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

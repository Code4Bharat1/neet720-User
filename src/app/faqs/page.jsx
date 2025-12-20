"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Script from "next/script";

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

// 🔹 Dynamic FAQ Schema (AUTO sync with UI)
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

      {/* ⬇️ YOUR EXISTING UI (UNCHANGED) */}
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
              Everything you need to know about NEET720 — from features to support.
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

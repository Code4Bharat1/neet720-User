"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  BookOpen,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";

/** Safely parse examplan from localStorage in multiple shapes */
function readExamplan() {
  try {
    const raw =
      localStorage.getItem("examplan") ??
      localStorage.getItem("examPlan") ??
      "[]";
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object") return [parsed];
    return [];
  } catch {
    return [];
  }
}

export default function ReviewMistakeExamPlan() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // --- Copy/Inspect/Print prevention ---
  const keyGuard = useCallback((e) => {
    const k = e.key?.toLowerCase();

    // Block F12
    if (k === "f12") return e.preventDefault();

    const isCtrl = e.ctrlKey || e.metaKey; // support Mac ⌘
    const shifted = e.shiftKey;

    // Common combos to block
    if (isCtrl) {
      if (
        ["c", "x", "v", "s", "p", "u"].includes(k) || // copy, cut, paste, save, print, view-source
        (shifted && ["i", "j", "c"].includes(k)) // devtools variations
      ) {
        e.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent context menu, copy/cut/paste, text selection & dragging
    const block = (e) => e.preventDefault();
    const blockDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("contextmenu", block);
    window.addEventListener("copy", block);
    window.addEventListener("cut", block);
    window.addEventListener("paste", block);
    window.addEventListener("selectstart", block);
    window.addEventListener("dragstart", blockDrag);
    window.addEventListener("keydown", keyGuard, true); // capture phase

    return () => {
      window.removeEventListener("contextmenu", block);
      window.removeEventListener("copy", block);
      window.removeEventListener("cut", block);
      window.removeEventListener("paste", block);
      window.removeEventListener("selectstart", block);
      window.removeEventListener("dragstart", blockDrag);
      window.removeEventListener("keydown", keyGuard, true);
    };
  }, [keyGuard]);
  // --- End prevention ---

  useEffect(() => {
    if (typeof window === "undefined") return;
    const data = readExamplan();
    setItems(data);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 select-none">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-teal-600 font-medium">Loading review...</p>
        </div>
      </div>
    );
  }

  // Handle case where no data is available
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 select-none">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b-2 border-teal-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Review Mistakes
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Total: 0 • Correct: 0 • Incorrect: 0
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.back()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
                
              </button>
            </div>
          </div>
        </div>

        {/* Empty State Message */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="bg-white border-2 border-teal-200 rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="bg-teal-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-teal-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              No Questions Attempted
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't attempted any questions yet. Complete the test first to review
              your mistakes.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-md"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = items.length;
  const correctCount = items.filter((x) => x.isCorrect === true).length;
  const incorrectCount = total - correctCount;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      draggable={false}
      tabIndex={0}
      onKeyDown={keyGuard}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b-2 border-teal-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Review Mistakes
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                  <span className="text-gray-600">Total: {total}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-emerald-600 font-semibold">
                    Correct: {correctCount}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-red-600 font-semibold">
                    Incorrect: {incorrectCount}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 font-semibold shadow-md whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" />
              
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Total Questions Card */}
          <div className="bg-white rounded-xl p-4 border-2 border-teal-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Questions</p>
                <p className="text-3xl font-bold text-teal-600 mt-1">{total}</p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          {/* Correct Answers Card */}
          <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Correct</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">
                  {correctCount}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Incorrect Answers Card */}
          <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Incorrect</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{incorrectCount}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {items.map((q, idx) => {
            const isCorrect = q.isCorrect === true;
            return (
              <div
                key={q.question_id ?? idx}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
                  isCorrect ? "border-emerald-500" : "border-red-500"
                } hover:shadow-xl transition-shadow duration-200`}
                draggable={false}
              >
                <div className="p-4 md:p-6">
                  {/* Top row: Subject + Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                        {q.subject || "Subject"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Question #{idx + 1}
                      </span>
                    </div>
                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-red-700 bg-red-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                          <XCircle className="w-4 h-4" />
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        Question
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-lg p-4 text-gray-800">
                      {q.question}
                    </div>
                  </div>

                  {/* Your Answer + Correct Answer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Your Answer */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-semibold text-gray-700">
                          Your Answer
                        </span>
                      </div>
                      <div
                        className={`border-2 rounded-lg p-4 ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-red-50 border-red-200 text-red-900"
                        }`}
                      >
                        {q.selectedAnswer ?? "Not Answered"}
                      </div>
                    </div>

                    {/* Correct Answer - Only show for incorrect answers */}
                    {!isCorrect && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-teal-600" />
                          <span className="text-sm font-semibold text-gray-700">
                            Correct Answer
                          </span>
                        </div>
                        <div className="border-2 rounded-lg p-4 bg-teal-50 border-teal-200 text-teal-900">
                          {q.correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
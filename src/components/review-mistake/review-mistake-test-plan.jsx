"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaBookOpen,
} from "react-icons/fa";

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
        (shifted && ["i", "j", "c"].includes(k))      // devtools variations
      ) {
        e.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent context menu, copy/cut/paste, text selection & dragging
    const block = (e) => e.preventDefault();
    const blockDrag = (e) => { e.preventDefault(); e.stopPropagation(); };

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 select-none">
        <div className="text-gray-600">Loading…</div>
      </div>
    );
  }

  // Handle case where no data is available
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 select-none">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaBookOpen className="text-blue-600" />
                  Review Mistakes
                </h1>
                <p className="text-sm text-gray-600">
                  Total: 0 • Correct: 0 • Incorrect: 0
                </p>
              </div>
            </div>

            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition"
            >
              Back to Results
            </button>
          </div>
        </div>

        {/* Empty State Message */}
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="bg-white border rounded-xl p-12 text-center shadow-sm">
            <FaBookOpen className="text-4xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Questions Attempted</h2>
            <p className="text-gray-600 mb-6">
              You haven't attempted any questions yet. Complete the test first to review your mistakes.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      draggable={false}
      tabIndex={0} // allow keydown on container
      onKeyDown={keyGuard}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaBookOpen className="text-blue-600" />
                Review Mistakes
              </h1>
              <p className="text-sm text-gray-600">
                Total: {total} • Correct: {correctCount} • Incorrect: {incorrectCount}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition"
          >
            Back to Results
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

        {items.map((q, idx) => {
          const isCorrect = q.isCorrect === true;
          return (
            <div
              key={q.question_id ?? idx}
              className={`bg-white border rounded-xl p-4 shadow-sm ${
                isCorrect ? "border-green-200" : "border-red-200"
              }`}
              draggable={false}
            >
              {/* Top row: Subject + status */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">
                    {q.subject || "Subject"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                      <FaCheckCircle /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                      <FaTimesCircle /> Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Question */}
              <div className="mt-3">
                <div className="text-sm text-gray-500 mb-1">Question</div>
                <div className="bg-gray-50 border rounded-lg p-3 text-gray-800">
                  {q.question}
                </div>
              </div>

              {/* Your Answer + Correct Answer */}
              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Your Answer</div>
                  <div
                    className={`border rounded-lg p-3 ${
                      isCorrect
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {q.selectedAnswer ?? "Not Answered"}
                  </div>
                </div>

                {!isCorrect && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Correct Answer</div>
                    <div className="border rounded-lg p-3 bg-blue-50 border-blue-200 text-blue-800">
                      {q.correctAnswer}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

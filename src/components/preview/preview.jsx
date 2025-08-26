"use client";

import React, { useEffect, useState } from "react";

/* ------- helpers to read & normalize localStorage ------- */
function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// Normalize selectedSubjects into an array of subject names
function normalizeSelectedSubjects(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    if (raw.length === 0) return [];
    // ["Physics", "Chemistry"] OR [{name, selected}]
    if (typeof raw[0] === "string") return raw;
    if (typeof raw[0] === "object") {
      return raw
        .filter((s) => s && (s.selected !== false)) // selected by default unless false
        .map((s) => s.name)
        .filter(Boolean);
    }
  }
  return [];
}

// Get array of { id, name, numQuestions, selected } for a given subject
function getChaptersArray(selectedChapters, subject) {
  const chapters = selectedChapters?.[subject];
  if (!chapters) return [];

  if (Array.isArray(chapters)) {
    // Already an array: try to normalize fields
    return chapters.map((c, idx) => ({
      id: c.id ?? String(idx + 1),
      name: c.chapterName || c.name || "Untitled Chapter",
      numQuestions: c.numQuestions ?? "0",
      selected: c.selected !== false, // default true
    }));
  }

  // Object keyed by chapterId (your case)
  return Object.entries(chapters).map(([id, c]) => ({
    id,
    name: c?.chapterName || c?.name || "Untitled Chapter",
    numQuestions: c?.numQuestions ?? "0",
    selected: c?.selected !== false, // default true
  }));
}

export default function TestPlanPreviewSimple() {
  const [testName, setTestName] = useState("Test");
  const [subjects, setSubjects] = useState([]); // ["Physics", ...]
  const [chaptersBySubject, setChaptersBySubject] = useState({}); // subject -> array of chapters
  const [totalsBySubject, setTotalsBySubject] = useState({}); // subject -> total number
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // 1) Read raw values
    const lsTestName = localStorage.getItem("testName") || "No Test Name Set";
    const rawSubjects = readLS("selectedSubjects", []);
    const rawChapters = readLS("selectedChapters", {});

    // 2) Normalize subjects
    const subjectNames = normalizeSelectedSubjects(rawSubjects);

    // 3) Build chapters per subject and totals
    const chaptersMap = {};
    const totalsMap = {};
    let overall = 0;

    subjectNames.forEach((subj) => {
      const arr = getChaptersArray(rawChapters, subj)
        .filter((c) => c.selected) // show only selected
        .map((c) => ({
          ...c,
          // make sure numQuestions is a number for totals
          numQuestions: Number(c.numQuestions) || 0,
        }));

      const subjTotal = arr.reduce((sum, c) => sum + c.numQuestions, 0);

      chaptersMap[subj] = arr;
      totalsMap[subj] = subjTotal;
      overall += subjTotal;
    });

    // 4) Set state
    setTestName(lsTestName);
    setSubjects(subjectNames);
    setChaptersBySubject(chaptersMap);
    setTotalsBySubject(totalsMap);
    setGrandTotal(overall);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm border rounded-xl p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Preview
            </h1>
          </div>
          <p className="mt-1 text-gray-600">
            <span className="font-semibold text-gray-800">Test Name:</span>{" "}
            {testName}
          </p>
        </div>

        {/* If no subjects */}
        {subjects.length === 0 && (
          <div className="bg-white shadow-sm border rounded-xl p-6 text-center text-gray-600">
            No subjects found in <code>localStorage["selectedSubjects"]</code>.
          </div>
        )}

        {/* Subjects & Chapters */}
        {subjects.map((subj) => {
          const list = chaptersBySubject[subj] || [];
          const subjTotal = totalsBySubject[subj] ?? 0;

          return (
            <div
              key={subj}
              className="bg-white shadow-sm border rounded-xl mb-6 overflow-hidden"
            >
              <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-800">
                  {subj}
                </div>
                <div className="text-sm text-blue-700 font-semibold">
                  Total: {subjTotal} question{subjTotal !== 1 ? "s" : ""}
                </div>
              </div>

              {list.length === 0 ? (
                <div className="p-4 text-gray-500">
                  No chapters for this subject in{" "}
                  <code>localStorage["selectedChapters"]</code>.
                </div>
              ) : (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left px-3 py-2 border-b">#</th>
                          <th className="text-left px-3 py-2 border-b">
                            Chapter
                          </th>
                          <th className="text-left px-3 py-2 border-b">
                            Questions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((c, idx) => (
                          <tr key={c.id}>
                            <td className="px-3 py-2 border-b text-gray-700">
                              {idx + 1}
                            </td>
                            <td className="px-3 py-2 border-b text-gray-800">
                              {c.name}
                            </td>
                            <td className="px-3 py-2 border-b text-gray-800">
                              {c.numQuestions}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="px-3 py-2 border-t" colSpan={2}>
                            Subject Total
                          </td>
                          <td className="px-3 py-2 border-t">{subjTotal}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Grand Total */}
        <div className="bg-white shadow-sm border rounded-xl p-4 md:p-6">
          <div className="text-lg font-bold text-gray-800">
            Grand Total: {grandTotal} question{grandTotal !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState , useRe } from "react";
import axios from "axios";  
import {
  FaAtom,
  FaFlask,
  FaDna,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaSlidersH,
  FaSyncAlt,
  FaArrowUp,
  FaArrowLeft,
} from "react-icons/fa";
import useRouter from 'next/navigation';
// ---------- Subject icon config ----------
const subjectConfig = {
  Physics: { icon: <FaAtom className="text-blue-600" /> },
  Chemistry: { icon: <FaFlask className="text-emerald-600" /> },
  Biology: { icon: <FaDna className="text-rose-600" /> },
  Botany: { icon: <FaEye className="text-purple-600" /> },
};

// ---------- Helpers ----------
const canonical = (s) => (s ?? "").toString().replace(/\s+/g, " ").trim();

const resolveCorrectKey = (options, correctAnswer) => {
  const ca = canonical(correctAnswer);
  if (!ca) return null;
  if (/^[A-D]$/i.test(ca)) return ca.toLowerCase(); // letter case
  for (const [k, v] of Object.entries(options || {})) {
    if (canonical(v) === ca) return k.toLowerCase();
  }
  return null;
};

// ---------- Main Page ----------
export default function ReviewAllWithMistakes() {
  const router = useRouter();
  const [data, setData] = useState({}); // { subject: [enriched...] }
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [year, setYear] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | incorrect | correct | unattempted
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expanded, setExpanded] = useState(new Set());

  // Fetch & enrich
  useEffect(() => {
    const init = async () => {
      try {
        const selectedYear = localStorage.getItem("selectedYear");
        setYear(selectedYear || "");
        if (!selectedYear) {
          setError("No year selected in localStorage.");
          setLoading(false);
          return;
        }

        // Fetch questions
        const { data: questionsData } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/pyq-questions`,
          { year: selectedYear }
        );

        // Read wrong attempts
        const wrongStored = JSON.parse(
          localStorage.getItem("wrongQuestions") || "[]"
        );
        const wrongMap = new Map(); // key = `${subject}-${qIdx}` -> chosenKey
        if (Array.isArray(wrongStored)) {
          wrongStored.forEach((w) => {
            const key = `${w.subject}-${w.qIdx}`;
            wrongMap.set(key, (w.chosen || w.selectedKey || "").toLowerCase());
          });
        }

        // Enrich
        const enriched = {};
        Object.entries(questionsData || {}).forEach(([subject, list]) => {
          enriched[subject] = (list || []).map((q, idx) => {
            const correctKey = resolveCorrectKey(q.options, q.correctAnswer);
            const correctText =
              (correctKey && q.options?.[correctKey]) || q.correctAnswer || "";

            const mapKey = `${subject}-${idx}`;
            const chosenKey = wrongMap.get(mapKey) || null;
            const chosenText =
              chosenKey && q.options ? q.options[chosenKey] : null;

            const isWrong =
              !!chosenKey && !!correctKey && chosenKey !== correctKey;
            const isRight =
              !!chosenKey && !!correctKey && chosenKey === correctKey; // rare if you only store wrongs

            return {
              index: idx,
              subject,
              question: q.question,
              diagramUrl: q.diagramUrl || "",
              options: q.options || {},
              correctKey: correctKey ?? "unknown",
              correctText: canonical(correctText),
              chosenKey, // user picked key (if present in wrongs)
              chosenText: chosenText ? canonical(chosenText) : null,
              isWrong,
              isRight,
              attempted: !!chosenKey, // attempted if we have a stored choice
            };
          });
        });

        const subjList = Object.keys(enriched);
        setData(enriched);
        setSubjects(subjList);
        setActiveSubject(subjList[0] || "");
      } catch (e) {
        console.error(e);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Derived current subject list
  const currentList = useMemo(() => {
    const arr = data[activeSubject] || [];
    let filtered = arr;

    if (filter !== "all") {
      if (filter === "incorrect") filtered = filtered.filter((x) => x.isWrong);
      if (filter === "correct") filtered = filtered.filter((x) => x.isRight);
      if (filter === "unattempted")
        filtered = filtered.filter((x) => !x.attempted);
    }

    if (q.trim()) {
      const qq = canonical(q);
      filtered = filtered.filter((x) =>
        canonical(x.question).toLowerCase().includes(qq.toLowerCase())
      );
    }

    return filtered;
  }, [data, activeSubject, filter, q]);

  // Pagination
  const total = currentList.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const slice = currentList.slice(startIdx, startIdx + pageSize);

  useEffect(() => {
    // Reset page when filters/subject change
    setPage(1);
    setExpanded(new Set());
  }, [activeSubject, filter, q, pageSize]);

  const toggleExpanded = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const SubjectButton = ({ name }) => {
    const icon = subjectConfig[name]?.icon || subjectConfig.Physics.icon;
    const list = data[name] || [];
    const wrong = list.filter((x) => x.isWrong).length;
    return (
      <button
        onClick={() => setActiveSubject(name)}
        className={`w-full text-left rounded-xl p-3 mb-2 border transition-all flex items-center justify-between ${
          activeSubject === name
            ? "bg-white border-gray-300 shadow-sm"
            : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white grid place-items-center border">
            {icon}
          </div>
          <div>
            <div className="font-medium text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">{list.length} questions</div>
          </div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-medium">
          {wrong} wrong
        </div>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-600">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen grid place-items-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left side: Back + Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm text-gray-700 shadow-sm"
            >
              <FaArrowLeft className="text-gray-600" /> Back
            </button>

            <div className="flex items-center gap-2">
              <FaSlidersH className="text-gray-500" />
              <div>
                <div className="font-semibold text-gray-800 text-base sm:text-lg">
                  Review: All Questions
                </div>
                <div className="text-xs text-gray-500">Year: {year || "—"}</div>
              </div>
            </div>
          </div>

          {/* Right side: Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search question…"
                className="pl-9 pr-3 py-2 rounded-lg border bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-56 sm:w-64"
              />
            </div>

            {/* Filter */}
            <div className="relative flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-2 py-2 rounded-lg border bg-white/90 text-sm focus:outline-none"
              >
                <option value="all">All</option>
                <option value="incorrect">Incorrect only</option>
                <option value="correct">Correct chosen</option>
                <option value="unattempted">Unattempted</option>
              </select>
            </div>

            {/* Page size */}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-2 py-2 rounded-lg border bg-white/90 text-sm focus:outline-none"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>

            {/* Reset */}
            <button
              onClick={() => {
                setQ("");
                setFilter("all");
                setPageSize(10);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white/90 text-sm hover:bg-gray-50"
            >
              <FaSyncAlt /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar subjects */}
        <aside className="lg:sticky lg:top-[68px] h-max">
          <div className="rounded-2xl border bg-white shadow-sm p-3">
            <div className="px-2 py-2 text-xs text-gray-500">Subjects</div>
            <div className="max-h-[70vh] overflow-auto pr-1">
              {subjects.map((s) => (
                <SubjectButton key={s} name={s} />
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main>
          {/* Subject header + counts */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {subjectConfig[activeSubject]?.icon || subjectConfig.Physics.icon}
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSubject || "—"}
              </h2>
            </div>
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{slice.length}</span> of
              <span className="font-medium"> {total}</span>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {slice.map((q) => {
              const id = `${q.subject}-${q.index}`;
              const isOpen = expanded.has(id);

              return (
                <div
                  key={id}
                  className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                >
                  {/* Header row */}
                  <button
                    className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-gray-50"
                    onClick={() => toggleExpanded(id)}
                  >
                    <div className="flex-1">
                      <div className="text-[13px] text-gray-500 mb-1">
                        Q{q.index + 1}
                      </div>
                      <div className="font-medium text-gray-800">
                        {q.question}
                      </div>
                      {q.diagramUrl && (
                        <img
                          src={q.diagramUrl}
                          alt="diagram"
                          className="max-w-xs mt-2 rounded border"
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2 text-xs">
                        {q.correctKey === "unknown" ? (
                          <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                            Answer N/A
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            Correct
                          </span>
                        )}
                        {q.chosenKey && q.isWrong && (
                          <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700">
                            Your choice wrong
                          </span>
                        )}
                        {q.chosenKey && q.isRight && (
                          <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            You were right
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400">
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                  </button>

                  {/* Body */}
                  {isOpen && (
                    <div className="px-4 pb-4">
                      {/* Options grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {Object.entries(q.options || {}).map(([key, val]) => {
                          const norm = key.toLowerCase();
                          const isCorrect = q.correctKey === norm;
                          const isChosen = q.chosenKey === norm;
                          const base =
                            "p-2 rounded-xl border text-sm flex items-start justify-between gap-2";
                          const cls =
                            isChosen && !isCorrect
                              ? "border-rose-400 bg-rose-50 text-rose-800"
                              : isCorrect
                              ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                              : "border-gray-200 bg-gray-50";
                          return (
                            <div key={key} className={`${base} ${cls}`}>
                              <div>
                                <span className="mr-2 font-bold uppercase">
                                  {key}.
                                </span>
                                <span>{val}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {isCorrect && (
                                  <FaCheckCircle className="text-emerald-600" />
                                )}
                                {isChosen && !isCorrect && (
                                  <FaTimesCircle className="text-rose-600" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="mt-3 text-sm flex flex-wrap items-center gap-3">
                        {q.correctKey !== "unknown" && (
                          <span className="text-emerald-700">
                            Correct: <b>{q.correctText}</b>
                          </span>
                        )}
                        {q.chosenKey && q.isWrong && (
                          <span className="text-rose-700">
                            Your choice: <b>{q.chosenText}</b>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {slice.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                No questions match the current filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Page <span className="font-medium">{safePage}</span> of
              <span className="font-medium"> {totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <FaChevronLeft /> Prev
              </button>
              <button
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Back to top */}
      <button
        onClick={() => router.push("/resultPYQ")}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full border bg-white shadow grid place-items-center hover:bg-gray-50"
        title="Back to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}

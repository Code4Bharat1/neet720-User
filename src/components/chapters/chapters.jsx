"use client";
// Chapters.jsx (controlled)
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Optional: subject icons map if you need it
const subjectIcons = {
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🌱",
};

export default function Chapters({
  selectedSubjects = [],
  selectedChapters = {},                 // shape: { [subject]: { [chapterId]: { chapterName, numQuestions } } }
  setSelectedChapters,                   // parent setter
}) {
  const [chaptersBySubject, setChaptersBySubject] = useState({}); // { [subject]: [{ id, name }] }
  const [selectedSubject, setSelectedSubject] = useState(null);

  // fetch chapters for the given subjects
  useEffect(() => {
    if (!selectedSubjects.length) return;
    setSelectedSubject((prev) => prev ?? selectedSubjects[0]);

    const fetchChapters = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-wise/chapter-name`,
          { subjects: selectedSubjects }
        );
        // API returns { chapters: { Physics: ["Unit & Measurement", ...], ... } }
        const apiChapters = data?.chapters || {};
        const mapped = Object.fromEntries(
          selectedSubjects.map((subj) => [
            subj,
            (apiChapters[subj] || []).map((name, idx) => ({
              id: String(idx + 1), // keep a stable string id per subject
              name,
            })),
          ])
        );
        setChaptersBySubject(mapped);
      } catch (e) {
        console.error("Error fetching chapters:", e);
      }
    };

    fetchChapters();
  }, [selectedSubjects]);

  const isChapterSelected = (subject, chapterId) =>
    !!selectedChapters?.[subject]?.[chapterId];

  const getChapterQty = (subject, chapterId) =>
    selectedChapters?.[subject]?.[chapterId]?.numQuestions ?? "";

  const setChapterQty = (subject, chapterId, chapterName, rawValue) => {
    const value = String(rawValue).replace(/^0+/, ""); // strip leading zeros
    setSelectedChapters((prev) => {
      const next = { ...prev };
      if (!next[subject]) next[subject] = {};
      if (!next[subject][chapterId]) {
        next[subject][chapterId] = { chapterName, numQuestions: "" };
      }
      next[subject][chapterId] = {
        ...next[subject][chapterId],
        numQuestions: value,
      };
      return next;
    });
  };

  const toggleChapter = (subject, chapterId, chapterName) => {
    const currentlySelected = isChapterSelected(subject, chapterId);
    setSelectedChapters((prev) => {
      const next = { ...prev };
      const subjMap = { ...(next[subject] || {}) };

      if (currentlySelected) {
        // remove chapter
        delete subjMap[chapterId];
        if (Object.keys(subjMap).length === 0) {
          delete next[subject];
        } else {
          next[subject] = subjMap;
        }
      } else {
        // add with default qty (empty or 1, your choice)
        next[subject] = {
          ...subjMap,
          [chapterId]: { chapterName, numQuestions: "" }, // or "1"
        };
      }
      return next;
    });
  };

  const toggleAllForSubject = (subject) => {
    const list = chaptersBySubject[subject] || [];
    const allSelected = list.length > 0 && list.every((ch) => isChapterSelected(subject, ch.id));

    setSelectedChapters((prev) => {
      const next = { ...prev };
      if (allSelected) {
        // deselect all
        if (next[subject]) delete next[subject];
      } else {
        // select all (keep existing qty if any, otherwise empty)
        const current = next[subject] || {};
        const merged = { ...current };
        for (const ch of list) {
          merged[ch.id] = merged[ch.id] ?? { chapterName: ch.name, numQuestions: "" }; // or "1"
        }
        next[subject] = merged;
      }
      return next;
    });
  };

  return (
    <div className="rounded-tl-lg rounded-bl-lg flex flex-row w-full h-[19rem] bg-white shadow-md max-sm:flex-col max-sm:h-[30rem] max-sm:-mt-10">
      {/* Subjects */}
      <div className="flex w-1/2 flex-col mt-1 border-r-4 overflow-y-auto max-sm:flex max-sm:flex-wrap max-sm:h-full max-sm:w-full">
        {selectedSubjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`w-full px-2 py-7 text-xl flex items-center gap-2 max-sm:text-sm max-sm:py-2 max-sm:w-1/2 ${
              selectedSubject === subject
                ? "text-white bg-gradient-to-r from-[#54ADD3] to-[#3184A6]"
                : "bg-white text-gray-800"
            }`}
          >
            <span className="text-xl">{subjectIcons[subject]}</span>
            {subject}
          </button>
        ))}
      </div>

      <span className="hidden max-sm:block">
        <hr className="h-2 w-full m-2" />
      </span>

      {/* Chapters */}
      <div className="flex flex-col w-1/2 overflow-y-auto gap-4 px-1 max-sm:w-fit">
        {selectedSubject && chaptersBySubject[selectedSubject] && (
          <div className="p-2">
            <div className="flex justify-between items-center mb-2 gap-2">
              <button
                onClick={() => toggleAllForSubject(selectedSubject)}
                className="w-1/2 h-[50px] px-2 py-3 text-white rounded-lg bg-gradient-to-r from-[#54ADD3] to-[#3184A6]"
              >
                Select All
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              {chaptersBySubject[selectedSubject].map((chapter) => {
                const selected = isChapterSelected(selectedSubject, chapter.id);
                const qty = getChapterQty(selectedSubject, chapter.id);

                return (
                  <div
                    key={chapter.id}
                    onClick={() => toggleChapter(selectedSubject, chapter.id, chapter.name)}
                    title="click here to select chapters"
                    className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                      selected
                        ? "bg-[#195d78] text-white ring-2 ring-[#3184A6]"
                        : "bg-gradient-to-r from-[#54ADD3] to-[#3184A6] text-white hover:opacity-90"
                    }`}
                  >
                    {/* Left: Chapter Name */}
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{chapter.name}</span>
                    </div>

                    {/* Right: Number Input */}
                    <input
                      type="number"
                      min="1"
                      disabled={!selected}
                      className="
                        w-16 sm:w-20 md:w-24
                        px-3 py-2
                        rounded-md
                        text-sm sm:text-base
                        text-gray-900
                        bg-white
                        border-2 border-transparent
                        focus:outline-none focus:ring-2 focus:ring-[#3184A6] focus:border-[#3184A6]
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-sm
                        transition duration-200
                      "
                      value={qty}
                      placeholder="Qty"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setChapterQty(selectedSubject, chapter.id, chapter.name, e.target.value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

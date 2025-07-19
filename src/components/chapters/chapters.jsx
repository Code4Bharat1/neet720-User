import React, { useState, useEffect } from "react";
import axios from "axios";

const subjectIcons = {
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🌱",
};

const Chapters = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [chapters, setChapters] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("selectedSubjects") || "[]");
    const savedChapters = JSON.parse(localStorage.getItem("selectedChapters") || "{}");

    setSelectedSubjects(savedSubjects);
    if (savedSubjects.length > 0) setSelectedSubject(savedSubjects[0]);

    const fetchChapters = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-wise/chapter-name`,
          { subjects: savedSubjects }
        );

        const chaptersData = data.chapters || {};
        const dynamicChapters = {};

        savedSubjects.forEach((subject) => {
          dynamicChapters[subject] = (chaptersData[subject] || []).map((name, index) => {
            const saved = savedChapters[subject]?.find((ch) => ch.name === name);
            return {
              id: index + 1,
              name,
              selected: !!saved,
              numQuestions: saved?.numQuestions ?? "", // Always defined ("" or value)
            };
          });
        });

        setChapters(dynamicChapters);
        console.log("Chapters fetched:", dynamicChapters);
      } catch (error) {
        console.error(`Error fetching chapters:`, error);
      }
    };

    if (savedSubjects.length > 0) fetchChapters();
  }, []);

  // Save only selected chapters with name and numQuestions
  const saveChaptersToLocalStorage = (updatedChapters) => {
    const filteredChapters = Object.fromEntries(
      Object.entries(updatedChapters).map(([subject, chaps]) => [
        subject,
        chaps
          .filter((chapter) => chapter.selected)
          .map((ch) => ({
            name: ch.name,
            numQuestions: ch.numQuestions ?? "", // Always save value
          })),
      ])
    );
    localStorage.setItem("selectedChapters", JSON.stringify(filteredChapters));
  };

  const handleSubjectClick = (subject) => setSelectedSubject(subject);

  const handleToggleAll = () => {
    if (!selectedSubject) return;
    const allSelected = chapters[selectedSubject].every((chapter) => chapter.selected);
    const updatedChapters = chapters[selectedSubject].map((chapter) => ({
      ...chapter,
      selected: !allSelected,
      numQuestions: chapter.numQuestions ?? "", // Keep numQuestions safe
    }));
    const newChapters = { ...chapters, [selectedSubject]: updatedChapters };
    setChapters(newChapters);
    saveChaptersToLocalStorage(newChapters);
  };

  const handleChapterToggle = (chapterId) => {
    if (!selectedSubject) return;
    const updatedChapters = chapters[selectedSubject].map((chapter) =>
      chapter.id === chapterId
        ? { ...chapter, selected: !chapter.selected, numQuestions: chapter.numQuestions ?? "" }
        : chapter
    );
    const newChapters = { ...chapters, [selectedSubject]: updatedChapters };
    setChapters(newChapters);
    saveChaptersToLocalStorage(newChapters);
  };

  const handleNumQuestionsChange = (chapterId, value) => {
    if (!selectedSubject) return;
    const updatedChapters = chapters[selectedSubject].map((chapter) =>
      chapter.id === chapterId
        ? { ...chapter, numQuestions: value }
        : chapter
    );
    const newChapters = { ...chapters, [selectedSubject]: updatedChapters };
    setChapters(newChapters);
    saveChaptersToLocalStorage(newChapters);
  };

  return (
    <div className="rounded-tl-lg rounded-bl-lg flex flex-row w-full h-[19rem] bg-white shadow-md max-sm:flex-col max-sm:h-[30rem] max-sm:-mt-10">
      {/* Subjects */}
      <div className="flex w-1/2 flex-col mt-1 border-r-4 overflow-y-auto max-sm:flex max-sm:flex-wrap max-sm:h-full max-sm:w-full">
        {selectedSubjects.map((subject) => (
          <button
            key={subject}
            onClick={() => handleSubjectClick(subject)}
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
        <span className="hidden max-sm:block"><hr className="h-2 w-full m-2" /></span>
      {/* Chapters */}
      <div className="flex flex-col w-1/2 overflow-y-auto gap-4 px-1 max-sm:w-fit">
        {selectedSubject && chapters[selectedSubject] && (
          <div className="p-2">
            <div className="flex justify-between items-center mb-2 gap-2">
              <button
                onClick={handleToggleAll}
                className="w-1/2 h-[50px] px-2 py-3 text-white rounded-lg bg-gradient-to-r from-[#54ADD3] to-[#3184A6]"
              >
                Select All
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              {chapters[selectedSubject]?.map((chapter) => (
  <div
    key={chapter.id}
    onClick={() => handleChapterToggle(chapter.id)}
    title="click here to select chapters"
    className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all duration-200
      ${
        chapter.selected
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
  disabled={!chapter.selected}
  className={`
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
  `}
  value={chapter.numQuestions ?? ""}
  placeholder="Qty"
  onClick={(e) => e.stopPropagation()}
  onChange={(e) =>
    handleNumQuestionsChange(
      chapter.id,
      e.target.value.replace(/^0+/, "")
    )
  }
/>

  </div>
))}


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chapters;

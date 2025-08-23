"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image"; // Keep Next.js Image component for optimization
import Chapters from "../chapters/chapters"; // Import Chapters component
import Preview from "../preview/preview"; // Import Preview component
import { useMemo } from "react";
const Createtest = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  // selectedChapters will be an object: { subjectName: { chapterId: { numQuestions: X, chapterName: Y } } }
  const [selectedChapters, setSelectedChapters] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [testName, setTestName] = useState("");

  const steps = ["Subjects", "Chapters", "Preview"];

  // useEffect to control the escape screen
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement &&
        !document.mozFullScreenElement
      ) {
        router.push("/testselection");
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, [router]);

  // Load selected subjects from local storage on mount
  useEffect(() => {
    const savedSubjects = JSON.parse(
      localStorage.getItem("selectedSubjects") || "[]"
    );
    setSelectedSubjects(savedSubjects);
  }, []);

  // Load selected chapters from local storage on mount
  useEffect(() => {
    const savedChapters = JSON.parse(
      localStorage.getItem("selectedChapters") || "{}"
    );
    setSelectedChapters(savedChapters);
  }, []);

  useEffect(() => {
    if (Object.keys(selectedChapters).length > 0) {
      localStorage.setItem(
        "selectedChapters",
        JSON.stringify(selectedChapters)
      );
    }
  }, [selectedChapters]); // This will run whenever selectedChapters changes

  // Function to handle subject selection
  const handleSubjectSelection = (subject) => {
    setSelectedSubjects((prevSelectedSubjects) => {
      let updatedSubjects;
      if (prevSelectedSubjects.includes(subject)) {
        updatedSubjects = prevSelectedSubjects.filter(
          (item) => item !== subject
        );
        // Also remove chapters for this subject if it's deselected
        setSelectedChapters((prevSelectedChapters) => {
          const newChapters = { ...prevSelectedChapters };
          delete newChapters[subject];
          localStorage.setItem("selectedChapters", JSON.stringify(newChapters));
          return newChapters;
        });
      } else {
        updatedSubjects = [...prevSelectedSubjects, subject];
      }
      // Update local storage
      localStorage.setItem("selectedSubjects", JSON.stringify(updatedSubjects));
      return updatedSubjects;
    });
  };

  // Show Popup if going from Step 2 to Step 3
  const handleNext = () => {
    if (activeStep === 2) {
      // Check if any chapters are selected across all subjects

      if (hasSelectedChapters) {
        setShowPopup(true);
      } else {
        // If no chapters selected, prevent moving to preview and show a message (optional)
        alert("Please select at least one chapter with questions.");
      }
    } else {
      setActiveStep((prev) => Math.min(3, prev + 1)); // Max step is 3
    }
  };

  // Handle Generate Test redirecting to TestInterface.jsx
  const handleGenerateTest = () => {
    if (selectedSubjects.length > 0) {
      router.push("/testinterfaceCT");
      localStorage.removeItem("testAnswers");
      localStorage.removeItem("questionTime"); // Clear question time as well
    }
  };

  // Handle test name submission
  const handleSubmitTestName = () => {
    if (testName.trim() !== "") {
      localStorage.setItem("testName", JSON.stringify(testName)); // Save test name to local storage as string
      setShowPopup(false);
      setActiveStep(3); // Move to preview page
    }
  };
  const hasSelectedChapters = useMemo(() => {
    const obj = selectedChapters || {};
    // obj = { Physics: { ch1: {...}, ch2: {...} }, Chemistry: {...} }
    return Object.values(obj).some((chaptersById) => {
      if (!chaptersById) return false;
      const list = Array.isArray(chaptersById)
        ? chaptersById
        : Object.values(chaptersById);
      return list.some((ch) => {
        if (!ch) return false;
        const n = parseInt(String(ch.numQuestions ?? 0), 10) || 0;
        // consider selected if has any data (or you can require n > 0)
        return n > 0 || Object.keys(ch).length > 0;
      });
    });
  }, [selectedChapters]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-center items-center w-full max-w-xs md:max-w-md h-12 md:h-20 rounded-xl mx-auto mb-6 bg-[#54ADD3] text-white text-2xl font-bold shadow-lg">
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <span className="bg-white rounded-full h-8 w-8 p-1 flex items-center justify-center mr-2 text-[#54ADD3]">
            +
          </span>
          Create Test
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center w-full mb-6 px-4">
        <ol className="flex w-full max-w-4xl text-xs text-gray-700 font-medium sm:text-base">
          {steps.map((step, index) => (
            <li
              key={index}
              className="relative flex flex-grow items-center justify-center"
            >
              {index !== 0 && (
                <div
                  className={`absolute top-1/3 left-[-50%] w-full h-0.5 ${
                    activeStep > index ? "bg-[#54ADD3]" : "bg-gray-300"
                  } transition-colors duration-300 -z-10`}
                ></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <span
                  className={`w-10 h-10 lg:w-12 lg:h-12 border-2 rounded-full flex justify-center items-center text-sm font-bold transition-all duration-300 shadow-md
                    ${
                      activeStep === index + 1
                        ? "bg-[#54ADD3] text-white border-transparent"
                        : activeStep > index
                        ? "bg-[#71C1DE] text-white border-[#71C1DE]"
                        : "bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                >
                  {index + 1}
                </span>
                <span className="mt-2 text-center">{step}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Content Section */}
      <div className="relative mt-6 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-6">
        {activeStep === 1 && (
          <>
            <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
              <Image
                src="/createtest.png" // Using placeholder image
                alt="Create Test"
                width={300}
                height={300}
                className="w-[70%] md:w-[300px] h-[150px] md:h-[300px] object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6">
              {["Physics", "Chemistry", "Biology"].map((subject, index) => (
                <button
                  key={index}
                  onClick={() => handleSubjectSelection(subject)}
                  className={`w-full px-6 py-4 text-lg font-semibold text-white rounded-lg shadow-md hover:scale-105 transition-transform flex items-center gap-3 justify-start
      ${
        selectedSubjects.includes(subject)
          ? "bg-gradient-to-r from-[#54ADD3] to-[#3184A6]"
          : "bg-[#71C1DE] hover:bg-[#54ADD3]"
      }`}
                >
                  <span className="text-2xl">
                    {subject === "Physics" && "⚛️"}
                    {subject === "Chemistry" && "🧪"}
                    {subject === "Biology" && "🌱"}
                  </span>
                  <span className="flex-1">{subject}</span>

                  {/* ✅ Visual acknowledgment on the right (✔️) */}
                  {selectedSubjects.includes(subject) && (
                    <span className="text-white text-xl font-bold">✔️</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Step 2: Chapter Selection */}
      <div className="mt-6 w-full max-w-4xl">
        {activeStep === 2 && (
          <Chapters
            selectedSubjects={selectedSubjects}
            selectedChapters={selectedChapters}
            setSelectedChapters={setSelectedChapters}
          />
        )}
      </div>

      {/* Step 3: Preview */}
      <div className="mt-6 w-full max-w-4xl">
        {activeStep === 3 && <Preview />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-4xl mt-8 flex-wrap gap-4 pb-4">
        <button
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          disabled={activeStep === 1}
          className="px-6 py-2 bg-[#54ADD3] text-white rounded-md hover:bg-[#3184A6] disabled:opacity-50"
        >
          Previous
        </button>
        {activeStep !== 3 && (
          <button
            onClick={handleNext}
            disabled={
              (activeStep === 1 && selectedSubjects.length === 0) ||
              (activeStep === 2 && !hasSelectedChapters) // Check if any chapter is selected
            }
            className="px-6 py-2 bg-[#54ADD3] text-white rounded-md hover:bg-[#3184A6] disabled:opacity-50"
          >
            Next
          </button>
        )}
        {activeStep === 3 && (
          <button
            onClick={handleGenerateTest}
            disabled={selectedSubjects.length === 0}
            className="px-6 py-2 bg-[#54ADD3] text-white rounded-md hover:bg-[#3184A6] disabled:opacity-50"
          >
            Generate Test
          </button>
        )}
      </div>

      {/* Popup for Test Name */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Enter Your Test Name
            </h2>
            <input
              type="text"
              placeholder="e.g., My First Physics Test"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54ADD3] mb-4"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                onClick={() => setShowPopup(false)} // cancel action
                className="w-full sm:w-1/2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTestName}
                disabled={!testName.trim()}
                className={`w-full sm:w-1/2 py-2 rounded-md text-white font-semibold transition ${
                  testName.trim()
                    ? "bg-[#54ADD3] hover:bg-[#3184A6]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Createtest;

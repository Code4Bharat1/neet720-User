"use client";

import { Card } from "@/components/ui/card";

// Map each subject to a different image
const subjectImages = {
  Mathematics: "/test.png",
  Physics: "/pyq.png",
  Chemistry: "/collage.png",
  Biology: "/online.png",
  English: "/image.png",
  History: "/a+.png",
};

function PYQCard({ title, description, year, subject, text2 }) {
  return (
    <Card className="group w-full max-w-sm overflow-hidden bg-white shadow-lg transition-all duration-500 hover:shadow-2xl relative hover:scale-[1.02]">
      {/* Image Section */}
      <div className="h-48 bg-[#F9FAFB] flex items-center justify-center p-6 transition-all duration-500 group-hover:bg-white group-hover:opacity-90">
        <img
          src={subjectImages[subject] || "/images/pyq-illustration.png"}
          alt={`${subject} PYQ Illustration`}
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
        />
      </div>

      {/* Footer Section */}
      <div className="bg-[#129EA0] px-4 py-3 transition-all duration-500 group-hover:bg-white relative h-14 overflow-hidden">
        {/* Original text */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-full">
          <h2 className="text-white text-lg sm:text-xl font-bold text-center">
            {title}
          </h2>
        </div>
        
        {/* Hover text */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
          <span className="text-[#129EA0] text-base sm:text-lg font-semibold px-2">
            {text2}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function CoreFeatureComponent() {
  // Sample data array
  const pyqData = [
    {
      title: "Mathematics PYQ",
      description:
        "Complete collection of previous year questions with detailed solutions",
      year: "2023",
      subject: "Mathematics",
      text2: "Access And practice Questions From Previous Years.",
    },
    {
      title: "SUBJECT WISE MARKS ANALYSIS",
      description: "Comprehensive physics questions from past examinations",
      year: "2023",
      subject: "Physics",
      text2: "View Detailed Dashboard With Subject Performance Analysis.",
    },
    {
      title: "NEET COLLEGE PREDICTION",
      description: "Important chemistry questions with step-by-step solutions",
      year: "2022",
      subject: "Chemistry",
      text2: "Explore ChemistPredict NEET Rank And Explore Suitable College Optionsry PYQ",
    },
    {
      title: "CREATE TEST",
      description: "Multiple choice questions covering all biology topics",
      year: "2023",
      subject: "Biology",
      text2: "Customize Tests TO Focus On Specific Topics For Revision.",
    },
    {
      title: "FAST QUIZ",
      description: "Previous year English literature examination papers",
      year: "2022",
      subject: "English",
      text2: "Review English PYQ",
    },
    {
      title: "RESULT SECTION",
      description: "Historical questions with comprehensive answers",
      year: "2023",
      subject: "History",
      text2: "Track And View Test Results.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#103F5D] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-white pt-4 sm:pt-5 pb-8 sm:pb-10">
          Previous Year Questions Collection
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pyqData.map((item, index) => (
            <PYQCard
              key={index}
              title={item.title}
              description={item.description}
              year={item.year}
              subject={item.subject}
              text2={item.text2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
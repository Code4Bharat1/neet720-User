"use client";

import { Card } from "@/components/ui/card";

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
    <Card className="group w-full max-w-sm sm:max-w-full mx-auto overflow-hidden bg-white shadow-lg transition duration-300 hover:shadow-xl relative rounded-2xl">
      {/* Image Section */}
      <div className="h-48 bg-[#F9FAFB] flex items-center justify-center p-6 transition-all duration-300 group-hover:bg-white">
        <img
          src={subjectImages[subject] || "/images/pyq-illustration.png"}
          alt={`${subject} PYQ Illustration`}
          className="w-full h-full object-contain transition duration-300 group-hover:opacity-0"
        />
      </div>

      {/* Footer Section */}
      <div className="bg-[#129EA0] px-4 py-3 transition-all duration-300 group-hover:bg-white relative h-14">
        <h2 className="text-white text-base sm:text-lg md:text-xl font-bold text-center opacity-100 group-hover:opacity-0 transition duration-300">
          {title}
        </h2>
      </div>

      {/* Hover Text */}
      <span className="absolute inset-0 flex items-center justify-center text-[#129EA0] text-sm sm:text-base md:text-lg lg:text-xl font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-3">
        {text2}
      </span>
    </Card>
  );
}

export default function CoreFeatureComponent() {
  const pyqData = [
    {
      title: "Mathematics PYQ",
      description:
        "Complete collection of previous year questions with detailed solutions",
      year: "2023",
      subject: "Mathematics",
      text2: "Access And Practice Questions From Previous Years.",
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
      text2: "Predict NEET Rank And Explore Suitable College Options.",
    },
    {
      title: "CREATE TEST",
      description: "Multiple choice questions covering all biology topics",
      year: "2023",
      subject: "Biology",
      text2: "Customize Tests To Focus On Specific Topics For Revision.",
    },
    {
      title: "FAST QUIZ",
      description: "Previous year English literature examination papers",
      year: "2022",
      subject: "English",
      text2: "Review English PYQs Quickly And Effectively.",
    },
    {
      title: "RESULT SECTION",
      description: "Historical questions with comprehensive answers",
      year: "2023",
      subject: "History",
      text2: "Track And View Test Results With Insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#103F5D] px-4 sm:px-6 md:px-10 lg:px-16 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 text-white leading-snug">
          Previous Year Questions Collection
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

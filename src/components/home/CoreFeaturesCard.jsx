"use client";

import { Card } from "@/components/ui/card";

function PYQCard({ title, description, year, subject }) {
  return (
    <Card className="group w-full max-w-sm overflow-hidden bg-white shadow-lg transition duration-300 hover:shadow-xl relative">
      {/* Image Section */}
      <div className="h-48 bg-[#F9FAFB] flex items-center justify-center p-6 transition-all duration-300 group-hover:bg-white">
        <img
          src="/images/pyq-illustration.png"
          alt="PYQ Documents Illustration"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Footer Section */}
      <div className="bg-[#129EA0] px-4 py-3 transition-all duration-300 group-hover:bg-white relative h-14">
        {/* Original text hidden */}
        <h2 className="text-white text-xl font-bold text-center opacity-100 group-hover:opacity-0 transition duration-300">
          PYQ
        </h2>

        {/* Hover text shown */}
      </div>
      <span className="absolute inset-0 flex items-center justify-center text-[#129EA0] text-2xl font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
        View PYQ
      </span>
    </Card>
  );
}

export default function CoreFeatureComponent() {
  // Sample data array
  const pyqData = [
    {
      title: "Mathematics Previous Year Questions",
      description:
        "Complete collection of previous year questions with detailed solutions",
      year: "2023",
      subject: "Mathematics",
    },
    {
      title: "Physics Question Bank",
      description: "Comprehensive physics questions from past examinations",
      year: "2023",
      subject: "Physics",
    },
    {
      title: "Chemistry Practice Set",
      description: "Important chemistry questions with step-by-step solutions",
      year: "2022",
      subject: "Chemistry",
    },
    {
      title: "Biology MCQ Collection",
      description: "Multiple choice questions covering all biology topics",
      year: "2023",
      subject: "Biology",
    },
    {
      title: "English Literature Papers",
      description: "Previous year English literature examination papers",
      year: "2022",
      subject: "English",
    },
    {
      title: "History Question Papers",
      description: "Historical questions with comprehensive answers",
      year: "2023",
      subject: "History",
    },
  ];

  return (
    <div className="min-h-screen bg-[#103F5D] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-white pt-5 pb-10">
          Previous Year Questions Collection
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pyqData.map((item, index) => (
            <PYQCard
              key={index}
              title={item.title}
              description={item.description}
              year={item.year}
              subject={item.subject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

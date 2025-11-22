"use client";

import Image from "next/image";

const features = [
  {
    title: "Target High-Weight Chapters",
    description: "Prioritize topics that matter the most in the exam",
    image:
      "/EP1.png", // Replace with your image path
  },
  {
    title: "Balanced Coverage",
    description: "Cover all subjects without wasting effort on low-impact areas",
    image:
      "/EP2.png",
  },
  {
    title: "Efficient Time Management",
    description: "Reduce revision stress with a clear plan",
    image:
      "/EP3.png",
  },
  {
    title: "Track Your Progress",
    description: "Monitor completion and stay on schedule",
    image:
      "/EP4.png",
  },
];

export default function ExamPlan() {
  return (
    <div className="bg-[#103f5d]">
      {/* First Section */}
      <section className="bg-[#103f5d] text-white">
        {/* Navbar */}
        <div className="bg-[#1DB5AC] py-3 md:py-4 px-4 md:px-6 flex justify-center items-center space-x-2 md:space-x-3">
          <span className="text-white text-base md:text-lg font-semibold">Features</span>
          <span className="text-white text-lg md:text-xl font-bold">{">>>"}</span>
          <span className="text-white text-lg md:text-xl font-semibold">Exam Plan</span>
        </div>

        {/* Content */}
        <div className="py-8 md:py-12 px-4 sm:px-6 text-center">
          {/* Image */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="rounded-[20px] border-2 border-teal-500 p-1 shadow-lg overflow-hidden w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]">
              <Image
                src="/doctor.png" // Update if your image name/path is different
                alt="Student"
                width={240}
                height={240}
                className="rounded-[14px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-semibold font-serif mb-3 md:mb-4">
              Exam Plan
            </h2>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></span>
              <div className="border-t border-white w-32 sm:w-40 md:w-72 mx-[1px]"></div>
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Subheading */}
          <p className="text-[#18e0d0] text-lg sm:text-xl font-serif font-medium mb-4 md:mb-6">
           Practice Smarter, Score Higher
          </p>

          {/* Tagline */}
          <div className="text-base sm:text-lg md:text-xl font-serif font-thin text-white inline-block border border-[#18e0d0] rounded-md px-3 py-1 sm:px-4 sm:py-2 mb-4 md:mb-6">
            Personalized Testing for Smart Revision
          </div>

          {/* Description */}
          <div className="text-left text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl lg:max-w-4xl mx-auto space-y-2 sm:space-y-3">
            <ul className="list-disc list-inside space-y-1 sm:space-y-1">
              <li>
                The Exam Plan helps students study smarter by organizing chapters based on NEET weightage.
              </li>
              <li>
                Focus more on high-yield topics that carry more marks.
              </li>
              <li>
                It’s a time-saving, result-boosting approach to revision.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-[#103f5d] py-4 sm:py-6 px-3 sm:px-4">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-block bg-[#129ea0] text-white font-semibold px-8 sm:px-14 py-1 rounded-md text-base sm:text-lg">
            Features
          </div>
        </div>

        {/* Features Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 px-2 sm:px-10">
  {features.map((feature, index) => (
    <div
      key={index}
      className="bg-[#103F5D] rounded-lg text-white border"
    >
      {/* Top section with background and title */}
      <div className="bg-[#129EA0] h-44 sm:h-48 flex flex-col text-center items-center justify-center rounded-t-lg">
        <h1 className="text-lg md:text-xl font-bold pb-8">
          {feature.title}
        </h1>

        {/* Overlapping Image */}
        <img
          src={feature.image}
          alt={feature.title}
          width={100}
          height={100}
          className="rounded-full -mb-16 h-28 w-28 object-cover"
        />
      </div>

      {/* Bottom section with description */}
      <div className="flex flex-col items-center mt-20 mb-10 px-4">
        <p className="text-xl md:text-2xl text-center">{feature.description}</p>
      </div>
    </div>
  ))}
</div>


        {/* Benefits Section */}
        <div className="bg-[#103f5d] py-8 sm:py-12 px-3 sm:px-4 text-white text-center">
          {/* Oval Title */}
          <div
            className="inline-block bg-white text-[#103f5d] text-lg sm:text-xl md:text-2xl font-semibold px-8 sm:px-16 py-2 sm:py-4 rounded-full shadow-lg border-2 border-[#1DB5AC] mb-6 sm:mb-10"
            style={{ width: "fit-content" }}
          >
            Benefits Section
          </div>

          {/* List Items */}
          <ul className="text-left max-w-md sm:max-w-xl mx-auto space-y-2 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl">
            <li>✅ Predict important topics based on past trends</li>
            <li>✅ Improve speed and question selection skills</li>
            <li>✅ Get used to NEET-style MCQs</li>
            <li>✅ Strengthen weak areas with real examples</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
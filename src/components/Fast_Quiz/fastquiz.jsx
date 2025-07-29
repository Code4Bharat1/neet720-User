"use client";

import Image from "next/image";

export default function FastQuiz() {
  return (
    <div className="min-h-screen bg-[#0A3C5F]">
      {/* Top Navigation Breadcrumb */}
      <div className="bg-[#1DB5AC] py-3 md:py-4 px-4 md:px-6 flex justify-center items-center space-x-2 md:space-x-3">
          <span className="text-white text-base md:text-lg font-semibold">Features</span>
          <span className="text-white text-lg md:text-xl font-bold">{">>>"}</span>
          <span className="text-white text-lg md:text-xl font-semibold">Fast Quiz</span>
        </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 lg:px-32 py-20">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row w-full items-center lg:items-start justify-center gap-16 lg:gap-40 mb-8">
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className="text-white text-[40px] md:text-[60px] font-bold text-center font-tinos mt-10">
              Fast Quiz
            </h1>
            <div className="flex justify-center">
              <Image
                src="/Line 51.png"
                alt="line"
                width={270}
                height={400}
              />
            </div>
            <p className="text-[#23ECE7] text-2xl md:text-3xl font-bold leading-relaxed text-center font-tinos">
              Compete against bots to boost
              <br />
              speed and performance.
            </p>
          </div>

          {/* Doctor Image */}
          <div className="flex-shrink-0 w-[90%] sm:w-[400px] flex justify-left items-center mx-auto">
            <div className="w-full h-[300px] md:h-[360px] p-[6px] rounded-[24px] bg-[#0b3d59] border-[3px] border-[#00c4a7] flex justify-left items-left">
              <Image
                src="/doctor.png"
                alt="Doctor with stethoscope"
                width={400}
                height={400}
                className="w-full h-full object-cover mt-3 rounded-[20px]"
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-6">
          <div className="border border-teal-400 rounded-2xl px-8 md:px-16 py-2 inline-block font-tinos mb-4">
            <p className="text-white text-xl md:text-3xl font-medium">
              Quick. Competitive. Brain-Boosting!
            </p>
          </div>
          <p className="text-[#23ECE7] text-xl md:text-3xl font-tinos">
            Short Quizzes. Big Gains.
          </p>
        </div>

        {/* Feature Points */}
        <div className="space-y-4 mb-10">
          {[
            "The Fast Quiz feature is designed to make learning quick, fun, and competitive.",
            "Compete against AI bots in time-bound quizzes that simulate real-time pressure.",
            "These quizzes are short but intense, focusing on speed-based question solving.",
          ].map((point, idx) => (
            <div
              key={idx}
              className="flex items-start text-white text-lg md:text-2xl lg:text-3xl"
            >
              <div className="w-3 h-3 bg-white rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p>{point}</p>
            </div>
          ))}
        </div>

        {/* Features Button */}
        <div className="flex justify-center mb-8">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 md:px-16 lg:px-80 py-3 rounded-full font-medium text-xl md:text-2xl lg:text-3xl transition-colors duration-200">
            Features
          </button>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 bg-[#0A3C5F] p-4 rounded-md">
          {/* Cards (Reusable) */}
          {[
            {
              title: "Speed Practice",
              text: "Sharpen reflexes and improve accuracy under timed conditions.",
              reverse: false,
              image: "/Q1.png",
            },
            {
              title: "Instant Feedback",
              text: "Instantly view scores, mistakes, and correct answers.",
              reverse: true,
              image: "/Q2.png",
            },
            {
              title: "Gamified Learning",
              text: "Feel the thrill of learning with fun, competitive energy.",
              reverse: false,
              image: "/Q3.png",
            },
            {
              title: "Quick Revision",
              text: "Perfect for daily revision without investing hours.",
              reverse: true,
              image: "/Q4.png",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row ${
                item.reverse ? "md:flex-row-reverse" : ""
              } items-center justify-between border-b border-white py-4 px-4 md:px-16 gap-4`}
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={205}
                  height={205}
                  className="rounded-full object-cover"
                />
                <h3 className="text-white font-bold text-2xl md:text-3xl mt-2">
                  {item.title}
                </h3>
              </div>
              <p className="text-white text-lg md:text-2xl font-semibold text-center max-w-[350px] mt-2 md:mt-16">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
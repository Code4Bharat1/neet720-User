"use client";
import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

export default function CreateTestPage() {
  return (
    <div className="min-h-screen bg-[#0f3d4f] text-white font-sans">
      {/* Top Navigation Breadcrumb */}
      <div className="bg-[#00b4d8] text-5xl py-5 px-6 flex items-center justify-center">
        <div className="text-white font-medium">Features</div>
        <div className="text-white font-semibold">&#187;&#187; Create Test</div>
      </div>

      {/* Main Content Section */}
      <div className="text-center py-10 px-4 md:px-10">
        <div className="flex justify-center">
          <div className="w-[550px] h-[550px] p-[6px] rounded-[24px] bg-[#0b3d59] border-[3px] border-[#00c4a7]">
  <Image
    src="/doctor_girl.png"
    alt="Doctor with stethoscope"
    width={192}
    height={192}
    className="w-full h-full object-cover mt-3 -ml-3 rounded-[20px]"
  />
</div>

        </div>

        <h1 className="text-5xl font-bold mt-6">Create Test</h1>
        <p className="text-[#90e0ef] mt-2 text-2xl text-wrap font-medium">
          Customize tests to focus on specific topics for revision.
        </p>

        <button className="mt-4 px-20 py-2 border border-white rounded-lg text-2xl transition">
          Personalized Testing for Smart Revision
        </button>
        <div className="mt-4 text-gray-400 text-2xl px-10">
          <ul className="mt-6 w-full text-left text-lg text-gray-200 max-w-full mx-auto md:text-2xl list-disc list-inside">
            <li>
              The Create Test feature allows students to build their own mock
              tests by selecting specific chapters, topics, or subjects.
            </li>
            <li className="mt-2">
              This customization helps focus on areas where improvement is
              needed most.
            </li>
            <li className="mt-2">
              It gives full control over what to study and practice.
            </li>
          </ul>
        </div>
      </div>

      {/* Feature Icons Section */}
      <div className="text-center py-6 px-10">
        <button className="bg-[#48cae4] px-20 py-2 rounded-lg text-white font-semibold mb-4">
          Features
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-12 rounded-lg">
          {[
            {
              title: "Choose Questions",
              desc: "Set number of questions, topic, or full chapter.",
              image: "/doctor_girl.png",
            },
            {
              title: "Set Difficulty",
              desc: "Choose between Easy, Medium, or Hard.",
              image: "/doctor_girl.png",
            },
            {
              title: "Control Time",
              desc: "Customize your time or practice under pressure.",
              image: "/doctor_girl.png",
            },
            {
              title: "Repeat or Randomize",
              desc: "Retest specific sections or use variety.",
              image: "/doctor_girl.png",
            },
          ].map((f, idx) => (
            <div key={idx} className="bg-[#0077b6] rounded-lg text-white">
              <div className="bg-[#48cae4] h-48 mx-auto mb-4 flex flex-col items-center justify-center rounded-lg">
                <h1 className="text-xl font-bold pb-10">{f.title}</h1>
                <Image
                  src={f.image}
                  alt={f.title}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto -mb-32 h-36 w-36 object-cover"
                />
              </div>
              <div className="flex flex-col items-center mt-20 mb-10">
                <h3 className="font-bold text-lg text-center">{f.title}</h3>
                <p className="text-sm text-center mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-10 text-center">
        <h2 className=" w-[80%] md:w-[500px] h-[120px] bg-gray-200 border-2 border-cyan-400 text-[#0f3d4f] font-bold text-xl flex items-center justify-center rounded-full mx-auto my-8 shadow">
  Benefits Section
</h2>

        <ul className="text-white text-sm space-y-2 w-fit flex flex-col justify-center items-start mx-auto list-disc list-inside">
          {[
            "Focus only on weak areas",
            "Save time with targeted practice",
            "Learn better with active recall",
            "Smart prep for full-syllabus revision",
            "Total control for test confidence",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center text-xl justify-start gap-2">
              <FaCheckCircle className="text-green-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="py-10" />
    </div>
  );
}

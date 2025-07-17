"use client";
import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

export default function CreateTestPage() {
  return (
    <div className="min-h-screen bg-[#103F5D] text-white font-sans">
      {/* Top Navigation Breadcrumb */}
      <div className="bg-[#00b4d8] text-3xl md:text-5xl py-5 px-4 flex items-center justify-center gap-2 text-center">
        <div className="font-medium">Features</div>
        <div className="font-semibold">&#187;&#187; Create Test</div>
      </div>

      {/* Main Content Section */}
      <div className="text-center py-10 px-4 md:px-10">
        {/* Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-[350px] md:max-w-[550px] aspect-square p-[6px] rounded-[24px] bg-[#0b3d59] border-[3px] border-[#00c4a7]">
            <Image
              src="/doctor_girl.png"
              alt="Doctor with stethoscope"
              width={550}
              height={550}
              className="w-full h-full object-cover mt-3 rounded-[20px]"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mt-16">Create Test</h1>

        <div className="flex justify-center mt-4">
          <Image
            src="/Line 51.png"
            alt="line"
            width={250}
            height={20}
            className="align"
          />
        </div>

        <p className="text-[#23ECE7] mt-4 mx-auto text-2xl md:text-4xl font-tinos font-bold max-w-[90%] md:max-w-[700px]">
          Customize tests to focus on specific topics for revision.
        </p>

        <button className="mt-6 px-10 md:px-28 py-2 border border-[#23ECE7] rounded-2xl text-xl md:text-2xl transition font-tinos">
          Personalized Testing for Smart Revision
        </button>

        {/* Description List */}
        <div className="mt-6 text-gray-300 text-left px-6 md:px-20">
          <ul className="text-lg md:text-2xl list-disc list-inside space-y-4 font-poppins">
            <li>
              The Create Test feature allows students to build their own mock
              tests by selecting specific chapters, topics, or subjects.
            </li>
            <li>
              This customization helps focus on areas where improvement is
              needed most.
            </li>
            <li>
              It gives full control over what to study and practice.
            </li>
          </ul>
        </div>
      </div>

      {/* Feature Icons Section */}
      <div className="text-center py-6 px-4 md:px-10">
        <button className="bg-[#129EA0] px-10 md:px-20 py-2 rounded-3xl text-white font-semibold mb-16 text-2xl md:text-[30px]">
          Features
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 px-2 sm:px-10">
          {[
            {
              title: "Choose Questions",
              desc: "Set number of questions, topic, or full chapter.",
              image: "/doctor_girl.png",
            },
            {
              title: "Set Dficulty",
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
            <div
              key={idx}
              className="bg-[#103F5D] rounded-lg text-white border"
            >
              <div className="bg-[#129EA0] h-44 sm:h-48 flex flex-col items-center justify-center rounded-t-lg">
                <h1 className="text-lg md:text-xl font-bold pb-8">
                  {f.title}
                </h1>
                <Image
                  src={f.image}
                  alt={f.title}
                  width={100}
                  height={100}
                  className="rounded-full -mb-16 h-28 w-28 object-cover"
                />
              </div>
              <div className="flex flex-col items-center mt-20 mb-10 px-4">
                <p className="text-xl md:text-2xl text-center">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-10 text-center">
        <div className="relative flex justify-center px-4">
          <Image
            src="/Ellipse 85.png"
            alt="ellipse"
            width={600}
            height={150}
            className="w-full max-w-[500px] sm:max-w-[600px] h-auto"
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-[#0f3d4f] font-bold text-2xl md:text-3xl">
            Benefits Section
          </h2>
        </div>

        <div className="flex justify-center mt-8 px-4">
          <Image
            src="/bulletPoints.png"
            alt="bullet points"
            width={500}
            height={500}
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </div>

      <div className="py-10" />
    </div>
  );
}

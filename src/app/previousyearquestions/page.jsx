"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertTriangle, Clock, X, Calendar, BookOpen, Award, TrendingUp } from "lucide-react";
import Head from "next/head";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import { FaArrowLeft } from "react-icons/fa";

const PreviousYearList = () => {
  const [years, setYears] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timer, setTimer] = useState(30);
  const [selectedYear, setSelectedYear] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // clear all PYQ-related storage keys on page load
    const keysToClear = [
      "marks",
      "wrongQuestions",
      "scoreSummary",
      "scoreTotal",
      "scoreMax",
      "finalMarks",
    ];
    keysToClear.forEach((key) => localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/years`
        );
        setYears(response.data.years);
      } catch (error) {
        console.error("Failed to fetch years:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    let countdown;
    if (showInstructions && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleProceedNow();
    }
    return () => clearInterval(countdown);
  }, [showInstructions, timer]);

  const handleStartTest = (year) => {
    setSelectedYear(year);
    setShowInstructions(true);
    setTimer(30);
  };

  const handleCancel = () => {
    setShowInstructions(false);
    setTimer(30);
  };

  const handleProceedNow = () => {
    localStorage.setItem("selectedYear", selectedYear);
    router.push("/testinterfacePYQ");
  };

  return (
    <>
      <Head>
        <title>
          NEET720 Previous Year Papers – Practice NEET PYQs (2005–2024) Online
        </title>
        <meta
          name="description"
          content="Practice NEET previous year question papers from 2005 to 2024 on NEET720. Start timed mock tests and boost your NEET exam preparation for free."
        />
        <meta
          name="keywords"
          content="NEET720 previous year papers, NEET PYQs, NEET question paper 2024, NEET past year questions, NEET mock test, NEET online practice"
        />
        <link
          rel="canonical"
          href="https://neet720.com/previousyearquestions"
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-teal-200 bg-white hover:bg-teal-50 text-sm text-gray-700 shadow-md hover:shadow-lg transition-all mb-6"
            >
              <FaArrowLeft className="text-teal-600" /> Back to Dashboard
            </button>

            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-6 shadow-xl transform hover:scale-105 transition-transform">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Previous Year Question Papers
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Test your knowledge with carefully curated question papers from previous years. 
                Choose a year and start your practice session.
              </p>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100 hover:border-teal-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Papers</p>
                    <p className="text-3xl font-bold text-teal-600">{years.length}</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-cyan-100 hover:border-cyan-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Questions</p>
                    <p className="text-3xl font-bold text-cyan-600">200</p>
                  </div>
                  <div className="bg-cyan-100 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-cyan-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100 hover:border-teal-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Time Duration</p>
                    <p className="text-3xl font-bold text-teal-600">3 hrs</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Year Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {years.map((year, index) => (
                <div
                  key={year}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-teal-100 hover:border-teal-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-100 rounded-full translate-y-12 -translate-x-12 opacity-20 group-hover:opacity-30 transition-opacity"></div>

                  <div className="relative p-6">
                    {/* Year Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 mb-4 shadow-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Year {year}
                    </div>

                    {/* Card Content */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                        NEET {year}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>200 Questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>720 Marks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>180 Minutes</span>
                        </div>
                      </div>
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={() => handleStartTest(year)}
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="w-5 h-5" />
                      Start Test
                    </button>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {years.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-teal-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <BookOpen className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Question Papers Available
                </h3>
                <p className="text-gray-500">
                  Question papers will appear here once they're loaded.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border-2 border-teal-200 animate-fade-in">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">Test Instructions</h2>
                </div>
                <button 
                  onClick={handleCancel}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Instructions List */}
                <div className="bg-teal-50 rounded-xl p-4 border-2 border-teal-100">
                  <h3 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Important Guidelines
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                      <span>Do not exit full screen once test starts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                      <span>Switching tabs may result in disqualification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                      <span>Use only on-screen buttons to navigate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                      <span>Read all questions carefully before answering</span>
                    </li>
                  </ul>
                </div>

                {/* Timer Display */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl shadow-sm">
                    <Clock className="w-6 h-6 text-amber-600" />
                    <span className="text-gray-700 font-medium">Test begins in</span>
                    <div className="text-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-lg shadow-md">
                      {timer}
                    </div>
                    <span className="text-gray-700 font-medium">seconds</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-colors border-2 border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProceedNow}
                    disabled={timer > 0}
                    className={`w-1/2 px-4 py-3 rounded-xl font-semibold text-white transition-all transform ${
                      timer > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 shadow-lg"
                    }`}
                  >
                    Start Test
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{ width: `${((30 - timer) / 30) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default PreviousYearList;
export const metadata = {
  title:
    "testselection | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testselection",
    title: "testselection | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


"use client";
import React, { useState , useEffect} from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import Hero from "@/components/dashboard/hero";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import Overview from "@/components/overview/overview";
import TargetTrackerCard from "@/components/Analytics/TargetTracker";
import PendingTestCard from "@/components/Analytics/PendingTestCard";
import SubjectStatisticsCard from "@/components/Analytics/SubjectStatisticsCard";
import LastTestResultCard from "@/components/Analytics/LastTestResult";
import UpcomingActivitiesCard from "@/components/Analytics/UpcomingActivitiesCard";
import RecentTestReportCard from "@/components/Analytics/RecentTestReportCard";
import TestCards from "@/components/TestSelection/TestCards";
import ScheduledTestCard from "@/components/TestSelection/ScheduledTestCard";
import Head from "next/head";

const TEST_STORAGE_KEYS = [
  "testStartTime",
  "testAnswers",
  "visitedQuestions",
  "markedForReview",
  "timeSpent",
  "perQuestionMarks",
  "totalMarks",
  "testName",
  "currentTestID",
  "selectedSubjects",
  "selectedChapters",
  "testName",
  "testAnswers",
  "questionTime"
];

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Year");

  // 🔹 Clean up any leftover test state when this page loads
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        TEST_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
        // If you used sessionStorage for any of these, also clear there:
        // TEST_STORAGE_KEYS.forEach((k) => sessionStorage.removeItem(k));
      }
    } catch (e) {
      console.warn("Storage cleanup failed:", e);
    }
  }, []);

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
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:title"
          content="NEET720 Previous Year Papers – Practice NEET PYQs (2005–2024) Online"
        />
        <meta
          property="og:description"
          content="Access and practice NEET PYQs from 2005 to 2024 on NEET720. Take full-length online tests year-wise and improve your performance."
        />
        <meta
          property="og:image"
          content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/pyqs.png"
        />
        <meta
          property="og:url"
          content="https://neet720.com/previousyearquestions"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NEET720 Previous Year Papers – Practice NEET PYQs (2005–2024) Online"
        />
        <meta
          name="twitter:description"
          content="NEET720 helps you prepare better with official previous year NEET papers from 2005 to 2024. Start practicing full tests online for free."
        />
        <meta
          name="twitter:image"
          content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/pyqs.png"
        />
      </Head>
      <div className="md:flex min-h-screen relative">
        {/* Sidebar for md screens */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full md:w-5/6 flex flex-col">
          <ToggleBar />
          <NavBar />

          <Hero selectedFilter={selectedFilter} />

          {/* Updated Grid Layout: 3 Columns in Medium Screens */}
          <div className="mx-4 md:mt-6">
            <TestCards />
          </div>
          <div className="mx-4 md:mt-6">
            <ScheduledTestCard />
          </div>

          {/* Bottom Navbar for mobile screens */}
          <BottomNavbar selectedFilter={selectedFilter} />
        </div>
      </div>
    </>
  );
};

export default Page;

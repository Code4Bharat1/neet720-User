export const metadata = {
  title:
    "examplan | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/examplan",
    title: "examplan | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};



"use client";

import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import ReviewMistake from "@/components/review-mistake/review-mistake";
import AlreadyCreatedTest from "@/components/alreadycreatedtest/alreadycreatedtest";
import Ephero from "@/components/ephero/ephero";
import NeetPrep from "@/components/neetprep/neetprep";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>NEET720 Exam Plan - Biology, Chemistry & Physics Preparation</title>
        <meta name="description" content="Create a personalized NEET exam plan for Biology, Chemistry, and Physics. Track your subject-wise study progress, test schedules, and performance on NEET720." />
        <meta name="keywords" content="NEET exam plan, NEET preparation schedule, NEET Biology plan, NEET Chemistry plan, NEET Physics plan, NEET study plan, NEET720, medical entrance planning" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="NEET720 Exam Plan - Biology, Chemistry & Physics Preparation" />
        <me ta property="og:description" content="Create a personalized NEET exam plan for Biology, Chemistry, and Physics. Track your subject-wise study goals, progress, and test performance with NEET720." />
        <meta property="og:image" content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/ExamPlan" />
        <meta property="og:url" content="https://neet720.com/examplan" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NEET720 Exam Plan - Biology, Chemistry & Physics Preparation" />
        <meta name="twitter:description" content="Personalize your NEET exam plan for Biology, Chemistry, and Physics and track your subject-wise study progress and performance." />
        <meta name="twitter:image" content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/ExamPlan" />

        <link rel="canonical" href="https://neet720.com/examplan" />
      </Head>
      <div className="md:flex min-h-screen relative">
        {/* Sidebar for md screens */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full md:w-5/6 flex flex-col min-h-screen">
          <ToggleBar />
          <NavBar />

          {/* Content Section (fixing overflow issue) */}
          <div className="flex-grow overflow-auto md:pb-0 pb-[60px]">
            <Ephero />
            <NeetPrep />
          </div>

          {/* Bottom Navbar should always stay at the bottom */}
          <div className="fixed bottom-0 left-0 w-full bg-white z-50">
            <BottomNavbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

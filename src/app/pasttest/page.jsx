export const metadata = {
  title:
    "pasttest | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/pasttest",
    title: "pasttest | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import TestEnterHero from "@/components/entertest/TestEnterHero";
import TestEnterCards from "@/components/entertest/TestEnterCards";
import PastTest from "@/components/pasttest/pasttest";
import Head from "next/head";

const Page = () => {

  
  return (
    <>
      <Head>
        <title>NEET720 Past Tests - Review Performance & Track Progress</title>
        <meta name="description" content="Review your past NEET tests on NEET720. Analyze your scores, track performance trends, and improve by identifying mistakes and strengths in each subject." />
        <meta name="keywords" content="NEET past tests, NEET test performance, NEET result analysis, review NEET tests, NEET720 analytics, NEET score tracking, performance improvement" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="NEET720 Past Tests - Review Performance & Track Progress" />
        <meta property="og:description" content="View your NEET test history, analyze mistakes, and track progress over time with NEET720’s smart performance tools." />
        <meta property="og:image" content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/PastTest" />
        <meta property="og:url" content="https://neet720.com/pasttest" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NEET720 Past Tests - Review Performance & Track Progress" />
        <meta name="twitter:description" content="Track your NEET preparation journey by reviewing scores, mistakes, and improvement areas on NEET720." />
        <meta name="twitter:image" content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/PastTest" />

        <link rel="canonical" href="https://neet720.com/pasttest" />
      </Head>
      <div className="md:flex min-h-screen relative">
        {/* Sidebar for md screens */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full md:w-5/6 flex flex-col">
          <ToggleBar />
          <NavBar />

          <div className="mx-4 mt-6 md:mb-0 mb-28 md:mx-10">
            {/* Components */}
            <PastTest />
          </div>

          {/* Bottom Navbar for mobile screens */}
          <BottomNavbar />
        </div>
      </div>
    </>
  );
};

export default Page;

export const metadata = {
  title:
    "review-mistakeGT | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/review-mistakeGT",
    title: "review-mistakeGT | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import ReviewMistakeGT from "@/components/review-mistake/review-mistakeGT";

const Page = () => {
  return (
    <div className="md:flex min-h-screen relative">
      {/* Sidebar for md screens */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full md:w-5/6 flex flex-col min-h-screen">
        <ToggleBar />
        <NavBar />

        {/* Content Section (fixing overflow issue) */}
        <div className="flex-grow overflow-auto md:pb-0 pb-[60px]">
          <Suspense fallback={<div>loading</div>}>
          <ReviewMistakeGT />
          </Suspense>
        </div>

        {/* Bottom Navbar should always stay at the bottom */}
        <div className="fixed bottom-0 left-0 w-full bg-white z-50">
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
};

export default Page;

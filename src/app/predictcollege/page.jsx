export const metadata = {
  title:
    "predictcollege | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/predictcollege",
    title: "predictcollege | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};



import React from "react";
import FilterCard from "@/components/predictcollege/filtercard";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import PredictCollege from "@/components/predictcollege/predictcollege";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <NavBar />
      <div className="flex min-h-screen">
        {/* Filter Card */}
        <div className="hidden md:block md:w-1/4">
          <FilterCard />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-5/6 bg-white flex flex-col">
          

          {/* Main Content */}
          <div className="flex-grow ">
            {/* <AIRBanner/> */}
            <Suspense fallback={<div>loading</div>}>
            <PredictCollege />
            </Suspense>
          </div>

          {/* Bottom Navbar */}
          <div className="w-full">
            <BottomNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

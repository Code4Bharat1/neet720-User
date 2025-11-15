export const metadata = {
  title:
    "personaldata | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/personaldata",
    title: "personaldata | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


"use client";
import React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import PersonalData from "@/components/personaldata/personaldata";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";

const Page = () => {
  return (
    <div className="md:flex min-h-screen relative">
      {/* Sidebar for md screens */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full md:w-5/6 flex flex-col">
        <NavBar />
        
        {/* Main Scrollable Content */}
        <div className="flex-grow overflow-y-auto pb-16">  
          {/* pb-16 ensures space for BottomNavbar */}
          <PersonalData />
        </div>

        {/* Bottom Navbar for mobile screens */}
        <BottomNavbar/>
      </div>
    </div>
  );
};

export default Page;

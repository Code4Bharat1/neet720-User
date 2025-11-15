export const metadata = {
  title:
    "testinterfaceFQ | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testinterfaceFQ",
    title: "testinterfaceFQ | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


"use client";
import React from "react";
import TestInterface_FQ from "@/components/testinterface/testinterface_FQ";

const Page = () => {
  return (
    <div>
      {/* Desktop View (TestInterface will be visible) */}
      <div className="block">
        <TestInterface_FQ />
      </div>
    </div>
  );
};

export default Page;

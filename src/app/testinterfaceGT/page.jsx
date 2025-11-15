export const metadata = {
  title:
    "testinterfaceGT | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testinterfaceGT",
    title: "testinterfaceGT | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically load these heavy, browser‑only components in the client only
const TestInterface = dynamic(
  () => import("@/components/testinterface/testinterface_GT.jsx"),
  { ssr: false }
);
const TestInterfaceMobile = dynamic(
  () => import("@/components/testInterfaceMobileView/testInterface_GT"),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      {/* Desktop View */}
      <div className="">
        <TestInterface />
      </div>
      {/* Mobile View */}
      {/* <div className="block md:hidden">
        <TestInterfaceMobile />
      </div> */}
    </div>
  );
}

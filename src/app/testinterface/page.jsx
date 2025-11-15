export const metadata = {
  title:
    "testinterface | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testinterface",
    title: "testinterface | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


'use client'
import React from 'react';
import TestInterface from '@/components/testinterface/testinterface';
import TestInterfaceMobile from "@/components/testInterfaceMobileView/testInterface"

const Page = () => {
  return (
    <div>
      {/* Desktop View (TestInterface will be visible) */}
      <div className="block">
        <TestInterface />
      </div>

      {/* Mobile View (TestInterfaceMobile will be visible) */}
      {/* <div className="block md:hidden">
        <TestInterfaceMobile/>
      </div> */}
    </div>
  );
}

export default Page;

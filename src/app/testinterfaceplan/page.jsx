export const metadata = {
  title:
    "testinterfaceplan | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testinterfaceplan",
    title: "testinterfaceplan | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


import React from "react";
import TestInterface_plan from "@/components/testinterface/testinterface_plan";
import TestInterfaceMobile from "@/components/testinterfacemobile/testinterfacemobile";
import TestInterface from '@/components/testInterfaceMobileView/testInterface_plan'

const Page = () => {
  return (
    <div>
      {/* Desktop View (TestInterface will be visible) */}
      <div className="">
        <TestInterface_plan />
      </div>

      {/* Mobile View (TestInterfaceMobile will be visible) */}
      {/* <div className="block md:hidden">
        <TestInterface />
      </div> */}
    </div>
  );
};

export default Page;

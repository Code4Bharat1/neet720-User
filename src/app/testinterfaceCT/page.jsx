export const metadata = {
  title:
    "testinterfaceCT | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testinterfaceCT",
    title: "testinterfaceCT | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import React from "react";
import TestInterface_CT from "@/components/testinterface/testinterface_CT";
import TestInterfaceMobile from "@/components/testinterfacemobile/testinterfacemobile_CT";
import TestInterface from '@/components/testInterfaceMobileView/testInterface_CT';

const Page = () => {
  return (
    <div>
      {/* Desktop View (TestInterface will be visible) */}
      <div className="block">
        <TestInterface_CT />
      </div>

      {/* Mobile View (TestInterfaceMobile will be visible) */}
      {/* <div className="block md:hidden">
        <TestInterface/>
      </div> */}
    </div>
  );
};

export default Page;

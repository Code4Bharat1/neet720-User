export const metadata = {
  title:
    "resultCT | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/resultCT",
    title: "resultCT | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};



'use client'
import React from 'react';
import TestInterfaceMobile from '@/components/testinterfacemobile/testinterfacemobile';
import { Result } from 'postcss';
import ResultPage from '@/components/result/result_CT';
import ResultMobile from '@/components/resultmobile/resultmobile';
import BottomNavbar from '@/components/layout/bottomnav/bottomnav';

const Page = () => {
  return (
    <div>
      {/* Desktop View (TestInterface will be visible) */}
      <div className="block">
        <ResultPage/>
      </div>

      {/* Mobile View (TestInterfaceMobile will be visible) */}
      {/* <div className="block md:hidden">
       <ResultMobile />
        
      </div> */}
      <div className='mt-48 md:hidden'><BottomNavbar/></div>
    </div>
  );
}
export default Page;

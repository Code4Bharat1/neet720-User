export const metadata = {
  title:
    "top10_frontend | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/top10_frontend",
    title: "top10_frontend | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import Perfromance from '@/components/top10_frontend/Performance'
import FeaturesPerformance from '@/components/top10_frontend/FeaturePerformance'
import React from 'react'

const Page = () => {
  return (
    <div>
         <Perfromance/>
 
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
      <FeaturesPerformance/>
      
      </div>
    </div>
  )
}

export default Page
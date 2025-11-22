export const metadata = {
  title:
    "analyticSection | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/analyticSection",
    title: "analyticSection | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import Analytic from '@/components/analyticSection/Analytic'
import FeatureAnalytic from '@/components/analyticSection/FeatureAnalytic'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Analytic/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
        <FeatureAnalytic/>
      </div>
    </div>
  )
}

export default Page
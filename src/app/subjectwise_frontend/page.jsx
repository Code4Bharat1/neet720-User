export const metadata = {
  title:
    "Subjectwise_frontend | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/subjectwise_frontend",
    title: "Subjectwise_frontend | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import FeatureResult from '@/components/resultSection_frontend/featureResult'
import ResultSection from '@/components/resultSection_frontend/resultSection'
import FeatureSub from '@/components/Subjectwise_frontend/FeatureSub';
import SubjectWise from '@/components/Subjectwise_frontend/Subjectwise';

import React from 'react'

const Page = () => {
  return (
    <div>
     <SubjectWise/>
           <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
     
        <FeatureSub/>
      </div>
    </div>
  )
}

export default Page
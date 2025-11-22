export const metadata = {
  title:
    "recentTest | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/recenttest",
    title: "recentTest | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};



import FeatureTest from '@/components/recentTest/FeatureTest'
import RecentTest from '@/components/recentTest/RecentTest'
import React from 'react'

const Page = () => {
  return (
    <div>
      <RecentTest/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
      <FeatureTest/>
      </div>
    </div>
  )
}

export default Page
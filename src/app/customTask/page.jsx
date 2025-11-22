export const metadata = {
  title:
    "customTask | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/customTask",
    title: "customTask | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import CustomTask from '@/components/customTask/CustomTask.jsx'
import React from 'react'

const Page = () => {
  return (
    <div>
      <CustomTask/>
    </div>
  )
}

export default Page
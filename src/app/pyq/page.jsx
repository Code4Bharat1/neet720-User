export const metadata = {
  title:
    "pyq | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/pyq",
    title: "pyq | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


import PYQ from '@/components/PYQ/PYQ'
import React from 'react'

const Page = () => {
  return (
    <div>
      <PYQ/>
    </div>
  )
}

export default Page

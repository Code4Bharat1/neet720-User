export const metadata = {
  title:
    "Fast_Quiz | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/Fast_Quiz",
    title: "Fast_Quiz | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


import React from 'react'
import FastQuiz from '@/components/Fast_Quiz/fastquiz.jsx'


export default function page() {
  return (
    <div>
     
    <FastQuiz/>
    </div>
  )
}
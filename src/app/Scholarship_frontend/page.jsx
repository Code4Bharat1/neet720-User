export const metadata = {
  title:
    "Scholarship_frontend | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/Scholarship_frontend",
    title: "Scholarship_frontend | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};




'use client'
import React from 'react';
import SignUpPage from '@/components/signup/signup';
import Scholarship from '@/components/Scholarship_frontend/Scholarship'




const Page = () => {
  return (
    <div>
      <Scholarship/>
    </div>
  )
}


export default Page;
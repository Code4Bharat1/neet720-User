

export const metadata = {
  title:
    "noticeSection | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/noticeSection",
    title: "noticeSection | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};
import Notice from '@/components/noticeSection/Notice'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Notice/>
    </div>
  )
}

export default Page
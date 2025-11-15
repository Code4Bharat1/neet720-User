export const metadata = {
  title:
    "review-test-mistake | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/review-test-mistake",
    title: "review-test-mistake | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};



import ReviewAllTestMistakes from '@/components/review-mistake/review-mistake-all'
import React from 'react'

export default function page() {
  return (
    <div>
      <ReviewAllTestMistakes />
    </div>
  )
}

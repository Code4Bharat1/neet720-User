export const metadata = {
  title:
    "review-test-plan | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/review-test-plan",
    title: "review-test-plan | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import ReviewMistakeExamPlan from '@/components/review-mistake/review-mistake-test-plan'
import React from 'react'

export default function page() {
  return (
    <div>
      <ReviewMistakeExamPlan />
    </div>
  )
}

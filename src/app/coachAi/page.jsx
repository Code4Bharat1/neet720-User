export const metadata = {
  title:
    "coachAi | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/coachAi",
    title: "coachAi | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import AiCoachPlan from '@/components/aiCoach/aiCoach'
import React from 'react'

const page = () => {
  return (
    <div>
        <AiCoachPlan />
    </div>
  )
}

export default page
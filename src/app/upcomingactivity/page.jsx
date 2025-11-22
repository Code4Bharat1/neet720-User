export const metadata = {
  title:
    "upcomingActivity | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/upcomingactivity",
    title: "upcomingActivity | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};
import UpcomingActivity from '@/components/upcomingActivity_frontend/upcomingActivity';
import React from 'react'
const Page = () => {
  return (
    <div>
      <UpcomingActivity/>
    </div>
  )
}
export default Page
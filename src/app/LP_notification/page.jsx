export const metadata = {
  title:
    "LP_notification | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/LP_notification",
    title: "LP_notification | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};





import React from 'react'

import HomePage from '@/components/HomePage/HomePage'
import BenefitsPage from '@/components/HomePage/benefit'
import CoreFeatureComponent from '@/components/HomePage/CoreFeaturesCard'
import Home from '@/components/HomePage/neet'
import NotificationSection from '@/components/LP_notification/notificationSection'


export default function page() {
  return (
    <div>
     
 <NotificationSection/>
    </div>
  )
}
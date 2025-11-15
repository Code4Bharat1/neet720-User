export const metadata = {
  title:
    "testinterfacePYQ | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/testinterfacePYQ",
    title: "testinterfacePYQ | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import React from 'react'
import TestInterfacePYQ from '@/components/testinterface/testinterface_PYQ'
export default function page() {
  return (
    <div>
      <TestInterfacePYQ/>
    </div>
  )
}

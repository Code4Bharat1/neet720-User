export const metadata = {
  title:
    "login | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/login",
    title: "login | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};


import React from 'react';
import LoginPage from '@/components/login/login';




const Page = () => {
  return (
    <div>
       <LoginPage/>
    </div>
  )
}


export default Page;
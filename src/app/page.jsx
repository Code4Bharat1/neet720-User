'use client'

import HomePage from '@/components/home/page1';
import BenefitsSection from '@/components/home/benefit';
import Home from '@/components/home/neet'
import Head from 'next/head';
import React from 'react';
import CoreFeatureComponent from "../components/home/CoreFeaturesCard.jsx"




const Page = () => {
  return (
    <>
      <Head>
        <title>Welcome to NEET720 | Crack NEET with Expert Guidance and Smart Tools</title>
        <meta name="description" content="Join NEET720 to access expert NEET preparation, smart study tools, and personalized analytics. Start your journey to medical success with India’s trusted NEET platform." />
        <meta name="keywords" content="NEET720, NEET preparation, NEET exam, medical entrance, NEET coaching, NEET analytics, NEET practice, NEET test series, medical career, NEET online" />
        <meta name="robots" content="index, follow" />


        <meta property="og:title" content="Welcome to NEET720 | Crack NEET with Expert Guidance and Smart Tools" />
        <meta property="og:description" content="Join NEET720 to access expert NEET preparation, smart study tools, and personalized analytics. Start your journey to medical success with India’s trusted NEET platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://neet720.com/" />
        <meta property="og:image" content="/neet720_logo.jpg" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Welcome to NEET720 | Crack NEET with Expert Guidance and Smart Tools" />
        <meta name="twitter:description" content="Join NEET720 to access expert NEET preparation, smart study tools, and personalized analytics. Start your journey to medical success with India’s trusted NEET platform." />
        <meta name="twitter:image" content="/neet720_logo.jpg" />
        
        <link rel="canonical" href="https://neet720.com/" />
      </Head>
      
     <HomePage/>
     
     <BenefitsSection/>
     <CoreFeatureComponent />
     <Home/>

    </>
  )
}


export default Page;
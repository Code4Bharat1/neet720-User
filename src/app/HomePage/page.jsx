import React from 'react'

import HomePage from '@/components/HomePage/HomePage'
import BenefitsPage from '@/components/HomePage/benefit'
import CoreFeatureComponent from '@/components/HomePage/CoreFeaturesCard'
import Home from '@/components/HomePage/neet'


export default function page() {
  return (
    <div>
     
    <HomePage/>
    <BenefitsPage/>
    <CoreFeatureComponent/>
    <Home/>
    
    </div>
  )
}
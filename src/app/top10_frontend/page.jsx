import Perfromance from '@/components/top10_frontend/Performance'
import FeaturesPerformance from '@/components/top10_frontend/FeaturePerformance'
import React from 'react'

const Page = () => {
  return (
    <div>
         <Perfromance/>
 
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
      <FeaturesPerformance/>
      
      </div>
    </div>
  )
}

export default Page
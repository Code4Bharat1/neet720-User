import FeaturesPerformance from '@/components/top10/FeaturePerformance'
import Performance from '@/components/top10/Performance'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Performance/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
      <FeaturesPerformance/>
      </div>
    </div>
  )
}

export default Page

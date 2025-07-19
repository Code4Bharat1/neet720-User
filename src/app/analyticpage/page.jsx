import Analytic from '@/components/analyticSection/Analytic'
import FeatureAnalytic from '@/components/analyticSection/FeatureAnalytic'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Analytic/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
        <FeatureAnalytic/>
      </div>
    </div>
  )
}

export default Page

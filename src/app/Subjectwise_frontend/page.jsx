
import FeatureResult from '@/components/resultSection_frontend/featureResult'
import ResultSection from '@/components/resultSection_frontend/resultSection'
import SubjectWise from '@/components/Subjectwise_frontend/Subjectwise'
import FeatureSub from '@/components/Subjectwise_frontend/FeatureSub'
import React from 'react'

const Page = () => {
  return (
    <div>
     <SubjectWise/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
     
        <FeatureSub/>
      </div>
    </div>
  )
}

export default Page
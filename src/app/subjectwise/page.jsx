import FeatureSub from '@/components/subject-wise/FeatureSub'
import SubjectWise from '@/components/subject-wise/SubjectWise'
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

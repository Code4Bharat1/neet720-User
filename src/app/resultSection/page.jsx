import FeaturesSection from '@/components/resultSection/FeaturesSection'
import ResultSection from '@/components/resultSection/ResultSection'
import React from 'react'

const Page = () => {
  return (
    <>
    <div>
      <ResultSection/>
    </div>
    <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
        <FeaturesSection/>
    </div>

    </>
  )
}

export default Page

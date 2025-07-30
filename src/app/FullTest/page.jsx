import FeatureTest from '@/components/FullTest/FeatureTest'
import FullTest from '@/components/FullTest/FullTest'
import React from 'react'

const Page = () => {
  return (
    <div>
      <FullTest/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
        <FeatureTest/>
    </div>
    </div>
  )
}

export default Page
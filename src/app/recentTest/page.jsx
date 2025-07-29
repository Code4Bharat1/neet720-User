import FeatureTest from '@/components/RecentTest/FeatureTest'
import RecentTest from '@/components/recentTest/RecentTest'
import React from 'react'

const Page = () => {
  return (
    <div>
      <RecentTest/>
      <div className="min-h-screen bg-[#103f5d] flex items-center justify-center py-20">
      <FeatureTest/>
      </div>
    </div>
  )
}

export default Page
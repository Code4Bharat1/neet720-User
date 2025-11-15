export async function generateMetadata({ params }) {
  const { seriesId } = params;

  const title = `test-series (${seriesId}) | NEET720 – India's Most Trusted NEET Preparation Platform`;
  const description =
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.";

  return {
    title,
    description,
    openGraph: {
      url: `https://neet720.com/test-series/${seriesId}`,
      title,
      description,
      siteName: "NEET720",
    },
  };
}






import UserTestsBySeries from '@/components/TestSeries/UserTestsBySeries'
import React from 'react'

export default function page() {
  return (
    <div>
        <UserTestsBySeries />
    </div>
  )
}

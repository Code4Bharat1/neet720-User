export async function generateMetadata({ params }) {
  const { "test-type": testType, "test-id": testId } = params;

  const title = `review-test-mistake (${testType}) (${testId}) | NEET720 – India's Most Trusted NEET Preparation Platform`;
  const description =
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.";

  return {
    title,
    description,
    openGraph: {
      url: `https://neet720.com/review-test-mistake/${testType}/${testId}`,
      title,
      description,
      siteName: "NEET720",
    },
  };
}



import TestPage from '@/components/TestSeries/TestPage'
import React from 'react'

export default function page() {
  return (
    <div>
      <TestPage />
    </div>
  )
}

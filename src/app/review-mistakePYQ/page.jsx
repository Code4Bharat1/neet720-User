export const metadata = {
  title:
    "review-mistakePYQ | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/review-mistakePYQ",
    title: "review-mistakePYQ | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};



'use client';  // Make sure this is client-side code

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import ReviewAllWithMistakes with ssr: false to make it client-side only
const ReviewAllWithMistakes = dynamic(() => import('@/components/review-mistake/review-mistakePYQ'), {
  ssr: false,  // This ensures the component is rendered only on the client side
});

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>loading</div>}>
        <ReviewAllWithMistakes />
      </Suspense>
    </div>
  );
};

export default Page;

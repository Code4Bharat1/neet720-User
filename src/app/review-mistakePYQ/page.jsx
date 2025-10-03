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

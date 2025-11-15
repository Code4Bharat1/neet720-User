

import React from "react";
import ReviewMistake from "@/components/review-mistake/review-mistake";
import { Suspense } from "react";
export default function page() {
  return (
    <div>
      <div className="flex-grow overflow-auto md:pb-0 pb-[60px]">
        <Suspense fallback={<div>loading</div>}>
          <ReviewMistake />
        </Suspense>
      </div>
    </div>
  );
}

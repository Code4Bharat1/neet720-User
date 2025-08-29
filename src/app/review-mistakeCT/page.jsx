import React from "react";
import { Suspense } from "react";
import ReviewMistakeCT from "@/components/review-mistake/review-mistakeCT";
export default function page() {
  return (
    <div>
      <div className="flex-grow overflow-auto md:pb-0 pb-[60px]">
        <Suspense fallback={<div>loading</div>}>
          <ReviewMistakeCT />
        </Suspense>
      </div>
    </div>
  );
}

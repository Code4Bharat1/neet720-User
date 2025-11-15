export const metadata = {
  title:
    "review-mistake | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/review-mistake",
    title: "review-mistake | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

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

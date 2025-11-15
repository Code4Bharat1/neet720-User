export const metadata = {
  title:
    "review-mistakeCT | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/review-mistakeCT",
    title: "review-mistakeCT | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};






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

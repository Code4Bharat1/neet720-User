import React from "react";

import HomePage from "@/components/HomePage/HomePage";
import BenefitsPage from "@/components/HomePage/benefit";
import CoreFeatureComponent from "@/components/HomePage/CoreFeaturesCard";
import Home from "@/components/HomePage/neet";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function page() {
  return (
    <>
      {/* ⭐ AEO FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is NEET?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "NEET is an online NEET preparation platform that provides free NEET mock tests, chapter-wise tests, previous year questions, AI rank prediction, and performance analytics."
                }
              },
              {
                "@type": "Question",
                "name": "Does this platform provide free NEET mock tests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide free NEET mock tests, chapter tests, and PYQs that students can practice anytime."
                }
              },
              {
                "@type": "Question",
                "name": "Does this website have a NEET rank predictor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, the platform includes AI-based rank prediction to estimate your expected NEET rank based on your performance."
                }
              },
              {
                "@type": "Question",
                "name": "Can I practice NEET chapter-wise tests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, chapter-wise tests for Physics, Chemistry, and Biology are available with instant solutions and detailed analytics."
                }
              }
            ]
          }
        `,
        }}
      />


<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://neet720.com/"
        }
      ]
    }
    `
  }}
/>

      {/* ⭐ Your Homepage UI */}
      <div>
        <Navbar />
        <HomePage />
        
        {/* <Footer /> */}
      </div>
    </>
  );
}

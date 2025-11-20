"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { pageview } from "@/lib/gtag";   // ✅ ADD THIS

export default function ClientLayout({ children }) {
  const pathname = usePathname() || "";

  // ⭐ ADD THIS USEEFFECT FOR PAGEVIEW TRACKING
  useEffect(() => {
    if (!pathname) return;
    pageview(pathname);   // Track route changes
  }, [pathname]);

  const routesWithLayout = [
    "/HomePage",
    "/FullTest",
    "/Fast_Quiz",
    "/LP_createtest",
    "/Subjectwise_frontend",
    "/chatbot",
    "/resultSection_frontend",
    "/exam_Plan",
    "/analyticSection",
    "/collegePrediction",
    "/LP_PYQ",
    "/noticeSection",
    "/Scholarship_frontend",
    "/LP_notification",
    "/performance",
    "/upcomingActivity",
    "/customTask",
    "/recentTest",
    "/top10_frontend",
  ];

  const showHeaderFooter = routesWithLayout.some((r) =>
    pathname.startsWith(r)
  );

  return (
    <>
      {showHeaderFooter && <Navbar />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

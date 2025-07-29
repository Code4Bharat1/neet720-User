"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

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
    "/top10_frontend"
  ];

  const showHeaderFooter = routesWithLayout.some((route) =>
  pathname?.startsWith(route)
);


  return (
    <>
      {showHeaderFooter && <Navbar />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
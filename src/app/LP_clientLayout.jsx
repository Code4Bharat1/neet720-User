"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { pageview } from "@/lib/gtag";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }) {
  const pathname = usePathname() || "";

  // Track route changes (pageview)
  useEffect(() => {
    if (!pathname) return;
    pageview(pathname);
  }, [pathname]);

  const routesWithLayout = [
    "/HomePage",
    "/fulltest",
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
      {/* Client-only Toaster (moved here from RootLayout) */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 999999,
            background: "#333",
            color: "#fff",
          },
        }}
      />

      {showHeaderFooter && <Navbar />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

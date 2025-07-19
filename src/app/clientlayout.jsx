"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const routesWithLayout = [
    "/",
    "/fulltest",
    "/fastquizfeature",
    "/landing",
    "/subjectwise",
    "/chatbot",
    "/resultSection",
    "/examplanx",
    "/analyticpage",
    "/collegePrediction",
    "/pyq",
    "/noticeSection",
    "/scholarship",
    "/notification",
    "/performance",
    "/upcommingActivities",
    "/customTask",
    "/recentTest"
  ];

  const showHeaderFooter = routesWithLayout.includes(pathname);

  return (
    <>
      {showHeaderFooter && <Navbar />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

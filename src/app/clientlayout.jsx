"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/layout/navbar/navbar";
import Footer from "../components/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const routesWithLayout = [
    "/",
    "/fulltest",
    "/fastquizfeatures",
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
      {showHeaderFooter && <NavBar />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

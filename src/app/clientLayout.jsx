"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const routesWithLayout = [
    "/",
    "/fulltest",
    "/fastquiz",
    "/landing",
    "/subjectwise",
    "/chatbot",
    "/resultSection",
    "/examplanx",
    "/analyticpage",
    "/collegePrediction",
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

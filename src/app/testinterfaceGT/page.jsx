"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically load these heavy, browser‑only components in the client only
const TestInterface = dynamic(
  () => import("@/components/testinterface/testinterface_GT.jsx"),
  { ssr: false }
);
const TestInterfaceMobile = dynamic(
  () => import("@/components/testInterfaceMobileView/testInterface_GT"),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block">
        <TestInterface />
      </div>
      {/* Mobile View */}
      <div className="block md:hidden">
        <TestInterfaceMobile />
      </div>
    </div>
  );
}

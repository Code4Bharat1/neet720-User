// app/testinterfaceGT/page.js
import React from "react";
import dynamic from "next/dynamic";

// Dynamically load these client‑only components in the browser only:
const TestInterface = dynamic(
  () => import("@/components/testinterface/testinterface_GT"),
  { ssr: false }
);
const TestInterfaceMobile = dynamic(
  () => import('@/components/testInterfaceMobileView/testInterface_GT'),
  { ssr: false }
);

const Page = () => (
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

export default Page;

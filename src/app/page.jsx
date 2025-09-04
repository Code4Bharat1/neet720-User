import React from "react";

import HomePage from "@/components/HomePage/HomePage";
import BenefitsPage from "@/components/HomePage/benefit";
import CoreFeatureComponent from "@/components/HomePage/CoreFeaturesCard";
import Home from "@/components/HomePage/neet";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function page() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <BenefitsPage />
      <CoreFeatureComponent />
      <Home />
      <Footer />
    </div>
  );
}

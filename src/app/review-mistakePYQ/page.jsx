"use client";

import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import ReviewMistakePYQ from "@/components/review-mistake/review-mistakePYQ";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>loading</div>}>
        <ReviewMistakePYQ />
      </Suspense>
    </div>
  );
};

export default Page;

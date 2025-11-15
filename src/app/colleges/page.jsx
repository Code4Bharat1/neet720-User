export const metadata = {
  title:
    "colleges | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/colleges",
    title: "colleges | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import GreetingCard from "@/components/colleges/GreetingCard";
import ExploreCategories from "@/components/colleges/ExploreCategories";
import PredictionCard from "@/components/colleges/PredictionCard";
import ExploreTopCollegeCards from "@/components/colleges/ExploreTopColleges";
import Head from "next/head";


const Page = () => {

  return (
    <>
      <Head>
        <title>NEET720 College Predictor – Explore NEET Cutoffs & Top Medical Colleges</title>
        <meta name="description" content="Use NEET720's College Predictor to explore NEET cutoffs, rank vs marks, and top MBBS colleges based on your NEET score." />
        <meta name="keywords" content="NEET720 college predictor, NEET college list, NEET cutoff 2025, NEET rank vs marks, top medical colleges, MBBS admission, NEET720 colleges" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="NEET720 College Predictor – Explore NEET Cutoffs & Top Medical Colleges" />
        <meta property="og:description" content="Predict your NEET 2025 rank, compare cutoffs, and find MBBS colleges that fit your score. Powered by NEET720's smart analytics." />
        <meta property="og:image" content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/colleges" />
        <meta property="og:url" content="https://neet720.com/colleges" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NEET720 College Predictor – Explore NEET Cutoffs & Top Medical Colleges" />
        <meta name="twitter:description" content="Discover NEET college cutoffs and MBBS options using your score with NEET720's AI-powered predictor tool." />
        <meta name="twitter:image" content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/colleges" />
        <link rel="canonical" href="https://neet720.com/colleges" />
      </Head>

      <div className="md:flex min-h-screen relative">
        {/* Sidebar for md screens */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full md:w-5/6 flex flex-col">
          <ToggleBar />
          <NavBar />

          <div className="mx-1 mt-6 md:mb-0 mb-28 md:mx-10 pb-9">
            {/* Components */}
            <GreetingCard />
            <ExploreCategories />
            <PredictionCard />
            <ExploreTopCollegeCards />
          </div>

          {/* Bottom Navbar for mobile screens */}
          <BottomNavbar />
        </div>
      </div>
    </>
  );
};

export default Page;

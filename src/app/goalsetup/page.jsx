export const metadata = {
  title:
    "goalsetup | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/goalsetup",
    title: "goalsetup | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};

import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import GoalSetup from "@/components/goalsetup/GoalSetupForm";

const Page = () => {

  return (
    <div className="md:flex min-h-screen relative">
      {/* Sidebar for md screens */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full  md:w-5/6 flex flex-col" >
        <ToggleBar />
        <NavBar />

        <div className="mx-4 mt-16 md:mb-0 mb-28">
          {/* Components */}
          <GoalSetup/>
        </div>

        {/* Bottom Navbar for mobile screens */}
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Page;

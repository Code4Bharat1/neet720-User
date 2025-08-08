"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: You can use Heroicons instead

const features = [
  { name: "Full Test", href: "/FullTest" },
  { name: "Fast Quiz", href: "/Fast_Quiz" },
  { name: "Create Test", href: "/LP_createtest" },
  { name: "Subject-wise Marks Analysis", href: "/Subjectwise_frontend" },
  { name: "Chatbot", href: "/chatbot" },
  { name: "Result Section", href: "/resultSection_frontend" },
  { name: "Exam Plan", href: "/exam_Plan" },
  { name: "Analytics", href: "/analyticSection" },
  { name: "College Prediction", href: "/collegePrediction" },
  { name: "Previous Year Question", href: "/LP_PYQ" },
  { name: "Scholarship", href: "/Scholarship_frontend" },
  { name: "Notice Section", href: "/noticeSection" },
  { name: "Notification Section", href: "/LP_notification" },
  { name: "Top 10 Performance", href: "/top10_frontend" },
  { name: "Upcoming Activities", href: "/upcomingActivity" },
  { name: "Create Own Task", href: "/customTask" },
  { name: "Own Recent Test", href: "/recentTest" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  return (
<nav className="bg-white shadow-md px-4 sm:px-6 scroll py-0 relative z-50">
  <div className="flex items-center justify-between">
    <div className="text-2xl font-bold text-blue-900">
      <div className="w-12 sm:w-16 md:w-20">
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={30}
          className="mt-6"
        />
      </div>
      </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-center gap-12 mt-2 text-gray-700 font-medium text-xl relative">
        <li>
          <Link href="/HomePage" className="hover:text-blue-600 transition">
            Home
          </Link>
        </li>

        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="hover:text-blue-600 transition focus:outline-none"
          >
            Features
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-3 bg-white rounded-lg shadow-lg grid grid-cols-2 gap-4 p-4 w-[440px] max-w-[90vw] text-sm z-50">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.href}
                  className="text-cyan-700 hover:underline whitespace-nowrap"
                  onClick={closeDropdown}
                >
                  {feature.name}
                </Link>
              ))}
            </div>
          )}
        </li>

        <li>
          <Link href="/signup" className="hover:text-blue-600 transition">
            Demo
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col mt-4 space-y-3 text-gray-700 font-medium">
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-blue-600 transition focus:outline-none"
            >
              Features
            </button>

            {dropdownOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg grid grid-cols-1 gap-2 p-3 text-sm">
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    href={feature.href}
                    className="text-cyan-700 hover:underline"
                    onClick={() => {
                      closeDropdown();
                      setMenuOpen(false);
                    }}
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link href="/demo" onClick={() => setMenuOpen(false)}>
              Demo
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

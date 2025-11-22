"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileFeatureDropdown, setMobileFeatureDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
              <Image
                src="/logo.png"
                alt="NEET720 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Standard Links */}
            {["Home", "Demo", "Pricing", "FAQs"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            {/* Features Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium text-sm relative group"
              >
                Features
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-[520px] max-w-[90vw] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3">
                    <h3 className="text-white font-bold text-sm">All Features</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-4 max-h-[400px] overflow-y-auto">
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        href={feature.href}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group"
                        onClick={closeDropdown}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Buttons */}
            <li>
              <Link
                href="/signup"
                className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium text-sm"
              >
                Schedule a Demo
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium text-sm"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Side Drawer) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${mobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`fixed right-0 top-0 h-full w-72 bg-white shadow-xl p-5 transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <X size={26} onClick={() => setMobileMenu(false)} className="cursor-pointer" />
          </div>

          {/* Mobile Links */}
          <ul className="space-y-4 text-gray-700 font-medium">
            <Link href="/" onClick={() => setMobileMenu(false)}>Home</Link>
            <div>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => setMobileFeatureDropdown((p) => !p)}
              >
                Features
                <ChevronDown
                  size={18}
                  className={`${mobileFeatureDropdown ? "rotate-180" : ""} transition-transform`}
                />
              </button>

              {mobileFeatureDropdown && (
                <div className="pl-3 mt-2 space-y-2 max-h-[250px] overflow-y-auto">
                  {features.map((feature, i) => (
                    <Link
                      key={i}
                      href={feature.href}
                      onClick={() => setMobileMenu(false)}
                      className="block text-sm py-1 hover:text-blue-600"
                    >
                      {feature.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/demo" onClick={() => setMobileMenu(false)}>Demo</Link>
            <Link href="/pricing" onClick={() => setMobileMenu(false)}>Pricing</Link>
            <Link href="/faqs" onClick={() => setMobileMenu(false)}>FAQs</Link>
            {/* <Link href="/contact" onClick={() => setMobileMenu(false)}>Contact</Link> */}
          </ul>

          <div className="mt-6 space-y-3">
            <Link
              href="/signup"
              onClick={() => setMobileMenu(false)}
              className="block text-center border border-blue-600 text-blue-600 py-2 rounded-md"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenu(false)}
              className="block text-center bg-teal-600 text-white py-2 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

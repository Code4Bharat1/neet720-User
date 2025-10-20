"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

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
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="NEET720 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                NEET720
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                Your Success Partner
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            <li>
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-semibold text-base lg:text-lg transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-semibold text-base lg:text-lg transition-colors duration-200 relative group"
              >
                Features
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-[520px] max-w-[90vw] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3">
                    <h3 className="text-white font-bold text-base">All Features</h3>
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

            <li>
              <Link 
                href="/signup" 
                className="text-gray-700 hover:text-blue-600 font-semibold text-base lg:text-lg transition-colors duration-200 relative group"
              >
                Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-full font-semibold text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link 
                  href="/" 
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                >
                  Home
                </Link>
              </li>

              <li>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                >
                  Features
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="mt-2 ml-4 bg-gray-50 rounded-lg p-3 space-y-1 max-h-80 overflow-y-auto">
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        href={feature.href}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors text-sm"
                        onClick={() => {
                          closeDropdown();
                          setMenuOpen(false);
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <Link 
                  href="/signup" 
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                >
                  Demo
                </Link>
              </li>

              <li className="px-4 pt-2">
                <Link 
                  href="/signup" 
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
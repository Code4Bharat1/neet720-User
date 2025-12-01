"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaBullseye,
  FaClipboardList,
  FaPoll,
  FaUniversity,
  FaCookie,
  FaBook,
  FaTablets,
} from "react-icons/fa";
import { BookText, Crown, Sparkles } from "lucide-react";
import { MdAccountCircle } from "react-icons/md";
import { RiGeminiFill } from "react-icons/ri";
import axios from "axios";

// Updated sidebarLinks with activePaths for Exam Plan
const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  {
    name: "Exam Plan",
    path: "/goalsetup",
    icon: <FaBullseye />,
    activePaths: ["/goalsetup", "/examplan"],
  },
  { name: "Test", path: "/testselection", icon: <FaClipboardList /> },
  { name: "Result", path: "/pasttest", icon: <FaPoll /> },
  { name: "Colleges", path: "/colleges", icon: <FaUniversity /> },
  { name: "Scholarship", path: "/credits", icon: <FaCookie /> },
  { name: "PYQs", path: "/previousyearquestions", icon: <FaTablets /> },
  { name: "View Notice", path: "/notice", icon: <FaBook /> },
  { name: "Test Series", path: "/test-series", icon: <BookText /> },
  { name: "AI coach", path: "/coachAi", icon: <RiGeminiFill /> },
];

const ToggleBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/profile.png");
  const [profileMenu, setProfileMenu] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [showPricingModal, setShowPricingModal] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };

    if (profileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenu]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, profileMenu]);

  // Fetch profile
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/getdata`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.status === 200 && response.data.profileImage) {
          setProfileImage(response.data.profileImage);
          setFirstName(response.data.firstName);
          setEmail(response.data.emailAddress);
        }
      } catch (error) {}
    };

    fetchProfileImage();
  }, [router]);

  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50 md:hidden bg-white shadow-2xl">
        {/* Top Bar */}
        <div className="sm:flex md:hidden w-full p-4 h-[65px]">
          <div className="flex items-center justify-between w-full">
            {/* Toggle Button */}
            <button className="text-gray-600" onClick={() => setMenuOpen(true)}>
              <FiMenu size={24} />
            </button>

            {/* Center Text */}
            <h1 className="text-lg font-semibold text-gray-700">Menu</h1>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={toggleProfileMenu}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 cursor-pointer hover:border-teal-400 transition-colors duration-200"
              >
                <MdAccountCircle className="text-4xl text-gray-700" />
              </div>

              {/* Profile Dropdown */}
              {profileMenu && (
                <div
                  ref={profileRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border"
                >
                  <button
                    onClick={() => {
                      router.push("/personaldata");
                      setProfileMenu(false);
                    }}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Personal Data
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      router.replace("/login");
                      setProfileMenu(false);
                    }}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-all duration-300 ${
            menuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div
            ref={menuRef}
            className={`bg-white w-[75%] max-w-sm h-full flex flex-col transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Profile Section */}
            <div className="flex-shrink-0 flex flex-col items-center py-4 px-4 border-b border-gray-200 bg-white">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                <img
                  src={"neet720_logo.jpg" || profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 truncate max-w-full">
                {firstName}
              </h2>
              <p className="text-sm text-gray-500 truncate max-w-full">{email}</p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="space-y-2">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname.startsWith(item.path) ||
                    (item.activePaths &&
                      item.activePaths.some((p) => pathname.startsWith(p)));

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        router.push(item.path);
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-3 font-medium rounded-lg px-3 py-3 transition-all duration-200 text-base
                        ${
                          isActive
                            ? "bg-teal-100 text-teal-700 font-semibold border-l-4 border-teal-400"
                            : "text-gray-700 hover:text-teal-400 hover:bg-teal-50 border-l-4 border-transparent"
                        }
                      `}
                    >
                      <span
                        className={`text-xl flex-shrink-0 ${
                          isActive ? "text-teal-700" : "text-gray-500"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Upgrade to Pro Button */}
              <div className="mt-6">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 p-4 shadow-lg">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl mb-2">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-white font-bold text-sm mb-1">
                      Upgrade to Pro
                    </h3>
                    <p className="text-white/90 text-xs mb-3 leading-relaxed">
                      Unlock all features
                    </p>
                    
                    {/* Button */}
                    <button 
                      onClick={() => {
                        setShowPricingModal(true);
                        setMenuOpen(false);
                      }}
                      className="w-full bg-white text-teal-600 font-semibold text-xs py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Get Pro Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-500 text-center">
                <p>Version 1.0.0</p>
                <p className="mt-1">© 2024 NEET720</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setShowPricingModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPricingModal(false)}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl mx-auto mb-3">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Choose Your Plan
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Select the best plan for your NEET preparation
              </p>
            </div>

            {/* Pricing Options */}
            <div className="space-y-4">
              {/* Yearly Plan */}
              <a
                href="https://rzp.io/rzp/83RBILJ"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 sm:p-5 rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">Yearly Plan</h3>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Save 57%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Best value for money</p>
                  </div>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xs sm:text-sm line-through text-gray-500">₹4,188</span>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹1,825</span>
                  <span className="text-xs sm:text-sm text-gray-600">/year</span>
                </div>

                <div className="flex items-center justify-center bg-teal-600 text-white font-semibold py-2 sm:py-2.5 rounded-lg group-hover:bg-teal-700 transition-colors text-sm">
                  Get Started
                </div>
              </a>

              {/* Monthly Plan */}
              <a
                href="https://rzp.io/rzp/9Dz0oN7"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 sm:p-5 rounded-2xl border-2 border-gray-200 hover:border-teal-300 bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Monthly Plan</h3>
                    <p className="text-xs text-gray-600">Flexible monthly billing</p>
                  </div>
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-teal-600 group-hover:scale-110 transition-all flex-shrink-0" />
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹349</span>
                  <span className="text-xs sm:text-sm text-gray-600">/month</span>
                </div>

                <div className="flex items-center justify-center bg-gray-100 text-gray-900 font-semibold py-2 sm:py-2.5 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition-colors text-sm">
                  Get Started
                </div>
              </a>
            </div>

            {/* Features List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-3">All plans include:</p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                  Unlimited PYQs & Test Library
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                  AI Analytics & 24/7 Chatbot
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                  College Predictor & Mock Tests
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleBar;
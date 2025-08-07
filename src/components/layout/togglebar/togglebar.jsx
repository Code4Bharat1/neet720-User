"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiMenu,
} from "react-icons/fi";
import {
  FaTachometerAlt,
  FaBullseye,
  FaClipboardList,
  FaPoll,
  FaChartLine,
  FaUniversity,
  FaCookie,
  FaBook,
  FaTablets,
} from "react-icons/fa";
import { BookText } from "lucide-react";
import axios from "axios";

const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "Exam Plan", path: "/goalsetup", icon: <FaBullseye /> },
  { name: "Test", path: "/testselection", icon: <FaClipboardList /> },
  { name: "Result", path: "/pasttest", icon: <FaPoll /> },
  { name: "Analytics", path: "/analytics", icon: <FaChartLine /> },
  { name: "Colleges", path: "/colleges", icon: <FaUniversity /> },
  { name: "Credits", path: "/credits", icon: <FaCookie /> },
  { name: "PYQs", path: "/previousyearquestions", icon: <FaTablets /> },
  { name: "View Notice", path: "/notice", icon: <FaBook /> },
  { name: "Test Series", path: "/test-series", icon: <BookText /> },
];

const ToggleBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/profile.png");
  const [profileMenu, setProfileMenu] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const router = useRouter();

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

  // Fetch profile image from the backend API
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/students/getdata`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200 && response.data.profileImage && response.data.firstName && response.data.emailAddress) {
          setProfileImage(response.data.profileImage); // Set the profile image from backend
          setFirstName(response.data.firstName);
          setEmail(response.data.emailAddress);
        }
      } catch (error) {
        // fallback
      }
    };

    fetchProfileImage();
  }, [router]);

  // Toggle Profile Dropdown
  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  return (
    <div className="fixed top-0 w-full z-50 md:hidden bg-white shadow-2xl ">
      {/* Top Bar */}
      <div className="sm:flex md:hidden w-full p-4 h-[65px]">
        <div className="flex items-center justify-between w-full">
          {/* Toggle Button */}
          <button className="text-gray-600" onClick={() => setMenuOpen(true)}>
            <FiMenu size={24} />
          </button>

          {/* Center Text */}
          <h1 className="text-lg font-semibold text-gray-700">Menu</h1>

          {/* Profile Picture */}
          <div className="relative" ref={profileRef}>
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer" onClick={toggleProfileMenu}>
              <img
                src={"/neet720_logo.jpg" || profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Profile Dropdown */}
            {profileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border">
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
                    router.push("/login");
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

      {/* Sidebar Menu with Animation */}
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
          {/* Profile Section - Fixed at top */}
          <div className="flex-shrink-0 flex flex-col items-center py-4 px-4 border-b border-gray-200 bg-white">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
              <img
                src={"neet720_logo.jpg" || profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 truncate max-w-full">{firstName}</h2>
            <p className="text-sm text-gray-500 truncate max-w-full">{email}</p>
          </div>

          {/* Scrollable Navigation Section */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2">
              {sidebarLinks.map((item) => (
                <button
                  key={item.name}
                  className="w-full text-left flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-3 transition-all duration-200 text-base"
                  onClick={() => {
                    router.push(item.path);
                    setMenuOpen(false);
                  }}
                >
                  <span className="text-xl text-gray-500 flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Footer Section - Fixed at bottom (optional) */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500 text-center">
              <p>Version 1.0.0</p>
              <p className="mt-1">© 2024 NEET720</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleBar;
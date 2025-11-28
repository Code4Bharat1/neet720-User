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
import { BookText } from "lucide-react";
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
  // const profileRef = useRef(null);

  return (
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
  );
};

export default ToggleBar;

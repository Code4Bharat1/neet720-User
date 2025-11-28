"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoMdNotifications } from "react-icons/io";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { FaMedal } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const NavBar = () => {
  const router = useRouter();
  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const [profileImage, setProfileImage] = useState("/profile.jpg");
  const [notifications, setNotifications] = useState([]);
  const [result, setResults] = useState(null);

  // Fetch student points
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token not found");

        const decoded = jwtDecode(token);
        const id = decoded.id;

        const response = await axios.post(`${apiBaseUrl}/review/credits`, {
          studentId: id,
        });
        setResults(response.data.totals.overallTotal);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResults();
  }, []);

  // Fetch profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${apiBaseUrl}/students/getdata`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200 && response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, [router]);

  // Handle dropdowns
  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
    setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setProfileMenu(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden md:flex w-full px-8 py-4 items-center justify-between relative bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center flex-grow max-w-md">
        {/* Placeholder for left section */}
      </div>

      <div className="flex items-center space-x-5">
        {/* Credits Section */}
        <div
          className="flex items-center bg-gradient-to-r bg-teal-400 px-4 space-x-2 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          title="Cookies"
        >
          <FaMedal className="text-xl text-white" />
          <p className="text-lg font-semibold text-white">{result}</p>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer" ref={notificationsRef}>
          <div className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <IoMdNotifications
              className="text-3xl text-gray-700"
              onClick={toggleNotifications}
            />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {notifications.length}
              </span>
            )}
          </div>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
              <div className="px-4 py-3 text-gray-800 font-semibold border-b border-gray-200">
                Notifications
              </div>
              <ul className="text-sm text-gray-600 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="px-4 py-6 text-center text-gray-500">
                    No new notifications
                  </li>
                ) : (
                  notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                    >
                      <Link href="/testselection">{notification}</Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={toggleProfileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 cursor-pointer hover:border-teal-400 transition-colors duration-200"
          >
            <MdAccountCircle className="text-4xl text-gray-700" />
          </div>

          {profileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
              <button
                onClick={() => router.push("/personaldata")}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 w-full transition-colors duration-150 font-medium"
              >
                <MdAccountCircle className="mr-3 text-xl text-teal-500" />
                Personal Data
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  router.replace("/login");
                }}
                className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 w-full transition-colors duration-150 font-medium"
              >
                <MdLogout className="mr-3 text-xl" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

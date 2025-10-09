'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaBullseye,
  FaClipboardList,
  FaPoll,
  FaChartLine,
  FaUniversity,
  FaMedal,
  FaTablets,
  FaBook
} from 'react-icons/fa';
import { RiGeminiFill } from "react-icons/ri";
import axios from 'axios';
import { Layers } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { LuNotebookText } from "react-icons/lu";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Sidebar = ({ isOpen }) => {
  const pathname = usePathname(); // 👈 Get current path
  const [colors, setColors] = useState({
    sidebarColor: '#0077B6',
    textColor: '#ffffff',
  });

  useEffect(() => {
    const fetchSidebarColors = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const decoded = jwtDecode(token);
        const studentId = decoded.id;

        const response = await axios.post(`${apiBaseUrl}/newadmin/studentcolors`, {
          studentId,
        });

        if (response.data && response.data.colors) {
          const { sidebarColor, textColor } = response.data.colors;

          setColors({
            sidebarColor: sidebarColor || '#0077B6',
            textColor: textColor || '#ffffff',
          });
        }
      } catch (error) {
        console.error('Failed to fetch sidebar colors:', error);
      }
    };

    fetchSidebarColors();
  }, []);

  const menuItems = [
    { href: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { href: '/examplan', icon: FaBullseye, label: 'Exam Plan' },
    { href: '/testselection', icon: FaClipboardList, label: 'Test' },
    { href: '/pasttest', icon: FaPoll, label: 'Result' },
    // { href: '/analytics', icon: FaChartLine, label: 'Analytics' },
    { href: '/colleges', icon: FaUniversity, label: 'Colleges' },
    { href: '/credits', icon: FaMedal, label: 'Scholarship' },
    { href: '/previousyearquestions', icon: FaTablets, label: 'PYQs' },
    { href: '/notice', icon: FaBook, label: 'View Notice' },
    {href : "/test-series" , icon : LuNotebookText , label : "Test Series"},
    {href: '/coachAi', icon:RiGeminiFill, label:'AI Coach'}
  ];

  return (
    <div className="hidden md:block md:w-1/6">
      <div
        className={`fixed top-0 left-0 h-full transition-transform bg-blue-400 duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative flex flex-col`}
        
      >
        {/* Logo */}
        <div className="p-4 flex justify-center">
          <Image
            src="/neet720_logo.jpg"
            className="object-cover w-40 h-20"
            alt="Neet720 Logo"
            width={160}
            height={40}
          />
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-8 px-6 text-lg mt-10">
          {menuItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;

            return (
              <li key={href} className="cursor-pointer">
                <Link
                  href={href}
                  className={`flex items-center space-x-3 px-3 rounded-md transition-all ${
                    isActive
                      ? 'bg-white/20 font-bold text-white py-2 hover:bg-white/30'
                      : 'hover:opacity-80 text-white/80'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="text-md">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

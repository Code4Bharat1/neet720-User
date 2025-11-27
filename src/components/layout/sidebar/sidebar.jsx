'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  ClipboardList, 
  BarChart3, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Bell, 
  NotebookText, 
  BotMessageSquare 
} from 'lucide-react';
import { RiGeminiFill } from "react-icons/ri";
import axios from 'axios';
import { Layers } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { LuNotebookText } from "react-icons/lu";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Sidebar = ({ isOpen }) => {
  const pathname = usePathname();

  const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'main' },
  { href: '/goalsetup', activePaths: ['/goalsetup', '/examplan'], icon: Target, label: 'Exam Plan', section: 'main' },
  { href: '/testselection', icon: ClipboardList, label: 'Test', section: 'main' },
  { href: '/pasttest', icon: BarChart3, label: 'Result', section: 'main' },
  { href: '/colleges', icon: GraduationCap, label: 'Colleges', section: 'main' },
  { href: '/credits', icon: Award, label: 'Scholarship', section: 'main' },
  { href: '/previousyearquestions', icon: BookOpen, label: 'PYQs', section: 'practice' },
  { href: '/notice', icon: Bell, label: 'View Notice', section: 'practice' },
  { href: "/test-series", icon: NotebookText, label: "Test Series", section: 'practice' },
  { href: '/coachAi', icon: BotMessageSquare, label: 'AI Coach', section: 'practice' }
];

  const mainItems = menuItems.filter(item => item.section === 'main');
  const practiceItems = menuItems.filter(item => item.section === 'practice');

  return (
    <div className="hidden md:block md:w-1/6">
      <div
        className={`fixed top-0 left-0 h-screen w-1/6 bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col overflow-y-auto scrollbar-hide shadow-lg border-r border-gray-200`}
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center px-4 py-6 flex-shrink-0 border-b border-gray-200">
         <Image
            src="/neet720_logo.jpg"
            className="object-cover w-40 h-20 rounded-lg"
            alt="Neet720 Logo"
            width={160}
            height={40}
          />
        </div>

        {/* Menu Items */}
        <nav 
          className="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Main Section */}
          <div>
            <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Main
            </p>
            <div className="space-y-1.5">
              {mainItems.map(({ href, icon: Icon, label, activePaths }) => {
                const isActive = pathname === href || (activePaths && activePaths.includes(pathname));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? 'bg-teal-400 shadow-md text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon 
                      className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}
                    />
                    <span className="font-semibold text-sm truncate">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Practice & Updates Section */}
          <div>
            <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Practice & Updates
            </p>
            <div className="space-y-1.5">
              {practiceItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? 'bg-teal-400 shadow-md text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon 
                      className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}
                    />
                    <span className="font-semibold text-sm truncate">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
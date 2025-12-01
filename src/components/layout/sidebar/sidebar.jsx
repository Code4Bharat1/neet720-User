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
  BotMessageSquare,
  Crown,
  Sparkles
} from 'lucide-react';
import { RiGeminiFill } from "react-icons/ri";
import axios from 'axios';
import { Layers } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { LuNotebookText } from "react-icons/lu";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Sidebar = ({ isOpen }) => {
  const pathname = usePathname();
  const [showPricingModal, setShowPricingModal] = useState(false);

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
    <>
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

            {/* Upgrade to Pro Section */}
            <div className="pt-4">
              <div className="mx-3 relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 p-5 shadow-lg">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-3">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Text */}
                  <h3 className="text-white font-bold text-base mb-1.5">
                    Upgrade to Pro
                  </h3>
                  <p className="text-white/90 text-xs mb-4 leading-relaxed">
                    Unlock all features and boost your preparation
                  </p>
                  
                  {/* Button */}
                  <button 
                    onClick={() => setShowPricingModal(true)}
                    className="w-full bg-white text-teal-600 font-semibold text-sm py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
                  >
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Get Pro Now</span>
                  </button>
                </div>
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

      {/* Pricing Modal */}
      {showPricingModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPricingModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choose Your Plan
              </h2>
              <p className="text-sm text-gray-600">
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
                className="block p-5 rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">Yearly Plan</h3>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Save 57%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Best value for money</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm line-through text-gray-500">₹4,188</span>
                  <span className="text-3xl font-bold text-gray-900">₹1,825</span>
                  <span className="text-sm text-gray-600">/year</span>
                </div>

                <div className="flex items-center justify-center bg-teal-600 text-white font-semibold py-2.5 rounded-lg group-hover:bg-teal-700 transition-colors">
                  Get Started
                </div>
              </a>

              {/* Monthly Plan */}
              <a
                href="https://rzp.io/rzp/9Dz0oN7"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-2xl border-2 border-gray-200 hover:border-teal-300 bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly Plan</h3>
                    <p className="text-xs text-gray-600">Flexible monthly billing</p>
                  </div>
                  <Crown className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:scale-110 transition-all" />
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-gray-900">₹349</span>
                  <span className="text-sm text-gray-600">/month</span>
                </div>

                <div className="flex items-center justify-center bg-gray-100 text-gray-900 font-semibold py-2.5 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  Get Started
                </div>
              </a>
            </div>

            {/* Features List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-3">All plans include:</p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  Unlimited PYQs & Test Library
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  AI Analytics & 24/7 Chatbot
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
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

export default Sidebar;
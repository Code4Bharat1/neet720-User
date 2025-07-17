'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative flex items-center px-8 py-5 bg-white shadow-md">
      {/* Logo */}
      <div className="absolute left-8 flex items-center space-x-2">
        <Image 
          src="/neet_logo.png" 
          alt="NEET 720" 
          width={100} 
          height={60} 
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            style={{ fontFamily: 'Tiro Devanagari Sanskrit, serif' }}
          >
            Home
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-lg font-medium text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-300 group"
              style={{ fontFamily: 'Tiro Devanagari Sanskrit, serif' }}
            >
              Features
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute left-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-lg w-[500px] z-50 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px] pointer-events-none'}`}>
              <div className="grid grid-cols-2 text-[16px] text-[#129EA0]">
                {/* Column 1 */}
                <div className="flex flex-col space-y-0 px-6 py-4">
                  {[
                    { href: "/fulltest", text: "Full Test" },
                    { href: "/fastquiz", text: "Fast Quiz" },
                    { href: "/landing", text: "Create Test" },
                    { href: "/subjectwise", text: "Subject-wise Marks Analysis" },
                    { href: "/chatbot", text: "Chatbot" },
                    { href: "/resultSection", text: "Result Section" },
                    { href: "/examplanx", text: "Exam Plan" },
                    { href: "/analyticpage", text: "Analytics" },
                    { href: "/collegePrediction", text: "College Prediction" }
                  ].map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href} 
                      onClick={closeDropdown}
                      className="flex justify-between items-center py-2 px-3 hover:bg-blue-50 rounded-md transition-all duration-200 hover:pl-4"
                    >
                      {item.text} 
                      <span className="text-gray-400 transition-transform duration-300 group-hover/link:translate-x-1">&gt;</span>
                    </Link>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col space-y-3 px-4 py-4">
                  {[
                    { href: "/pyq", text: "Previous Year Question" },
                    { href: "/scholarship", text: "Scholarship" },
                    { href: "/noticeSection", text: "Notice Section" },
                    { href: "/notification", text: "Notification Section" },
                    { href: "/performance", text: "Top 10 Performance" },
                    { href: "/upcommingActivities", text: "Upcoming Activities" },
                    { href: "/customTask", text: "Create Own Task" },
                    { href: "/recentTest", text: "Own Recent Test" }
                  ].map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href} 
                      onClick={closeDropdown}
                      className="flex justify-between items-center py-2 px-3 hover:bg-blue-50 rounded-md transition-all duration-200 hover:pl-4"
                    >
                      {item.text} 
                      <span className="text-gray-400 transition-transform duration-300 group-hover/link:translate-x-1">&gt;</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/login"
            className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            style={{ fontFamily: 'Tiro Devanagari Sanskrit, serif' }}
          >
            Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
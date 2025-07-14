'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative flex items-center px-8 py-7 bg-white shadow">
      {/* Logo */}
      <div className="absolute left-8 flex items-center space-x-2">
        <Image src="/neet_logo.png" alt="NEET 720" width={100} height={60} />
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center space-x-8">
          <Link
  href="/"
  className="text-lg font-medium hover:text-blue-600"
  style={{ fontFamily: 'Tiro Devanagari Sanskrit, serif' }}
>
  Home
</Link>

          <div className="relative">
           <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center text-lg font-medium hover:text-blue-600 focus:outline-none"
    style={{ fontFamily: 'Tiro Devanagari Sanskrit, serif' }}
  >
    Features
    <ChevronDown className="ml-1 h-4 w-4" />
  </button>

            {isOpen && (
  <div className="absolute left-0 mt-7 bg-white border shadow-lg rounded-b-2xl rounded-t-none w-[500px] z-50">
    <div className="grid grid-cols-2 text-[17px] text-[#129EA0]">
      {/* Column 1 */}
      <div className="flex flex-col space-y-2 px-10 py-2">
        <Link href="/full-test" className="flex justify-between items-center hover:underline">Full Test <span>&gt;</span></Link>
        <Link href="/fast-quiz" className="flex justify-between items-center hover:underline">Fast Quiz <span>&gt;</span></Link>
        <Link href="/create-test" className="flex justify-between items-center hover:underline">Create Test <span>&gt;</span></Link>
        <Link href="/subject-analysis" className="flex justify-between items-center hover:underline">Subject-wise Marks Analysis <span>&gt;</span></Link>
        <Link href="/chatbot" className="flex justify-between items-center hover:underline">Chatbot <span>&gt;</span></Link>
        <Link href="/Result" className="flex justify-between items-center hover:underline">Result Section <span>&gt;</span></Link>
        <Link href="/exam-plan" className="flex justify-between items-center hover:underline">Exam Plan <span>&gt;</span></Link>
        <Link href="/analytics" className="flex justify-between items-center hover:underline">Analytics <span>&gt;</span></Link>
        <Link href="/college-prediction" className="flex justify-between items-center hover:underline">College Prediction <span>&gt;</span></Link>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col space-y-3 px-4 py-2">
        <Link href="/previous-year" className="flex justify-between items-center hover:underline">Previous Year Question <span>&gt;</span></Link>
        <Link href="/scholarship" className="flex justify-between items-center hover:underline">Scholarship <span>&gt;</span></Link>
        <Link href="/notice" className="flex justify-between items-center hover:underline">Notice Section <span>&gt;</span></Link>
        <Link href="/notifications" className="flex justify-between items-center hover:underline">Notification Section <span>&gt;</span></Link>
        <Link href="/top-10" className="flex justify-between items-center hover:underline">Top 10 Performance <span>&gt;</span></Link>
        <Link href="/activities" className="flex justify-between items-center hover:underline">Upcoming Activities <span>&gt;</span></Link>
        <Link href="/create-task" className="flex justify-between items-center hover:underline">Create Own Task <span>&gt;</span></Link>
        <Link href="/recent-test" className="flex justify-between items-center hover:underline">Own Recent Test <span>&gt;</span></Link>
      </div>
    </div>
  </div>
)}

          </div>

          <Link
  href="/demo"
  className="text-lg font-medium hover:text-blue-600"
  style={{ fontFamily: 'Tiro Devanagari Sanskrit, serif' }}
>
  Demo
</Link>
        </div>
      </div>
    </nav>
  );
}
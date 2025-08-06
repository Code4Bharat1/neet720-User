'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1 - Updated for mobile responsiveness
    (
      <section key="slide-1" className="w-full h-auto min-h-[85vh] md:h-[85vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-12 bg-gradient-to-br from-[#D8D5F5] via-[#A9A1F2] to-[#7F7ADF] relative overflow-hidden transition-all duration-700 ease-in-out">
        <div className="absolute -left-20 top-10 w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-20 w-[200px] h-[200px] bg-indigo-400 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute left-40 bottom-10 w-[150px] h-[150px] bg-purple-300 opacity-30 rounded-full blur-2xl"></div>

        <div className="md:w-1/2 space-y-4 z-10 text-center md:text-left px-4 md:px-0">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow">
            Crack NEET with Confidence and Clarity.
          </h1>
          <p className="text-sm md:text-lg text-white drop-shadow">
            Join a structured learning journey with expert guidance, smart practice tools, and personalized support — everything you need to succeed in NEET.
          </p>
          <button
          onClick={() => window.location.href = '/signup'}
          className="bg-[#00425A] text-white px-5 py-2.5 rounded hover:bg-[#00334a] text-sm md:text-base">
            Schedule A Demo Now
          </button>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-[-60px] md:mr-[-20px] flex justify-center md:justify-end z-10">
<div
  className={`
    w-[300px] h-[300px] 
    md:w-[500px] md:h-[500px] 
    mx-auto md:mx-0
    overflow-hidden 
    rounded-full md:rounded-none 
    shadow-lg border-4 border-white 
    md:border-none md:shadow-none 
    md:[clip-path:ellipse(70%_100%_at_40%_50%)]
  `}
>
  <Image
    src="/Ellipse 16.png"
    alt="Teacher and Student"
    width={500}
    height={500}
    className="object-cover w-full h-full"
    priority
  />
</div>




        </div>
      </section>
    ),

    // Slide 2 - Updated for mobile responsiveness
    (
      <section key="slide-2" className="w-full h-auto min-h-[85vh] md:h-[85vh] relative bg-[#a6e3f7] px-4 md:px-20 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between overflow-hidden transition-all duration-700 ease-in-out">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[length:30px_30px] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
          <h1 className="text-xl md:text-3xl font-bold text-[#001f54]">
            Crack NEET with Confidence <span className="block md:inline">— Let AI Guide You.</span>
          </h1>
          <p className="mt-4 text-[#1a1a1a] text-xs md:text-base leading-relaxed">
            Get ready to conquer NEET with the power of AI by your side.
            Our intelligent assistant provides personalized guidance, smart study plans, instant doubt-solving, and performance tracking — all tailored to your needs.
          </p>
              <button
          onClick={() => window.location.href = '/signup'}
          className="bg-[#00425A] text-white px-5 py-2.5 mt-4 rounded hover:bg-[#00334a] text-sm md:text-base">
            Schedule A Demo Now
          </button>
        </div>

        <div className="relative z-10 w-full md:w-2/5 mt-8 md:mt-0 flex justify-center">
          <Image
            src="/image 2.png"
            alt="AI Guide"
            width={400}
            height={260}
            className="rounded-2xl w-[90%] max-w-[400px] h-auto"
            priority
          />
        </div>
      </section>
    ),

    // Slide 3 - Updated for mobile responsiveness
    (
      <section
        key="slide-3"
        className="w-full h-auto min-h-[85vh] md:h-[85vh] relative flex flex-col md:flex-row items-center justify-between bg-[#9EE5F6] overflow-hidden px-4 md:px-20 py-8 md:py-16 transition-all duration-700 ease-in-out"
      >
        {/* Grid Squares */}
        <div className="absolute inset-0 z-0 grid grid-cols-8 grid-rows-6 gap-2 md:gap-4 px-4 md:px-10 py-4 md:py-10 opacity-40">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="bg-black/50 w-3 h-2 md:w-8 md:h-4"
            />
          ))}
        </div>

        {/* Background Arcs */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 512 512"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 512 C 0 341 171 171 341 171 L 512 171 L 512 341 C 341 341 171 512 0 512 Z"
              fill="#71CDE3"
            />
            <path
              d="M 0 512 C 0 256 256 0 512 0 L 512 85 C 299 85 85 299 85 512 Z"
              fill="#5DC0D9"
            />
          </svg>
        </div>

        {/* Text Section */}
        <div className="relative z-10 w-full md:w-2/3 text-center md:text-left space-y-4 text-[#00425A] px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            All Previous Year Questions
          </h2>
          <p className="text-sm md:text-lg font-medium">
            Access a complete collection of NEET Previous Year Questions, <br className="hidden md:block" />
            organized year-wise and chapter-wise to strengthen your foundation.
          </p>
           <button
          onClick={() => window.location.href = '/signup'}
          className="bg-[#00425A] text-white px-5 py-2.5 mt-4 rounded hover:bg-[#00334a] text-sm md:text-base">
            Schedule A Demo Now
          </button>
        </div>

        {/* Image Section */}
        <div className="relative z-10 mt-8 md:mt-0 w-full md:w-1/3 flex justify-center">
          <Image
            src="/Rectangle 6928.png"
            alt="Student with Book"
            width={300}
            height={360}
            className="rounded-xl w-[80%] max-w-[300px] h-auto"
            priority
          />
        </div>
      </section>
    ),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <Head>
        <title>Crack NEET with AI</title>
      </Head>

      <main className="relative min-h-[85vh] overflow-hidden">
        <div className="w-full h-auto min-h-[85vh] md:h-[85vh] transition-all duration-700 ease-in-out">
          {slides[currentSlide]}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-black'
                  : 'bg-white border border-gray-400'
              }`}
            />
          ))}
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 rounded-full p-3 shadow-lg z-20"
        >
          <Image 
            src="/image 4.png" 
            alt="WhatsApp" 
            width={30} 
            height={30} 
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </a>
      </main>
    </>
  );
}
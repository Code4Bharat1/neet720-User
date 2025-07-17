'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // First Slide
    (
      <section key="slide-1" className="w-full h-[85vh] flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-gradient-to-br from-[#D8D5F5] via-[#A9A1F2] to-[#7F7ADF] relative overflow-hidden transition-all duration-700 ease-in-out">
        {/* Gradient Circles */}
        <div className="absolute -left-20 top-10 w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-20 w-[200px] h-[200px] bg-indigo-400 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute left-40 bottom-10 w-[150px] h-[150px] bg-purple-300 opacity-30 rounded-full blur-2xl"></div>

        {/* Text Content */}
        <div className="md:w-1/2 space-y-4 z-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
            Crack NEET with Confidence and Clarity.
          </h1>
          <p className="text-base md:text-lg text-white drop-shadow">
            Join a structured learning journey with expert guidance, smart practice tools, and personalized support — everything you need to succeed in NEET.
          </p>
          <button className="bg-[#00425A] text-white px-5 py-2.5 rounded hover:bg-[#00334a]">
            Schedule A Demo Now
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-[-60px] md:mr-[-20px] flex justify-end z-10">
          <div
            className="w-[500px] h-[500px] overflow-hidden"
            style={{ clipPath: 'ellipse(70% 100% at 40% 50%)' }}
          >
            <Image
              src="/Ellipse 16.png"
              alt="Teacher and Student"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
    ),

    // Second Slide
    (
      <section key="slide-2" className="w-full h-[85vh] relative bg-[#a6e3f7] px-6 md:px-20 py-12 flex flex-col md:flex-row items-center justify-between overflow-hidden transition-all duration-700 ease-in-out">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[length:30px_30px] pointer-events-none" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[#001f54]">
            Crack NEET with Confidence <span className="block md:inline">— Let AI Guide You.</span>
          </h1>
          <p className="mt-4 text-[#1a1a1a] text-sm md:text-base leading-relaxed">
            Get ready to conquer NEET with the power of AI by your side.
            Our intelligent assistant provides personalized guidance, smart study plans, instant doubt-solving, and performance tracking — all tailored to your needs.
          </p>
        </div>

        {/* Image */}
        <div className="relative z-10 w-full md:w-2/5 mt-8 md:mt-0">
          <Image
            src="/image 2.png"
            alt="AI Guide"
            width={400}
            height={260}
            className="rounded-2xl"
          />
        </div>
      </section>
    ),

    // Third Slide (PYQ Section)
    (
      <section key="slide-3" className="w-full h-[85vh] relative bg-gradient-to-b from-[#083c66] to-[#13adc7] text-white px-6 md:px-20 py-12 overflow-hidden transition-all duration-700 ease-in-out">
        {/* Glowing Blobs */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute w-32 h-32 bg-teal-400 opacity-30 rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-24 h-24 bg-teal-400 opacity-30 rounded-full blur-2xl top-32 right-32"></div>
          <div className="absolute w-20 h-20 bg-teal-400 opacity-30 rounded-full blur-2xl bottom-10 left-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full">
          {/* Text Section */}
          <div className="text-center md:text-left md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              All Previous Year Questions <br />
              <span className="text-lg font-light">(PYQs)</span>
            </h2>
            <p className="text-sm md:text-base text-gray-100 leading-relaxed max-w-xl mx-auto md:mx-0">
              Access a complete collection of NEET Previous Year Questions, organized year-wise and chapter-wise to strengthen your foundation and familiarize yourself with real exam patterns.
            </p>
          </div>

          {/* Image Section */}
          <div className="mt-8 md:mt-0 md:w-1/3 relative">
            <Image
              src="/rectangle_3.png"
              alt="Student holding books"
              width={320}
              height={360}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    ),
  ];

  // Auto-slide every 5 seconds
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
        {/* Slide Container */}
        <div className="w-full h-[85vh] transition-all duration-700 ease-in-out">
          {slides[currentSlide]}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
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
          <Image src="/image 4.png" alt="WhatsApp" width={40} height={40} />
        </a>
      </main>
    </>
  );
}

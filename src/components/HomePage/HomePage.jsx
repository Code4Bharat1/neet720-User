'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1
    (
      <motion.section
        key="slide-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full h-auto min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-8 md:py-12 bg-gradient-to-br from-[#a6e3f7] to-[#7dd3ed] relative overflow-hidden"
      >
        {/* Animated background blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -left-20 top-10 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] bg-cyan-300 opacity-30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute right-10 top-20 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] bg-blue-400 opacity-30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute left-20 bottom-10 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] bg-cyan-200 opacity-30 rounded-full blur-2xl"
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between z-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left px-4 md:px-0"
          >
            <div className="inline-block mb-2">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
                NEET Preparation Platform
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#00425A] drop-shadow-lg leading-tight">
              Crack NEET with
              <span className="block mt-2 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Confidence and Clarity
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#003145] drop-shadow leading-relaxed max-w-xl">
              Join a structured learning journey with expert guidance, smart practice tools, and personalized support — everything you need to succeed in NEET.
            </p>
            <Link href='/signup'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00425A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#00334a] text-sm sm:text-base md:text-lg font-bold shadow-2xl transition-all duration-300 mt-4"
              >
                Schedule A Demo Now →
              </motion.button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl" />
              
              <div
                className="
                  relative
                  w-[250px] h-[250px] 
                  sm:w-[320px] sm:h-[320px] 
                  md:w-[450px] md:h-[450px]
                  lg:w-[550px] lg:h-[550px]
                  overflow-hidden 
                  rounded-full md:rounded-none 
                  shadow-2xl border-4 sm:border-[6px] border-white 
                  md:border-none md:shadow-none 
                  md:[clip-path:ellipse(70%_100%_at_40%_50%)]
                "
              >
                <Image
                  src="/Ellipse 16.png"
                  alt="Teacher and Student"
                  width={550}
                  height={550}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    ),

    // Slide 2
    (
      <motion.section
        key="slide-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full h-auto min-h-screen md:h-screen relative bg-gradient-to-br from-[#a6e3f7] to-[#7dd3ed] px-4 md:px-12 lg:px-20 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between overflow-hidden"
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(0,0,0,0.08)_1px,_transparent_1px)] bg-[length:30px_30px] pointer-events-none" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-xl"
        />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full md:w-1/2 text-center md:text-left px-4 md:px-0 space-y-4 sm:space-y-6"
          >
            <div className="inline-block mb-2">
              <span className="bg-[#00425A] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
                AI-Powered Learning
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#001f54] leading-tight">
              Crack NEET with Confidence
              <span className="block mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Let AI Guide You
              </span>
            </h2>
            <p className="text-[#1a1a1a] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Get ready to conquer NEET with the power of AI by your side.
              Our intelligent assistant provides personalized guidance, smart study plans, instant doubt-solving, and performance tracking — all tailored to your needs.
            </p>
            <Link href='/signup'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00425A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#00334a] text-sm sm:text-base md:text-lg font-bold shadow-2xl transition-all duration-300 mt-4"
              >
                Schedule A Demo Now →
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full md:w-2/5 mt-8 md:mt-0 flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-3xl blur-3xl" />
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                <Image
                  src="/image 2.png"
                  alt="AI Guide"
                  width={400}
                  height={260}
                  className="rounded-2xl w-full max-w-[400px] h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    ),

    // Slide 3
    (
      <motion.section
        key="slide-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full h-auto min-h-screen md:h-screen relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#a6e3f7] to-[#7dd3ed] overflow-hidden px-4 md:px-12 lg:px-20 py-8 md:py-16"
      >
        {/* Animated Grid */}
        {/* <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 grid grid-cols-8 grid-rows-6 gap-2 md:gap-4 px-4 md:px-10 py-4 md:py-10 opacity-30 overflow-hidden"
        >
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-black/40 w-3 h-2 md:w-8 md:h-4 rounded-sm" />
          ))}
        </motion.div> */}

        {/* SVG background */}
        {/* <div className="absolute inset-0 z-0 overflow-hidden">
          <svg viewBox="0 0 512 512" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 0 512 C 0 341 171 171 341 171 L 512 171 L 512 341 C 341 341 171 512 0 512 Z"
              fill="#71CDE3"
              opacity="0.6"
            />
            <path
              d="M 0 512 C 0 256 256 0 512 0 L 512 85 C 299 85 85 299 85 512 Z"
              fill="#5DC0D9"
              opacity="0.5"
            />
          </svg>
        </div> */}

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between z-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full md:w-3/5 text-center md:text-left space-y-4 sm:space-y-6 text-[#00425A] px-4 md:px-0"
          >
            <div className="inline-block mb-2">
              <span className="bg-white/90 text-[#00425A] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg">
                Complete Question Bank
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              All Previous Year
              <span className="block mt-2">Questions</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
              Access a complete collection of NEET Previous Year Questions, organized year-wise and chapter-wise to strengthen your foundation and boost your exam readiness.
            </p>
            <Link href='/signup'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00425A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#00334a] text-sm sm:text-base md:text-lg font-bold shadow-2xl transition-all duration-300 mt-4"
              >
                Schedule A Demo Now →
              </motion.button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full md:w-2/5 mt-8 md:mt-0 flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-3xl blur-3xl" />
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                <Image
                  src="/Rectangle 6928.png"
                  alt="Student with Book"
                  width={300}
                  height={360}
                  className="rounded-2xl w-full max-w-[300px] h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    ),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <Head>
        <title>Crack NEET with AI | Professional NEET Preparation Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Join the best AI-powered NEET preparation platform with expert guidance and smart learning tools." />
      </Head>

      <main className="relative min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <div className="w-full h-auto min-h-screen md:h-screen">
            {slides[currentSlide]}
          </div>
        </AnimatePresence>

        {/* Modern Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20 bg-white/20 backdrop-blur-md px-4 py-3 rounded-full">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'bg-white w-8 h-3' 
                  : 'bg-white/60 hover:bg-white/80 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Enhanced WhatsApp Button */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full p-3 sm:p-4 shadow-2xl hover:shadow-green-500/50 z-20 transition-all duration-300"
        >
          <Image
            src="/image 4.png"
            alt="WhatsApp"
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
        </motion.a>
      </main>

      <style jsx global>{`
        html,
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
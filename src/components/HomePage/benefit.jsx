'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const benefitsData = [
  {
    title: 'Exam Plan',
    points: [
      'Maximize scores with smart planning',
      'Organized study flow',
      'Minimize time waste on low-priority chapters',
    ],
    image: '/examplan.png',
  },
  {
    title: 'Chatbot',
    points: [
      'Get 24/7 doubt resolution',
      'Supports independent learning',
      'Reduces the need for external help',
    ],
    image: '/chatbot.png',
  },
  {
    title: 'Analytics',
    points: [
      'Identify patterns in mistakes',
      'Visual graphs for progress monitoring',
      'Helps refine your study strategy',
    ],
    image: '/analytics.png',
  },
];

export default function BenefitsPage() {
  return (
    <div className="bg-[#E6F2FF] min-h-screen"> {/* Light Blue Background */}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0B3558] to-[#1a5a8a] py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
              Powerful Features for
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transform your study experience with intelligent tools designed for success
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="space-y-24 sm:space-y-28 md:space-y-32 lg:space-y-40">
          {benefitsData.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center`}
              >
                {/* Image Side */}
                <div className={`${i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} relative`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="relative group"
                  >
                    {/* Decorative element */}
                    <div
                      className={`absolute ${
                        i % 2 === 0 ? '-top-6 -left-6' : '-top-6 -right-6'
                      } w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl -z-10`}
                    />

                    {/* Image container */}
                    <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white">
                        <Image
                          src={benefit.image}
                          alt={benefit.title}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      {/* Feature badge */}
                      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#149C9F] to-[#103F5D] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        Feature #{i + 1}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className={`${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6 sm:space-y-8"
                  >
                    {/* Title */}
                    <div>
                      <div className="inline-block mb-3 sm:mb-4">
                        <span className="bg-gradient-to-r from-[#149C9F] to-[#103F5D] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          Essential Tool
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                        {benefit.title}
                      </h2>
                    </div>

                    {/* Points */}
                    <div className="space-y-4 sm:space-y-5">
                      {benefit.points.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 8 }}
                          className="group cursor-default"
                        >
                          {/* ✅ Gradient Box instead of white */}
                          <div className="relative bg-gradient-to-r from-[#149C9F] to-[#103F5D] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 to-white/20 rounded-l-xl sm:rounded-l-2xl" />
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg
                                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed pt-1 drop-shadow-md">
                                {point}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#0B3558] to-[#1a5a8a] py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10">
              Join thousands of students already achieving their academic goals
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

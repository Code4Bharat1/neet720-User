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
    <div className="bg-[#0B3558] min-h-screen text-white p-6 md:p-16 overflow-x-hidden">
      {/* Large Title at Top */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-16 text-center md:text-left"
      >
        Benefits
      </motion.h1>

      <div className="flex flex-col gap-20 md:gap-32">
        {benefitsData.map((benefit, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* Mobile View: Image after title */}
            <div className="md:hidden w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-3xl md:text-4xl font-bold mb-6 text-center"
              >
                {benefit.title}
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full flex justify-center"
              >
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full max-w-[500px] h-auto"
                />
              </motion.div>
            </div>

            {/* Desktop View: Alternating layout */}
            <motion.div
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`hidden md:block ${index % 2 === 0 ? 'order-1' : 'order-2'} w-full md:w-1/2`}
            >
              <Image
                src={benefit.image}
                alt={benefit.title}
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
              />
            </motion.div>

            {/* Points section - appears after image in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`w-full ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} md:w-1/2`}
            >
              <h2 className="hidden md:block text-4xl font-bold mb-6 md:mb-8 text-center md:text-left">
                {benefit.title}
              </h2>
              <ul className="flex flex-col gap-4 md:gap-5">
                {benefit.points.map((point, pointIndex) => (
                  <motion.li
                    key={pointIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * pointIndex }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-5 py-3 md:px-6 md:py-4 rounded-md text-white text-lg md:text-2xl font-semibold"
                  >
                    • {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
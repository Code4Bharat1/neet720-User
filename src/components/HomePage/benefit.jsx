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
    <div className="bg-[#0B3558] min-h-screen text-white px-4 md:px-16 py-8 md:py-16 overflow-x-hidden">
      <h1 className="text-3xl md:text-6xl font-bold mb-12 text-white text-left md:pl-6 pl-2">
        Benefits
      </h1>

      <div className="flex flex-col gap-24">
        {benefitsData.map((benefit, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            } gap-10 items-center justify-center`}
          >
            {/* Image */}
            <motion.div
              initial={{ x: i % 2 === 0 ? 100 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="w-full md:w-1/2"
            >
              <div className="relative w-full aspect-video max-w-2xl mx-auto">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left">
                {benefit.title}
              </h2>
              <ul className="flex flex-col gap-5">
                {benefit.points.map((point, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-4 py-3 rounded-md text-white text-lg md:text-2xl font-semibold"
                  >
                    • {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

      <div className="flex flex-col gap-20">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Image
              src={benefitsData[0].image}
              alt={benefitsData[0].title}
              width={700}
              height={400}
              className="rounded-xl object-cover w-full max-w-[700px] h-auto"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="mt-2 md:mt-[5px]">
              <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left">{benefitsData[0].title}</h2>
              <ul className="flex flex-col gap-5 mt-4">
                {benefitsData[0].points.map((point, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-4 py-3 rounded-md text-white text-lg md:text-2xl font-semibold"
                  >
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col-reverse md:flex-row gap-10 items-center justify-center">
          {/* Text */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="mt-2 md:mt-[40px]">
              <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left mb-6">{benefitsData[1].title}</h2>
              <ul className="flex flex-col gap-5">
                {benefitsData[1].points.map((point, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-4 py-3 rounded-md text-white text-lg md:text-2xl font-semibold"
                  >
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Image
              src={benefitsData[1].image}
              alt={benefitsData[1].title}
              width={700}
              height={400}
              className="rounded-xl object-cover w-full max-w-[700px] h-auto mt-0 md:mt-[200px]"
            />
          </motion.div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            {/* Image */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Image
                src={benefitsData[2].image}
                alt={benefitsData[2].title}
                width={700}
                height={400}
                className="rounded-xl object-cover w-full max-w-[700px] h-auto"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="-mt-2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left">
                {benefitsData[2].title}
              </h2>
              <ul className="flex flex-col gap-5">
                {benefitsData[2].points.map((point, index) => (
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
        </div>
      </div>
    </div>
  );
}

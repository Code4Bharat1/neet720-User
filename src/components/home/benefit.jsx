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
    image: '/chatbot.png',
  },
  {
    title: 'Chatbot',
    points: [
      'Get 24/7 doubt resolution',
      'Supports independent learning',
      'Reduces the need for external help',
    ],
    image: '/examplan.png',
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
    <div className="bg-[#0B3558] min-h-screen text-white p-6 md:p-16 ">
      <h1 className="text-3xl md:text-6xl font-bold mb-12 text-white pl-6">
        Benefits
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Chatbot */}
        <div className="flex flex-col gap-4">
  {/* Image - comes from right */}
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <Image
      src={benefitsData[0].image}
      alt={benefitsData[0].title}
      width={250}
      height={150}
      className="rounded-xl object-cover w-[700px] h-auto"
    />
  </motion.div>

  {/* Text - comes from left and shifted downward */}
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="mt-[5px]"> {/* 👈 shift down using margin-top */}
      <h2 className="text-5xl font-bold text-center">{benefitsData[0].title}</h2>
      <ul className="flex flex-col gap-5 mt-4">
        {benefitsData[0].points.map((point, index) => (
          <li
            key={index}
            className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-4 py-3 rounded-md text-white text-2xl font-semibold"
          >
            • {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
</div>


        {/* Exam Plan */}
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mt-[40px]">
            <h2 className="text-5xl font-bold text-center mb-6">{benefitsData[1].title}</h2>
            <ul className="flex flex-col gap-3">
              {benefitsData[1].points.map((point, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-4 py-3 rounded-md text-white text-2xl font-semibold"
                >
                  • {point}
                </li>
              ))}
            </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image
              src={benefitsData[1].image}
              alt={benefitsData[1].title}
              width={250}
              height={150}
              className="rounded-xl object-cover w-[700px] h-auto mt-[200px]" 
            />
          </motion.div>
        </div>

        {/* Analytics */}
        <div className="flex flex-col gap-7 md:col-span-2">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src={benefitsData[2].image}
                alt={benefitsData[2].title}
                width={400}
                height={250}
                className="rounded-xl object-cover w-[700px] h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="-mt-2"
            >
              <h2 className="text-5xl font-bold mb-6 text-center">
                {benefitsData[2].title}
              </h2>
              <ul className="flex flex-col gap-7">
                {benefitsData[2].points.map((point, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-t from-[#2284C3] to-[#103F5D] px-4 py-3 rounded-md text-white text-2xl font-semibold"
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
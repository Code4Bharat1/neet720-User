"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, AlertCircle, Calendar, TrendingDown, Mail, Phone } from "lucide-react";

export default function RefundPolicy() {
  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const policies = [
    {
      number: 1,
      title: "Eligibility for Refunds",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      points: [
        { text: "Refund requests must be submitted within", highlight: "7 days", suffix: "of enrollment." },
        { text: "Refunds are applicable only if less than", highlight: "15% of the course content", suffix: "has been accessed." }
      ]
    },
    {
      number: 2,
      title: "Processing Fees",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      content: "Processing fees, if any, will be deducted from the refunded amount. These include payment gateway charges and administrative costs. A fixed processing fee of ₹5000 will be deducted from the refund amount to cover transaction expenses.",
      points: [
        { text: "A fixed processing fee of", highlight: "₹5000", suffix: "will be deducted from the refund amount." },
        { text: "Additional applicable processing or gateway charges may also be deducted.", highlight: "", suffix: "" },
        { text: "All deductions are transparent and kept minimal.", highlight: "", suffix: "" }
      ]
    },
    {
      number: 3,
      title: "Refund Timeline",
      icon: <Clock className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      points: [
        { text: "Approved refunds will be processed within", highlight: "10 business days", suffix: "." }
      ]
    }
  ];

  const highlights = [
    { icon: <Calendar className="w-5 h-5" />, label: "7-Day Window", color: "bg-green-400" },
    { icon: <TrendingDown className="w-5 h-5" />, label: "25% Content Limit", color: "bg-blue-400" },
    { icon: <Clock className="w-5 h-5" />, label: "10-Day Processing", color: "bg-purple-400" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 px-4 py-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-3xl overflow-hidden shadow-2xl mb-12 mt-24 md:mt-28">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <DollarSign className="w-4 h-4" />
              <span>Fair Refund Process</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Refund{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-blue-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              At <strong>NEXCORE ALLIANCE LLP</strong>, we strive to ensure your satisfaction. However, we understand that circumstances may change, and we are here to assist you with a fair refund process.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Quick Reference */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center text-gray-600 font-medium">
                <span className={`w-2 h-2 ${item.color} rounded-full mr-2 animate-pulse`}></span>
                {item.label}
              </div>
            ))}
          </div>

          {/* Policy Content */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Decorative gradient on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${policy.color} rounded-full filter blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}></div>

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${policy.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {policy.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                      {policy.number}. {policy.title}
                    </h3>

                    {/* Points */}
                    {policy.points && (
                      <div className="space-y-3">
                        {policy.points.map((point, idx) => (
                          <div key={idx} className="flex items-start bg-white p-3 rounded-lg border border-gray-200">
                            <div className={`w-2 h-2 bg-gradient-to-br ${policy.color} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                            <p className="text-base md:text-lg text-gray-700">
                              {point.text} <strong className="text-blue-700">{point.highlight}</strong> {point.suffix}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Simple Content */}
                    {policy.content && (
                      <p className="text-base md:text-lg leading-relaxed text-gray-700">
                        {policy.content}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Commitment Statement */}
            <motion.div
              variants={itemVariants}
              className="relative bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-2xl opacity-30"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  We are committed to providing a seamless refund experience while maintaining fairness for all parties.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mt-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-2xl opacity-30"></div>
            <div className="relative">
              <h3 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Questions about Refunds?
              </h3>
              <p className="text-green-800 text-sm md:text-base mb-6">
                If you have any questions about our refund policy, please contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:director@nexcorealliance.com"
                  className="group flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-green-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-green-600 hover:text-green-800 font-medium text-sm break-all">
                    director@nexcorealliance.com
                  </span>
                </a>
                <a
                  href="tel:+918976104646"
                  className="group flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-green-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-green-600 hover:text-green-800 font-medium">
                    +91-8976104646
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Last Updated */}
          <div className="text-center pt-6 border-t border-gray-200 mt-10">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
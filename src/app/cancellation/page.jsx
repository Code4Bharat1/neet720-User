
"use client";
import React from "react";
import { motion } from "framer-motion";
// import SEOHead from "../SEOHead";
import { XCircle, Mail, AlertCircle, CheckCircle, FileText, DollarSign, TrendingDown } from "lucide-react";

export default function CancellationPolicy() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Schema for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "CancellationPolicy",
    name: "Cancellation Policy",
    url: "https://www.NEXCORE ALLIANCE LLP.com/cancellationpolicy",
    description:
      "Read NEXCORE ALLIANCE LLP's cancellation policy. Learn the conditions and guidelines for cancelling your course enrollment.",
    publisher: {
      "@type": "Organization",
      name: "NEXCORE ALLIANCE LLP",
      url: "https://www.NEXCORE ALLIANCE LLP.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.NEXCORE ALLIANCE LLP.com/og-image.png",
      },
    },
    inLanguage: "en-IN",
  };

  const policies = [
    {
      number: 1,
      title: "Submission of Cancellation Requests",
      icon: <Mail className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      content: "All cancellation requests must be submitted in writing via email to director@nexcorealliance.com.",
      email: "director@nexcorealliance.com"
    },
    {
      number: 2,
      title: "Eligibility",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      content: "Cancellations will not be eligible for refunds if more than",
      highlight: "15% of the course content",
      suffix: "has been accessed."
    },
    {
      number: 3,
      title: "Cancellation Fees",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      content: "Any applicable cancellation fees will be deducted before processing refunds."
    }
  ];

  const highlights = [
    { icon: <FileText className="w-5 h-5" />, label: "Written Request", color: "bg-blue-400" },
    { icon: <TrendingDown className="w-5 h-5" />, label: "15% Content Limit", color: "bg-green-400" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Fee Deduction", color: "bg-orange-400" }
  ];

  return (
    <>
      {/* <SEOHead
        title="Cancellation Policy – NEXCORE ALLIANCE LLP"
        description="Read NEXCORE ALLIANCE LLP's cancellation policy. Learn about eligibility, process, and conditions for cancelling your course enrollment."
        keywords="NEXCORE ALLIANCE LLP cancellation policy, cancel course enrollment, cancellation rules India, course cancellation guidelines"
        url="https://www.NEXCORE ALLIANCE LLP.com/cancellationpolicy"
        schema={schema}
      /> */}

      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-50 px-4 py-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-red-700 rounded-3xl overflow-hidden shadow-2xl mb-12 mt-24 md:mt-28">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full filter blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <XCircle className="w-4 h-4" />
                <span>Transparent Process</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Cancellation{" "}
                <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-orange-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                At <strong>NEXCORE ALLIANCE LLP</strong>, we aim to provide a transparent and user-friendly cancellation process. You may cancel your course enrollment under the following conditions:
              </p>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            variants={cardVariants}
          >
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
            <div className="space-y-6">
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

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-base md:text-lg text-gray-700">
                          {policy.content}{" "}
                          {policy.highlight && (
                            <strong className="text-red-700">{policy.highlight}</strong>
                          )}{" "}
                          {policy.suffix}
                          {policy.email && (
                            <>
                              {" "}
                              <a
                                href={`mailto:${policy.email}`}
                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                              >
                                {policy.email}
                              </a>
                              .
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support Statement */}
            <motion.div
              variants={itemVariants}
              className="relative bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 mt-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-2xl opacity-30"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  For assistance or queries, please contact our support team. We're here to help.
                </p>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={itemVariants}
              className="relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mt-6 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-2xl opacity-30"></div>
              <div className="relative">
                <h3 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Need to Cancel?
                </h3>
                <p className="text-green-800 text-sm md:text-base mb-4">
                  Submit your cancellation request to:
                </p>
                <a
                  href="mailto:director@nexcorealliance.com"
                  className="group inline-flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-green-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-green-600 hover:text-green-800 font-medium break-all">
                    director@nexcorealliance.com
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Last Updated */}
            <div className="text-center pt-6 border-t border-gray-200 mt-10">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                Last updated: January 2025
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}


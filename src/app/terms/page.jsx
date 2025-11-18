"use client";
import React from "react";
import { Shield, CheckCircle, AlertTriangle, Mail, Phone, FileText, Zap, Scale } from "lucide-react";

const TermsAndConditions = () => {
  const terms = [
    {
      number: 1,
      title: "Eligibility",
      content: "Users must be at least 18 years old or have explicit parental/guardian consent to access and use our services.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Accuracy of Information",
      content: "All users are required to provide accurate, complete, and up-to-date personal and payment details. Falsified or misleading information may result in account suspension.",
      icon: <FileText className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 3,
      title: "Intellectual Property",
      content: "All content, materials, and courses on our platform are owned by NEXCORE ALLIANCE LLP and protected by copyright laws. Unauthorized sharing, duplication, or distribution is strictly prohibited and may lead to legal action.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 4,
      title: "Service Modifications",
      content: "NEXCORE ALLIANCE LLP reserves the right to modify, suspend, or discontinue any service or course without prior notice.",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      number: 5,
      title: "Limitation of Liability",
      content: "We are not responsible for any indirect, incidental, or consequential damages arising from the use of our services. Users agree to use the platform at their own risk.",
      icon: <Scale className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500"
    },
    {
      number: 6,
      title: "Dispute Resolution",
      content: "Any disputes or claims arising from the use of our services shall be governed by the laws of India and subject to the jurisdiction of Mumbai courts.",
      icon: <Scale className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 px-4 py-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
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
              <Shield className="w-4 h-4" />
              <span>Legal Terms</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Terms and{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>
            <p className="text-blue-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Introduction */}
          <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 rounded-r-xl p-6 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-2xl opacity-30"></div>
            <p className="relative text-base md:text-lg leading-relaxed text-gray-700">
              Welcome to{" "}
              <strong className="text-blue-700">NEXCORE ALLIANCE LLP</strong>. By accessing or using our website{" "}
              <a
                href="https://nexcorealliance.com/"
                className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.nexcorealliance.com/
              </a>
              , you agree to comply with the following terms and conditions:
            </p>
          </div>

          {/* Terms List */}
          <div className="space-y-6 mb-10">
            {terms.map((term, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Decorative gradient on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${term.color} rounded-full filter blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}></div>

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${term.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {term.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      {term.number}. {term.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full filter blur-2xl opacity-30"></div>
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-800 mb-2 text-lg">
                  Important Notice
                </h3>
                <p className="text-yellow-700 text-sm md:text-base leading-relaxed">
                  These terms and conditions are subject to change without notice. It is your responsibility to review these terms periodically for updates.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-2xl opacity-30"></div>
            <div className="relative">
              <h3 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Questions about these Terms?
              </h3>
              <p className="text-blue-800 text-sm md:text-base mb-6">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:director@nexcorealliance.com"
                  className="group flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-600 hover:text-blue-800 font-medium text-sm break-all">
                    director@nexcorealliance.com
                  </span>
                </a>
                <a
                  href="tel:+918976104646"
                  className="group flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    +91-8976104646
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;


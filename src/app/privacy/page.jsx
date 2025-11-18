
"use client";
import React from "react";

import { Shield, FileText, Zap, Lock, Users, Cookie, RefreshCw, Mail, Phone, User, CreditCard } from "lucide-react";

export default function PrivacyPolicy() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - NEXCORE ALLIANCE LLP",
    url: "https://www.NEXCORE ALLIANCE LLP.com/privacy-policy",
    description:
      "Read NEXCORE ALLIANCE LLP's privacy policy to learn how we collect, use, and protect your personal information.",
    inLanguage: "en-IN",
  };

  const sections = [
    {
      number: 1,
      title: "Data Collection",
      icon: <FileText className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      dataTypes: [
        { icon: <User className="w-5 h-5" />, label: "Name" },
        { icon: <Mail className="w-5 h-5" />, label: "Email" },
        { icon: <Phone className="w-5 h-5" />, label: "Phone" },
        { icon: <CreditCard className="w-5 h-5" />, label: "Payment" }
      ],
      content: "We collect only the essential personal data required to provide you with our services. This information helps us process your enrollment and ensure a seamless user experience."
    },
    {
      number: 2,
      title: "Data Usage",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      points: [
        "Processing your course enrollment and payments.",
        "Sending updates regarding our programs, services, and policies.",
        "Enhancing and personalizing your experience by improving our offerings."
      ],
      content: "Your personal information is used strictly for specific purposes. We value your trust and ensure your data is used responsibly."
    },
    {
      number: 3,
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      securityFeatures: [
        { title: "Encryption", desc: "Industry-standard encryption to protect your sensitive information." },
        { title: "Secure Storage", desc: "Secure storage systems to prevent unauthorized access." }
      ],
      content: "We take your data security seriously and have implemented robust measures. Your privacy is our priority, and we continuously enhance our security protocols."
    },
    {
      number: 4,
      title: "Third-Party Sharing",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
      content: "Your data is never shared with third parties except for secure payment processing via trusted payment gateways. We ensure that all third-party service providers adhere to strict data protection standards."
    },
    {
      number: 5,
      title: "Cookies",
      icon: <Cookie className="w-6 h-6" />,
      color: "from-orange-500 to-yellow-500",
      points: [
        "Enhance your browsing experience.",
        "Analyze website traffic and improve functionality."
      ],
      content: "Our website uses cookies for various purposes. You can manage your cookie preferences through your browser settings."
    },
    {
      number: 6,
      title: "Policy Updates",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      points: [
        "All updates will be communicated through our website.",
        "We encourage you to review the policy periodically to stay informed."
      ],
      content: "NEXCORE ALLIANCE LLP reserves the right to update this privacy policy to reflect changes in our practices or legal requirements."
    }
  ];

  return (
    <>
      {/* <SEOHead
        title="Privacy Policy – NEXCORE ALLIANCE LLP"
        description="Learn how NEXCORE ALLIANCE LLP protects your privacy and handles your personal data responsibly."
        keywords="privacy policy, data protection, NEXCORE ALLIANCE LLP privacy, user information safety"
        url="https://www.NEXCORE ALLIANCE LLP.com/privacy-policy"
        schema={schema}
      /> */}

      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-50 px-4 py-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 rounded-3xl overflow-hidden shadow-2xl mb-12 mt-24 md:mt-28">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full filter blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Shield className="w-4 h-4" />
                <span>Your Privacy Matters</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Privacy{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-green-200 bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-green-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Your privacy matters to us. Learn how we protect your personal information.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Introduction */}
            <div className="relative bg-gradient-to-r from-green-50 to-cyan-50 border-l-4 border-green-600 rounded-r-xl p-6 mb-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-2xl opacity-30"></div>
              <p className="relative text-base md:text-lg leading-relaxed text-gray-700">
                At <strong className="text-green-700">NEXCORE ALLIANCE LLP</strong>, we are committed to safeguarding your privacy. This policy explains how we collect, use, and protect your personal information to ensure a secure and transparent experience.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-6 mb-10">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Decorative gradient on hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.color} rounded-full filter blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}></div>

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {section.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                        {section.number}. {section.title}
                      </h3>

                      {/* Data Types Grid */}
                      {section.dataTypes && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {section.dataTypes.map((type, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow duration-200">
                              <div className="text-blue-600 flex justify-center mb-2">
                                {type.icon}
                              </div>
                              <span className="text-sm font-medium text-gray-700">{type.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Points List */}
                      {section.points && (
                        <div className="space-y-3 mb-4">
                          {section.points.map((point, idx) => (
                            <div key={idx} className="flex items-start bg-white p-3 rounded-lg border border-gray-200">
                              <div className={`w-2 h-2 bg-gradient-to-br ${section.color} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                              <span className="text-sm md:text-base text-gray-700">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Security Features */}
                      {section.securityFeatures && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {section.securityFeatures.map((feature, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                              <div className="flex items-center mb-2">
                                <Shield className="w-5 h-5 mr-2 text-green-600" />
                                <span className="font-medium text-gray-900">{feature.title}</span>
                              </div>
                              <p className="text-sm text-gray-600">{feature.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-base md:text-lg leading-relaxed text-gray-700">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing Statement */}
            <div className="relative bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-8 mb-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-2xl opacity-30"></div>
              <p className="relative text-base md:text-lg leading-relaxed text-center text-gray-700">
                If you have any questions or concerns about this policy, please feel free to contact us. At{" "}
                <strong className="text-green-700">NEXCORE ALLIANCE LLP</strong>, your privacy and trust are of utmost importance to us.
              </p>
            </div>

            {/* Contact Information */}
            <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-2xl opacity-30"></div>
              <div className="relative">
                <h3 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Questions about Privacy?
                </h3>
                <p className="text-green-800 text-sm md:text-base mb-6">
                  If you have any questions about this Privacy Policy, please contact us:
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
            </div>

            {/* Last Updated */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
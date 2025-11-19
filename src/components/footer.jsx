"use client";

import Image from "next/image";
import Link from "next/link";
import { PiLinkSimpleBold } from "react-icons/pi";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-white text-gray-800 border-t border-gray-200">
      {/* Top Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Image
              src="/logo.png"
              alt="NEET 720 Logo"
              width={160}
              height={80}
              className="mx-auto md:mx-0"
            />
            <p className="text-sm text-gray-600 text-center md:text-left max-w-xs">
              Your trusted partner for NEET preparation with AI-powered learning
              and expert guidance.
            </p>
          </div>

          {/* Useful Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Schedule Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                 Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                 Privacy Policy
                </Link>
              </li>



              <li>
                <Link
                  href="/refund"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                Refund Policy
                </Link>
              </li>



              <li>
                <Link
                  href="/cancellation"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
               Cancellation  Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:+919321625553"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                  <FaPhoneAlt className="text-blue-600 group-hover:text-white text-sm" />
                </div>
                <span className="text-sm">+91 9321625553</span>
              </a>

              <a
                href="mailto:gawadechinmay01@gmail.com"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                  <FaEnvelope className="text-blue-600 group-hover:text-white text-sm" />
                </div>
                <span className="text-sm break-all">
                  gawadechinmay01@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919321625553"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <FaWhatsapp className="text-white text-xl" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <FaInstagram className="text-white text-xl" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <FaFacebookF className="text-white text-xl" />
              </motion.a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center md:text-left">
                Available Mon-Sat, 9AM-6PM IST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p className="text-center sm:text-left">
              © 2025 NEET720. All Rights Reserved.
            </p>

            <div className="flex items-center gap-2 text-center">
              <span>Developed by</span>
              <div className="relative group">
                <a
                  href="https://code4bharat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-100 hover:text-white font-semibold transition-colors duration-200"
                >
                  <PiLinkSimpleBold className="w-4 h-4" />
                  Code4Bharat
                </a>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Visit code4bharat.com
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

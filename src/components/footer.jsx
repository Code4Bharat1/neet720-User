"use client";

import Image from "next/image";
import { PiLinkSimpleBold } from "react-icons/pi";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t">
      {/* Top Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logo.png"
            alt="NEET 720 Logo"
            width={180}
            height={90}
            className="mx-auto md:mx-0"
          />
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:underline">
                Demo
              </a>
            </li>
            {/* <li>
              <a href="/features" className="hover:underline">
                Features
              </a>
            </li> */}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Contact Us</h3>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
            <FaPhoneAlt />
            <span>+91 9321625553</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm break-words">
            <FaEnvelope />
            <span>gawadechinmay01@gmail.com</span>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#">
              <FaWhatsapp className="text-green-500 w-6 h-6 sm:w-7 sm:h-7" />
            </a>
            <a href="#">
              <FaInstagram className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7" />
            </a>
            <a href="#">
              <FaFacebookF className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-teal-700 text-white text-center py-4 text-sm sm:text-base font-medium px-4">
        ©2025 | Developed by{" "}
        <span className="relative group inline-flex items-center">
          <a
            href="https://code4bharat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:underline ml-1 flex items-center gap-1"
          >
            Code4Bharat
          </a>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
            <PiLinkSimpleBold className="w-4 h-4" />
            Open code4bharat.com
          </span>
        </span>{" "}
        | All Rights Reserved.
      </div>
    </footer>
  );
}

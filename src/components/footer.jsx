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
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/neet_logo.png"
            alt="NEET 720 Logo"
            width={200}
            height={100}
          />
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center md:items-start mt-6">
          <h3 className="font-semibold mb-2">Useful links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Demo
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col items-center md:items-start mt-6">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt />
            <span>+91 9321625553</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <FaEnvelope />
            <span>gawadechinmay01@gmail.com</span>
          </div>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-center justify-center mt-6 text-center">
          <h3 className="font-semibold mb-2  ">Follow us</h3>
          <div className="flex space-x-4">
            <a href="#">
              <FaWhatsapp size={58} className="text-green-500 text-xl" />
            </a>
            <a href="#">
              <FaInstagram size={58} className="text-pink-500 text-xl" />
            </a>
            <a href="#">
              <FaFacebookF size={58} className="text-blue-600 text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      <div className="bg-teal-700 text-center text-black py-5 text-lg font-bold">
        ©2025 | Developed By{" "}
        <span className="relative group inline-flex items-center">
          <a
            href="https://code4bharat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1 flex items-center gap-1"
          >
            Code4Bharat
          </a>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
            <PiLinkSimpleBold className="w-4 h-4" />
            Open code4bharat.com{" "}
          </span>
        </span>{" "}
        | All Rights Reserved.
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center rounded-r-[60px] p-10">
        <img src="/logo.png" alt="NEET 720 Logo" className="w-40 mb-6" />
        <h2 className="text-3xl font-bold text-[#083e5d] mb-6">Welcome Back!</h2>
        <img
          src="/student-bg.png"
          alt="Student Illustration"
          className="w-[300px] mb-6"
        />
        <p className="text-center text-[#083e5d] font-medium text-lg">
          "Your NEET Success Begins Here – Register Today!"
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#083e5d] flex flex-col justify-center items-center px-10">
        <h2 className="text-white text-3xl font-bold mb-8">Sign up Now!</h2>

        <form className="w-full max-w-md space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-white block mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white block mb-1">E-mail</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-white block mb-1">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
              />
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#72efff] hover:bg-[#5cdde7] transition text-[#083e5d] font-semibold py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-white mt-6">
          Already have an account?{" "}
          <a href="#" className="text-[#72efff] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

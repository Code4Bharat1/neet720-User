"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePhone,
} from "react-icons/ai";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Input field change handler with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation for firstName and lastName - only alphabets and spaces
    if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(value)) {
        return; // Don't update if invalid characters
      }
    }

    // Validation for mobileNumber - only digits and max 10 digits
    if (name === "mobileNumber") {
      const phoneRegex = /^\d*$/;
      if (!phoneRegex.test(value) || value.length > 10) {
        return; // Don't update if non-digit or exceeds 10 digits
      }
    }

    // Validation for email - basic check to prevent spaces
    if (name === "emailAddress") {
      if (value.includes(" ")) {
        return; // Don't allow spaces in email
      }
    }

    // Validation for password - prevent spaces
    if (name === "password" || name === "confirmPassword") {
      if (value.includes(" ")) {
        toast.error("Password cannot contain spaces");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate mobile number
  const validateMobile = (mobile) => {
    return mobile.length === 10 && /^\d{10}$/.test(mobile);
  };

  // Validate password strength
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return null;
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.emailAddress) {
      toast.error("Please enter an email address.");
      return;
    }
    if (!validateEmail(formData.emailAddress)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${apiBaseUrl}/demo/sendotp`, {
        emailAddress: formData.emailAddress,
      });
      if (res.status === 200) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP.");
      return;
    }
    try {
      setVerifyingOtp(true);
      const res = await axios.post(`${apiBaseUrl}/demo/verifyotp`, {
        emailAddress: formData.emailAddress,
        otp,
      });
      if (res.status === 200) {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Submit Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      password,
      confirmPassword,
    } = formData;

    // Required fields validation
    if (!firstName || !emailAddress || !mobileNumber || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    // Name validation
    if (firstName.trim().length < 2) {
      toast.error("First name must be at least 2 characters long.");
      return;
    }

    // Email validation
    if (!validateEmail(emailAddress)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Mobile number validation
    if (!validateMobile(mobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits.");
      return;
    }

    // Password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // OTP verification check
    if (!otpVerified) {
      toast.error("Please verify the OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${apiBaseUrl}/demo/signup`, {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        emailAddress,
        mobileNumber,
        password,
        isDemo: true,
      });
      if (res.status === 201) {
        toast.success("Signup successful!");
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] min-h-screen">
      {/* Left */}
      <div className="hidden md:flex md:w-[40%] items-center justify-center">
        <Image src="/neet720_logo.jpg" alt="Logo" width={300} height={200} />
      </div>
      {/* Right */}
      <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white p-6 md:rounded-l-3xl">
        {/* Logo Section (only visible on mobile) */}
        <div className="flex justify-center mb-6 md:hidden">
          <Image
            src="/neet720_logo.jpg"
            alt="Neet720 Logo"
            width={160}
            height={60}
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#45A4CE] mb-6 text-center">
          {otpSent && !otpVerified ? "Enter OTP" : "Create an Account"}
        </h2>
        {/* Form */}
        {!otpSent || (otpSent && otpVerified) ? (
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-3 text-gray-500 text-xl" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                    placeholder="John"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Letters only</p>
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold">
                  Last Name
                </label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-3 text-gray-500 text-xl" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                    placeholder="Doe"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Letters only</p>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-bold">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AiOutlineMail className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="pl-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                  placeholder="example@email.com"
                  required
                  disabled={otpVerified}
                />
              </div>
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="mt-2 text-blue-600 font-semibold hover:underline disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              )}
              {otpVerified && (
                <p className="text-xs text-green-600 mt-1 font-semibold">✓ Verified</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-bold">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AiOutlinePhone className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="pl-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">10 digits only</p>
            </div>
            <div>
              <label className="block mb-1 text-sm font-bold">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                  placeholder="••••••••"
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword.password ? (
                    <AiOutlineEye className="text-xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl" />
                  )}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
              </p>
            </div>
            <div>
              <label className="block mb-1 text-sm font-bold">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                  placeholder="••••••••"
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirmPassword ? (
                    <AiOutlineEye className="text-xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl" />
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !otpVerified}
              className="w-full py-3 bg-[#45A4CE] text-white font-semibold rounded-md hover:bg-[#5babcd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <div className="w-full max-w-sm space-y-4">
            <p className="text-center text-gray-700">
              Enter the 6-digit OTP sent to{" "}
              <strong>{formData.emailAddress}</strong>
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
              }}
              className="w-full text-center text-xl tracking-widest border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              placeholder="000000"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={verifyingOtp || otp.length !== 6}
              className="w-full py-3 bg-[#0077B6] text-white font-semibold rounded-md hover:bg-[#005f8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              className="w-full text-sm text-gray-600 hover:text-gray-800 font-semibold"
            >
              ← Back to form
            </button>
          </div>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-bold">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-[#45A4CE] hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
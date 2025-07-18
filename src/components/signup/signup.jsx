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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSendOtp = async () => {
    if (!formData.emailAddress) {
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

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      setVerifyingOtp(true);
      const res = await axios.post(`${apiBaseUrl}/student/verifyotp`, {
        emailAddress: formData.emailAddress,
        otp,
      });

      if (res.status === 200) {
        toast.success("OTP verified!");
        setOtpVerified(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, emailAddress, mobileNumber, password, confirmPassword } = formData;

    if (!firstName || !emailAddress || !mobileNumber || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify the OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${apiBaseUrl}/student/register`, {
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
        router.push("/login");
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
        <h2 className="text-2xl md:text-3xl font-bold text-[#45A4CE] mb-6 text-center">
          {otpSent && !otpVerified ? "Enter OTP" : "Create an Account"}
        </h2>

        {!otpSent || (otpSent && otpVerified) ? (
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold">First Name</label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-3 text-gray-500 text-xl" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 py-2 border rounded-md w-full"
                    required
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold">Last Name</label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-3 text-gray-500 text-xl" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10 py-2 border rounded-md w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold">Email</label>
              <div className="relative">
                <AiOutlineMail className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="pl-10 py-2 border rounded-md w-full"
                  required
                />
              </div>
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-2 text-blue-600 font-semibold hover:underline"
                >
                  Send OTP
                </button>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold">Mobile Number</label>
              <div className="relative">
                <AiOutlineMail className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="pl-10 py-2 border rounded-md w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold">Password</label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-2 border rounded-md w-full"
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword.password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-bold">Confirm Password</label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-2 border rounded-md w-full"
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword.confirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#45A4CE] text-white font-semibold rounded-md hover:bg-[#5babcd]"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <div className="w-full max-w-sm space-y-4">
            <p className="text-center text-gray-700">
              Enter the 6-digit OTP sent to <strong>{formData.emailAddress}</strong>
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
              }}
              className="w-full text-center text-xl tracking-widest border border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={verifyingOtp}
              className="w-full py-3 bg-[#0077B6] text-white font-semibold rounded-md hover:bg-[#005f8a]"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
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

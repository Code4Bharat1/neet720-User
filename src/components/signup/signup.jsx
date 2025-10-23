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
  const [resendOtpClicked, setResendOtpClicked] = useState(false); // Track resend OTP click

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ✅ handle form field changes (with validation)
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain a special character";
    return null;
  };

  /* =========================================================
     🔹 SEND OTP (Email + WhatsApp)
  ========================================================= */
  const handleSendOtp = async () => {
    const { emailAddress, mobileNumber } = formData;

    if (!emailAddress || !mobileNumber) {
      toast.error("Please enter both email and mobile number.");
      return;
    }
    if (!validateEmail(emailAddress)) {
      toast.error("Invalid email address.");
      return;
    }
    if (!validateMobile(mobileNumber)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${apiBaseUrl}/demo/signup/send-otp`, {
        emailAddress,
        mobileNumber,
      });

      if (res.status === 200) {
        toast.success("OTP sent to your Email & WhatsApp!");
        setOtpSent(true);
        setResendOtpClicked(false); // reset resend flag
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     🔹 VERIFY OTP
  ========================================================= */
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP.");
      return;
    }
    try {
      setVerifyingOtp(true);
      const res = await axios.post(`${apiBaseUrl}/demo/signup/verify-otp`, {
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

  /* =========================================================
     🔹 RESEND OTP
  ========================================================= */
  const handleResendOtp = async () => {
    const { emailAddress, mobileNumber } = formData;

    try {
      setLoading(true);
      const res = await axios.post(`${apiBaseUrl}/demo/signup/send-otp`, {
        emailAddress,
        mobileNumber,
      });

      if (res.status === 200) {
        toast.success("OTP resent successfully to your Email & WhatsApp!");
        setResendOtpClicked(true); // mark as resent
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     🔹 COMPLETE SIGNUP
  ========================================================= */
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

    if (!firstName || !emailAddress || !mobileNumber || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (!validateEmail(emailAddress)) {
      toast.error("Invalid email address.");
      return;
    }

    if (!validateMobile(mobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify OTP first.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${apiBaseUrl}/demo/signup/complete`, {
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
        router.push("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     🔹 UI RENDER
  ========================================================= */
 return (
    <div className="flex flex-wrap bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] min-h-screen">
      {/* Left side logo */}
      <div className="hidden md:flex md:w-[40%] items-center justify-center">
        <Image src="/neet720_logo.jpg" alt="Logo" width={300} height={200} />
      </div>

      {/* Right side form */}
      <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white p-6 md:rounded-l-3xl">
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

        {/* FORM */}
        {!otpSent || (otpSent && otpVerified) ? (
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            {/* First + Last Name */}
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
                    className="pl-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#45A4CE]"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email + OTP */}
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
            </div>

            {/* Mobile + Send OTP */}
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

              {otpSent && !otpVerified && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="mt-2 text-blue-600 font-semibold hover:underline disabled:opacity-50"
                >
                  {loading ? "Resending..." : "Resend OTP"}
                </button>
              )}

              {otpVerified && (
                <p className="text-xs text-green-600 mt-1 font-semibold">✓ Verified</p>
              )}
            </div>

            {/* Password Fields */}
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
                  {showPassword.password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
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
                  {showPassword.confirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !otpVerified}
              className="w-full py-3 bg-[#45A4CE] text-white font-semibold rounded-md hover:bg-[#5babcd] disabled:opacity-50 transition-colors"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        ) : (
          // OTP Input screen
          <div className="w-full max-w-sm space-y-4">
            <p className="text-center text-gray-700">
              Enter the 6-digit OTP sent to <strong>{formData.emailAddress}</strong> & WhatsApp.
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
              className="w-full py-3 bg-[#0077B6] text-white font-semibold rounded-md hover:bg-[#005f8a] disabled:opacity-50 transition-colors"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend OTP button */}
            {!otpVerified && (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full mt-2 text-blue-600 font-semibold hover:underline disabled:opacity-50"
              >
                {loading ? "Resending..." : "Resend OTP"}
              </button>
            )}

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

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import axios from "axios";
// import { trackEvent } from "@/lib/gtag";

// import {
//   AiOutlineMail,
//   AiOutlineUser,
//   AiOutlineLock,
//   AiOutlineEye,
//   AiOutlineEyeInvisible,
//   AiOutlinePhone,
// } from "react-icons/ai";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     emailAddress: "",
//     mobileNumber: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     confirmPassword: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [resendOtpClicked, setResendOtpClicked] = useState(false);

//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = (field) => {
//     setShowPassword((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

//   const validatePassword = (password) => {
//     if (password.length < 8) return "Password must be at least 8 characters long";
//     if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
//     if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
//     if (!/[0-9]/.test(password)) return "Password must contain a number";
//     if (!/[!@#$%^&*]/.test(password)) return "Password must contain a special character";
//     return null;
//   };

//   const handleSendOtp = async () => {
//     const { emailAddress, mobileNumber } = formData;

//     if (!emailAddress || !mobileNumber) {
//       toast.error("Please enter both email and mobile number.");
//       return;
//     }
//     if (!validateEmail(emailAddress)) {
//       toast.error("Invalid email address.");
//       return;
//     }
//     if (!validateMobile(mobileNumber)) {
//       toast.error("Enter a valid 10-digit mobile number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(`${apiBaseUrl}/demo/signup/send-otp`, {
//         emailAddress,
//         mobileNumber,
//       });

//       if (res.status === 200) {
//         toast.success("OTP sent to your Email & WhatsApp!");
//         setOtpSent(true);
//         setResendOtpClicked(false);

//         trackEvent({
//           action: "send_otp",
//           category: "signup",
//           label: "OTP sent",
//         });
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       toast.error("Enter a valid 6-digit OTP.");
//       return;
//     }
//     try {
//       setVerifyingOtp(true);
//       const res = await axios.post(`${apiBaseUrl}/demo/signup/verify-otp`, {
//         emailAddress: formData.emailAddress,
//         otp,
//       });
//       if (res.status === 200) {
//         toast.success("OTP verified successfully!");
//         setOtpVerified(true);
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "OTP verification failed.");
//     } finally {
//       setVerifyingOtp(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     const { emailAddress, mobileNumber } = formData;

//     try {
//       setLoading(true);
//       const res = await axios.post(`${apiBaseUrl}/demo/signup/send-otp`, {
//         emailAddress,
//         mobileNumber,
//       });

//       if (res.status === 200) {
//         toast.success("OTP resent successfully to your Email & WhatsApp!");
//         setResendOtpClicked(true);
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to resend OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {
//       firstName,
//       lastName,
//       emailAddress,
//       mobileNumber,
//       password,
//       confirmPassword,
//     } = formData;

//     if (!firstName || !emailAddress || !mobileNumber || !password || !confirmPassword) {
//       toast.error("All fields are required.");
//       return;
//     }

//     if (!validateEmail(emailAddress)) {
//       toast.error("Invalid email address.");
//       return;
//     }

//     if (!validateMobile(mobileNumber)) {
//       toast.error("Mobile number must be exactly 10 digits.");
//       return;
//     }

//     const passwordError = validatePassword(password);
//     if (passwordError) {
//       toast.error(passwordError);
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     if (!otpVerified) {
//       toast.error("Please verify OTP first.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(`${apiBaseUrl}/demo/signup/complete`, {
//         firstName,
//         lastName,
//         fullName: `${firstName} ${lastName}`,
//         emailAddress,
//         mobileNumber,
//         password,
//         isDemo: true,
//       });

//       if (res.status === 201) {
//         toast.success("Signup successful!");

//         trackEvent({
//           action: "sign_up",
//           category: "user",
//           label: "Signup completed",
//         });

//         if (res.data.token) {
//           localStorage.setItem("authToken", res.data.token);
//         }
//         router.push("/login");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Signup failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-wrap bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 min-h-screen relative overflow-hidden">
//       {/* Animated Background Circles */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

//       {/* Left side logo */}
//       <div className="hidden md:flex md:w-[40%] items-center justify-center relative z-10">
//         <div className="bg-white/20 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/30">
//           <Image src="/neet720_logo.jpg" alt="Logo" width={300} height={200} className="drop-shadow-2xl" />
//         </div>
//       </div>

//       {/* Right side form */}
//       <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white/95 backdrop-blur-xl p-8 md:rounded-l-3xl shadow-2xl relative z-10">
//         {/* Mobile Logo */}
//         <div className="flex justify-center mb-8 md:hidden">
//           <div className="bg-gradient-to-br from-teal-400 to-cyan-400 p-4 rounded-2xl shadow-xl">
//             <Image
//               src="/neet720_logo.jpg"
//               alt="Neet720 Logo"
//               width={160}
//               height={60}
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Title with Gradient */}
//         <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2 text-center">
//           {otpSent && !otpVerified ? "Enter OTP" : "Create an Account"}
//         </h2>
//         <p className="text-gray-600 text-sm mb-8 text-center">
//           {otpSent && !otpVerified
//             ? "We've sent a verification code to your email and WhatsApp"
//             : "Join us today and start your journey"}
//         </p>

//         {/* FORM */}
//         {!otpSent || (otpSent && otpVerified) ? (
//           <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
//             {/* First + Last Name */}
//             <div className="flex gap-4">
//               <div className="w-1/2">
//                 <label className="block mb-2 text-sm font-bold text-gray-700">
//                   First Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all"
//                     placeholder="Akshat"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="w-1/2">
//                 <label className="block mb-2 text-sm font-bold text-gray-700">Last Name</label>
//                 <div className="relative group">
//                   <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all"
//                     placeholder="Gupta"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block mb-2 text-sm font-bold text-gray-700">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <div className="relative group">
//                 <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//                 <input
//                   type="email"
//                   name="emailAddress"
//                   value={formData.emailAddress}
//                   onChange={handleChange}
//                   className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   placeholder="neet720@email.com"
//                   required
//                   disabled={otpVerified}
//                 />
//               </div>
//             </div>

//             {/* Mobile + Send OTP */}
//             <div>
//               <label className="block mb-2 text-sm font-bold text-gray-700">
//                 Mobile Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative group">
//                 <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//                 <input
//                   type="tel"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   placeholder="9876543210"
//                   maxLength={10}
//                   required
//                   disabled={otpVerified}
//                 />
//               </div>

//               <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
//                 <span className="inline-block w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
//                 Click 'Send OTP' to verify your mobile number
//               </p>

//               {!otpSent && (
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={loading}
//                   className="mt-3 px-6 py-2.5 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-semibold rounded-lg hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-400/30 hover:shadow-xl hover:shadow-teal-400/40"
//                 >
//                   {loading ? "Sending..." : "Send OTP"}
//                 </button>
//               )}

//               {otpSent && !otpVerified && (
//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={loading}
//                   className="mt-3 text-teal-500 font-semibold hover:text-teal-600 hover:underline disabled:opacity-50 transition-colors"
//                 >
//                   {loading ? "Resending..." : "Resend OTP"}
//                 </button>
//               )}

//               {otpVerified && (
//                 <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
//                   <span className="text-lg">✓</span> Mobile number verified
//                 </div>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block mb-2 text-sm font-bold text-gray-700">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <div className="relative group">
//                 <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//                 <input
//                   type={showPassword.password ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all"
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility("password")}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
//                 >
//                   {showPassword.password ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mt-2 leading-relaxed">
//                 Must include 8+ characters, uppercase, lowercase, number & special symbol
//               </p>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block mb-2 text-sm font-bold text-gray-700">
//                 Confirm Password <span className="text-red-500">*</span>
//               </label>
//               <div className="relative group">
//                 <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//                 <input
//                   type={showPassword.confirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all"
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility("confirmPassword")}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
//                 >
//                   {showPassword.confirmPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading || !otpVerified}
//               className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-bold text-lg rounded-xl hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/40 hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating Account...
//                 </span>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>
//         ) : (
//           // OTP Input Screen
//           <div className="w-full max-w-sm space-y-6">
//             <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-100">
//               <p className="text-center text-gray-700 leading-relaxed">
//                 Enter the <span className="font-bold text-teal-600">6-digit OTP</span> sent to
//               </p>
//               <p className="text-center font-bold text-teal-600 mt-2">{formData.emailAddress}</p>
//               <p className="text-center text-sm text-gray-600 mt-1">& WhatsApp</p>
//             </div>

//             <input
//               type="text"
//               maxLength={6}
//               value={otp}
//               onChange={(e) => {
//                 if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
//               }}
//               className="w-full text-center text-3xl font-bold tracking-[1em] border-2 border-teal-300 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all bg-white shadow-lg"
//               placeholder="000000"
//             />

//             <button
//               onClick={handleVerifyOtp}
//               disabled={verifyingOtp || otp.length !== 6}
//               className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-bold text-lg rounded-xl hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/40 hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {verifyingOtp ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Verifying...
//                 </span>
//               ) : (
//                 "Verify OTP"
//               )}
//             </button>

//             {!otpVerified && (
//               <button
//                 type="button"
//                 onClick={handleResendOtp}
//                 disabled={loading}
//                 className="w-full text-teal-500 font-semibold hover:text-teal-600 hover:underline disabled:opacity-50 transition-colors py-2"
//               >
//                 {loading ? "Resending..." : "Didn't receive? Resend OTP"}
//               </button>
//             )}

//             <button
//               onClick={() => {
//                 setOtpSent(false);
//                 setOtp("");
//               }}
//               className="w-full text-sm text-gray-600 hover:text-gray-800 font-semibold flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg transition-colors"
//             >
//               <span>←</span> Back to form
//             </button>
//           </div>
//         )}

//         {/* Login Link */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-600 font-medium">
//             Already have an account?{" "}
//             <button
//               onClick={() => router.push("/login")}
//               className="text-teal-500 font-bold hover:text-teal-600 hover:underline transition-colors"
//             >
//               Log in
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { trackEvent } from "@/lib/gtag";

import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePhone,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
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

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendOtpClicked, setResendOtpClicked] = useState(false);

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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const validatePassword = (password) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must contain a special character";
    return null;
  };

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
        setResendOtpClicked(false);

        trackEvent({
          action: "send_otp",
          category: "signup",
          label: "OTP sent",
        });
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
        setResendOtpClicked(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

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

    if (
      !firstName ||
      !emailAddress ||
      !mobileNumber ||
      !password ||
      !confirmPassword
    ) {
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

    if (!agreeToTerms) {
      toast.error("Please agree to the Terms & Privacy Policy.");
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

        trackEvent({
          action: "sign_up",
          category: "user",
          label: "Signup completed",
        });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Profile"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
           
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {otpSent && !otpVerified
                ? "Verify your account"
                : "Join NEET720 Today"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {otpSent && !otpVerified
                ? "We've sent a verification code to your email and WhatsApp"
                : "Create your account to unlock personalized exam plans, daily targets, and AI-powered guidance for your NEET journey."}
            </p>
          </div>

          {/* FORM */}
          {!otpSent || (otpSent && otpVerified) ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="student@example.com"
                    required
                    disabled={otpVerified}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <span className="text-xs text-gray-500">
                    For OTP & updates
                  </span>
                </div>
                <div className="relative">
                  <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+91 • • • • • • • • • •"
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
                    className="mt-3 text-sm text-teal-500 font-semibold hover:text-teal-600 hover:underline disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Sending OTP..." : "Send OTP to verify"}
                  </button>
                )}

                {otpSent && !otpVerified && (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="mt-3 text-sm text-teal-500 font-semibold hover:text-teal-600 hover:underline disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Resending..." : "Resend OTP"}
                  </button>
                )}

                {otpVerified && (
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-600">
                    <span>✓</span> Phone number verified
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <span className="text-xs text-gray-500">
                    At least 8 characters
                  </span>
                </div>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword.password ? (
                      <AiOutlineEye size={18} />
                    ) : (
                      <AiOutlineEyeInvisible size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword.confirmPassword ? (
                      <AiOutlineEye size={18} />
                    ) : (
                      <AiOutlineEyeInvisible size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Privacy */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-teal-500 focus:ring-teal-400 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-teal-500 hover:text-teal-600 underline"
                  >
                    Terms
                  </a>{" "}
                  &{" "}
                  <a
                    href="#"
                    className="text-teal-500 hover:text-teal-600 underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !otpVerified || !agreeToTerms}
                className="w-full py-3.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
              >
                {loading ? "Creating account..." : "Create your account"}
              </button>
            </form>
          ) : (
            // OTP Input Screen
            <div className="space-y-6">
              <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl">
                <p className="text-sm text-gray-700 text-center">
                  Enter the <span className="font-semibold">6-digit OTP</span>{" "}
                  sent to
                </p>
                <p className="text-sm font-semibold text-teal-600 text-center mt-1">
                  {formData.emailAddress}
                </p>
              </div>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
                }}
                className="w-full text-center text-2xl font-bold tracking-[0.5em] bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                placeholder="000000"
              />

              <button
                onClick={handleVerifyOtp}
                disabled={verifyingOtp || otp.length !== 6}
                className="w-full py-3.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
              >
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>

              {!otpVerified && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="w-full text-sm text-teal-500 font-semibold hover:text-teal-600 hover:underline disabled:opacity-50 transition-colors"
                >
                  {loading ? "Resending..." : "Didn't receive? Resend OTP"}
                </button>
              )}

              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                ← Back to form
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">or sign up using</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="w-full py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-teal-500 font-semibold hover:text-teal-600 hover:underline transition-colors"
            >
              Login instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

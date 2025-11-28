// // "use client";
// // import { useState , useEffect } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// // import toast from "react-hot-toast";

// // const Login = () => {
// //   const [formData, setFormData] = useState({
// //     loginId: "", // can be email or mobile
// //     password: "",
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();

// //   // useEffect(() => {
// //   //   const token = localStorage.getItem("authToken");
// //   //   if (token) {
// //   //     // Prevent coming back to login page
// //   //     router.replace("/dashboard");
// //   //   }
// //   // }, []);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //  const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   // ✅ Validate empty inputs first
// //   if (!formData.loginId.trim()) {
// //     toast.error("Please enter your Email or Mobile Number", {
// //       id: "login-error",
// //       duration: 2000,
// //     });
// //     return;
// //   }

// //   if (!formData.password.trim()) {
// //     toast.error("Please enter your Password", {
// //       id: "login-error",
// //       duration: 2000,
// //     });
// //     return;
// //   }

// //   setLoading(true);

// //   try {
// //     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.loginId);
// //     const isMobile = /^[0-9]{10}$/.test(formData.loginId);

// //     const payload = { password: formData.password };

// //     if (isEmail) {
// //       payload.emailAddress = formData.loginId;
// //     } else if (isMobile) {
// //       payload.mobileNumber = formData.loginId;
// //     } else {
// //       toast.error("Please enter a valid email or 10-digit mobile number", {
// //         id: "login-error",
// //         duration: 2000,
// //       });
// //       setLoading(false);
// //       return;
// //     }

// //     // ✅ Make API call
// //     const response = await axios.post(
// //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/login`,
// //       payload
// //     );

// //     // ✅ Check if API actually returned a valid token
// //     const token = response?.data?.token;

// //     if (!token || typeof token !== "string" || token.trim() === "") {
// //       toast.error("Invalid email or password", {
// //         id: "login-error",
// //         duration: 2000,
// //       });
// //       setLoading(false);
// //       return;
// //     }

// //     // ✅ Everything passed — save and redirect
// //     localStorage.clear();
// //     localStorage.setItem("authToken", token);

// //     toast.success("✅ Login Successfully!", {
// //       id: "login-success",
// //       duration: 3000,
// //     });

// //     router.replace("/dashboard");
// //   } catch (err) {
// //     // ✅ Handle backend errors properly (like 401, 404, etc.)
// //     const errorMessage =
// //       err.response?.data?.message ||
// //       (err.response?.status === 401
// //         ? "Invalid email or password"
// //         : "Failed to login. Please try again.");

// //     toast.error(errorMessage, {
// //       id: "login-error",
// //       duration: 2500,
// //     });
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   return (
// //     <div className="flex flex-wrap bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] min-h-screen">
// //       {/* Left Section */}
// //       <div className="hidden md:flex md:w-[40%] bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] items-center justify-center">
// //         <Image
// //           src="/neet720_logo.jpg"
// //           alt="Neet720 Logo"
// //           width={300}
// //           height={200}
// //           className="object-contain"
// //         />
// //       </div>

// //       {/* Right Section */}
// //       <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white p-6 md:rounded-l-3xl">
// //         {/* Logo for Mobile */}
// //         <div className="md:hidden flex justify-center mb-6">
// //           <Image
// //             src="/neet720_logo.jpg"
// //             alt="neet720Logo"
// //             width={160}
// //             height={40}
// //             className="object-contain"
// //           />
// //         </div>

// //         {/* Heading */}
// //         <h2 className="text-center text-2xl md:text-3xl font-bold text-[#45A4CE] mb-1">
// //           Welcome Back
// //         </h2>

// //         <p className="text-center text-xl md:text-3xl mt-2 font-medium mb-6 text-[#45A4CE]">
// //           Login to continue
// //         </p>

// //         <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
// //           {/* Login ID Input */}
// //           <div>
// //             <label
// //               htmlFor="loginId"
// //               className="block text-sm font-semibold text-[#53ADD3] mb-2"
// //             >
// //               Email Address or Mobile Number
// //             </label>
// //             <input
// //               type="text"
// //               name="loginId"
// //               id="loginId"
// //               value={formData.loginId}
// //               onChange={handleChange}
// //               required
// //               className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //               placeholder="Enter your email or mobile number"
// //             />
// //           </div>

// //           {/* Password Input */}
// //           <div className="relative">
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-semibold text-[#53ADD3] mb-2"
// //             >
// //               Password
// //             </label>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               name="password"
// //               id="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               required
// //               className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //               placeholder="Password"
// //             />
// //             <span
// //               onClick={() => setShowPassword((prev) => !prev)}
// //               className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 pt-7 pr-1"
// //             >
// //               {showPassword ? (
// //                 <AiOutlineEye className="text-xl" />
// //               ) : (
// //                 <AiOutlineEyeInvisible className="text-xl" />
// //               )}
// //             </span>
// //           </div>

// //           {/* Forgot Password */}
// //           <div className="flex items-center justify-end md:justify-center">
// //             <div className="text-sm">
// //               <a
// //                 href="#"
// //                 onClick={() => router.push("/forgotpassword")}
// //                 className="font-medium text-[#53ADD3] hover:text-[#3e9ec7]"
// //               >
// //                 Forgot Password?
// //               </a>
// //             </div>
// //           </div>

// //           {/* Login Button */}
// //           <button
// //             type="submit"
// //             className="w-full py-3 bg-[#45A4CE] text-white font-semibold rounded-md hover:bg-[#3e9ec7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
// //           >
// //             {loading ? "Logging in..." : "Log In"}
// //           </button>
// //         </form>

// //         {/* Sign Up Redirect */}
// //         <div className="mt-6 text-center">
// //           <p className="text-sm text-gray-600">
// //             Don’t have an account?{" "}
// //             <a
// //               onClick={() => router.push("/signup")}
// //               className="font-medium text-[#53ADD3] hover:text-[#3e9ec7] cursor-pointer"
// //             >
// //               Sign Up
// //             </a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     loginId: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.loginId.trim()) {
//       toast.error("Please enter your Email or Mobile Number", {
//         id: "login-error",
//         duration: 2000,
//       });
//       return;
//     }

//     if (!formData.password.trim()) {
//       toast.error("Please enter your Password", {
//         id: "login-error",
//         duration: 2000,
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.loginId);
//       const isMobile = /^[0-9]{10}$/.test(formData.loginId);

//       const payload = { password: formData.password };

//       if (isEmail) {
//         payload.emailAddress = formData.loginId;
//       } else if (isMobile) {
//         payload.mobileNumber = formData.loginId;
//       } else {
//         toast.error("Please enter a valid email or 10-digit mobile number", {
//           id: "login-error",
//           duration: 2000,
//         });
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/login`,
//         payload
//       );

//       const token = response?.data?.token;

//       if (!token || typeof token !== "string" || token.trim() === "") {
//         toast.error("Invalid email or password", {
//           id: "login-error",
//           duration: 2000,
//         });
//         setLoading(false);
//         return;
//       }

//       localStorage.clear();
//       localStorage.setItem("authToken", token);

//       toast.success("✅ Login Successfully!", {
//         id: "login-success",
//         duration: 3000,
//       });

//       router.replace("/dashboard");
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message ||
//         (err.response?.status === 401
//           ? "Invalid email or password"
//           : "Failed to login. Please try again.");

//       toast.error(errorMessage, {
//         id: "login-error",
//         duration: 2500,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-wrap bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 min-h-screen relative overflow-hidden">
//       {/* Animated Background Circles */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

//       {/* Left Section */}
//       <div className="hidden md:flex md:w-[40%] items-center justify-center relative z-10">
//         <div className="bg-white/20 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/30">
//           <Image
//             src="/neet720_logo.jpg"
//             alt="Neet720 Logo"
//             width={300}
//             height={200}
//             className="object-contain drop-shadow-2xl"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white/95 backdrop-blur-xl p-8 md:rounded-l-3xl shadow-2xl relative z-10">
//         {/* Logo for Mobile */}
//         <div className="md:hidden flex justify-center mb-8">
//           <div className="bg-gradient-to-br from-teal-400 to-cyan-400 p-4 rounded-2xl shadow-xl">
//             <Image
//               src="/neet720_logo.jpg"
//               alt="neet720Logo"
//               width={160}
//               height={60}
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2 text-center">
//           Welcome Back
//         </h2>

//         <p className="text-gray-600 text-base md:text-lg mb-8 text-center font-medium">
//           Login to continue your journey
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
//           {/* Login ID Input */}
//           <div>
//             <label
//               htmlFor="loginId"
//               className="block text-sm font-bold text-gray-700 mb-2"
//             >
//               Email Address or Mobile Number
//             </label>
//             <div className="relative group">
//               <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//               <input
//                 type="text"
//                 name="loginId"
//                 id="loginId"
//                 value={formData.loginId}
//                 onChange={handleChange}
//                 required
//                 className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all text-gray-900 placeholder:text-gray-400"
//                 placeholder="Enter your email or mobile number"
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-bold text-gray-700 mb-2"
//             >
//               Password
//             </label>
//             <div className="relative group">
//               <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 text-xl group-focus-within:text-teal-500 transition-colors" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 id="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all text-gray-900 placeholder:text-gray-400"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
//               >
//                 {showPassword ? (
//                   <AiOutlineEye size={20} />
//                 ) : (
//                   <AiOutlineEyeInvisible size={20} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Forgot Password */}
//           <div className="flex items-center justify-end">
//             <button
//               type="button"
//               onClick={() => router.push("/forgotpassword")}
//               className="text-sm font-semibold text-teal-500 hover:text-teal-600 hover:underline transition-colors"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-bold text-lg rounded-xl hover:from-teal-500 hover:to-cyan-500 focus:outline-none focus:ring-4 focus:ring-teal-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/40 hover:scale-[1.02] active:scale-[0.98]"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     fill="none"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Logging in...
//               </span>
//             ) : (
//               "Log In"
//             )}
//           </button>
//         </form>

//         {/* Sign Up Redirect */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-600 font-medium">
//             Don't have an account?{" "}
//             <button
//               onClick={() => router.push("/signup")}
//               className="text-teal-500 font-bold hover:text-teal-600 hover:underline transition-colors"
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
//           <svg
//             className="w-4 h-4 text-teal-400"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>Secure login with encrypted connection</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.loginId.trim()) {
      toast.error("Please enter your Email or Mobile Number", {
        id: "login-error",
        duration: 2000,
      });
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Please enter your Password", {
        id: "login-error",
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.loginId);
      const isMobile = /^[0-9]{10}$/.test(formData.loginId);

      const payload = { password: formData.password };

      if (isEmail) {
        payload.emailAddress = formData.loginId;
      } else if (isMobile) {
        payload.mobileNumber = formData.loginId;
      } else {
        toast.error("Please enter a valid email or 10-digit mobile number", {
          id: "login-error",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/login`,
        payload
      );

      const token = response?.data?.token;

      if (!token || typeof token !== "string" || token.trim() === "") {
        toast.error("Invalid email or password", {
          id: "login-error",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      localStorage.clear();
      localStorage.setItem("authToken", token);

      toast.success("✅ Login Successfully!", {
        id: "login-success",
        duration: 3000,
      });

      router.replace("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? "Invalid email or password"
          : "Failed to login. Please try again.");

      toast.error(errorMessage, {
        id: "login-error",
        duration: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
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

             
            {/* <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2  bg-teal-500 text-white text-xs font-semibold rounded-lg hover:bg-teal-600 transition-colors"
            >
              Student dashboard access
            </button> */}
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Login to continue your NEET journey with structured plans, mock
              tests, and an AI coach by your side.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <span className="text-xs text-gray-500">
                  Use your registered email
                </span>
              </div>
              <div className="relative">
                <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                  placeholder="student@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <span className="text-xs text-gray-500">
                  Minimum 8 characters
                </span>
              </div>
              <div className="relative">
                <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <AiOutlineEye size={18} />
                  ) : (
                    <AiOutlineEyeInvisible size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-400 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => router.push("/forgotpassword")}
                className="text-sm text-teal-500 font-semibold hover:text-teal-600 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
            >
              {loading ? "Logging in..." : "Login to continue"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            New to NEET720?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-teal-500 font-semibold hover:text-teal-600 hover:underline transition-colors"
            >
              Create an account
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to NEET720's Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
};

export default Login;

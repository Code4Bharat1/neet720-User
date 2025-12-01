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
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import {
//   AiOutlineEye,
//   AiOutlineEyeInvisible,
//   AiOutlineMail,
//   AiOutlineLock,
// } from "react-icons/ai";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     loginId: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   /** ---------------- GOOGLE LOGIN SCRIPT LOADER ----------------**/
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       window.google?.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleGoogleResponse,
//       });

//       window.google?.accounts.id.renderButton(
//         document.getElementById("googleLoginButton"),
//         {
//           theme: "outline",
//           size: "large",
//           width: "100%",
//         }
//       );
//     };

//     document.body.appendChild(script);
//   }, []);

//   /** ---------------- GOOGLE LOGIN RESPONSE HANDLER ----------------**/
//   const handleGoogleResponse = async (googleResponse) => {
//     try {
//       const backendRes = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/google-login`,
//         {
//           credential: googleResponse.credential,
//         }
//       );

//       const token = backendRes.data.token;
//       localStorage.setItem("authToken", token);

//       toast.success("Login Successful!");
//       router.replace("/dashboard");
//     } catch (error) {
//       console.error(error);
//       toast.error("Google login failed. Try again.");
//     }
//   };

//   /** ---------------- NORMAL LOGIN SUBMIT ----------------**/
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.loginId || !formData.password) {
//       return toast.error("Email/Mobile & Password required");
//     }

//     setLoading(true);

//     try {
//       const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.loginId);
//       const isMobile = /^[0-9]{10}$/.test(formData.loginId);

//       const payload = { password: formData.password };
//       if (isEmail) payload.emailAddress = formData.loginId;
//       else if (isMobile) payload.mobileNumber = formData.loginId;
//       else return toast.error("Invalid email or mobile number");

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/login`,
//         payload
//       );

//       localStorage.setItem("authToken", res.data.token);

//       toast.success("Login Successful!");
//       router.replace("/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         <div className="flex justify-center mb-6">
//           <Image src="/logo.png" width={130} height={130} alt="Logo" />
//         </div>

//         <h2 className="text-2xl font-bold mb-3">Welcome Back</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="text-sm font-semibold">Email or Mobile</label>
//             <div className="relative">
//               <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 name="loginId"
//                 value={formData.loginId}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-3 border rounded-lg bg-gray-50"
//                 placeholder="student@example.com / 9876543210"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-semibold">Password</label>
//             <div className="relative">
//               <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-10 py-3 border rounded-lg bg-gray-50"
//                 placeholder="********"
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible />
//                 ) : (
//                   <AiOutlineEye />
//                 )}
//               </span>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* OR Divider */}
//         <div className="text-center text-gray-500 my-4 text-sm">OR</div>

//         {/* GOOGLE LOGIN BUTTON */}
//         <div id="googleLoginButton"></div>

//         <p className="text-center text-sm mt-4">
//           New user?{" "}
//           <span
//             className="text-teal-500 cursor-pointer"
//             onClick={() => router.push("/signup")}
//           >
//             Create an account
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }





"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /** ---------------- GOOGLE LOGIN SCRIPT LOADER ---------------- **/
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google?.accounts.id.renderButton(
        document.getElementById("googleLoginButton"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    };

    document.body.appendChild(script);
  }, []);

  /** ---------------- GOOGLE LOGIN RESPONSE HANDLER ---------------- **/
  const handleGoogleResponse = async (googleResponse) => {
    try {
      const backendRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/google-login`,
        { credential: googleResponse.credential }
      );

      const token = backendRes.data.token;
      localStorage.setItem("authToken", token);

      toast.success("Login Successful!");
      router.replace("/dashboard");
    } catch (error) {
      toast.error("Google login failed. Try again.");
    }
  };

  /** ---------------- NORMAL LOGIN SUBMIT ---------------- **/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.loginId.trim()) return toast.error("Email/Mobile required");
    if (!formData.password.trim()) return toast.error("Password required");

    setLoading(true);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.loginId);
      const isMobile = /^[0-9]{10}$/.test(formData.loginId);

      const payload = { password: formData.password };

      if (isEmail) payload.emailAddress = formData.loginId;
      else if (isMobile) payload.mobileNumber = formData.loginId;
      else return toast.error("Invalid email or mobile number");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/login`,
        payload
      );

      localStorage.setItem("authToken", res.data.token);

      toast.success("Login Successful!");
      router.replace("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Logo"
              className="object-cover"
            />
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Login to continue your NEET journey with structured plans, mock
              tests, and your AI coach.
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
                  placeholder="student@example.com / 9876543210"
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

          {/* Google Login UI + Script Button */}
          <div id="googleLoginButton" className="w-full"></div>

          <p className="text-center text-sm text-gray-600 mt-6">
            New to NEET720?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-teal-500 font-semibold hover:text-teal-600 hover:underline cursor-pointer"
            >
              Create an account
            </span>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to NEET720's Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

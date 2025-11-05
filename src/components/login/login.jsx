"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    loginId: "", // can be email or mobile
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.error("Please enter a valid email or 10-digit mobile number");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/login`,
        payload
      );

      // ✅ Clear local storage on login
      localStorage.clear();

      // ✅ Save token after clearing
      localStorage.setItem("authToken", response.data.token);

      toast.success("✅ Login Successfully!", { duration: 4000 });
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to login.", {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex md:w-[40%] bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] items-center justify-center">
        <Image
          src="/neet720_logo.jpg"
          alt="Neet720 Logo"
          width={300}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white p-6 md:rounded-l-3xl">
        {/* Logo for Mobile */}
        <div className="md:hidden flex justify-center mb-6">
          <Image
            src="/neet720_logo.jpg"
            alt="Nexcore Logo"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#45A4CE] mb-1">
          Welcome Back
        </h2>

        <p className="text-center text-xl md:text-3xl mt-2 font-medium mb-6 text-[#45A4CE]">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          {/* Login ID Input */}
          <div>
            <label
              htmlFor="loginId"
              className="block text-sm font-semibold text-[#53ADD3] mb-2"
            >
              Email Address or Mobile Number
            </label>
            <input
              type="text"
              name="loginId"
              id="loginId"
              value={formData.loginId}
              onChange={handleChange}
              required
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email or mobile number"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#53ADD3] mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 pt-7 pr-1"
            >
              {showPassword ? (
                <AiOutlineEye className="text-xl" />
              ) : (
                <AiOutlineEyeInvisible className="text-xl" />
              )}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-end md:justify-center">
            <div className="text-sm">
              <a
                href="#"
                onClick={() => router.push("/forgotpassword")}
                className="font-medium text-[#53ADD3] hover:text-[#3e9ec7]"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#45A4CE] text-white font-semibold rounded-md hover:bg-[#3e9ec7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Sign Up Redirect */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              onClick={() => router.push("/signup")}
              className="font-medium text-[#53ADD3] hover:text-[#3e9ec7] cursor-pointer"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

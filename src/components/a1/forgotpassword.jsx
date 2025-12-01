'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePhone,
  AiOutlineKey,
} from 'react-icons/ai';

const ForgotPassword = () => {
  const router = useRouter();

  // Form state
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
    return regex.test(password);
  };

  // Step 1: Send mobile number to request OTP
  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!mobileNumber) {
      toast.error('Please enter your mobile number.');
      setIsLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/students/forgot-password`, {
        mobileNumber,
      });

      if (response.status === 200) {
        toast.success('OTP sent to your WhatsApp successfully!');
        setIsOtpSent(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error('Please fill out all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (!isStrongPassword(newPassword)) {
      toast.error(
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character.'
      );
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/students/reset-password`, {
        mobileNumber,
        otp,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Password reset successfully!');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password. Please try again.');
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

          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isOtpSent ? 'Reset Your Password' : 'Forgot Password?'}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {isOtpSent
                ? 'Enter the OTP sent to your WhatsApp and create a new password.'
                : 'Enter your registered mobile number to receive an OTP via WhatsApp.'}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={isOtpSent ? handleResetPassword : handleMobileSubmit}
            className="space-y-5"
          >
            {/* Mobile Number Field */}
            {!isOtpSent && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Mobile Number
                  </label>
                  <span className="text-xs text-gray-500">10 digits</span>
                </div>
                <div className="relative">
                  <AiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={10}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            )}

            {/* OTP Field */}
            {isOtpSent && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      OTP
                    </label>
                    <span className="text-xs text-gray-500">6 digits</span>
                  </div>
                  <div className="relative">
                    <AiOutlineKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                </div>

                {/* New Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      New Password
                    </label>
                    <span className="text-xs text-gray-500">Strong password</span>
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <AiOutlineEye size={18} />
                      ) : (
                        <AiOutlineEyeInvisible size={18} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    Min 8 characters with uppercase, lowercase, number & special character
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <span className="text-xs text-gray-500">Match above</span>
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEye size={18} />
                      ) : (
                        <AiOutlineEyeInvisible size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
            >
              {isLoading
                ? 'Processing...'
                : isOtpSent
                ? 'Reset Password'
                : 'Send OTP'}
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{' '}
            <span
              onClick={() => router.push('/login')}
              className="text-teal-500 font-semibold hover:text-teal-600 hover:underline cursor-pointer"
            >
              Back to Login
            </span>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to NEET720's Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
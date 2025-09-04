"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Sidebar from "@/components/layout/sidebar/sidebar";
import NavBar from "@/components/layout/navbar/navbar";
import Head from "next/head";
import BottomNavbar from "@/components/layout/bottomnav/bottomnav";
import ToggleBar from "@/components/layout/togglebar/togglebar";
import { X, Calendar, User, Clock, Eye, ChevronRight } from "lucide-react";

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return setError("Auth token missing");

      const decoded = jwtDecode(token);
      const studentId = decoded?.id;
      if (!studentId) return setError("Invalid token or missing studentId");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notice-for-students`,
        { studentId }
      );

      setNotices(res.data.notices);
      console.log(res.data.notices, res.data.adminId, studentId);
      setAdminId(res.data.adminId);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const getNoticeStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start)
      return {
        status: "upcoming",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: "⏳",
      };
    if (now > end)
      return {
        status: "expired",
        color: "bg-gray-100 text-gray-600 border-gray-200",
        icon: "⏰",
      };
    return {
      status: "active",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: "✅",
    };
  };

  const openModal = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedNotice(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (status) => {
    switch (status) {
      case "active":
        return "from-emerald-500 to-green-600";
      case "upcoming":
        return "from-amber-500 to-orange-600";
      case "expired":
        return "from-gray-400 to-gray-500";
      default:
        return "from-blue-500 to-indigo-600";
    }
  };

  return (
    <>
      <Head>
        <title>
          NEET720 Notice Board – Latest NEET Updates, News & Announcements
        </title>
        <meta
          name="description"
          content="Stay updated with NEET720's official notice board. Get the latest NEET exam news, updates, announcements, and important dates in one place."
        />
        <meta
          name="keywords"
          content="NEET720 notice board, NEET updates, NEET latest news, NEET announcements, NEET important dates, NEET news 2025, NEET official notice"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:title"
          content="NEET720 Notice Board – Latest NEET Updates, News & Announcements"
        />
        <meta
          property="og:description"
          content="Access NEET720's notice board for real-time NEET updates, exam notifications, and announcements for 2025 and beyond."
        />
        <meta
          property="og:image"
          content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/noticeboard.png"
        />
        <meta property="og:url" content="https://neet720.com/notice" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NEET720 Notice Board – Latest NEET Updates, News & Announcements"
        />
        <meta
          name="twitter:description"
          content="Track all the latest NEET news, circulars, and key updates directly from NEET720's official notice board."
        />
        <meta
          name="twitter:image"
          content="https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/noticeboard.png"
        />

        <link rel="canonical" href="https://neet720.com/notice" />
      </Head>
      <ToggleBar />
      <div className="md:flex min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Sidebar />
        <BottomNavbar />
        <div className="w-full md:w-5/6 flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-5xl font-bold mb-3 flex items-center gap-3">
                        📢 <span>Notice Board</span>
                      </h1>
                      <p className="text-blue-100 text-xl">
                        Stay updated with the latest announcements
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-1">
                            {notices.length}
                          </div>
                          <div className="text-sm text-blue-100">
                            Total Notices
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                      <span className="text-xl text-gray-600 font-medium">
                        Loading notices...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="text-red-500 text-4xl">⚠️</div>
                    <div>
                      <h3 className="text-red-800 font-bold text-lg">
                        No Notices Yet
                      </h3>
                      <p className="text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Info */}
              {!loading && adminId && (
                <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-lg">
                      Posted by Teacher
                    </span>
                  </div>
                </div>
              )}

              {/* Notices Grid */}
              {!loading && notices.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {notices.map((notice, index) => {
                    const { status, color, icon } = getNoticeStatus(
                      notice.noticeStartDate,
                      notice.noticeEndDate
                    );

                    return (
                      <div
                        key={notice.id}
                        className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 cursor-pointer"
                        style={{
                          animationDelay: `${index * 150}ms`,
                          animation: "fadeInUp 0.8s ease-out forwards",
                        }}
                        onClick={() => openModal(notice)}
                      >
                        {/* Gradient Border Effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${getPriorityColor(
                            status
                          )} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
                        <div className="relative bg-white m-1 rounded-3xl p-8 h-full">
                          {/* Status Badge and Read More */}
                          <div className="flex justify-between items-start mb-6">
                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${color} capitalize shadow-sm`}
                            >
                              <span>{icon}</span>
                              {status}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>

                          {/* Notice Content */}
                          <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                              {notice.noticeTitle || "📌 Untitled Notice"}
                            </h2>

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                              <div className="flex items-center space-x-3">
                                <span className="text-blue-700 font-semibold">
                                  🎓 Batch:
                                </span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                                  {notice.batchName}
                                </span>
                              </div>
                            </div>

                            <div className="relative">
                              <p className="text-gray-700 leading-relaxed line-clamp-4 text-base">
                                {notice.noticeText}
                              </p>
                              {notice.noticeText &&
                                notice.noticeText.length > 150 && (
                                  <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white via-white to-transparent pl-20">
                                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 ">
                                      Read more{" "}
                                      <ChevronRight className="w-4 h-4" />
                                    </span>
                                  </div>
                                )}
                            </div>

                            {/* Date Range */}
                            <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-100">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span className="font-semibold">Duration:</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                                  <div className="text-gray-500">From</div>
                                  <div className="font-semibold text-gray-800">
                                    {formatDate(notice.noticeStartDate)}
                                  </div>
                                </div>
                                <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                                  <div className="text-gray-500">To</div>
                                  <div className="font-semibold text-gray-800">
                                    {formatDate(notice.noticeEndDate)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Posted Date */}
                            <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Posted</span>
                              </div>
                              <span className="font-medium">
                                {formatDate(notice.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && notices.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-white rounded-3xl p-16 shadow-2xl max-w-lg mx-auto border border-gray-100">
                    <div className="text-8xl mb-6">📭</div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">
                      No Notices Yet
                    </h3>
                    <p className="text-gray-500 text-lg">
                      Check back later for new announcements and updates.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notice Modal */}
        {isModalOpen && selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${getPriorityColor(
                  getNoticeStatus(
                    selectedNotice.noticeStartDate,
                    selectedNotice.noticeEndDate
                  ).status
                )} p-8 text-white`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">
                        {
                          getNoticeStatus(
                            selectedNotice.noticeStartDate,
                            selectedNotice.noticeEndDate
                          ).icon
                        }
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30 capitalize">
                        {
                          getNoticeStatus(
                            selectedNotice.noticeStartDate,
                            selectedNotice.noticeEndDate
                          ).status
                        }
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold leading-tight mb-2">
                      {selectedNotice.noticeTitle || "📌 Untitled Notice"}
                    </h2>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Teacher</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                          🎓 {selectedNotice.batchName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors border border-white/30"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-96">
                <div className="space-y-8">
                  {/* Notice Text */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      📄 <span>Notice Details</span>
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                        {selectedNotice.noticeText}
                      </p>
                    </div>
                  </div>

                  {/* Date Information */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      📅 <span>Important Dates</span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <div className="text-center">
                          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <div className="text-sm text-blue-600 mb-1">
                            Valid From
                          </div>
                          <div className="font-bold text-blue-800">
                            {formatDate(selectedNotice.noticeStartDate)}
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <div className="text-center">
                          <Calendar className="w-8 h-8 text-red-600 mx-auto mb-3" />
                          <div className="text-sm text-red-600 mb-1">
                            Valid Until
                          </div>
                          <div className="font-bold text-red-800">
                            {formatDate(selectedNotice.noticeEndDate)}
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                        <div className="text-center">
                          <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <div className="text-sm text-green-600 mb-1">
                            Posted On
                          </div>
                          <div className="font-bold text-green-800">
                            {formatDateTime(selectedNotice.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-10 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Notice ID: #{selectedNotice.id}
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
};

export default NoticesPage;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   Target, 
//   ClipboardList, 
//   BarChart3, 
//   GraduationCap, 
//   Award, 
//   BookOpen, 
//   Bell, 
//   NotebookText, 
//   BotMessageSquare,
//   Crown,
//   Sparkles
// } from 'lucide-react';
// import { RiGeminiFill } from "react-icons/ri";
// import axios from 'axios';
// import { Layers } from 'lucide-react';
// import { jwtDecode } from 'jwt-decode';
// import { LuNotebookText } from "react-icons/lu";
// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// const Sidebar = ({ isOpen }) => {
//   const pathname = usePathname();
//   const [showPricingModal, setShowPricingModal] = useState(false);

//   const menuItems = [
//     { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'main' },
//     { href: '/goalsetup', activePaths: ['/goalsetup', '/examplan'], icon: Target, label: 'Exam Plan', section: 'main' },
//     { href: '/testselection', icon: ClipboardList, label: 'Test', section: 'main' },
//     { href: '/pasttest', icon: BarChart3, label: 'Result', section: 'main' },
//     { href: '/colleges', icon: GraduationCap, label: 'Colleges', section: 'main' },
//     { href: '/credits', icon: Award, label: 'Scholarship', section: 'main' },
//     { href: '/previousyearquestions', icon: BookOpen, label: 'PYQs', section: 'practice' },
//     { href: '/notice', icon: Bell, label: 'View Notice', section: 'practice' },
//     { href: "/test-series", icon: NotebookText, label: "Test Series", section: 'practice' },
//     { href: '/coachAi', icon: BotMessageSquare, label: 'AI Coach', section: 'practice' }
//   ];

//   const mainItems = menuItems.filter(item => item.section === 'main');
//   const practiceItems = menuItems.filter(item => item.section === 'practice');

//   return (
//     <>
//       <div className="hidden md:block md:w-1/6">
//         <div
//           className={`fixed top-0 left-0 h-screen w-1/6 bg-white transition-transform duration-300 ease-in-out ${
//             isOpen ? 'translate-x-0' : '-translate-x-full'
//           } md:translate-x-0 flex flex-col overflow-y-auto scrollbar-hide shadow-lg border-r border-gray-200`}
//           style={{ 
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none'
//           }}
//         >
//           {/* Logo Section */}
//           <div className="flex items-center justify-center px-4 py-6 flex-shrink-0 border-b border-gray-200">
//             <Image
//               src="/neet720_logo.jpg"
//               className="object-cover w-40 h-20 rounded-lg"
//               alt="Neet720 Logo"
//               width={160}
//               height={40}
//             />
//           </div>

//           {/* Menu Items */}
//           <nav 
//             className="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-hide"
//             style={{ 
//               scrollbarWidth: 'none',
//               msOverflowStyle: 'none'
//             }}
//           >
//             {/* Main Section */}
//             <div>
//               <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
//                 Main
//               </p>
//               <div className="space-y-1.5">
//                 {mainItems.map(({ href, icon: Icon, label, activePaths }) => {
//                   const isActive = pathname === href || (activePaths && activePaths.includes(pathname));
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
//                         isActive
//                           ? 'bg-teal-400 shadow-md text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Icon 
//                         className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}
//                       />
//                       <span className="font-semibold text-sm truncate">{label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Practice & Updates Section */}
//             <div>
//               <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
//                 Practice & Updates
//               </p>
//               <div className="space-y-1.5">
//                 {practiceItems.map(({ href, icon: Icon, label }) => {
//                   const isActive = pathname === href;
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
//                         isActive
//                           ? 'bg-teal-400 shadow-md text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Icon 
//                         className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}
//                       />
//                       <span className="font-semibold text-sm truncate">{label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Upgrade to Pro Section */}
//             <div className="pt-4">
//               <div className="mx-3 relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 p-5 shadow-lg">
//                 {/* Decorative Elements */}
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
//                 <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                
//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-3">
//                     <Crown className="w-6 h-6 text-white" />
//                   </div>
                  
//                   {/* Text */}
//                   <h3 className="text-white font-bold text-base mb-1.5">
//                     Upgrade to Pro
//                   </h3>
//                   <p className="text-white/90 text-xs mb-4 leading-relaxed">
//                     Unlock all features and boost your preparation
//                   </p>
                  
//                   {/* Button */}
//                   <button 
//                     onClick={() => setShowPricingModal(true)}
//                     className="w-full bg-white text-teal-600 font-semibold text-sm py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
//                   >
//                     <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                     <span>Get Pro Now</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>

//         <style jsx global>{`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}</style>
//       </div>

//       {/* Pricing Modal */}
//       {showPricingModal && (
//         <div 
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={() => setShowPricingModal(false)}
//         >
//           <div 
//             className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setShowPricingModal(false)}
//               className="float-right text-gray-400 hover:text-gray-600 text-2xl leading-none"
//             >
//               ×
//             </button>

//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl mx-auto mb-4">
//                 <Crown className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 Choose Your Plan
//               </h2>
//               <p className="text-sm text-gray-600">
//                 Select the best plan for your NEET preparation
//               </p>
//             </div>

//             {/* Pricing Options */}
//             <div className="space-y-4">
//               {/* Yearly Plan */}
//               <a
//                 href="https://rzp.io/rzp/83RBILJ"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block p-5 rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 hover:shadow-lg transition-all group"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-lg font-bold text-gray-900">Yearly Plan</h3>
//                       <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                         Save 57%
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-600">Best value for money</p>
//                   </div>
//                   <Sparkles className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
//                 </div>
                
//                 <div className="flex items-baseline gap-2 mb-3">
//                   <span className="text-sm line-through text-gray-500">₹4,188</span>
//                   <span className="text-3xl font-bold text-gray-900">₹1,825</span>
//                   <span className="text-sm text-gray-600">/year</span>
//                 </div>

//                 <div className="flex items-center justify-center bg-teal-600 text-white font-semibold py-2.5 rounded-lg group-hover:bg-teal-700 transition-colors">
//                   Get Started
//                 </div>
//               </a>

//               {/* Monthly Plan */}
//               <a
//                 href="https://rzp.io/rzp/9Dz0oN7"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block p-5 rounded-2xl border-2 border-gray-200 hover:border-teal-300 bg-white hover:shadow-lg transition-all group"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly Plan</h3>
//                     <p className="text-xs text-gray-600">Flexible monthly billing</p>
//                   </div>
//                   <Crown className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:scale-110 transition-all" />
//                 </div>
                
//                 <div className="flex items-baseline gap-2 mb-3">
//                   <span className="text-3xl font-bold text-gray-900">₹349</span>
//                   <span className="text-sm text-gray-600">/month</span>
//                 </div>

//                 <div className="flex items-center justify-center bg-gray-100 text-gray-900 font-semibold py-2.5 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">
//                   Get Started
//                 </div>
//               </a>
//             </div>

//             {/* Features List */}
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <p className="text-xs font-semibold text-gray-500 mb-3">All plans include:</p>
//               <ul className="space-y-2 text-xs text-gray-600">
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
//                   Unlimited PYQs & Test Library
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
//                   AI Analytics & 24/7 Chatbot
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
//                   College Predictor & Mock Tests
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

//-------------------------------------------------------

//   // sidebar.jsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   Target, 
//   ClipboardList, 
//   BarChart3, 
//   GraduationCap, 
//   Award, 
//   BookOpen, 
//   Bell, 
//   NotebookText, 
//   BotMessageSquare,
//   Crown,
//   Sparkles
// } from 'lucide-react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { LuNotebookText } from "react-icons/lu";

// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// const Sidebar = ({ isOpen }) => {
//   const pathname = usePathname();
//   const [showPricingModal, setShowPricingModal] = useState(false);

//   // ADD STATES FOR ADMIN DATA
//   const [instituteName, setInstituteName] = useState("");
//   const [instituteLogo, setInstituteLogo] = useState("");

//   useEffect(() => {
//     const fetchAdminDetails = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const addedByAdminId = decoded?.addedByAdminId;

//         if (!addedByAdminId) return;

//         // FETCH ADMIN INFO
//         const res = await axios.get(
//           `${apiBaseUrl}/superadmin/getadmin/${addedByAdminId}`
//         );

//         const adminData = res.data?.data;

//         console.log(adminData);

//         if (adminData) {
//           setInstituteName(adminData.instituteName || "");
//           setInstituteLogo(adminData.logo || "");
//         }

//       } catch (err) {
//         console.log("Error fetching admin details for student:", err.message);
//       }
//     };

//     fetchAdminDetails();
//   }, []);

//   const menuItems = [
//     { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'main' },
//     { href: '/goalsetup', activePaths: ['/goalsetup', '/examplan'], icon: Target, label: 'Exam Plan', section: 'main' },
//     { href: '/testselection', icon: ClipboardList, label: 'Test', section: 'main' },
//     { href: '/pasttest', icon: BarChart3, label: 'Result', section: 'main' },
//     { href: '/colleges', icon: GraduationCap, label: 'Colleges', section: 'main' },
//     { href: '/credits', icon: Award, label: 'Scholarship', section: 'main' },
//     { href: '/previousyearquestions', icon: BookOpen, label: 'PYQs', section: 'practice' },
//     { href: '/notice', icon: Bell, label: 'View Notice', section: 'practice' },
//     { href: "/test-series", icon: NotebookText, label: "Test Series", section: 'practice' },
//     { href: '/coachAi', icon: BotMessageSquare, label: 'AI Coach', section: 'practice' }
//   ];

//   const mainItems = menuItems.filter(item => item.section === 'main');
//   const practiceItems = menuItems.filter(item => item.section === 'practice');

//   return (
//     <>
//       <div className="hidden md:block md:w-1/6">
//         <div
//           className={`fixed top-0 left-0 h-screen w-1/6 bg-white transition-transform duration-300 ease-in-out ${
//             isOpen ? 'translate-x-0' : '-translate-x-full'
//           } md:translate-x-0 flex flex-col overflow-y-auto scrollbar-hide shadow-lg border-r border-gray-200`}
//         >
          
//           {/* LOGO + INSTITUTE NAME */}
//           <div className="flex flex-col items-center justify-center px-4 py-6 border-b border-gray-200">

//             {/* LOGO */}
//             <img
//               src={
//                 instituteLogo
//                   ? `${apiBaseUrl.replace("/api", "")}${instituteLogo}`
//                   : "/neet720_logo.jpg"
//               }
//               className="object-cover w-40 h-20 rounded-lg shadow"
//               alt="Institute Logo"
//             />

//             {/* INSTITUTE NAME */}
//             <p className="mt-2 text-[12px] font-semibold text-gray-700 text-center">
//               {instituteName || "Institute Name"}
//             </p>
//           </div>

//           {/* MENU ITEMS */}
//           <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-hide">

//             {/* MAIN SECTION */}
//             <div>
//               <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
//                 Main
//               </p>
//               <div className="space-y-1.5">
//                 {mainItems.map(({ href, icon: Icon, label, activePaths }) => {
//                   const isActive = pathname === href || (activePaths && activePaths.includes(pathname));
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
//                         isActive
//                           ? 'bg-teal-400 shadow-md text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Icon className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`} />
//                       <span className="font-semibold text-sm truncate">{label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* PRACTICE SECTION */}
//             <div>
//               <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
//                 Practice & Updates
//               </p>
//               <div className="space-y-1.5">
//                 {practiceItems.map(({ href, icon: Icon, label }) => {
//                   const isActive = pathname === href;
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
//                         isActive
//                           ? 'bg-teal-400 shadow-md text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Icon className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`} />
//                       <span className="font-semibold text-sm truncate">{label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* UPGRADE BOX */}
//             <div className="pt-4">
//               <div className="mx-3 relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 p-5 shadow-lg">

//                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
//                 <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

//                 <div className="relative z-10">
//                   <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-3">
//                     <Crown className="w-6 h-6 text-white" />
//                   </div>
                  
//                   <h3 className="text-white font-bold text-base mb-1.5">Upgrade to Pro</h3>
//                   <p className="text-white/90 text-xs mb-4 leading-relaxed">
//                     Unlock all features and boost your preparation
//                   </p>

//                   <button 
//                     onClick={() => setShowPricingModal(true)}
//                     className="w-full bg-white text-teal-600 font-semibold text-sm py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
//                   >
//                     <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                     <span>Get Pro Now</span>
//                   </button>
//                 </div>

//               </div>
//             </div>

//           </nav>
//         </div>

//         <style jsx global>{`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}</style>
//       </div>

//       {/* PRICING MODAL */}
//       {showPricingModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={() => setShowPricingModal(false)}
//         >
//           {/* Modal content unchanged */}
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;


///----------------------------------04



// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import {
//   LayoutDashboard,
//   Target,
//   ClipboardList,
//   BarChart3,
//   GraduationCap,
//   Award,
//   BookOpen,
//   Bell,
//   NotebookText,
//   BotMessageSquare,
//   Crown,
//   Sparkles
// } from 'lucide-react';

// import axios from 'axios';
// import Script from 'next/script';
// import { jwtDecode } from 'jwt-decode';

// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// const Sidebar = ({ isOpen }) => {
//   const pathname = usePathname();

//   const [showPricingModal, setShowPricingModal] = useState(false);
//   const [isPublicStudent, setIsPublicStudent] = useState(false);
//   const [freeUsageCount, setFreeUsageCount] = useState(2);

//   const [instituteName, setInstituteName] = useState("");
//   const [instituteLogo, setInstituteLogo] = useState("");

//   // ------------------------------
//   // CHECK PUBLIC STUDENT
//   // ------------------------------
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) return;

//     const decoded = jwtDecode(token);
//     if (!decoded?.addedByAdminId) {
//       setIsPublicStudent(true);
//     }
//   }, []);

//   // ------------------------------
//   // FETCH freeUsageCount
//   // ------------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) return;

//         const res = await axios.get(`${apiBaseUrl}/students/getdata`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setFreeUsageCount(res.data.freeUsageCount);
//       } catch (err) {
//         console.log("Student data fetch error:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // ------------------------------
//   // FETCH ADMIN INFO
//   // ------------------------------
//   useEffect(() => {
//     const fetchAdminDetails = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const addedByAdminId = decoded?.addedByAdminId;

//         if (!addedByAdminId) return;

//         const res = await axios.get(
//           `${apiBaseUrl}/superadmin/getadmin/${addedByAdminId}`
//         );

//         const adminData = res.data?.data;

//         if (adminData) {
//           setInstituteName(adminData.instituteName || "");
//           setInstituteLogo(adminData.logo || "");
//         }
//       } catch (err) {
//         console.log("Admin fetch error:", err);
//       }
//     };
//     fetchAdminDetails();
//   }, []);

//   // ------------------------------
//   // UPGRADE HANDLER
//   // ------------------------------
//   const handleUpgradeClick = async (planType) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const decoded = jwtDecode(token);

//       const signupData = {
//         name: decoded.name || "Student",
//         email: decoded.email,
//         phone: decoded.mobile,
//         planType,
//       };

//       const { data } = await axios.post(
//         `${apiBaseUrl}/payment/create-order`,
//         signupData
//       );

//       openRazorpay(data, signupData);
//     } catch (err) {
//       console.log("Upgrade Error:", err);
//     }
//   };

//   // ------------------------------
//   // RAZORPAY CHECKOUT
//   // ------------------------------
//   const openRazorpay = (orderData, signupData) => {
//     const options = {
//       key: orderData.key,
//       amount: orderData.amount,
//       currency: orderData.currency,
//       name: "Neet720 Upgrade",
//       description: "Unlock unlimited access",
//       order_id: orderData.orderId,

//       handler: function (response) {
//         verifyPayment(response, signupData);
//       },

//       prefill: {
//         name: signupData.name,
//         email: signupData.email,
//         contact: signupData.phone,
//       },
//       theme: { color: "#00bfa5" },
//     };

//     const razor = new window.Razorpay(options);
//     razor.open();
//   };

//   // ------------------------------
//   // VERIFY PAYMENT
//   // ------------------------------
//   const verifyPayment = async (paymentRes, signupData) => {
//     try {
//       const response = await axios.post(
//         `${apiBaseUrl}/payment/verify-payment`,
//         {
//           razorpay_order_id: paymentRes.razorpay_order_id,
//           razorpay_payment_id: paymentRes.razorpay_payment_id,
//           razorpay_signature: paymentRes.razorpay_signature,
//           signupData,
//         }
//       );

//       localStorage.setItem("authToken", response.data.token);

//       alert("🎉 Payment Successful! You are now a PRO user.");
//       window.location.reload();
//     } catch (err) {
//       console.log("Payment verify error:", err);
//       alert("Payment verification failed.");
//     }
//   };

//   // ------------------------------
//   // MENU ITEMS
//   // ------------------------------
//   const menuItems = [
//     { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'main' },
//     { href: '/goalsetup', activePaths: ['/goalsetup', '/examplan'], icon: Target, label: 'Exam Plan', section: 'main' },
//     { href: '/testselection', icon: ClipboardList, label: 'Test', section: 'main' },
//     { href: '/pasttest', icon: BarChart3, label: 'Result', section: 'main' },
//     { href: '/colleges', icon: GraduationCap, label: 'Colleges', section: 'main' },
//     { href: '/credits', icon: Award, label: 'Scholarship', section: 'main' },

//     { href: '/previousyearquestions', icon: BookOpen, label: 'PYQs', section: 'practice' },
//     { href: '/notice', icon: Bell, label: 'View Notice', section: 'practice' },
//     { href: '/test-series', icon: NotebookText, label: 'Test Series', section: 'practice' },
//     { href: '/coachAi', icon: BotMessageSquare, label: 'AI Coach', section: 'practice' }
//   ];

//   const mainItems = menuItems.filter(item => item.section === 'main');
//   const practiceItems = menuItems.filter(item => item.section === 'practice');

//   const hideForPublic = ['/notice', '/test-series', '/credits'];
//   const lockedForPublic = ['/goalsetup', '/previousyearquestions', '/coachAi'];

//   return (
//     <>
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />

//       <div className="hidden md:block md:w-1/6">
//         <div
//           className={`fixed top-0 left-0 h-screen w-1/6 bg-white transition-transform duration-300 
//             ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//             md:translate-x-0 flex flex-col overflow-y-auto scrollbar-hide shadow-lg border-r border-gray-200`}
//         >

//           {/* LOGO SECTION */}
//           <div className="flex flex-col items-center justify-center px-4 py-6 border-b border-gray-200">

//             <img
//               src={
//                 instituteLogo
//                   ? `${apiBaseUrl.replace("/api", "")}${instituteLogo}`
//                   : "/neet720_logo.jpg"
//               }
//               className="object-cover w-40 h-20 rounded-lg shadow"
//               alt="Institute Logo"
//             />

//             <p className="mt-2 text-[12px] font-semibold text-gray-700 text-center">
//               {instituteName || "Institute Name"}
//             </p>
//           </div>

//           {/* NAV */}
//           <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-hide">

//             {/* MAIN SECTION */}
//             <div>
//               <p className="px-3 mb-3 text-[11px] text-gray-500 tracking-wider uppercase">Main</p>

//               <div className="space-y-1.5">
//                 {mainItems.map(({ href, icon: Icon, label, activePaths }) => {
//                   if (isPublicStudent && hideForPublic.includes(href)) return null;

//                   const isActive = pathname === href || (activePaths && activePaths.includes(pathname));
//                   const isLocked = isPublicStudent && lockedForPublic.includes(href);

//                   const isTestLocked =
//                     isPublicStudent &&
//                     href === '/testselection' ||
//                     freeUsageCount <= 0;

//                   const handleClick = (e) => {
//                     if (isLocked || isTestLocked) {
//                       e.preventDefault();
//                       setShowPricingModal(true);
//                     }
//                   };

//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       onClick={handleClick}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl relative
//                         ${isActive ? 'bg-teal-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
//                         ${(isLocked || isTestLocked) && 'opacity-60 cursor-not-allowed'}
//                       `}
//                     >
//                       <Icon className="text-lg" />
//                       <span className="font-semibold text-sm">{label}</span>

//                       {(isLocked || isTestLocked) && (
//                         <span className="absolute right-3 text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-600">
//                           🔒 Locked
//                         </span>
//                       )}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* PRACTICE SECTION */}
//             <div>
//               <p className="px-3 mb-3 text-[11px] text-gray-500 tracking-wider uppercase">
//                 Practice & Updates
//               </p>

//               <div className="space-y-1.5">
//                 {practiceItems.map(({ href, icon: Icon, label }) => {
//                   if (isPublicStudent && hideForPublic.includes(href)) return null;

//                   const isActive = pathname === href;
//                   const isLocked = isPublicStudent && lockedForPublic.includes(href);

//                   const handleClick = (e) => {
//                     if (isLocked) {
//                       e.preventDefault();
//                       setShowPricingModal(true);
//                     }
//                   };

//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       onClick={handleClick}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl relative
//                         ${isActive ? 'bg-teal-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
//                         ${isLocked && 'opacity-60 cursor-not-allowed'}
//                       `}
//                     >
//                       <Icon className="text-lg" />
//                       <span className="font-semibold text-sm">{label}</span>

//                       {isLocked && (
//                         <span className="absolute right-3 text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-600">
//                           🔒 Locked
//                         </span>
//                       )}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* UPGRADE BOX */}
           

//             {/* UPGRADE BOX (only for public students) */}
// {isPublicStudent && (
//   <div className="pt-4">
//     <div className="mx-3 p-5 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 shadow-lg relative overflow-hidden">

//       <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
//       <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

//       <div className="relative z-10">
//         <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
//           <Crown className="w-6 h-6 text-white" />
//         </div>

//         <h3 className="text-white font-bold text-base mb-1.5">Upgrade to Pro</h3>
//         <p className="text-white/90 text-xs mb-4">
//           Unlock all features and boost your preparation
//         </p>

//         <button
//           onClick={() => setShowPricingModal(true)}
//           className="w-full bg-white text-teal-600 font-semibold py-2.5 rounded-lg shadow-md hover:bg-gray-50 flex items-center justify-center gap-2"
//         >
//           <Sparkles className="w-4 h-4" />
//           <span>Get Pro Now</span>
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//           </nav>
//         </div>
//       </div>

//       {/* UPGRADE MODAL */}
//       {showPricingModal && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={() => setShowPricingModal(false)}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close */}
//             <button
//               onClick={() => setShowPricingModal(false)}
//               className="absolute top-3 right-3 text-gray-500 text-xl"
//             >
//               ✖
//             </button>

//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Upgrade to Pro</h2>
//             <p className="text-center text-gray-500 mb-6 text-sm">
//               Unlock unlimited tests & premium features
//             </p>

//             {/* Monthly */}
//             <div className="border rounded-xl p-4 mb-4 hover:border-teal-500 transition">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold text-lg">Monthly Plan</h3>
//                   <p className="text-gray-500 text-sm">Best for quick revision</p>
//                 </div>
//                 <strong className="text-xl font-bold text-teal-600">₹499</strong>
//               </div>

//               <button
//                 onClick={() => handleUpgradeClick("month")}
//                 className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
//               >
//                 Buy Monthly Plan
//               </button>
//             </div>

//             {/* Yearly */}
//             <div className="border rounded-xl p-4 bg-gradient-to-r from-teal-50 to-emerald-50 hover:border-teal-500 transition relative">
//               <span className="absolute top-2 right-3 bg-teal-500 text-white px-2 py-1 text-xs rounded-md">
//                 ⭐ BEST VALUE
//               </span>

//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold text-lg">Yearly Plan</h3>
//                   <p className="text-gray-500 text-sm">Save 60% annually</p>
//                 </div>
//                 <strong className="text-xl font-bold text-teal-600">₹4999</strong>
//               </div>

//               <button
//                 onClick={() => handleUpgradeClick("year")}
//                 className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
//               >
//                 Buy Yearly Plan
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//       {/* ANIMATION CSS */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;








/////------------------------------------------



'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutDashboard,
  Target,
  ClipboardList,
  BarChart3,
  GraduationCap,
  Award,
  BookOpen,
  Bell,
  NotebookText,
  BotMessageSquare,
  Crown,
  Sparkles
} from 'lucide-react';

import axios from 'axios';
import Script from 'next/script';
import { jwtDecode } from 'jwt-decode';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Sidebar = ({ isOpen }) => {
  const pathname = usePathname();

  const [showPricingModal, setShowPricingModal] = useState(false);

  // ✅ DEFAULT STATE
  const [isPublicStudent, setIsPublicStudent] = useState(true);

const [isAdminStudent, setIsAdminStudent] = useState(false); // ✅ ADD THIS

  const [freeUsageCount, setFreeUsageCount] = useState(null);

  const [instituteName, setInstituteName] = useState("");
  const [instituteLogo, setInstituteLogo] = useState("");

  // ✅ ✅ ✅ FIX 1: PUBLIC vs PRO sirf paymentVerified se decide hoga
// useEffect(() => {
//   const token = localStorage.getItem("authToken");
//   if (!token) return;

//   const decoded = jwtDecode(token);
//   console.log("✅ SIDEBAR TOKEN:", decoded);

//   // ✅ CASE 1: ADMIN STUDENT → NEVER LOCK
//   if (decoded?.addedByAdminId) {
//     setIsPublicStudent(false);
//     return;
//   }

//   // ✅ CASE 2: PUBLIC + PAYMENT DONE → PRO (UNLOCK)
//   if (decoded?.paymentVerified === true) {
//     setIsPublicStudent(false);
//     return;
//   }

//   // ✅ CASE 3: PUBLIC + NO PAYMENT → LOCKED USER
//   setIsPublicStudent(true);

// }, []);

useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  const decoded = jwtDecode(token);
  console.log("✅ SIDEBAR TOKEN:", decoded);

  // ✅ ADMIN STUDENT
  if (decoded?.addedByAdminId) {
    setIsAdminStudent(true);      // ✅ ADMIN FLAG
    setIsPublicStudent(false);   // ✅ NEVER LOCK
    return;
  }

  // ✅ PRO USER
  if (decoded?.paymentVerified === true) {
    setIsPublicStudent(false);   // ✅ PRO UNLOCK
    return;
  }

  // ✅ PUBLIC USER
  setIsPublicStudent(true);

}, []);



  // ✅ ✅ ✅ FIX 2: Free usage + PRO unlimited logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get(`${apiBaseUrl}/students/getdata`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("BACKEND COUNT:", res.data.freeUsageCount);

    if (res.data.addedByAdminId) {
  setFreeUsageCount(999); // ✅ ADMIN = UNLIMITED
} 
else if (res.data.paymentVerified === true) {
  setFreeUsageCount(999); // ✅ PRO = UNLIMITED
} 
else {
const backendCount = Number(res.data.freeUsageCount);

setFreeUsageCount(
  Number.isInteger(backendCount) && backendCount >= 0
    ? backendCount
    : 0
);

// ✅ PUBLIC FREE


}

      } catch (err) {
        console.log("Student data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ ✅ ✅ FIX 3: Admin branding only (role change nahi)
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const decoded = jwtDecode(token);
        const addedByAdminId = decoded?.addedByAdminId;
        if (!addedByAdminId) return;

        const res = await axios.get(
          `${apiBaseUrl}/superadmin/getadmin/${addedByAdminId}`
        );

        const adminData = res.data?.data;
        if (adminData) {
          setInstituteName(adminData.instituteName || "");
          setInstituteLogo(adminData.logo || "");
        }
      } catch (err) {
        console.log("Admin fetch error:", err);
      }
    };
    fetchAdminDetails();
  }, []);

  // ✅ ✅ ✅ PAYMENT FLOW
  const handleUpgradeClick = async (planType) => {
    try {
      const token = localStorage.getItem("authToken");
      const decoded = jwtDecode(token);

      const signupData = {
        name: decoded.name || "Student",
        email: decoded.email,
        phone: decoded.mobile,
        planType,
      };

      const { data } = await axios.post(
        `${apiBaseUrl}/payment/create-order`,
        signupData
      );

      openRazorpay(data, signupData);
    } catch (err) {
      console.log("Upgrade Error:", err);
    }
  };

  const openRazorpay = (orderData, signupData) => {
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Neet720 Upgrade",
      description: "Unlock unlimited access",
      order_id: orderData.orderId,

      handler: function (response) {
        verifyPayment(response, signupData);
      },

      prefill: {
        name: signupData.name,
        email: signupData.email,
        contact: signupData.phone,
      },
      theme: { color: "#00bfa5" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  // ✅ ✅ ✅ FIX 4: PAYMENT KE BAAD INSTANT PRO MODE
  const verifyPayment = async (paymentRes, signupData) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/payment/verify-payment`,
        {
          razorpay_order_id: paymentRes.razorpay_order_id,
          razorpay_payment_id: paymentRes.razorpay_payment_id,
          razorpay_signature: paymentRes.razorpay_signature,
          signupData,
        }
      );

      localStorage.setItem("authToken", response.data.token);

      // ✅ INSTANT PRO UNLOCK
      setIsPublicStudent(false);
      setFreeUsageCount(999);

      alert("🎉 Payment Successful! You are now a PRO user.");

      window.location.reload();
    } catch (err) {
      console.log("Payment verify error:", err);
      alert("Payment verification failed.");
    }
  };

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'main' },
    { href: '/goalsetup', activePaths: ['/goalsetup', '/examplan'], icon: Target, label: 'Exam Plan', section: 'main' },
    { href: '/testselection', icon: ClipboardList, label: 'Test', section: 'main' },
    { href: '/pasttest', icon: BarChart3, label: 'Result', section: 'main' },
    { href: '/colleges', icon: GraduationCap, label: 'Colleges', section: 'main' },
    { href: '/credits', icon: Award, label: 'Scholarship', section: 'main' },

    { href: '/previousyearquestions', icon: BookOpen, label: 'PYQs', section: 'practice' },
    { href: '/notice', icon: Bell, label: 'View Notice', section: 'practice' },
    { href: '/test-series', icon: NotebookText, label: 'Test Series', section: 'practice' },
    { href: '/coachAi', icon: BotMessageSquare, label: 'AI Coach', section: 'practice' }
  ];

  const mainItems = menuItems.filter(item => item.section === 'main');
  const practiceItems = menuItems.filter(item => item.section === 'practice');
const adminOnlyPages = ['/notice', '/test-series', '/credits'];

  // const hideForPublic = ['/notice', '/test-series', '/credits'];
  // const lockedForPublic = ['/goalsetup', '/previousyearquestions', '/coachAi'];

  const lockedForPublic = ['/goalsetup', '/previousyearquestions', '/coachAi'];


  // ✅ ✅ ✅ FIX 5: FINAL LOCK LOGIC
  const isTestLocked = isPublicStudent && freeUsageCount <= 0;


  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="hidden md:block md:w-1/6">
        <div
          className={`fixed top-0 left-0 h-screen w-1/6 bg-white transition-transform duration-300 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 flex flex-col overflow-y-auto scrollbar-hide shadow-lg border-r border-gray-200`}
        >

          <div className="flex flex-col items-center justify-center px-4 py-6 border-b border-gray-200">

            <img
              src={
                instituteLogo
                  ? `${apiBaseUrl.replace("/api", "")}${instituteLogo}`
                  : "/neet720_logo.jpg"
              }
              className="object-cover w-40 h-20 rounded-lg shadow"
              alt="Institute Logo"
            />

            <p className="mt-2 text-[12px] font-semibold text-gray-700 text-center">
              {instituteName || "Institute Name"}
            </p>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-hide">

            <div>
              <p className="px-3 mb-3 text-[11px] text-gray-500 tracking-wider uppercase">Main</p>

              <div className="space-y-1.5">
                {/* {mainItems.map(({ href, icon: Icon, label, activePaths }) => {
                  // if (isPublicStudent && hideForPublic.includes(href)) return null;

                  if (!isAdminStudent && adminOnlyPages.includes(href)) return null;


                  const isActive = pathname === href || (activePaths && activePaths.includes(pathname));
                  const isLocked = isPublicStudent && lockedForPublic.includes(href);

                  const handleClick = (e) => {
                    if (isLocked || isTestLocked) {
                      e.preventDefault();
                      setShowPricingModal(true);
                    }
                  };

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleClick}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl relative
                        ${isActive ? 'bg-teal-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                        ${(isLocked || isTestLocked) && 'opacity-60 cursor-not-allowed'}
                      `}
                    >
                      <Icon className="text-lg" />
                      <span className="font-semibold text-sm">{label}</span>

                      {(isLocked || isTestLocked) && (
                        <span className="absolute right-3 text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-600">
                          🔒 Locked
                        </span>
                      )}
                    </Link>
                  );
                })} */}

                {mainItems.map(({ href, icon: Icon, label, activePaths }) => {

  if (!isAdminStudent && adminOnlyPages.includes(href)) return null;

  const isActive = pathname === href || (activePaths && activePaths.includes(pathname));

  const isLocked =
    isPublicStudent &&
    (
      (href === '/testselection' && freeUsageCount <= 0) ||
      lockedForPublic.includes(href)
    );

  const handleClick = (e) => {
    if (isLocked) {
      e.preventDefault();
      setShowPricingModal(true);
    }
  };

  return (
    <Link
      key={href}
      href={href}
      onClick={handleClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl relative
        ${isActive ? 'bg-teal-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
        ${isLocked && 'opacity-60 cursor-not-allowed'}
      `}
    >
      <Icon className="text-lg" />

      {/* ✅ ✅ ✅ TEST MENU KE SAATH FREE COUNT SHOW */}
      <span className="font-semibold text-sm">
        {label}
        {href === '/testselection' && isPublicStudent && (
          freeUsageCount > 0
            ? ` (${freeUsageCount} Free)`
            : ' (Locked)'
        )}
      </span>

      {(isLocked) && (
        <span className="absolute right-3 text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-600">
          🔒 Locked
        </span>
      )}
    </Link>
  );
})}

              </div>
            </div>

            <div>
              <p className="px-3 mb-3 text-[11px] text-gray-500 tracking-wider uppercase">
                Practice & Updates
              </p>

              <div className="space-y-1.5">
                {practiceItems.map(({ href, icon: Icon, label }) => {
                  // if (isPublicStudent && hideForPublic.includes(href)) return null;

                  if (!isAdminStudent && adminOnlyPages.includes(href)) return null;


                  const isActive = pathname === href;
                  const isLocked = isPublicStudent && lockedForPublic.includes(href);

                  const handleClick = (e) => {
                    if (isLocked) {
                      e.preventDefault();
                      setShowPricingModal(true);
                    }
                  };

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleClick}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl relative
                        ${isActive ? 'bg-teal-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                        ${isLocked && 'opacity-60 cursor-not-allowed'}
                      `}
                    >
                      <Icon className="text-lg" />
                      <span className="font-semibold text-sm">{label}</span>

                      {isLocked && (
                        <span className="absolute right-3 text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-600">
                          🔒 Locked
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {isPublicStudent && (
              <div className="pt-4">
                <div className="mx-3 p-5 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-400 shadow-lg relative overflow-hidden">

                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                      <Crown className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-white font-bold text-base mb-1.5">Upgrade to Pro</h3>
                    <p className="text-white/90 text-xs mb-4">
                      Unlock all features and boost your preparation
                    </p>

                    <button
                      onClick={() => setShowPricingModal(true)}
                      className="w-full bg-white text-teal-600 font-semibold py-2.5 rounded-lg shadow-md hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Get Pro Now</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </nav>
        </div>
      </div>

      {showPricingModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPricingModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPricingModal(false)}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choose Your Plan
              </h2>
              <p className="text-sm text-gray-600">
                Select the best plan for your NEET preparation
              </p>
            </div>

            <div className="space-y-4">

              <div
                onClick={() => handleUpgradeClick("year")}
                className="block p-5 cursor-pointer rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">Yearly Plan</h3>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Save 57%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Best value for money</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm line-through text-gray-500">₹4,188</span>
                  <span className="text-3xl font-bold text-gray-900">₹1,825</span>
                  <span className="text-sm text-gray-600">/year</span>
                </div>

                <div className="flex items-center justify-center bg-teal-600 text-white font-semibold py-2.5 rounded-lg group-hover:bg-teal-700 transition-colors">
                  Get Started
                </div>
              </div>

              <div
                onClick={() => handleUpgradeClick("month")}
                className="block p-5 cursor-pointer rounded-2xl border-2 border-gray-200 hover:border-teal-300 bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly Plan</h3>
                    <p className="text-xs text-gray-600">Flexible monthly billing</p>
                  </div>
                  <Crown className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:scale-110 transition-all" />
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-gray-900">₹349</span>
                  <span className="text-sm text-gray-600">/month</span>
                </div>

                <div className="flex items-center justify-center bg-gray-100 text-gray-900 font-semibold py-2.5 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  Get Started
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-3">All plans include:</p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  Unlimited PYQs & Test Library
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  AI Analytics & 24/7 Chatbot
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  College Predictor & Mock Tests
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;

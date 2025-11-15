"use client";
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ConfirmationModal from "../Buttons/ConfirmationModal";
// import {
//   FaFlask,
//   FaAtom,
//   FaDna,
//   FaRegClock,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaRegQuestionCircle,
//   FaFlag,
// } from "react-icons/fa";
// import toast from "react-hot-toast";
// import Loading from "../Loading/Loading";
// import { useRouter } from "next/navigation";

// const subjects = [
//   { name: "Physics", icon: <FaAtom className="text-lg text-blue-500" /> },
//   { name: "Chemistry", icon: <FaFlask className="text-lg text-green-500" /> },
//   { name: "Biology", icon: <FaDna className="text-lg text-red-500" /> },
// ];

// const TestInterface = () => {
//   //initializing router
//   const router = useRouter();
//   const [isModalVisible, setIsModalVisible] = useState(false); // For controlling the modal visibility
//   const [questionsData, setQuestionsData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentSubject, setCurrentSubject] = useState("Physics");
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [visitedQuestions, setVisitedQuestions] = useState({});
//   const [markedForReview, setMarkedForReview] = useState({});
//   const [timer, setTimer] = useState(0);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [lastIndex, setLastIndex] = useState(0);
//   const [allocatedQuestions, setAllocatedQuestions] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [testEndTime, setTestEndTime] = useState(null);
//   const [showQuestionPanel, setShowQuestionPanel] = useState(false);
//   //use effect to handle the full screen escape
//   // useEffect (()=>{
//   //   const handleFullScreenChange = () =>{
//   //     if(!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullscreenElement && !document.msFullscreenElement) {
//   //       //push the page if the full screen exits
//   //       router.push("/testselection");
//   //     }
//   //   }

//   //   document.addEventListener("FullscreenElement", handleFullScreenChange);
//   //   document.addEventListener("webkitFullscreenElement", handleFullScreenChange);
//   //   document.addEventListener("MSFullscreenChange", handleFullScreenChange);
//   //   document.addEventListener("mozfullscreenElement", handleFullScreenChange);

//   //   return () => {
//   //     document.removeEventListener("fullscreenchange", handleFullScreenChange);
//   //     document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
//   //     document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
//   //     document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
//   //   }

//   // },[])

//   //block re-entry if submitted
//   useEffect(() => {
//     if (localStorage.getItem("testSubmitted") === "true") {
//       router.replace("/test-plan-result");
//     }
//   }, []);
  
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/question/fetch-questions`
//         );
//         const data = response.data;
//         const subjectWiseQuestions = {
//           Physics: [],
//           Chemistry: [],
//           Biology: [],
//         };

//         data.questions.forEach((item) => {
//           const subject = item.question.subject;
//           subjectWiseQuestions[subject]?.push({
//             id: item.question.id,
//             question: item.question.question_text,
//             options: item.options.map((opt) => opt.option_text),
//             correctOption: item.options.find((opt) => opt.is_correct)
//               ?.option_text,
//           });
//         });
//         setQuestionsData(subjectWiseQuestions);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError("Failed to load questions");
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const startTestData = JSON.parse(localStorage.getItem("startTest"));
//     if (startTestData) {
//       setCurrentSubject(startTestData.subject);
//       const allocatedQuestions = startTestData.allocatedQuestions || 0;
//       setAllocatedQuestions(allocatedQuestions);

//       // Set timer based on number of questions (1 minute per question)
//       const timeInSeconds = allocatedQuestions * 60; // 60 seconds per question
//       setTimer(timeInSeconds);

//       // Calculate and store the end time
//       const endTime = new Date();
//       endTime.setSeconds(endTime.getSeconds() + timeInSeconds);
//       setTestEndTime(endTime);

//       if (allocatedQuestions > 0) {
//         setLastIndex(allocatedQuestions);
//       }

//       const filteredSubject = subjects.filter(
//         (subject) => subject.name === startTestData.subject
//       );
//       setSelectedSubjects(filteredSubject);

//       // Mark first question as visited
//       setVisitedQuestions({
//         [`${startTestData.subject}-0`]: true,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (testEndTime) {
//       const countdown = setInterval(() => {
//         const now = new Date();
//         const diff = Math.floor((testEndTime - now) / 1000);

//         if (diff <= 0) {
//           clearInterval(countdown);
//           setTimer(0);
//           handleSubmit();
//         } else {
//           setTimer(diff);
//         }
//       }, 1000);

//       return () => clearInterval(countdown);
//     }
//   }, [testEndTime]);

//   const formattedTime = {
//     hours: Math.floor(timer / 3600),
//     minutes: Math.floor((timer % 3600) / 60),
//     seconds: timer % 60,
//   };

//   const handleOptionClick = (index) => {
//     const questionData = questionsData[currentSubject][currentQuestion];
//     const selectedAnswer = questionData.options[index];
//     const correctAnswer = questionData.correctOption; // Correct answer from the backend

//     // Determine if the selected answer is correct
//     const isCorrect = selectedAnswer === correctAnswer;

//     // Find the chapter name by matching the question_id
//     const questionId = questionData.id;
//     const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || [];
//     const chapterInfo = questionInfo.find(
//       (item) => item.questionIds === questionId
//     );

//     // If chapterInfo exists, add the chapter name to the answer data
//     const chapterName = chapterInfo
//       ? chapterInfo.chapterName
//       : "Unknown Chapter";

//     const answerData = {
//       subject: currentSubject,
//       question: questionData.question,
//       question_id: questionData.id,
//       chapterName, // Add chapter name here
//       selectedAnswer,
//       isCorrect, // Save whether the answer is correct
//       correctAnswer,
//     };

//     let savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];

//     const questionIndex = savedAnswers.findIndex(
//       (answer) => answer.question_id === questionData.id // Use question_id to identify the question
//     );

//     if (questionIndex >= 0) {
//       // If the question is already in the examplan, update it
//       savedAnswers[questionIndex] = answerData;
//     } else {
//       // If the question is not in the examplan, add it
//       savedAnswers.push(answerData);
//     }

//     // Save the updated examplan in localStorage
//     localStorage.setItem("examplan", JSON.stringify(savedAnswers));

//     // Update state for answers and visited questions
//     const currentKey = `${currentSubject}-${currentQuestion}`;
//     setAnswers({ ...answers, [currentKey]: index });
//     setVisitedQuestions({
//       ...visitedQuestions,
//       [currentKey]: true,
//     });

//     // If answer is given and question was marked for review, unmark it
//     if (markedForReview[currentKey]) {
//       setMarkedForReview(prev => {
//         const newState = { ...prev };
//         delete newState[currentKey];
//         return newState;
//       });
//     }
//   };

//   const handleNavigation = (direction) => {
//     if (direction === "next") {
//       if (currentQuestion >= lastIndex - 1) {
//         setCurrentQuestion(0); // Reset to the first question if the last question is reached
//       } else {
//         const nextQuestionIndex = currentQuestion + 1;
//         setCurrentQuestion(nextQuestionIndex);
//         // Mark the next question as visited
//         setVisitedQuestions({
//           ...visitedQuestions,
//           [`${currentSubject}-${nextQuestionIndex}`]: true,
//         });
//       }
//     } else if (direction === "prev" && currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1); // Go to the previous question
//     }
//   };

//   const handleReviewLater = () => {
//     const currentKey = `${currentSubject}-${currentQuestion}`;

//     // Toggle mark for review state
//     if (markedForReview[currentKey]) {
//       // Unmark if already marked
//       setMarkedForReview(prev => {
//         const newState = { ...prev };
//         delete newState[currentKey];
//         return newState;
//       });
//     } else {
//       // Mark for review
//       setMarkedForReview({
//         ...markedForReview,
//         [currentKey]: true,
//       });
//     }
//   };

//   const handleClearResponse = () => {
//     const currentKey = `${currentSubject}-${currentQuestion}`;
//     const updatedAnswers = { ...answers };
//     delete updatedAnswers[currentKey];
//     setAnswers(updatedAnswers);

//     // Remove from localStorage as well
//     const savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];
//     const currentQuestionData = questionsData[currentSubject][currentQuestion];
//     const updatedSavedAnswers = savedAnswers.filter(
//       (answer) => answer.question_id !== currentQuestionData.id
//     );
//     localStorage.setItem("examplan", JSON.stringify(updatedSavedAnswers));
//   };

//   const handleSubmitConformation = () => {
//     setIsModalVisible(true);
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
    
//     // Set test completion flag BEFORE any redirects
//     localStorage.setItem("testCompleted", "true");
    
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       toast.error("Authentication failed! Please log in again.", {
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const endTime = new Date().toISOString();
//     const startTime =
//       localStorage.getItem("testStartTime") || new Date().toISOString();
//     let correctAnswers = [];
//     let wrongAnswers = [];
//     let notAttempted = [];
//     let totalMarks = 0;

//     const savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];

//     savedAnswers.forEach((answer) => {
//       const {
//         question_id,
//         selectedAnswer,
//         correctAnswer,
//         isCorrect,
//         subject,
//         chapterName,
//       } = answer;

//       const marks = isCorrect ? 4 : selectedAnswer === null ? 0 : -1;

//       const questionData = [
//         question_id,
//         subject,
//         chapterName,
//         selectedAnswer,
//         correctAnswer,
//         marks,
//         0, // Placeholder
//       ];

//       if (selectedAnswer === null) {
//         notAttempted.push([question_id, subject, chapterName]);
//       } else if (isCorrect) {
//         correctAnswers.push(questionData);
//       } else {
//         wrongAnswers.push(questionData);
//       }

//       totalMarks += marks;
//     });

//     // ✅ Add testName (dynamic or from localStorage)
//     const testName =
//       localStorage.getItem("currentTestName") ||
//       `System Test - ${new Date().toLocaleDateString("en-GB")}`;

//     const testResults = {
//       correctAnswers,
//       wrongAnswers,
//       notAttempted,
//       startTime,
//       endTime,
//       total_marks: totalMarks,
//       testName, // ✅ include testName
//     };

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/fulltest/submit`,
//         testResults,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         toast.success("Test submitted successfully!", {
//           duration: 5000,
//         });
//         localStorage.setItem("testSubmitted", "true"); // store flag
//         router.replace("/test-plan-result");

//       } else {
//         toast.error("Failed to submit test.", {
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//       }
//     } catch (error) {
//       console.error(
//         "❌ Error submitting test:",
//         error.response?.data || error.message
//       );
//       toast.error(
//         `Error: ${error.response?.data?.error || "Something went wrong"}`,
//         {
//           duration: 5000,
//         }
//       );
//       setIsSubmitting(false);
//     }
//   };

//   const getAnsweredCount = () => {
//     return Object.keys(answers).filter((key) => key.startsWith(currentSubject))
//       .length;
//   };

//   const getMarkedForReviewCount = () => {
//     return Object.keys(markedForReview).filter((key) =>
//       key.startsWith(currentSubject)
//     ).length;
//   };

//   const getNotVisitedCount = () => {
//     return (
//       lastIndex -
//       Object.keys(visitedQuestions).filter((key) =>
//         key.startsWith(currentSubject)
//       ).length
//     );
//   };

//   if (loading)
//     return (
//       <div className="h-screen flex justify-center items-center bg-gray-50">
//         <Loading />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="h-screen flex justify-center items-center bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <div className="text-red-500 text-5xl mb-4">
//             <FaTimesCircle className="mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Error Loading Test
//           </h2>
//           <p className="text-red-500">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex flex-col">
//       {/* Header Section */}
//       <div className="bg-white shadow-sm py-2 sm:py-4 px-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
//         <div className="flex items-center">
//           <img
//             src="/neet720_logo.jpg"
//             alt="Logo"
//             className="h-12 sm:h-16 md:h-20"
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
//           {/* Timer */}
//           <div className="flex items-center space-x-2">
//             <FaRegClock className="text-lg sm:text-xl text-blue-600" />
//             <div className="flex space-x-1">
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-3 py-1 rounded-md shadow-sm text-sm sm:text-base">
//                 {String(formattedTime.hours).padStart(2, "0")}
//               </div>
//               <span className="text-gray-800 font-bold">:</span>
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-3 py-1 rounded-md shadow-sm text-sm sm:text-base">
//                 {String(formattedTime.minutes).padStart(2, "0")}
//               </div>
//               <span className="text-gray-800 font-bold">:</span>
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-3 py-1 rounded-md shadow-sm text-sm sm:text-base">
//                 {String(formattedTime.seconds).padStart(2, "0")}
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsModalVisible(true)}
//             disabled={isSubmitting}
//             className="w-full sm:w-auto py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center text-sm sm:text-base"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <FaCheckCircle className="mr-2" />
//                 Submit Test
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Test Header */}
//       <div className="bg-white shadow-sm mt-1 py-3 px-3 sm:px-6">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
//           <h2 className="text-lg sm:text-xl font-bold text-blue-700">
//             Mock Test
//           </h2>

//           <div className="flex gap-2 flex-wrap justify-center">
//             {selectedSubjects.map((subject) => (
//               <button
//                 key={subject.name}
//                 className={`px-3 sm:px-5 py-1.5 flex items-center gap-2 rounded-md transition-all duration-300 text-sm sm:text-base ${currentSubject === subject.name
//                   ? "bg-blue-600 text-white font-semibold shadow-sm"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 onClick={() => {
//                   setCurrentSubject(subject.name);
//                   setCurrentQuestion(0);
//                 }}
//               >
//                 {subject.icon} {subject.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row flex-grow p-2 sm:p-4 gap-4 relative">
//         {/* Mobile Toggle Button - Only visible on mobile */}
//         <button
//           onClick={() => setShowQuestionPanel(!showQuestionPanel)}
//           className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
//         >
//           {showQuestionPanel ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>

//         {/* Question Section */}
//         <div
//           className={`w-full lg:w-3/4 select-none ${showQuestionPanel ? "hidden lg:block" : "block"
//             }`}
//         >
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
//             {/* Question Header */}
//             <div className="bg-gray-50 px-3 sm:px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//               <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
//                 Question {currentQuestion + 1} of {lastIndex}
//               </h3>

//               <div className="flex flex-wrap gap-2">
//                 <span
//                   className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${markedForReview[`${currentSubject}-${currentQuestion}`]
//                     ? "bg-amber-100 text-amber-800"
//                     : answers[`${currentSubject}-${currentQuestion}`] !==
//                       undefined
//                       ? "bg-green-100 text-green-800"
//                       : "bg-blue-100 text-blue-800"
//                     }`}
//                 >
//                   {markedForReview[`${currentSubject}-${currentQuestion}`]
//                     ? "Review"
//                     : answers[`${currentSubject}-${currentQuestion}`] !==
//                       undefined
//                       ? "Answered"
//                       : "Not Answered"}
//                 </span>
//                 <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                   {currentSubject}
//                 </span>
//               </div>
//             </div>

//             {/* Question Content */}
//             <div className="p-3 sm:p-6 flex-grow overflow-y-auto">
//               <div className="flex flex-col gap-4 sm:gap-6">
//                 {/* Question Image */}
//                 {/* <div className="w-full mb-2 sm:mb-4 flex justify-center items-start">
//                   <img
//                     src="/question.png"
//                     alt="Question"
//                     className="max-w-full h-auto rounded-lg object-contain max-h-40 sm:max-h-64"
//                   />
//                 </div> */}

//                 <div className="w-full">
//                   {/* Question Text */}
//                   <div className="mb-4 sm:mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
//                     <h3 className="text-sm sm:text-lg font-medium text-gray-800 leading-relaxed">
//                       {questionsData[currentSubject]?.[currentQuestion]
//                         ?.question || "No Question Available"}
//                     </h3>
//                   </div>

//                   {/* Options */}
//                   <div className="space-y-2 sm:space-y-3">
//                     {questionsData[currentSubject]?.[
//                       currentQuestion
//                     ]?.options.map((option, index) => {
//                       const serialLetter = String.fromCharCode(65 + index);
//                       const inputName = `option-${currentSubject}-${currentQuestion}`;
//                       const isSelected =
//                         answers[`${currentSubject}-${currentQuestion}`] ===
//                         index;
//                       return (
//                         <div key={index} className="flex items-center">
//                           <input
//                             type="radio"
//                             id={`${inputName}-${index}`}
//                             name={inputName}
//                             value={index}
//                             checked={isSelected}
//                             onChange={() => handleOptionClick(index)}
//                             className="peer hidden"
//                           />
//                           <label
//                             htmlFor={`${inputName}-${index}`}
//                             className={`flex items-start cursor-pointer w-full px-3 sm:px-5 py-3 sm:py-3 rounded-lg border transition-all duration-300 text-sm sm:text-base ${isSelected
//                               ? "bg-blue-600 text-white border-blue-600 shadow-md"
//                               : "bg-white hover:bg-gray-50 border-gray-200"
//                               }`}
//                           >
//                             <span
//                               className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full mr-3 sm:mr-3 border-2 font-bold text-sm sm:text-lg flex-shrink-0 mt-0.5 ${isSelected
//                                 ? "bg-blue-500 text-white border-blue-500"
//                                 : "bg-gray-200 text-blue-600 border-gray-300"
//                                 }`}
//                             >
//                               {serialLetter}
//                             </span>
//                             <span className="text-sm sm:text-base leading-relaxed">
//                               {option}
//                             </span>
//                           </label>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-3">
//               {/* Mobile: Stack all buttons vertically */}
//               <div className="flex flex-col sm:hidden gap-2">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleNavigation("prev")}
//                     disabled={currentQuestion === 0}
//                     className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center space-x-1 transition-all text-sm font-medium ${currentQuestion === 0
//                       ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                       }`}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                     <span>Previous</span>
//                   </button>

//                   <button
//                     onClick={() => handleNavigation("next")}
//                     className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-1 text-sm font-medium"
//                   >
//                     <span>Next</span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleClearResponse}
//                     className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center space-x-1 text-sm font-medium"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                     <span>Clear</span>
//                   </button>

//                   <button
//                     onClick={handleReviewLater}
//                     className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center space-x-1 text-sm font-medium"
//                   >
//                     <FaFlag className="h-3 w-3" />
//                     <span>
//                       {markedForReview[`${currentSubject}-${currentQuestion}`]
//                         ? "Unmark Review"
//                         : "Review"}
//                     </span>
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setShowQuestionPanel(true)}
//                   className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center space-x-2 text-sm font-medium"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                   <span>View All Questions</span>
//                 </button>
//               </div>

//               {/* Desktop: Original layout */}
//               <div className="hidden sm:flex justify-between items-center">
//                 <button
//                   onClick={() => handleNavigation("prev")}
//                   disabled={currentQuestion === 0}
//                   className={`px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center space-x-1 transition-all text-sm sm:text-base ${currentQuestion === 0
//                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                     }`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 sm:h-5 sm:w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 19l-7-7 7-7"
//                     />
//                   </svg>
//                   <span>Previous</span>
//                 </button>

//                 <div className="flex space-x-3">
//                   <button
//                     onClick={handleClearResponse}
//                     className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center space-x-1 text-sm sm:text-base"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 sm:h-5 sm:w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                     <span>Clear</span>
//                   </button>

//                   <button
//                     onClick={handleReviewLater}
//                     className="px-4 sm:px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center space-x-1 text-sm sm:text-base"
//                   >
//                     <FaFlag className="h-3 w-3 sm:h-4 sm:w-4" />
//                     <span>
//                       {markedForReview[`${currentSubject}-${currentQuestion}`]
//                         ? "Unmark Review"
//                         : "Mark for Review"}
//                     </span>
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => handleNavigation("next")}
//                   className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-1 text-sm sm:text-base"
//                 >
//                   <span>Next</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 sm:h-5 sm:w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Questions Navigation Panel - Slides in on mobile */}
//         <div
//           className={`
//     fixed lg:relative inset-0 lg:inset-auto
//     w-full lg:w-1/4
//     bg-black bg-opacity-50 lg:bg-transparent
//     z-50 lg:z-auto
//     transition-all duration-300 ease-in-out
//     ${showQuestionPanel ? "block" : "hidden lg:block"}
//   `}
//         >
//           <div
//             className={`
//       absolute lg:relative
//       right-0 top-0 bottom-0
//       w-[85%] sm:w-96 lg:w-full
//       bg-white rounded-l-xl lg:rounded-xl shadow-2xl lg:shadow-sm
//       h-full flex flex-col
//       transform transition-transform duration-300 ease-in-out
//       ${showQuestionPanel
//                 ? "translate-x-0"
//                 : "translate-x-full lg:translate-x-0"
//               }
//     `}
//           >
//             {/* Panel Header */}
//             <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="font-semibold text-gray-700 flex items-center text-sm sm:text-base flex-wrap gap-2">
//                 <span>Questions Overview</span>
//                 <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
//                   {allocatedQuestions} Questions
//                 </span>
//               </h3>
//               <button
//                 onClick={() => setShowQuestionPanel(false)}
//                 className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Legend */}
//             <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
//               <div className="grid grid-cols-2 gap-2">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-sm flex-shrink-0"></div>
//                   <span className="text-xs sm:text-sm text-gray-700">
//                     Answered ({getAnsweredCount()})
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-sm flex-shrink-0"></div>
//                   <span className="text-xs sm:text-sm text-gray-700">
//                     Not Answered (
//                     {allocatedQuestions -
//                       getAnsweredCount() -
//                       getNotVisitedCount()}
//                     )
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded-sm flex-shrink-0"></div>
//                   <span className="text-xs sm:text-sm text-gray-700">
//                     Not Visited ({getNotVisitedCount()})
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-sm flex-shrink-0"></div>
//                   <span className="text-xs sm:text-sm text-gray-700">
//                     Review ({getMarkedForReviewCount()})
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Question Grid */}
//             <div className="p-3 sm:p-4 flex-grow overflow-y-auto">
//               <div className="grid grid-cols-5 gap-2">
//                 {Array.from({ length: allocatedQuestions }).map((_, index) => (
//                   <button
//                     key={index}
//                     className={`w-full aspect-square flex items-center justify-center text-xs sm:text-sm rounded-md transition-all font-medium ${currentQuestion === index
//                       ? "bg-blue-600 text-white border-2 border-blue-700 shadow-md"
//                       : markedForReview[`${currentSubject}-${index}`]
//                         ? "bg-amber-500 text-white"
//                         : answers[`${currentSubject}-${index}`] !== undefined
//                           ? "bg-green-500 text-white"
//                           : visitedQuestions[`${currentSubject}-${index}`]
//                             ? "bg-red-500 text-white"
//                             : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                       }`}
//                     onClick={() => {
//                       setCurrentQuestion(index);
//                       if (!visitedQuestions[`${currentSubject}-${index}`]) {
//                         setVisitedQuestions({
//                           ...visitedQuestions,
//                           [`${currentSubject}-${index}`]: true,
//                         });
//                       }
//                       setShowQuestionPanel(false); // Close panel on mobile after selection
//                     }}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
//               <button
//                 onClick={handleSubmitConformation}
//                 disabled={isSubmitting}
//                 className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center text-sm sm:text-base"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <FaCheckCircle className="mr-2" />
//                     Submit Test
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Commented Tab Switch Warning Modal */}
//       {/* 
//       {showTabSwitchWarning && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
//           <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//                 <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 Warning: Tab Switch Detected
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 You have switched tabs {tabSwitchCount} time(s). 
//                 {tabSwitchCount < 2 
//                   ? ` You have ${2 - tabSwitchCount} warning(s) left. On the 3rd attempt, your test will be automatically submitted.`
//                   : " This is your final warning! Next tab switch will submit your test automatically."
//                 }
//               </p>
//               <button
//                 onClick={() => setShowTabSwitchWarning(false)}
//                 className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
//               >
//                 I Understand
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       */}

//       {/* Fullscreen Warning Modal
//       {showFullscreenWarning && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
//           <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//                 <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 Warning: Fullscreen Mode Required
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 You have attempted to exit fullscreen {fullscreenExitCount} time(s). 
//                 {fullscreenExitCount < 2 
//                   ? ` You have ${2 - fullscreenExitCount} warning(s) left. On the 3rd attempt, your test will be automatically submitted.`
//                   : " This is your final warning! Next attempt will submit your test automatically."
//                 }
//               </p>
//               <button
//                 onClick={() => setShowFullscreenWarning(false)}
//                 className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
//               >
//                 Continue Test
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {isModalVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
//               Confirm Test Submission
//             </h2>
//             <p className="text-sm sm:text-base text-gray-600 mb-6">
//               Are you sure you want to submit this test? <br />
//               Once submitted, you won't be able to change your answers.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
//               <button
//                 onClick={() => setIsModalVisible(false)}
//                   className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestInterface;





"use client";
import React, { useState, useEffect, useCallback, useRef } from "react"; 
import axios from "axios";
import {
  FaFlask,
  FaAtom,
  FaDna,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRegQuestionCircle,
  FaFlag,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";

const subjects = [
  { name: "Physics", icon: <FaAtom className="text-lg text-blue-500" /> },
  { name: "Chemistry", icon: <FaFlask className="text-lg text-green-500" /> },
  { name: "Biology", icon: <FaDna className="text-lg text-red-500" /> },
];

const TestInterface = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questionsData, setQuestionsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSubject, setCurrentSubject] = useState("Physics");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timer, setTimer] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [allocatedQuestions, setAllocatedQuestions] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testEndTime, setTestEndTime] = useState(null);
  const [showQuestionPanel, setShowQuestionPanel] = useState(false);

  // --- ANTI-CHEATING STATE ---
  const [showTabSwitchWarning, setShowTabSwitchWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
  const isSubmittingRef = useRef(false);
  // --- ANTI-CHEATING STATE ---


  //block re-entry if submitted
  useEffect(() => {
    if (localStorage.getItem("testSubmitted") === "true") {
      router.replace("/test-plan-result");
    }
  }, [router]); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/question/fetch-questions`
        );
        const data = response.data;
        const subjectWiseQuestions = {
          Physics: [],
          Chemistry: [],
          Biology: [],
        };

        data.questions.forEach((item) => {
          const subject = item.question.subject;
          subjectWiseQuestions[subject]?.push({
            id: item.question.id,
            question: item.question.question_text,
            options: item.options.map((opt) => opt.option_text),
            correctOption: item.options.find((opt) => opt.is_correct)
              ?.option_text,
          });
        });
        setQuestionsData(subjectWiseQuestions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const startTestData = JSON.parse(localStorage.getItem("startTest"));
    if (startTestData) {
      setCurrentSubject(startTestData.subject);
      const allocatedQuestions = startTestData.allocatedQuestions || 0;
      setAllocatedQuestions(allocatedQuestions);

      const timeInSeconds = allocatedQuestions * 60;
      setTimer(timeInSeconds);

      const endTime = new Date();
      endTime.setSeconds(endTime.getSeconds() + timeInSeconds);
      setTestEndTime(endTime);

      if (allocatedQuestions > 0) {
        setLastIndex(allocatedQuestions);
      }

      const filteredSubject = subjects.filter(
        (subject) => subject.name === startTestData.subject
      );
      setSelectedSubjects(filteredSubject);

      setVisitedQuestions({
        [`${startTestData.subject}-0`]: true,
      });
    }
  }, []);


  // --- MODIFIED handleSubmit (useCallback mein wrap kiya) ---
  const handleSubmit = useCallback(async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true; 
    
    setIsSubmitting(true);
    
    localStorage.setItem("testCompleted", "true");
    
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.error("Authentication failed! Please log in again.", {
        duration: 5000,
      });
      setIsSubmitting(false);
      isSubmittingRef.current = false; 
      return;
    }

    const endTime = new Date().toISOString();
    const startTime =
      localStorage.getItem("testStartTime") || new Date().toISOString();
    let correctAnswers = [];
    let wrongAnswers = [];
    let notAttempted = [];
    let totalMarks = 0;

    const savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];

    savedAnswers.forEach((answer) => {
      const {
        question_id,
        selectedAnswer,
        correctAnswer,
        isCorrect,
        subject,
        chapterName,
      } = answer;

      const marks = isCorrect ? 4 : selectedAnswer === null ? 0 : -1;

      const questionData = [
        question_id,
        subject,
        chapterName,
        selectedAnswer,
        correctAnswer,
        marks,
        0, 
      ];

      if (selectedAnswer === null) {
        notAttempted.push([question_id, subject, chapterName]);
      } else if (isCorrect) {
        correctAnswers.push(questionData);
      } else {
        wrongAnswers.push(questionData);
      }

      totalMarks += marks;
    });

    const testName =
      localStorage.getItem("currentTestName") ||
      `System Test - ${new Date().toLocaleDateString("en-GB")}`;

    const testResults = {
      correctAnswers,
      wrongAnswers,
      notAttempted,
      startTime,
      endTime,
      total_marks: totalMarks,
      testName, 
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/fulltest/submit`,
        testResults,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Test submitted successfully!", {
          duration: 5000,
        });
        localStorage.setItem("testSubmitted", "true"); 
        
        // ⭐️ FIX 2: Sirf active document par hi fullscreen exit karein ⭐️
        if (!document.hidden) {
            if (document.exitFullscreen) {
                // .catch() add karein kyunki yeh promise return karta hai
                document.exitFullscreen().catch((err) => console.error(err.message));
            } else if (document.webkitExitFullscreen) { // Safari
                document.webkitExitFullscreen();
            }
        }
        
        router.replace("/test-plan-result");

      } else {
        toast.error("Failed to submit test.", {
          duration: 5000,
        });
        setIsSubmitting(false);
        isSubmittingRef.current = false; 
      }
    } catch (error) {
      console.error(
        "❌ Error submitting test:",
        error.response?.data || error.message
      );
      toast.error(
        `Error: ${error.response?.data?.error || "Something went wrong"}`,
        {
          duration: 5000,
        }
      );
      setIsSubmitting(false);
      isSubmittingRef.current = false; 
    }
  }, [router]); 
  // --- END handleSubmit ---


  // Timer useEffect
  useEffect(() => {
    if (testEndTime) {
      const countdown = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((testEndTime - now) / 1000);

        if (diff <= 0) {
          clearInterval(countdown);
          setTimer(0);
          handleSubmit(); // Auto-submit
        } else {
          setTimer(diff);
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [testEndTime, handleSubmit]); 


  // --- ⬇️ ANTI-CHEATING useEffect (MODIFIED) ⬇️ ---
  useEffect(() => {
    if (loading || error) return;

    const requestFullscreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen().catch((err) => console.log(err.message));
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen().catch((err) => console.log(err.message));
        }
    };

    requestFullscreen();

    const handleFullScreenChange = () => {
        if (isSubmittingRef.current) return; 

        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            
            setFullscreenExitCount(prevCount => {
                const newCount = prevCount + 1;
                
                if (newCount >= 3) {
                    // ⭐️ FIX 1: Submission ko defer karein
                    setTimeout(() => {
                        toast.error("Fullscreen exit limit reached. Submitting test.", { duration: 3000 });
                        handleSubmit();
                    }, 0);
                } else {
                    setShowFullscreenWarning(true);
                    setTimeout(requestFullscreen, 100); 
                }
                return newCount;
            });
        }
    };

    const handleVisibilityChange = () => {
        if (isSubmittingRef.current) return;

        if (document.hidden) {
            setTabSwitchCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount >= 3) {
                    // ⭐️ FIX 1: Submission ko defer karein
                    setTimeout(() => {
                        toast.error("Tab switch limit reached. Submitting test.", { duration: 3000 });
                        handleSubmit();
                    }, 0);
                } else {
                    setShowTabSwitchWarning(true);
                }
                return newCount;
            });
        } else {
            requestFullscreen();
        }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
        document.removeEventListener("fullscreenchange", handleFullScreenChange);
        document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

  }, [loading, error, handleSubmit]); 
  // --- ⬆️ ANTI-CHEATING useEffect ⬆️ ---


  const formattedTime = {
    hours: Math.floor(timer / 3600),
    minutes: Math.floor((timer % 3600) / 60),
    seconds: timer % 60,
  };

  const handleOptionClick = (index) => {
    const questionData = questionsData[currentSubject][currentQuestion];
    const selectedAnswer = questionData.options[index];
    const correctAnswer = questionData.correctOption; 

    const isCorrect = selectedAnswer === correctAnswer;

    const questionId = questionData.id;
    const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || [];
    const chapterInfo = questionInfo.find(
      (item) => item.questionIds === questionId
    );

    const chapterName = chapterInfo
      ? chapterInfo.chapterName
      : "Unknown Chapter";

    const answerData = {
      subject: currentSubject,
      question: questionData.question,
      question_id: questionData.id,
      chapterName, 
      selectedAnswer,
      isCorrect, 
      correctAnswer,
    };

    let savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];

    const questionIndex = savedAnswers.findIndex(
      (answer) => answer.question_id === questionData.id 
    );

    if (questionIndex >= 0) {
      savedAnswers[questionIndex] = answerData;
    } else {
      savedAnswers.push(answerData);
    }

    localStorage.setItem("examplan", JSON.stringify(savedAnswers));

    const currentKey = `${currentSubject}-${currentQuestion}`;
    setAnswers({ ...answers, [currentKey]: index });
    setVisitedQuestions({
      ...visitedQuestions,
      [currentKey]: true,
    });

    if (markedForReview[currentKey]) {
      setMarkedForReview(prev => {
        const newState = { ...prev };
        delete newState[currentKey];
        return newState;
      });
    }
  };

  const handleNavigation = (direction) => {
    if (direction === "next") {
      if (currentQuestion >= lastIndex - 1) {
        setCurrentQuestion(0); 
      } else {
        const nextQuestionIndex = currentQuestion + 1;
        setCurrentQuestion(nextQuestionIndex);
        setVisitedQuestions({
          ...visitedQuestions,
          [`${currentSubject}-${nextQuestionIndex}`]: true,
        });
      }
    } else if (direction === "prev" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1); 
    }
  };

  const handleReviewLater = () => {
    const currentKey = `${currentSubject}-${currentQuestion}`;

    if (markedForReview[currentKey]) {
      setMarkedForReview(prev => {
        const newState = { ...prev };
        delete newState[currentKey];
        return newState;
      });
    } else {
      setMarkedForReview({
        ...markedForReview,
        [currentKey]: true,
      });
    }
  };

  const handleClearResponse = () => {
    const currentKey = `${currentSubject}-${currentQuestion}`;
    const updatedAnswers = { ...answers };
    delete updatedAnswers[currentKey];
    setAnswers(updatedAnswers);

    const savedAnswers = JSON.parse(localStorage.getItem("examplan")) || [];
    const currentQuestionData = questionsData[currentSubject][currentQuestion];
    const updatedSavedAnswers = savedAnswers.filter(
      (answer) => answer.question_id !== currentQuestionData.id
    );
    localStorage.setItem("examplan", JSON.stringify(updatedSavedAnswers));
  };

  const handleSubmitConformation = () => {
    setIsModalVisible(true);
  };
  
  const getAnsweredCount = () => {
    return Object.keys(answers).filter((key) => key.startsWith(currentSubject))
      .length;
  };

  const getMarkedForReviewCount = () => {
    return Object.keys(markedForReview).filter((key) =>
      key.startsWith(currentSubject)
    ).length;
  };

  const getNotVisitedCount = () => {
    return (
      lastIndex -
      Object.keys(visitedQuestions).filter((key) =>
        key.startsWith(currentSubject)
      ).length
    );
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">
            <FaTimesCircle className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Test
          </h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-white shadow-sm py-2 sm:py-4 px-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center">
          <img
            src="/neet720_logo.jpg"
            alt="Logo"
            className="h-12 sm:h-16 md:h-20"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <FaRegClock className="text-lg sm:text-xl text-blue-600" />
            <div className="flex space-x-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-3 py-1 rounded-md shadow-sm text-sm sm:text-base">
                {String(formattedTime.hours).padStart(2, "0")}
              </div>
              <span className="text-gray-800 font-bold">:</span>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-3 py-1 rounded-md shadow-sm text-sm sm:text-base">
                {String(formattedTime.minutes).padStart(2, "0")}
              </div>
              <span className="text-gray-800 font-bold">:</span>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-3 py-1 rounded-md shadow-sm text-sm sm:text-base">
                {String(formattedTime.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalVisible(true)}
            disabled={isSubmitting}
            className="w-full sm:w-auto py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Submit Test
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Header */}
      <div className="bg-white shadow-sm mt-1 py-3 px-3 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-700">
            Mock Test
          </h2>

          <div className="flex gap-2 flex-wrap justify-center">
            {selectedSubjects.map((subject) => (
              <button
                key={subject.name}
                className={`px-3 sm:px-5 py-1.5 flex items-center gap-2 rounded-md transition-all duration-300 text-sm sm:text-base ${currentSubject === subject.name
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => {
                  setCurrentSubject(subject.name);
                  setCurrentQuestion(0);
                }}
              >
                {subject.icon} {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow p-2 sm:p-4 gap-4 relative">
        {/* Mobile Toggle Button - Only visible on mobile */}
        <button
          onClick={() => setShowQuestionPanel(!showQuestionPanel)}
          className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        >
          {showQuestionPanel ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Question Section */}
        <div
          className={`w-full lg:w-3/4 select-none ${showQuestionPanel ? "hidden lg:block" : "block"
            }`}
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
            {/* Question Header */}
            <div className="bg-gray-50 px-3 sm:px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
                Question {currentQuestion + 1} of {lastIndex}
              </h3>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${markedForReview[`${currentSubject}-${currentQuestion}`]
                      ? "bg-amber-100 text-amber-800"
                      : answers[`${currentSubject}-${currentQuestion}`] !==
                        undefined
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {markedForReview[`${currentSubject}-${currentQuestion}`]
                    ? "Review"
                    : answers[`${currentSubject}-${currentQuestion}`] !==
                      undefined
                      ? "Answered"
                      : "Not Answered"}
                </span>
                <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {currentSubject}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-3 sm:p-6 flex-grow overflow-y-auto">
              <div className="flex flex-col gap-4 sm:gap-6">
                
                {/* --- Commented image section ---
                <div className="w-full mb-2 sm:mb-4 flex justify-center items-start">
                  <img
                    src="/question.png"
                    alt="Question"
                    className="max-w-full h-auto rounded-lg object-contain max-h-40 sm:max-h-64"
                  />
                </div>
                */}

                <div className="w-full">
                  {/* Question Text */}
                  <div className="mb-4 sm:mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h3 className="text-sm sm:text-lg font-medium text-gray-800 leading-relaxed">
                      {questionsData[currentSubject]?.[currentQuestion]
                        ?.question || "No Question Available"}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 sm:space-y-3">
                    {questionsData[currentSubject]?.[
                      currentQuestion
                    ]?.options.map((option, index) => {
                      const serialLetter = String.fromCharCode(65 + index);
                      const inputName = `option-${currentSubject}-${currentQuestion}`;
                      const isSelected =
                        answers[`${currentSubject}-${currentQuestion}`] ===
                        index;
                      return (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`${inputName}-${index}`}
                            name={inputName}
                            value={index}
                            checked={isSelected}
                            onChange={() => handleOptionClick(index)}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`${inputName}-${index}`}
                            className={`flex items-start cursor-pointer w-full px-3 sm:px-5 py-3 sm:py-3 rounded-lg border transition-all duration-300 text-sm sm:text-base ${isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white hover:bg-gray-50 border-gray-200"
                              }`}
                          >
                            <span
                              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full mr-3 sm:mr-3 border-2 font-bold text-sm sm:text-lg flex-shrink-0 mt-0.5 ${isSelected
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "bg-gray-200 text-blue-600 border-gray-300"
                                }`}
                            >
                              {serialLetter}
                            </span>
                            <span className="text-sm sm:text-base leading-relaxed">
                              {option}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-3">
              {/* Mobile: Stack all buttons vertically */}
              <div className="flex flex-col sm:hidden gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavigation("prev")}
                    disabled={currentQuestion === 0}
                    className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center space-x-1 transition-all text-sm font-medium ${currentQuestion === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("next")}
                    disabled={currentQuestion === lastIndex - 1}
                    className={`flex-1 px-4 py-2.5 ${currentQuestion === lastIndex - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-lg transition-all flex items-center justify-center space-x-1 text-sm font-medium`}
                  >
                    <span>Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleClearResponse}
                    className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center space-x-1 text-sm font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Clear</span>
                  </button>

                  <button
                    onClick={handleReviewLater}
                    className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center space-x-1 text-sm font-medium"
                  >
                    <FaFlag className="h-3 w-3" />
                    <span>
                      {markedForReview[`${currentSubject}-${currentQuestion}`]
                        ? "Unmark Review"
                        : "Review"}
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => setShowQuestionPanel(true)}
                  className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center space-x-2 text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span>View All Questions</span>
                </button>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden sm:flex justify-between items-center">
                <button
                  onClick={() => handleNavigation("prev")}
                  disabled={currentQuestion === 0}
                  className={`px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center space-x-1 transition-all text-sm sm:text-base ${currentQuestion === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={handleClearResponse}
                    className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center space-x-1 text-sm sm:text-base"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Clear</span>
                  </button>

                  <button
                    onClick={handleReviewLater}
                    className="px-4 sm:px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center space-x-1 text-sm sm:text-base"
                  >
                    <FaFlag className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {markedForReview[`${currentSubject}-${currentQuestion}`]
                        ? "Unmark Review"
                        : "Mark for Review"}
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => handleNavigation("next")}
                  disabled={currentQuestion === lastIndex - 1}
                  className={`px-4 sm:px-6 py-2 ${currentQuestion === lastIndex - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-lg transition-all flex items-center justify-center space-x-1 text-sm sm:text-base`}
                >
                  <span>Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Navigation Panel - Slides in on mobile */}
        <div
          className={`
  fixed lg:relative inset-0 lg:inset-auto
  w-full lg:w-1/4
  bg-black bg-opacity-50 lg:bg-transparent
  z-50 lg:z-auto
  transition-all duration-300 ease-in-out
  ${showQuestionPanel ? "block" : "hidden lg:block"}
`}
        >
          <div
            className={`
    absolute lg:relative
    right-0 top-0 bottom-0
    w-[85%] sm:w-96 lg:w-full
    bg-white rounded-l-xl lg:rounded-xl shadow-2xl lg:shadow-sm
    h-full flex flex-col
    transform transition-transform duration-300 ease-in-out
    ${showQuestionPanel
                ? "translate-x-0"
                : "translate-x-full lg:translate-x-0"
              }
  `}
          >
            {/* Panel Header */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 flex items-center text-sm sm:text-base flex-wrap gap-2">
                <span>Questions Overview</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {allocatedQuestions} Questions
                </span>
              </h3>
              <button
                onClick={() => setShowQuestionPanel(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Legend */}
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    Answered ({getAnsweredCount()})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    Not Answered (
                    {allocatedQuestions -
                      getAnsweredCount() -
                      getNotVisitedCount()}
                    )
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    Not Visited ({getNotVisitedCount()})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    Review ({getMarkedForReviewCount()})
                  </span>
                </div>
              </div>
            </div>

            {/* Question Grid */}
            <div className="p-3 sm:p-4 flex-grow overflow-y-auto">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: allocatedQuestions }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square flex items-center justify-center text-xs sm:text-sm rounded-md transition-all font-medium ${currentQuestion === index
                        ? "bg-blue-600 text-white border-2 border-blue-700 shadow-md"
                        : markedForReview[`${currentSubject}-${index}`]
                          ? "bg-amber-500 text-white"
                          : answers[`${currentSubject}-${index}`] !== undefined
                            ? "bg-green-500 text-white"
                            : visitedQuestions[`${currentSubject}-${index}`]
                              ? "bg-red-500 text-white"
                              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    onClick={() => {
                      setCurrentQuestion(index);
                      if (!visitedQuestions[`${currentSubject}-${index}`]) {
                        setVisitedQuestions({
                          ...visitedQuestions,
                          [`${currentSubject}-${index}`]: true,
                        });
                      }
                      setShowQuestionPanel(false); // Close panel on mobile after selection
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handleSubmitConformation}
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Submit Test
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Tab Switch Warning Modal */}
      {showTabSwitchWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Warning: Tab Switch Detected
              </h3>
              <p className="text-gray-600 mb-4">
                You have switched tabs {tabSwitchCount} time(s).
                {tabSwitchCount < 2 
                  ? ` You have ${2 - tabSwitchCount} warning(s) left. On the 3rd attempt, your test will be automatically submitted.`
                  : " This is your final warning! Next tab switch will submit your test automatically."
                }
              </p>
              <button
                onClick={() => setShowTabSwitchWarning(false)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Warning Modal */}
      {showFullscreenWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Warning: Fullscreen Mode Required
              </h3>
              <p className="text-gray-600 mb-4">
                You have attempted to exit fullscreen {fullscreenExitCount} time(s).
                {fullscreenExitCount < 2 
                  ? ` You have ${2 - fullscreenExitCount} warning(s) left. On the 3rd attempt, your test will be automatically submitted.`
                  : " This is your final warning! Next attempt will submit your test automatically."
                }
              </p>
              <button
                onClick={() => setShowFullscreenWarning(false)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Continue Test
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Manual Submit Confirmation Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Confirm Test Submission
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Are you sure you want to submit this test? <br />
              Once submitted, you won't be able to change your answers.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                onClick={() => setIsModalVisible(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterface;
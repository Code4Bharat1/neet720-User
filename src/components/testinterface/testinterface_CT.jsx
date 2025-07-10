"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import {
  Timer,
  FlaskRoundIcon as Flask,
  Atom,
  Dna,
  Flag,
  Clock,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Zap,
  FlameIcon as Fire,
  CheckCircle,
  Eye,
  Sparkles,
  HelpCircle,
  Target,
  BarChart3,
  AlertCircle,
  Brain,
  Trophy,
} from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const subjectIcons = {
  Physics: {
    icon: Atom,
    color: "text-blue-600",
    bgColor: "bg-blue-500",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-300",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
    lightGradient: "from-blue-50 to-blue-100",
  },
  Chemistry: {
    icon: Flask,
    color: "text-green-600",
    bgColor: "bg-green-500",
    bgLight: "bg-green-50",
    borderColor: "border-green-300",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
    lightGradient: "from-green-50 to-green-100",
  },
  Biology: {
    icon: Dna,
    color: "text-red-600",
    bgColor: "bg-red-500",
    bgLight: "bg-red-50",
    borderColor: "border-red-300",
    gradientFrom: "from-red-400",
    gradientTo: "to-red-600",
    lightGradient: "from-red-50 to-red-100",
  },
}

const TestInterface = () => {
  // State management
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [selectedChapters, setSelectedChapters] = useState({})
  const [questionsData, setQuestionsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentSubject, setCurrentSubject] = useState("Chemistry")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [visitedQuestions, setVisitedQuestions] = useState({})
  const [markedForReview, setMarkedForReview] = useState({})
  const [timer, setTimer] = useState(0)
  const [startTime, setStartTime] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredOption, setHoveredOption] = useState(null)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [numQuestions, setNumQuestions] = useState(0)

  const timerInitialized = useRef(false)
  const intervalRef = useRef(null)
  const router = useRouter()

  // Fullscreen escape handler
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement &&
        !document.mozFullscreenElement
      ) {
        router.push("/testselection")
      }
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange)
    document.addEventListener("mozfullscreenchange", handleFullScreenChange)
    document.addEventListener("MSFullscreenChange", handleFullScreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullScreenChange)
    }
  }, [router])

  // Initialization effect
  useEffect(() => {
    if (typeof window === "undefined") return

    const storedSelectedChapters = JSON.parse(localStorage.getItem("selectedChapters")) || {}
    setSelectedChapters(storedSelectedChapters)

    const storedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || []
    setSelectedSubjects(storedSubjects)

    let totalQuestionsCount = 0
    storedSubjects.forEach((subject) => {
      const subjectChapters = storedSelectedChapters[subject]
      if (subjectChapters) {
        totalQuestionsCount += Object.values(subjectChapters).reduce(
          (total, chapter) => total + (Number(chapter.numQuestions) || 0),
          0,
        )
      }
    })

    setTotalQuestions(totalQuestionsCount)

    if (totalQuestionsCount > 0 && !timerInitialized.current) {
      setTimer(totalQuestionsCount * 60)
      timerInitialized.current = true
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/createtest/fetch-questions`, {
          selectedSubjects: storedSubjects,
          selectedChapters: storedSelectedChapters,
          numQuestions: totalQuestionsCount,
        })
        const data = response.data

        const subjectWiseQuestions = {
          Physics: [],
          Chemistry: [],
          Biology: [],
        }

        data.questions.forEach((item) => {
          const subject = item.question.subject
          subjectWiseQuestions[subject]?.push({
            id: item.question.id,
            question: item.question.question_text,
            options: item.options.map((opt) => opt.option_text),
            correctAnswer: item.correctAnswer ? item.correctAnswer.option_text : null,
          })
        })

        setQuestionsData(subjectWiseQuestions)
        setLoading(false)

        const questionInfo = data.questions.map((item) => ({
          chapterId: item.question.chapterId,
          chapterName: item.question.chapter,
          questionIds: item.question.id,
        }))
        localStorage.setItem("questionInfo", JSON.stringify(questionInfo))
      } catch (err) {
        console.error("Error fetching questions:", err)
        setError("Failed to load questions")
        setLoading(false)
      }
    }

    fetchQuestions()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  //prevent reload on F5 or Ctrl+R
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!quizCompleted) {
        event.preventDefault()
        event.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (!timerInitialized.current) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerInitialized.current])

  // Subject questions update
  useEffect(() => {
    if (!selectedChapters[currentSubject]) return

    const subjectChapters = selectedChapters[currentSubject]
    const numQuestion = Object.values(subjectChapters).reduce(
      (total, chapter) => total + (Number(chapter.numQuestions) || 0),
      0,
    )

    setNumQuestions(numQuestion)
  }, [currentSubject, selectedChapters])

  // Format time for display
  const formattedTime = {
    hours: String(Math.floor(timer / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((timer % 3600) / 60)).padStart(2, "0"),
    seconds: String(timer % 60).padStart(2, "0"),
  }

  const handleOptionClick = (index) => {
    if (!questionsData[currentSubject] || !questionsData[currentSubject][currentQuestion]) {
      return
    }

    const questionData = questionsData[currentSubject][currentQuestion]
    const selectedAnswer = questionData.options[index]
    const correctAnswer = questionData.correctAnswer
    const isCorrect = selectedAnswer === correctAnswer

    const answerSnapshot = {
      question_id: questionData.id,
      selectedAnswer,
      correctAnswer,
    }
    localStorage.setItem("lastAnswerClicked", JSON.stringify(answerSnapshot))

    const questionId = questionData.id
    const questionInfo = JSON.parse(localStorage.getItem("questionInfo")) || []
    const chapterInfo = questionInfo.find((item) => item.questionIds === questionId)
    const chapterName = chapterInfo ? chapterInfo.chapterName : "Unknown Chapter"

    const answerData = {
      subject: currentSubject,
      question: questionData.question,
      question_id: questionData.id,
      chapterName,
      selectedAnswer,
      isCorrect,
      correctAnswer,
    }

    const savedAnswers = JSON.parse(localStorage.getItem("testAnswers")) || []

    const existingIndex = savedAnswers.findIndex(
      (answer) => answer.question_id === questionData.id && answer.subject === currentSubject,
    )

    const currentTime = new Date()
    const timeTakenInSeconds = (currentTime - startTime) / 1000
    const minutes = Math.floor(timeTakenInSeconds / 60)
    const seconds = Math.floor(timeTakenInSeconds % 60)

    const answerWithTime = { ...answerData, timeTaken: { minutes, seconds } }

    if (existingIndex >= 0) {
      savedAnswers[existingIndex] = answerWithTime
    } else {
      savedAnswers.push(answerWithTime)
    }

    localStorage.setItem("testAnswers", JSON.stringify(savedAnswers))

    setAnswers({ ...answers, [`${currentSubject}-${currentQuestion}`]: index })
    setVisitedQuestions({
      ...visitedQuestions,
      [`${currentSubject}-${currentQuestion}`]: true,
    })

    const previousTime = JSON.parse(localStorage.getItem("questionTime")) || {}
    previousTime[`${currentSubject}-${currentQuestion}`] = timeTakenInSeconds
    localStorage.setItem("questionTime", JSON.stringify(previousTime))

    const savedTimeForCurrentQuestion = previousTime[`${currentSubject}-${currentQuestion}`]
    const newStartTime = savedTimeForCurrentQuestion
      ? new Date(new Date() - savedTimeForCurrentQuestion * 1000)
      : currentTime

    setStartTime(newStartTime)
  }

  const handleNavigation = (direction) => {
    const totalQuestions = numQuestions || 0

    if (direction === "next" && currentQuestion >= totalQuestions - 1) {
      const currentSubjectIndex = selectedSubjects.indexOf(currentSubject)
      const nextSubjectIndex = (currentSubjectIndex + 1) % selectedSubjects.length
      setCurrentSubject(selectedSubjects[nextSubjectIndex])
      setCurrentQuestion(0)
    } else if (direction === "prev" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (direction === "next" && currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (direction === "prev" && currentQuestion === 0) {
      const currentSubjectIndex = selectedSubjects.indexOf(currentSubject)
      if (currentSubjectIndex > 0) {
        const prevSubject = selectedSubjects[currentSubjectIndex - 1]
        setCurrentSubject(prevSubject)

        const prevSubjectChapters = selectedChapters[prevSubject]
        const prevSubjectQuestions = prevSubjectChapters
          ? Object.values(prevSubjectChapters).reduce(
              (total, chapter) => total + (Number(chapter.numQuestions) || 0),
              0,
            )
          : 0

        setCurrentQuestion(Math.max(prevSubjectQuestions - 1, 0))
      }
    }
  }

  const handleReviewLater = () => {
    setMarkedForReview({
      ...markedForReview,
      [`${currentSubject}-${currentQuestion}`]: !markedForReview[`${currentSubject}-${currentQuestion}`],
    })
  }

  const handleClearResponse = () => {
    const updatedAnswers = { ...answers }
    delete updatedAnswers[`${currentSubject}-${currentQuestion}`]
    setAnswers(updatedAnswers)

    let savedAnswers = JSON.parse(localStorage.getItem("testAnswers")) || []
    savedAnswers = savedAnswers.filter(
      (answer) =>
        !(
          answer.question_id === questionsData[currentSubject][currentQuestion]?.id && answer.subject === currentSubject
        ),
    )
    localStorage.setItem("testAnswers", JSON.stringify(savedAnswers))
  }

  const calculateTotalTime = (subject) => {
    const questionTime = JSON.parse(localStorage.getItem("questionTime")) || {}
    let totalTimeInSeconds = 0

    Object.keys(questionTime).forEach((key) => {
      if (key.startsWith(subject)) {
        totalTimeInSeconds += questionTime[key]
      }
    })

    const minutes = Math.floor(totalTimeInSeconds / 60)
    const seconds = Math.floor(totalTimeInSeconds % 60)

    return { minutes, seconds }
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  const getMarkedCount = () => {
    return Object.values(markedForReview).filter(Boolean).length
  }

  const getAnsweredCountBySubject = (subject) => {
    return Object.keys(answers).filter((key) => key.startsWith(`${subject}-`)).length
  }

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit the test?")) return

    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      const testAnswers = JSON.parse(localStorage.getItem("testAnswers")) || []
      const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
      const testName = localStorage.getItem("testName") || []

      if (!authToken) {
        alert("No authentication token found!")
        return
      }

      const correctAnswers = []
      const wrongAnswers = []
      const notAttempted = []

      const subjectWiseMarks = {
        Physics: 0,
        Chemistry: 0,
        Biology: 0,
      }

      const endTime = new Date()
      let total_marks = 0

      const totalTimePerSubject = {
        Physics: calculateTotalTime("Physics"),
        Chemistry: calculateTotalTime("Chemistry"),
        Biology: calculateTotalTime("Biology"),
      }

      testAnswers.forEach((answerObj) => {
        const { subject, question, selectedAnswer, correctAnswer } = answerObj

        const chapter = "General"
        const questionId = question
        const marks = selectedAnswer === correctAnswer ? 4 : -1
        const timeSpent = "N/A"

        if (selectedAnswer === correctAnswer) {
          subjectWiseMarks[subject] += 4
        } else if (selectedAnswer !== null && selectedAnswer !== "") {
          subjectWiseMarks[subject] -= 1
        }

        const answerPayload = [questionId, subject, chapter, selectedAnswer, correctAnswer, marks, timeSpent]

        if (!selectedAnswer) {
          notAttempted.push([questionId, subject, chapter])
        } else if (selectedAnswer === correctAnswer) {
          correctAnswers.push(answerPayload)
          total_marks += 4
        } else {
          if (selectedAnswer !== "") {
            wrongAnswers.push(answerPayload)
          }
        }
      })

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/createtest/submit-test`,
        {
          correctAnswers,
          wrongAnswers,
          notAttempted,
          total_marks,
          selectedChapters,
          testName,
          startTime,
          endTime,
          subjectWiseMarks,
          totalTimePerSubject,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      toast.success(response.data.message, {
        duration: 5000,
      })
      router.push("/resultCT")
    } catch (error) {
      toast.error("Error submitting test!", {
        duration: 5000,
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-6"></div>
            <Brain className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Your Test</h3>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Preparing amazing questions for you...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  const currentQuestionData = questionsData[currentSubject]?.[currentQuestion]
  const subjectConfig = subjectIcons[currentSubject] || subjectIcons.Physics
  const isLowTime = timer < 300
  const SubjectIcon = subjectConfig.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 select-none">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Timer Section */}
            <div className="relative">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl ${
                    isLowTime
                      ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-lg shadow-red-200"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-200"
                  } transition-all`}
                >
                  <Timer className={`text-2xl text-white ${isLowTime ? "animate-bounce" : ""}`} />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`${
                      isLowTime
                        ? "bg-gradient-to-r from-red-600 to-red-700 animate-pulse shadow-lg shadow-red-300"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg"
                    } text-white px-4 py-2 rounded-xl font-mono text-lg min-w-[4rem] text-center transition-all transform hover:scale-105`}
                  >
                    {formattedTime.hours}
                  </div>
                  <span className="text-gray-600 font-bold text-xl">:</span>
                  <div
                    className={`${
                      isLowTime
                        ? "bg-gradient-to-r from-red-600 to-red-700 animate-pulse shadow-lg shadow-red-300"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg"
                    } text-white px-4 py-2 rounded-xl font-mono text-lg min-w-[4rem] text-center transition-all transform hover:scale-105`}
                  >
                    {formattedTime.minutes}
                  </div>
                  <span className="text-gray-600 font-bold text-xl">:</span>
                  <div
                    className={`${
                      isLowTime
                        ? "bg-gradient-to-r from-red-600 to-red-700 animate-pulse shadow-lg shadow-red-300"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg"
                    } text-white px-4 py-2 rounded-xl font-mono text-lg min-w-[4rem] text-center transition-all transform hover:scale-105`}
                  >
                    {formattedTime.seconds}
                  </div>
                </div>
              </div>
              {isLowTime && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                  <div className="absolute top-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Subject Tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {selectedSubjects.map((subject) => {
                const isActive = currentSubject === subject
                const config = subjectIcons[subject] || subjectIcons.Physics
                const Icon = config.icon

                return (
                  <button
                    key={subject}
                    onClick={() => {
                      setCurrentSubject(subject)
                      setCurrentQuestion(0)
                    }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all transform hover:scale-105 shadow-lg ${
                      isActive
                        ? `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white shadow-xl`
                        : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-gray-200"
                    }`}
                  >
                    <Icon className={`text-xl ${isActive ? "text-white" : config.color}`} />
                    <span className="font-semibold">{subject}</span>
                    <div
                      className={`w-3 h-3 rounded-full ${isActive ? "bg-white/80" : `${config.bgColor} animate-pulse`}`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="relative overflow-hidden px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 flex items-center gap-3 font-semibold"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <Zap className="text-lg" />
              )}
              Submit Test
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full hover:translate-x-[-200%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Question Section */}
        <div className="xl:col-span-2">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full filter blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100/30 to-orange-100/30 rounded-full filter blur-3xl translate-y-32 -translate-x-32"></div>

            {/* Question Header */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subjectConfig.gradientFrom} ${subjectConfig.gradientTo} flex items-center justify-center text-white shadow-xl`}
                    >
                      <HelpCircle className="text-2xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-sm mb-1">
                        <span className={`font-bold ${subjectConfig.color} text-lg`}>{currentSubject}</span>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-600 font-medium">
                          Question {currentQuestion + 1} of {numQuestions}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Total: {totalQuestions} Questions • Max Score: {totalQuestions * 4} marks
                      </div>
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed mb-6">
                    {currentQuestionData?.question || "No Question Available"}
                  </h2>
                </div>

                <button
                  onClick={handleReviewLater}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-110 shadow-lg ${
                    markedForReview[`${currentSubject}-${currentQuestion}`]
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Mark for review"
                >
                  <Clock className={markedForReview[`${currentSubject}-${currentQuestion}`] ? "animate-pulse" : ""} />
                </button>
              </div>

              {/* Enhanced Options with Radio Inputs */}
              <div className="space-y-4 mb-8">
                {currentQuestionData?.options.map((option, index) => {
                  const isSelected = answers[`${currentSubject}-${currentQuestion}`] === index
                  const isHovered = hoveredOption === index
                  const optionLetter = String.fromCharCode(65 + index) // A, B, C, D

                  return (
                    <label
                      key={index}
                      className={`group relative flex items-center gap-4 p-2 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] hover:shadow-xl ${
                        isSelected
                          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg shadow-blue-200"
                          : "border-gray-200 bg-white/80 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      }`}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      {/* Custom Radio Input */}
                      <div className="relative">
                        <input
                          type="radio"
                          name={`question-${currentSubject}-${currentQuestion}`}
                          value={index}
                          checked={isSelected}
                          onChange={() => handleOptionClick(index)}
                          className="sr-only"
                        />
                        <div
                          className={`relative w-12 h-12 rounded-full border-3 flex items-center justify-center font-bold text-lg transition-all ${
                            isSelected
                              ? "border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                              : "border-gray-300 bg-white text-gray-600 group-hover:border-blue-400 group-hover:bg-blue-50"
                          }`}
                        >
                          {optionLetter}
                          {isSelected && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 animate-pulse"></div>
                          )}
                        </div>
                        {isHovered && !isSelected && (
                          <div className="absolute inset-0 rounded-full bg-blue-200 opacity-30 animate-pulse"></div>
                        )}
                      </div>

                      {/* Option Text */}
                      <div className="flex-1">
                        <span className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">{option}</span>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Selected</span>
                        </div>
                      )}

                      {/* Animated Background Effect */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent transform -skew-x-12 translate-x-full animate-[shimmer_1s_ease-out] pointer-events-none rounded-2xl"></div>
                      )}
                    </label>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleClearResponse}
                  className="flex items-center gap-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all transform hover:scale-105 font-medium"
                >
                  <RotateCcw className="w-5 h-5" />
                  Clear Response
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleNavigation("prev")}
                    disabled={currentQuestion === 0 && selectedSubjects.indexOf(currentSubject) === 0}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-md font-medium"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <button
                    onClick={() => handleNavigation("next")}
                    disabled={
                      currentQuestion === numQuestions - 1 &&
                      selectedSubjects.indexOf(currentSubject) === selectedSubjects.length - 1
                    }
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Progress Card */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-2xl" />
                <h3 className="font-bold text-xl">Test Progress</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-green-300 w-5 h-5" />
                    <span className="text-sm font-medium">Answered</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {getAnsweredCount()}/{totalQuestions}
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-red-300 w-5 h-5" />
                    <span className="text-sm font-medium">Marked</span>
                  </div>
                  <div className="text-3xl font-bold">{getMarkedCount()}</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-3 mb-2">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full transition-all duration-700"
                  style={{ width: `${(getAnsweredCount() / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="text-center text-sm font-medium">
                {Math.round((getAnsweredCount() / totalQuestions) * 100)}% Complete
              </p>
            </div>
          </div>

          {/* Question Navigation Grid */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${subjectConfig.gradientFrom} ${subjectConfig.gradientTo} rounded-2xl flex items-center justify-center text-white shadow-lg`}
              >
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{currentSubject} Questions</h3>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-6">
              {Array.from({ length: numQuestions }).map((_, index) => {
                const isCurrentQuestion = currentQuestion === index
                const isAnswered = answers[`${currentSubject}-${index}`] !== undefined
                const isMarked = markedForReview[`${currentSubject}-${index}`]
                const isVisited = visitedQuestions[`${currentSubject}-${index}`]

                let buttonClass =
                  "w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all transform hover:scale-110 shadow-lg relative "

                if (isCurrentQuestion) {
                  buttonClass += "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-300 scale-110"
                } else if (isMarked) {
                  buttonClass += "bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-red-300"
                } else if (isAnswered) {
                  buttonClass += "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-green-300"
                } else if (isVisited) {
                  buttonClass += "bg-gradient-to-br from-orange-400 to-pink-400 text-white shadow-orange-300"
                } else {
                  buttonClass += "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-gray-200"
                }

                return (
                  <button key={index} onClick={() => setCurrentQuestion(index)} className={buttonClass}>
                    {index + 1}
                    {isCurrentQuestion && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/30 to-transparent animate-pulse"></div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-md"></div>
                <span className="text-gray-600 font-medium">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-md"></div>
                <span className="text-gray-600 font-medium">Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-pink-400 rounded-md"></div>
                <span className="text-gray-600 font-medium">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md"></div>
                <span className="text-gray-600 font-medium">Current</span>
              </div>
            </div>
          </div>

          {/* Subject Statistics */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Subject Statistics
            </h3>
            <div className="space-y-4">
              {selectedSubjects.map((subject) => {
                const subjectQuestions = selectedChapters[subject]
                  ? Object.values(selectedChapters[subject]).reduce(
                      (total, chapter) => total + (Number(chapter.numQuestions) || 0),
                      0,
                    )
                  : 0
                const subjectAnswered = getAnsweredCountBySubject(subject)
                const percentage = subjectQuestions > 0 ? Math.round((subjectAnswered / subjectQuestions) * 100) : 0
                const Icon = subjectIcons[subject]?.icon || Atom
                const config = subjectIcons[subject] || subjectIcons.Physics

                return (
                  <div key={subject} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">{subject}</span>
                        <span className="text-sm text-gray-500 font-medium">
                          {subjectAnswered}/{subjectQuestions}
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} shadow-sm`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">{percentage}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Submit Button */}
          <div className="xl:hidden">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-3 font-bold text-lg"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              ) : (
                <Fire className="text-xl" />
              )}
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  )
}

export default TestInterface

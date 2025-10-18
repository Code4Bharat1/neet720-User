"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
  Clock,
  User,
  Bot,
  Trophy,
  Target,
  ChevronLeft,
  ChevronRight,
  Plus,
  Flag,
  Zap,
  Brain,
  Timer,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  BarChart3,
  TrendingUp,
  Crown,
  Sparkles,
  CloudLightningIcon as Lightning,
  FlameIcon as Fire,
  Rocket,
  Shield,
  Heart,
  Eye,
  Gamepad2,
} from "lucide-react"

const QuizInterface = () => {
  const quizSettings = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem("fastquiz"))
      return {
        difficulty: stored?.difficultyLevel || "medium",
        numberOfQuestions: stored?.numberOfQuestions || 10,
      }
    } catch (err) {
      return { difficulty: "medium", numberOfQuestions: 10 }
    }
  })()

  const router = useRouter()
  const { difficulty, numberOfQuestions } = quizSettings

  const difficultySettings = {
    easy: {
      timeLimit: 50,
      color: "emerald",
      bgGradient: "from-emerald-400 to-teal-500",
      icon: Shield,
      emoji: "🟢",
    },
    medium: {
      timeLimit: 40,
      color: "amber",
      bgGradient: "from-amber-400 to-orange-500",
      icon: Zap,
      emoji: "🟡",
    },
    hard: {
      timeLimit: 30,
      color: "red",
      bgGradient: "from-red-400 to-pink-500",
      icon: Fire,
      emoji: "🔴",
    },
  }

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(difficultySettings[difficulty].timeLimit)
  const [showResult, setShowResult] = useState(false)
  const [botPrompt, setBotPrompt] = useState("")
  const [showFinalResults, setShowFinalResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [botThinking, setBotThinking] = useState(false)
  const [addingQuestions, setAddingQuestions] = useState(false)
  const [noMoreQuestions, setNoMoreQuestions] = useState(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(null);

  const serialLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const timerRef = useRef(null)
  const thinkingRef = useRef(null)
  const nextQuestionTimerRef = useRef(null)

  const currentQuestion = questions[currentQuestionIndex] || {}
  const currentAnswer = answers[currentQuestion.id]
  const DifficultyIcon = difficultySettings[difficulty].icon

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

  useEffect(() => {
    fetchQuestions()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (thinkingRef.current) clearInterval(thinkingRef.current)
      if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (questions.length > 0 && !quizCompleted) {
      startTimer()
      startBotThinking()
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (thinkingRef.current) clearInterval(thinkingRef.current)
      if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current)
    }
  }, [currentQuestionIndex, questions])

  const fetchQuestions = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`, {
        numberOfQuestions: numberOfQuestions,
        difficulty: difficulty.toLowerCase(),
        excludeIds: [],
      })
      setQuestions(res.data.questions)
      console.log("Fetched questions:", res.data.questions)
    } catch (err) {
      setError("Failed to fetch questions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" && currentQuestionIndex > 0) {
      handleNavigation("prev");
    } else if (
      event.key === "ArrowRight" &&
      currentQuestionIndex < questions.length - 1
    ) {
      handleNavigation("next");
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestionIndex, questions.length]);

  const handleAddMoreQuestions = async (count = 5) => {
    setAddingQuestions(true)
    setError("")
    try {
      const usedIds = questions.map((q) => q.id)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`, {
        numberOfQuestions: count,
        difficulty,
        excludeIds: usedIds,
      })

      const newQuestions = res.data.questions.filter((q) => !usedIds.includes(q.id))

      if (newQuestions.length === 0) {
        setNoMoreQuestions(true)
        setError("No more unique questions available for this quiz.")
      } else {
        setQuestions((prev) => [...prev, ...newQuestions])
        setNoMoreQuestions(false)
      }
    } catch (err) {
      setError("Failed to add more questions")
    } finally {
      setAddingQuestions(false)
    }
  }

  const startBotThinking = () => {
    setBotThinking(true)
    setBotPrompt("🤔 Let me analyze this question...")

    const thinkingPrompts = [
      { text: "🧠 Processing the options...", icon: Brain },
      { text: "💭 Considering all possibilities...", icon: Eye },
      { text: "⚡ Almost got it...", icon: Lightning },
      { text: "🎯 I think I know the answer...", icon: Target },
      { text: "🔍 Double-checking my logic...", icon: Eye },
      { text: "💡 This is interesting!", icon: Sparkles },
      { text: "⏳ Racing against time...", icon: Timer },
      { text: "🤖 My circuits are working...", icon: Bot },
      { text: "🏃‍♂️ Almost there...", icon: Rocket },
      { text: "⚡ Ready to answer!", icon: Zap },
    ]

    let promptIndex = 0
    thinkingRef.current = setInterval(
      () => {
        if (promptIndex < thinkingPrompts.length && !showResult) {
          setBotPrompt(thinkingPrompts[promptIndex].text)
          promptIndex++
        } else {
          setBotPrompt("⚡ Ready when time's up!")
        }
      },
      2000 + Math.random() * 2000,
    )
  }

  const stopBotThinking = () => {
    setBotThinking(false)
    if (thinkingRef.current) {
      clearInterval(thinkingRef.current)
    }
  }

  useEffect(() => {
  const handleArrowKeyNavigation = (e) => {
    if (showResult) return;

    const optionCount = currentQuestion.options.length;

    if (e.key === "ArrowDown") {
      setFocusedOptionIndex((prev) =>
        prev === null || prev === optionCount - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      setFocusedOptionIndex((prev) =>
        prev === null || prev === 0 ? optionCount - 1 : prev - 1
      );
    } else if (e.key === "Enter" && focusedOptionIndex !== null) {
      const selectedOption = currentQuestion.options[focusedOptionIndex];
      handleOptionSelect(currentQuestion.id, selectedOption.option_text);
    }
  };

  window.addEventListener("keydown", handleArrowKeyNavigation);
  return () => window.removeEventListener("keydown", handleArrowKeyNavigation);
}, [focusedOptionIndex, currentQuestion, showResult]);

  const startTimer = () => {
    setTimeLeft(difficultySettings[difficulty].timeLimit)
    setShowResult(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          stopBotThinking()
          autoAnswerQuestion()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const autoAnswerQuestion = () => {
    const correctAnswer = currentQuestion.options.find((opt) => opt.is_correct)?.option_text || "";

    // Forcefully set bot answer every time (even if user answered wrong)
    handleOptionSelect(currentQuestion.id, correctAnswer, true);

    setBotPrompt("⏱️ Time's up! I got this one for my team!");
    setShowResult(true);
    
    // Auto move to next question after 3 seconds
    scheduleNextQuestion();
  };

  const scheduleNextQuestion = () => {
    if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current);
    
    nextQuestionTimerRef.current = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If it's the last question, submit the test
        handleSubmitTest();
      }
    }, 3000);
  };

  const handleOptionSelect = (questionId, selectedOption, isAutoAnswered = false) => {
    const correctAnswer = questions.find((q) => q.id === questionId)?.options.find((opt) => opt.is_correct)?.option_text || "";

    const isCorrect = selectedOption?.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();
    console.log("Selected Option:", selectedOption);
    console.log("Correct Answer:", correctAnswer);
    console.log("Is Correct:", isCorrect);
    
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedOption,
        isAutoAnswered,
        isCorrect,
        correctAnswer,
      },
    }));

    if (!isAutoAnswered) {
      clearInterval(timerRef.current);
      stopBotThinking();
      setShowResult(true);

      const feedbacks = [
        isCorrect ? "🎯 Excellent! You beat me to it!" : "🤔 Oops! That's a point for me.",
        isCorrect ? "🔥 You're quick! Well done!" : "😅 I would have gotten that right!",
        isCorrect ? "👏 Nice work! You're on fire!" : "💡 Better luck next time!",
        isCorrect ? "⚡ Lightning fast! Amazing!" : "🤖 My circuits say otherwise!",
        isCorrect ? "🏆 You got it before me!" : "🎯 I was about to pick the right one!",
      ];

      setBotPrompt(feedbacks[Math.floor(Math.random() * feedbacks.length)]);

      // Auto move to next question after 3 seconds, regardless of whether answer was correct or wrong
      scheduleNextQuestion();
    }
  };

  const handleNavigation = (direction) => {
    // Clear any existing next question timer when manually navigating
    if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current);
    
    if (direction === "next" && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleClearResponse = () => {
    // Clear any existing next question timer when clearing response
    if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current);
    
    const updatedAnswers = { ...answers }
    delete updatedAnswers[currentQuestion.id]
    setAnswers(updatedAnswers)
    setShowResult(false)
    startTimer()
    startBotThinking()
    setBotPrompt("🔄 Fresh start! Let's see who gets it first!")
  }

  const handleSubmitTest = () => {
    // Clear all timers when submitting test
    if (timerRef.current) clearInterval(timerRef.current);
    if (thinkingRef.current) clearInterval(thinkingRef.current);
    if (nextQuestionTimerRef.current) clearTimeout(nextQuestionTimerRef.current);
    
    setQuizCompleted(true)
    setShowFinalResults(true)
  }

  const calculateResults = () => {
    let studentCorrect = 0
    let botCorrect = 0
    let totalAnswered = 0

    Object.values(answers).forEach((answer) => {
      if (answer.isCorrect) {
        if (answer.isAutoAnswered) {
          botCorrect++
        } else {
          studentCorrect++
        }
      }
      totalAnswered++
    })

    const studentAccuracy = totalAnswered > 0 ? (studentCorrect / Object.keys(answers).length) * 100 : 0
    const botAccuracy = totalAnswered > 0 ? (botCorrect / Object.keys(answers).length) * 100 : 0

    return {
      studentCorrect,
      botCorrect,
      totalQuestions: questions.length,
      totalAnswered,
      studentAccuracy: Math.round(studentAccuracy),
      botAccuracy: Math.round(botAccuracy),
      winner: studentCorrect > botCorrect ? "student" : studentCorrect < botCorrect ? "bot" : "tie",
    }
  }

  const getOptionClasses = (opt) => {
    let classes =
      "group relative flex items-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg"

    const correctAnswer = questions.find((q) => q.id === currentQuestion.id)?.options.find((opt) => opt.is_correct)?.option_text || "";
    const selectedOption = currentAnswer?.selectedOption

    if (showResult) {
      if (opt === correctAnswer) {
        classes += " bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-400 shadow-emerald-200 shadow-lg"
      } else if (opt === selectedOption) {
        classes += " bg-gradient-to-r from-red-50 to-red-100 border-red-400 shadow-red-200 shadow-lg"
      } else {
        classes += " bg-gray-50 border-gray-200 opacity-60"
      }
    } else if (opt === selectedOption) {
      classes += " bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-400 shadow-blue-200 shadow-lg"
    } else {
      classes += " border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
    }

    return classes
  }

  const getTimerColor = () => {
    const timeLimit = difficultySettings[difficulty].timeLimit
    if (timeLeft > timeLimit * 0.6) return "text-emerald-500 bg-gradient-to-r from-emerald-100 to-emerald-200"
    if (timeLeft > timeLimit * 0.3) return "text-amber-500 bg-gradient-to-r from-amber-100 to-amber-200"
    return "text-red-500 bg-gradient-to-r from-red-100 to-red-200 animate-pulse"
  }

  // Final Results Screen
  if (showFinalResults) {
    const results = calculateResults()

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Animated Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-bounce">
              <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Quiz Complete!
            </h1>
            <p className="text-lg md:text-xl text-slate-600">Let's see how you performed against the AI Bot</p>
          </div>

          {/* Winner Announcement */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-8 shadow-2xl border border-white/50">
            <div className="text-center">
              {results.winner === "student" && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Crown className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 animate-pulse" />
                      <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    🎉 Victory! 🎉
                  </h2>
                  <p className="text-slate-600 text-lg">Outstanding! You outperformed the AI Bot!</p>
                </div>
              )}

              {results.winner === "bot" && (
                <div className="space-y-4">
                  <Bot className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mx-auto animate-bounce" />
                  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                    🤖 Bot Wins! 🤖
                  </h2>
                  <p className="text-slate-600 text-lg">
                    The AI Bot was faster this time. Challenge accepted for next round!
                  </p>
                </div>
              )}

              {results.winner === "tie" && (
                <div className="space-y-4">
                  <div className="flex justify-center space-x-2">
                    <User className="w-12 h-12 text-blue-500" />
                    <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                    <Bot className="w-12 h-12 text-purple-500" />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    🤝 Perfect Tie! 🤝
                  </h2>
                  <p className="text-slate-600 text-lg">Incredible match! You and the AI are perfectly matched!</p>
                </div>
              )}
            </div>
          </div>

          {/* Score Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Student Score Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Your Performance</h3>
                  <p className="text-slate-600 flex items-center gap-1">
                    <Gamepad2 className="w-4 h-4" />
                    Human Player
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                  <span className="text-slate-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Correct Answers
                  </span>
                  <span className="text-3xl font-bold text-emerald-600">{results.studentCorrect}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <span className="text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Accuracy Rate
                  </span>
                  <span className="text-2xl font-bold text-blue-600">{results.studentAccuracy}%</span>
                </div>
              </div>
            </div>

            {/* Bot Score Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">AI Bot Score</h3>
                  <p className="text-slate-600 flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    AI Assistant
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                  <span className="text-slate-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Correct Answers
                  </span>
                  <span className="text-3xl font-bold text-emerald-600">{results.botCorrect}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <span className="text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Accuracy Rate
                  </span>
                  <span className="text-2xl font-bold text-purple-600">{results.botAccuracy}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Quiz Statistics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <Target className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{results.totalQuestions}</div>
                <div className="text-sm text-slate-600">Total Questions</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{results.totalAnswered}</div>
                <div className="text-sm text-slate-600">Answered</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                <DifficultyIcon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800 capitalize">{difficulty}</div>
                <div className="text-sm text-slate-600">Difficulty</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <Timer className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{difficultySettings[difficulty].timeLimit}s</div>
                <div className="text-sm text-slate-600">Per Question</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              Take Another Quiz
            </button>

            <button
              onClick={() => router.push("/testselection")}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 rounded-2xl font-semibold hover:from-slate-300 hover:to-slate-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main Quiz Interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 select-none max-sm:*:text-sm">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 md:p-6 mb-6 shadow-xl border border-white/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${difficultySettings[difficulty].bgGradient} rounded-full flex items-center justify-center shadow-lg`}
              >
                <DifficultyIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ⚡ Fast Quiz Challenge
                </h1>
                <p className="text-slate-600 flex items-center gap-2 text-sm md:text-base">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${difficultySettings[difficulty].bgGradient} text-white`}
                  >
                    {difficultySettings[difficulty].emoji}
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                  <Target className="w-4 h-4" />
                  {numberOfQuestions} Questions
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-slate-600 mb-1">Your Progress</div>
              <div className="flex items-center gap-2">
                <div className="text-lg md:text-xl font-bold text-indigo-600">
                  {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="w-16 md:w-24 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="relative">
              <div className="animate-spin w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-6"></div>
              <Brain className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-lg text-slate-600 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              Loading amazing questions...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Main Quiz Content */}
        {questions.length > 0 && !quizCompleted && (
          <div className="grid lg:grid-cols-3 gap-6 max-sm:gap-3 max-sm:*:text-sm">
            {/* Quiz Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timer and Progress Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-sm:p-2 shadow-xl border border-white/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold ${getTimerColor()} shadow-lg`}
                    >
                      <div className="flex flex-col items-center">
                        <Timer className="w-6 h-6 mb-1" />
                        <span className="text-lg">{timeLeft}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-lg">Time Remaining</div>
                      <div className="text-sm text-slate-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        seconds left
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-2 flex items-center justify-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      Quiz Progress
                    </div>
                    <div className="w-32 md:w-40 bg-slate-200 rounded-full h-4 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500 shadow-sm"
                        style={{
                          width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/50">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Question {currentQuestionIndex + 1}
                    </span>
                    {showResult && currentAnswer?.isCorrect && (
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Correct!
                      </span>
                    )}
                    {showResult && !currentAnswer?.isCorrect && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Incorrect
                      </span>
                    )}
                  </div>
                  <h2 className="text-sm md:text-xl font-bold text-slate-800 leading-relaxed">
                    {currentQuestion.question_text}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options?.map((opt, idx) => {
  const optionText = opt.option_text.trim().toLowerCase();
  const correctAnswer = currentAnswer?.correctAnswer?.trim().toLowerCase();
  const selectedAnswer = currentAnswer?.selectedOption?.trim().toLowerCase();

  return (
    <div
      key={opt.id}
      className={`${getOptionClasses(opt.option_text)} ${
  focusedOptionIndex === idx ? "ring-2 ring-indigo-400" : ""
}`}
      onClick={() =>
        !showResult && handleOptionSelect(currentQuestion.id, opt.option_text)
      }
    >
      <label
        htmlFor={`${currentQuestion.id}-${idx}`}
        className="flex items-center cursor-pointer w-full"
      >
        <input
          type="radio"
          id={`${currentQuestion.id}-${idx}`}
          name={`question-${currentQuestion.id}`}
          className="hidden peer"
          value={serialLetter[idx]}
          checked={selectedAnswer === optionText}
          readOnly
        />
        <span className="flex items-center justify-center mr-4 w-10 h-10 max-sm:h-7 max-sm:w-7 rounded-full border-2 text-indigo-600 font-bold text-lg border-indigo-300 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 transition-all duration-300 shadow-md">
          {serialLetter[idx]}
        </span>
        <span className="flex-1 font-medium text-slate-700">
          {opt.option_text}
        </span>
      </label>

      {/* ✅ Correct Answer */}
      {showResult && optionText === correctAnswer && (
        <div className="ml-28 -mr-14 w-1/2 max-sm:w-fit max-sm:ml-20 max-sm:mr-0 mt-1 flex items-center flex-wrap gap-1 text-green-600 text-sm font-medium">
          ✅ <span className="max-sm:hidden">Correct Answer</span>
        </div>
      )}

      {/* ❌ User's Wrong Answer */}
      {showResult &&
        selectedAnswer === optionText &&
        optionText !== correctAnswer && (
          <div className="ml-56 w-1/2 max-sm:w-fit max-sm:ml-20 mt-1 flex items-center gap-1 text-red-600 text-sm font-medium">
            ❌ <span className="max-sm:hidden">Your Answer</span>
          </div>
        )}

      {/* 🤖 Bot's Auto Answer */}
      {showResult &&
        currentAnswer?.isAutoAnswered &&
        optionText === correctAnswer && (
          <div className="ml-5 -mr-10 w-1/2 max-sm:w-fit max-sm:mr-0 mt-1 flex items-center gap-1 text-green-700 text-xs font-bold">
            <Bot className="w-4 h-4" />
            <span className="max-sm:hidden">Bot's Answer</span>
          </div>
        )}
    </div>
  );
})}


                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  {/* {currentQuestionIndex > 0 && (
                    <button
                      onClick={() => handleNavigation("prev")}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 rounded-xl font-medium hover:from-slate-300 hover:to-slate-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                  )} */}
                </div>

                <div className="flex max-sm:flex-row gap-3">
                  <button
                    onClick={() => handleAddMoreQuestions(5)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={addingQuestions || noMoreQuestions}
                  >
                    {addingQuestions ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add More Questions
                      </>
                    )}
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={() => handleNavigation("next")}
                      className="flex items-center max-sm:justify-center max-sm:px-3 gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitTest}
                      className="flex items-center gap-2 px-8 max-sm:p-3 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Flag className="w-5 h-5" />
                      Finish Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Bot Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 sticky top-6">
                {/* Bot Avatar */}
                <div className="text-center mb-6">
                  <div
                    className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-r ${difficultySettings[difficulty].bgGradient} rounded-full flex items-center justify-center shadow-xl`}
                  >
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg">AI Quiz Bot</h3>
                  <p className="text-sm text-slate-600 flex items-center justify-center gap-1">
                    <Brain className="w-4 h-4" />
                    Your AI Competitor
                  </p>
                </div>

                {/* Bot Message */}
                {botPrompt && (
                  <div
                    className={`border-2 rounded-2xl p-4 mb-6 transition-all duration-300 ${
                      botThinking
                        ? "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 animate-pulse"
                        : showResult
                          ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200"
                          : "bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200"
                    }`}
                  >
                    <div
                      className={`text-center font-medium ${
                        botThinking ? "text-amber-700" : showResult ? "text-indigo-700" : "text-slate-700"
                      }`}
                    >
                      {botPrompt}
                    </div>

                    {botThinking && (
                      <div className="flex justify-center mt-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Score Tracking */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Live Score
                  </h4>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <span className="text-slate-700 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Your Score
                    </span>
                    <span className="font-bold text-2xl text-blue-600">
                      {Object.values(answers).filter((a) => a.isCorrect && !a.isAutoAnswered).length}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <span className="text-slate-700 flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-600" />
                      Bot Score
                    </span>
                    <span className="font-bold text-2xl text-purple-600">
                      {Object.values(answers).filter((a) => a.isCorrect && a.isAutoAnswered).length}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <h5 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Quick Stats
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Questions Answered:</span>
                      <span className="font-medium">{Object.keys(answers).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Remaining:</span>
                      <span className="font-medium">{questions.length - Object.keys(answers).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Accuracy:</span>
                      <span className="font-medium">
                        {Object.keys(answers).length > 0
                          ? Math.round(
                              (Object.values(answers).filter((a) => a.isCorrect && !a.isAutoAnswered).length /
                                Object.keys(answers).length) *
                                100,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizInterface;
"use client"

import Image from "next/image"

export default function FastQuiz() {
  return (
    <div className="min-h-screen bg-slate-800 ">
      {/* Header */}
      <div className="bg-teal-500 px-2 py-4 text-center">
        <div className="flex items-center justify-center text-white text-[55px] font-medium font-serif">
          <span>Features</span>
          <span className="mx-2">&gt;&gt;</span>
          <span>Fast Quiz</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-40 py-32">
        {/* Hero Section with Image */}
        <div className="flex w-full items-center justify-between mb-8 gap-64">
          <div className="flex-1 justify-center items-center ">
            <h1 className="text-white text-[80px] font-bold mb-3 text-center">Fast Quiz</h1>
            <p className="text-teal-300 text-3xl font-bold leading-relaxed text-center">
              Compete against bots to boost
              <br />
              speed and performance.
            </p>
          </div>

          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="w-[450px] h-[450px] p-[6px] rounded-[24px] bg-[#0b3d59] border-[3px] border-[#00c4a7]">
  <Image
    src="/doctor_girl.png"
    alt="Doctor with stethoscope"
    width={192}
    height={192}
    className="w-full h-full object-cover mt-3 -ml-3 rounded-[20px]"
  />
</div>

          </div>
        </div>

        {/* Tagline Box */}
        <div className="text-center mb-4">
          <div className="border border-teal-400 rounded-lg px-6 py-2 inline-block mb-4">
            <p className="text-white text-2xl font-medium">Quick. Competitive. Brain-Boosting!</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-teal-300 text-2xl font-medium font-serif">Short Quizzes. Big Gains.</p>
        </div>

        {/* Feature Points */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start text-white text-3xl">
            <div className="w-3 h-3 bg-white rounded-full mt-4 mr-3 flex-shrink-0"></div>
            <p>The Fast Quiz feature is designed to make learning quick, fun, and competitive.</p>
          </div>
          <div className="flex items-start text-white text-3xl">
            <div className="w-3 h-3 bg-white rounded-full mt-4 mr-3 flex-shrink-0"></div>
            <p>Compete against AI bots in time-bound quizzes that simulate real-time pressure.</p>
          </div>
          <div className="flex items-start text-white text-3xl">
            <div className="w-3 h-3 bg-white rounded-full mt-4 mr-3 flex-shrink-0"></div>
            <p>These quizzes are short but intense, focusing on speed-based question solving.</p>
          </div>
        </div>

        {/* Features Button */}
        <div className="flex justify-center mb-8">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-52 py-3 rounded-full font-medium text-base transition-colors duration-200">
            Features
          </button>
        </div>

        {/* Feature Cards */}
        <div className="space-y-0">
          {/* Speed Practice */}
          <div className="flex items-center py-6 border-b border-slate-600">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">Speed Practice</h3>
              <p className="text-gray-300 text-sm">
                Sharpen reflexes and improve
                <br />
                accuracy under timed
                <br />
                conditions.
              </p>
            </div>
          </div>

          {/* Instant Feedback */}
          <div className="flex items-center py-6 border-b border-slate-600">
            <div className="flex-1 text-left">
              <p className="text-gray-300 text-sm mb-1">
                Instantly view scores, mistakes,
                <br />
                and correct answers.
              </p>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-white font-semibold text-lg">Instant Feedback</h3>
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ml-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Gamified Learning */}
          <div className="flex items-center py-6 border-b border-slate-600">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">Gamified Learning</h3>
              <p className="text-gray-300 text-sm">
                Feel the thrill of learning with
                <br />
                fun, competitive energy.
              </p>
            </div>
          </div>

          {/* Quick Revision */}
          <div className="flex items-center py-6">
            <div className="flex-1 text-left">
              <p className="text-gray-300 text-sm mb-1">
                Perfect for daily revision
                <br />
                without investing hours.
              </p>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-white font-semibold text-lg">Quick Revision</h3>
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ml-4">
              <Image
                src={"/doctor_girl.png"}
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

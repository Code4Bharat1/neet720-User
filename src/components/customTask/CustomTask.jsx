import Image from "next/image";

export default function CustomTask() {
  const features = [
    {
      left: {
        title: "Plan Daily/Weekly Goals",
        image:
          "/CT1.png",
      },
      right: "Create structured tasks based on syllabus & schedule",
    },
    {
      left: "Never miss a revision, test, or quiz again",
      right: {
        title: "Set Smart Reminders",
        image:
          "/CT2.png",
      },
    },
    {
      left: {
        title: "Track Progress Easily",
        image:
          "/CT3.png",
      },
      right: "Mark tasks as complete and feel motivated",
    },
    {
      left: "Focus more on what needs attention",
      right: {
        title: "Prioritize Topics",
        image:
          "/CT4.png",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#103f5d] text-white">
      {/* Navbar */}
      <div className="bg-[#1DB5AC] py-3 md:py-4 px-4 md:px-6 flex justify-center items-center space-x-2 md:space-x-3">
        <span className="text-white text-base md:text-lg font-semibold">
          Features
        </span>
        <span className="text-white text-lg md:text-xl font-bold">{">>>"}</span>
        <span className="text-white text-lg md:text-xl font-semibold">
          Custom Tasks
        </span>
      </div>

      {/* Hero Section - Reordered for mobile */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center px-4 sm:px-6 py-8 md:py-16 gap-6 md:gap-12 lg:gap-20 bg-[#083e5d]">
        {/* Text Section */}
        <div className="text-center">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            Custom Tasks
          </h2>

          {/* Decorative Underline */}
          <div className="flex items-center justify-center mb-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></span>
            <div className="border-t border-white w-32 sm:w-40 md:w-44 lg:w-80 mx-[1px]"></div>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></span>
          </div>

          {/* Subtext */}
          <p className="text-[#1DB5AC] text-xl sm:text-2xl md:text-3xl font-serif font-medium leading-relaxed">
            Take Control of Your Learning
          </p>
        </div>

        {/* Image - Will appear first on mobile due to flex-col-reverse */}
        <div className="rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border-2 sm:border-3 md:border-4 border-[#1DB5AC] overflow-hidden shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
          <img
            src="/doctor.png"
            alt="Doctor"
            width={256}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="bg-[#103f5d] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-4 text-center">
        {/* Highlighted Heading */}
        <div className="inline-block border border-cyan-400 rounded-full px-4 py-1 sm:px-6 sm:py-2 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-thin text-white">
            Know your possibilities. Predict your future
          </h3>
        </div>

        {/* Description Paragraph */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto">
          The Custom Tasks feature empowers students to take charge of their
          preparation by creating their own study goals and daily plans. Whether
          it's revising a chapter, taking a quiz, or setting reminders for mock
          tests, students can build to-do lists that suit their pace and
          comfort. This feature promotes time management, boosts motivation with
          every completed task, and helps maintain a consistent study routine —
          all leading to smarter, more independent learning.
        </p>
      </div>

      {/* Features Section */}
      <section className="bg-[#083e5d] py-8 sm:py-12 px-3 sm:px-4">
        {/* Header */}
        <div className="bg-[#0fa5a5] text-white text-base sm:text-lg font-semibold text-center py-1 sm:py-2 px-3 sm:px-4 rounded-full w-full shadow-md mb-8 sm:mb-12">
          Features
        </div>

        {/* Feature Rows - Reordered for mobile */}
        {features.map((item, idx) => (
          <div key={idx}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
              {/* Left - Reordered for mobile */}
              <div
                className={`flex justify-center ${
                  typeof item.left === "string"
                    ? "order-1"
                    : "order-2 md:order-1"
                }`}
              >
                {typeof item.left === "string" ? (
                  <p className="text-white text-center text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed">
                    {item.left}
                  </p>
                ) : (
                  <div className="bg-gradient-to-b from-[#104662] to-[#12999d] text-white px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-md mx-auto text-center shadow-md border border-[#1DB5AC]">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <img
                        src={item.left.image}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="rounded-full border-2 sm:border-3 md:border-4 border-white shadow-md w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18"
                      />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl">
                      {item.left.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Right - Reordered for mobile */}
              <div
                className={`flex justify-center ${
                  typeof item.right === "string"
                    ? "order-1"
                    : "order-2 md:order-1"
                }`}
              >
                {typeof item.right === "string" ? (
                  <p className="text-white text-center text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed">
                    {item.right}
                  </p>
                ) : (
                  <div className="bg-gradient-to-b from-[#104662] to-[#12999d] text-white px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-md mx-auto text-center shadow-md border border-[#1DB5AC]">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <img
                        src={item.right.image}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="rounded-full border-2 sm:border-3 md:border-4 border-white shadow-md w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18"
                      />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl">
                      {item.right.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            {idx < features.length - 1 && (
              <div className="border-t-2 border-[#1DB5AC] max-w-6xl mx-auto my-1 sm:my-2"></div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
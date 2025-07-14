import Image from "next/image";

const features = [
  {
    title: "Year & Chapter-Wise Practice",
    description: "Solve questions from specific years or topics",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg", // Replace with your image path
  },
  {
    title: "Real Exam Experience",
    description: "Understand pattern, difficulty, and time pressure",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
  },
  {
    title: "Repeat Topic Detection",
    description: "Identify frequently asked concepts to revise better",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
  },
  {
    title: "Detailed Solutions",
    description: "Learn from mistakes with clear explanations",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
  },
];

export default function PYQ() {
  return (
    <div className="bg-[#103f5d]">
      {/* First Section */}
      <section className="bg-[#103f5d] text-white">
        {/* Navbar */}
        <div className="bg-[#1DB5AC] py-3 md:py-4 px-4 md:px-6 flex justify-center items-center space-x-2 md:space-x-3">
          <span className="text-white text-base md:text-lg font-semibold">Features</span>
          <span className="text-white text-lg md:text-xl font-bold">{">>>"}</span>
          <span className="text-white text-lg md:text-xl font-semibold">Previous Year Questions</span>
        </div>

        {/* Content */}
        <div className="py-8 md:py-12 px-4 sm:px-6 text-center">
          {/* Image */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="rounded-[20px] border-2 border-teal-500 p-1 shadow-lg overflow-hidden w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]">
              <Image
                src="/notice-image.png" // Update if your image name/path is different
                alt="Student"
                width={240}
                height={240}
                className="rounded-[14px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-semibold font-serif mb-3 md:mb-4">
              Previous Year <br/> Questions
            </h2>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></span>
              <div className="border-t border-white w-32 sm:w-40 md:w-60 mx-[1px]"></div>
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Subheading */}
          <p className="text-[#18e0d0] text-lg sm:text-xl font-serif font-medium mb-4 md:mb-6">
            Practice Real NEET Questions
          </p>

          {/* Tagline */}
          <div className="text-base sm:text-lg md:text-xl font-serif font-thin text-white inline-block border border-[#18e0d0] rounded-md px-3 py-1 sm:px-4 sm:py-2 mb-4 md:mb-6">
            Personalized Testing for Smart Revision
          </div>

          {/* Description */}
          <div className="text-left text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl lg:max-w-4xl mx-auto space-y-2 sm:space-y-3">
            <p>
              The Previous Year Questions feature provides a rich collection of real NEET questions, organized year-wise and chapter-wise. It helps students understand the actual exam pattern, frequently asked topics, and the level of difficulty they can expect. With detailed explanations and instant feedback, PYQ practice improves accuracy, builds exam confidence, and enhances time management.
            </p>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-[#103f5d] py-4 sm:py-6 px-3 sm:px-4">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-block bg-[#129ea0] text-white font-semibold px-8 sm:px-14 py-1 rounded-md text-base sm:text-lg">
            Features
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#1DB5AC] to-[#083e5d] rounded-xl shadow-md text-white p-3 sm:p-4 flex flex-col items-center text-center"
            >
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">{feature.title}</h3>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <p className="text-xs sm:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-[#103f5d] py-8 sm:py-12 px-3 sm:px-4 text-white text-center">
          {/* Oval Title */}
          <div
            className="inline-block bg-white text-[#103f5d] text-lg sm:text-xl md:text-2xl font-semibold px-8 sm:px-16 py-2 sm:py-4 rounded-full shadow-lg border-2 border-[#1DB5AC] mb-6 sm:mb-10"
            style={{ width: "fit-content" }}
          >
            Benefits Section
          </div>

          {/* List Items */}
          <ul className="text-left max-w-md sm:max-w-xl mx-auto space-y-2 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl">
            <li>✅ Predict important topics based on past trends</li>
            <li>✅ Improve speed and question selection skills</li>
            <li>✅ Get used to NEET-style MCQs</li>
            <li>✅ Strengthen weak areas with real examples</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
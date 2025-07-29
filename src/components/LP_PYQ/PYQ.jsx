import Image from "next/image";

const features = [
  {
    title: "Year & Chapter-Wise Practice",
    description: "Solve questions from specific years or topics",
    image: "/EP1.png",
  },
  {
    title: "Real Exam Experience",
    description: "Understand pattern, difficulty, and time pressure",
    image: "/EP2.png",
  },
  {
    title: "Repeat Topic Detection",
    description: "Identify frequently asked concepts to revise better",
    image: "/EP3.png",
  },
  {
    title: "Detailed Solutions",
    description: "Learn from mistakes with clear explanations",
    image: "/EP4.png",
  },
];

export default function PreviousYearQuestions() {
  return (
    <div className="bg-[#103f5d]">
      {/* Header Section */}
      <section className="bg-[#103f5d] text-white">
        {/* Breadcrumbs */}
        <div className="bg-[#1DB5AC] py-3 px-4 flex justify-center items-center space-x-2">
          <span className="text-white font-semibold">Features</span>
          <span className="text-white font-bold">{">>>"}</span>
          <span className="text-white font-semibold">Previous Year Questions</span>
        </div>

        {/* Content Section */}
        <div className="py-8 px-4 text-center">
          {/* Image */}
          <div className="flex justify-center mb-4">
            <div className="rounded-[20px] border-2 border-teal-500 p-1 shadow-lg overflow-hidden w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]">
              <Image
                src="/doctor.png"
                alt="Student"
                width={240}
                height={240}
                className="rounded-[14px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Headings */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-serif mb-3">
            Previous Year Questions
          </h2>
          <p className="text-[#18e0d0] text-lg sm:text-xl font-serif mb-4">
            Practice Real NEET Questions
          </p>

          {/* Tagline */}
          <div className="inline-block border border-[#18e0d0] rounded-md px-4 py-2 text-base sm:text-lg font-serif mb-6">
            Personalized Testing for Smart Revision
          </div>

          {/* Description List */}
          <div className="text-left max-w-4xl mx-auto text-white text-base sm:text-lg md:text-xl space-y-2">
            <p>
              The Previous Year Questions feature provides a rich collection of real NEET
              questions, organized year-wise and chapter-wise. It helps students
              understand the actual exam pattern, frequently asked topics, and the level
              of difficulty they can expect. With detailed explanations and instant
              feedback, PYQ practice improves accuracy, builds exam confidence, and
              enhances time management.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#103f5d] py-6 px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-block bg-[#129ea0] text-white font-semibold px-10 py-2 rounded-md text-lg">
            Features
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2 sm:px-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#103F5D] rounded-lg text-white border">
              <div className="bg-[#129EA0] h-44 flex flex-col text-center items-center justify-center rounded-t-lg">
                <h1 className="text-lg md:text-xl font-bold pb-8">
                  {feature.title}
                </h1>
                <img
                  src={feature.image}
                  alt={feature.title}
                  width={100}
                  height={100}
                  className="rounded-full -mb-16 h-28 w-28 object-cover"
                />
              </div>
              <div className="flex flex-col items-center mt-20 mb-10 px-4">
                <p className="text-xl md:text-2xl text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <div className="bg-[#103f5d] py-10 px-4 text-white text-center">
        <div className="inline-block bg-white text-[#103f5d] text-xl font-semibold px-14 py-3 rounded-full shadow-lg border-2 border-[#1DB5AC] mb-8">
          Benefits Section
        </div>

        <ul className="text-left max-w-2xl mx-auto space-y-3 text-base sm:text-lg md:text-xl">
          <li>✅ Predict important topics based on past trends</li>
          <li>✅ Improve speed and question selection skills</li>
          <li>✅ Get used to NEET-style MCQs</li>
          <li>✅ Strengthen weak areas with real examples</li>
        </ul>
      </div>
    </div>
  );
}

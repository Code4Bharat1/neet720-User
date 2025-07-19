import Image from "next/image";

export default function Analytic() {
  return (
    <div className="min-h-screen bg-[#103f5d] text-white">
      {/* Navbar */}
      <div className="bg-[#1DB5AC] py-3 md:py-4 px-4 md:px-6 flex justify-center items-center space-x-2 md:space-x-3">
        <span className="text-white text-sm md:text-lg font-semibold">
          Features
        </span>
        <span className="text-white text-base md:text-xl font-bold">
          {">>>"}
        </span>
        <span className="text-white text-base md:text-xl font-semibold">
          Analytics
        </span>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-12 md:py-16 gap-6 md:gap-20 bg-[#083e5d]">
        {/* Image */}
        <div className="rounded-[20px] md:rounded-[30px] border-4 border-[#1DB5AC] overflow-hidden shadow-lg w-48 h-48 md:w-64 md:h-64">
          <img
            src="/doctor.png" // Replace with your image path
            alt="Doctor"
            width={256}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Text Section */}
        <div className="text-center">
          <h2 className="text-white text-3xl md:text-5xl font-bold font-serif mb-3">
            Analytics
          </h2>

          {/* Decorative Underline */}
          <div className="flex items-center justify-center mb-3">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"></span>
            <div className="border-t border-white w-48 md:w-60 mx-[1px]"></div>
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"></span>
          </div>

          {/* Subtext */}
          <p className="text-[#1DB5AC] text-xl md:text-3xl font-serif font-medium leading-relaxed">
            Understand Your Performance
            <br />
            Deeply
          </p>
        </div>
      </div>

      <div className="bg-[#103f5d] text-white px-4 md:px-20 py-4 text-center">
        {/* Highlighted Heading */}
        <div className="inline-block border border-cyan-400 rounded-full px-4 py-1 md:px-6 md:py-2 mb-4 md:mb-6">
          <h3 className="text-base md:text-2xl font-serif font-thin text-white">
            Every number tells a story. Let's read yours
          </h3>
        </div>

        {/* Description Paragraph */}
        <p className="text-sm md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
          The Analytics feature offers deep insights into your test performance
          with data on accuracy, speed, and time per question. It highlights
          weak topics and frequent mistakes through visual graphs and trends.
          With every test, you get smarter feedback to refine your strategy.
          Stay informed, focused, and always a step ahead in your NEET prep.
        </p>
      </div>
    </div>
  );
}

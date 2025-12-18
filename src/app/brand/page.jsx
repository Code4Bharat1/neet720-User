export const metadata = {
  title: "About NEET 720 | Official Brand Page",
  description:
    "NEET 720 is India’s smart NEET exam portal offering AI rank prediction, mock tests, 720-scoring strategies, and intelligent exam planning for NEET aspirants.",
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10 max-w-5xl mx-auto">
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        About <span className="text-blue-600">NEET720</span>
      </h1>

      {/* INTRO */}
      <p className="text-lg leading-relaxed mb-6">
        <strong>NEET720</strong> is India’s first smart NEET exam platform created
        to help students score a perfect <strong>720/720</strong> in the NEET-UG
        examination. The name <strong>“neet720”</strong> represents perfection,
        accuracy, and the highest scoring mindset for medical aspirants.
      </p>

      {/* SECTION */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">What is NEET720?</h2>
      <p className="leading-relaxed mb-6">
        NEET720 brings a powerful combination of{" "}
        <strong>AI-powered analytics, smart planning tools, and chapter-wise
        NEET practice</strong> to make preparation more accurate and efficient.
        From studying NCERT line-by-line to solving mock tests, NEET720 helps
        every student prepare intelligently.
      </p>

      {/* FEATURES */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Features of the NEET720 Platform
      </h2>

      <ul className="list-disc ml-6 space-y-2">
        <li>AI-powered NEET Rank Predictor</li>
        <li>Smart College Predictor</li>
        <li>Chapter-wise mock tests & performance analytics</li>
        <li>720-scoring study strategies & guidance</li>
        <li>NCERT-based practice questions</li>
        <li>Daily insights to track your NEET progress</li>
      </ul>

      {/* BRAND STORY */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Why the Name “neet720”?
      </h2>
      <p className="leading-relaxed mb-6">
        The brand name <strong>neet720</strong> stands for an aspirant’s highest
        dream — achieving a perfect score of <strong>720 marks</strong>. It
        symbolizes discipline, clarity, accuracy, and excellence. Our mission is
        to empower every NEET aspirant with tools and insights to aim higher and
        score better.
      </p>

      {/* MISSION */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Our Mission at NEET720
      </h2>
      <p className="leading-relaxed mb-6">
        Our goal is simple — to make NEET preparation smarter, faster, and more
        effective. NEET720 helps students understand their strengths, improve
        weaknesses, and stay on the right path with real-time insights and
        strategic guidance.
      </p>

      {/* END */}
      <p className="mt-10 text-sm text-gray-600">
        © 2025 NEET720 – Official Brand Page
      </p>
    </div>
  );
}

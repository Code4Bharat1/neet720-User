import Image from "next/image";

export default function Scholarship() {
  const features = [
    {
      left: {
        title: "Earn Credits for Every Test",
        image:
          "https://mastdp.com/images/alonegirl/2024/07/alone-girl-pic-04.webp",
      },
      right: "Get points for high scores and consistency",
    },
    {
      left: "Use credits for discounts, scholarships & perks",
      right: {
        title: "Redeem for Benefits",
        image:
          "https://mastdp.com/images/alonegirl/2024/07/alone-girl-pic-04.webp",
      },
    },
    {
      left: {
        title: "Support for Deserving Students",
        image:
          "https://mastdp.com/images/alonegirl/2024/07/alone-girl-pic-04.webp",
      },
      right: "Performance-based rewards keep you focused",
    },
    {
      left: "Credits help ease the financial burden of education",
      right: {
        title: "Boost Your Motivation",
        image:
          "https://mastdp.com/images/alonegirl/2024/07/alone-girl-pic-04.webp",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#103f5d] text-white">
      {/* Navbar */}
      <div className="bg-[#1DB5AC] py-4 px-6 flex justify-center items-center space-x-3">
        <span className="text-white text-lg font-semibold">Features</span>
        <span className="text-white text-xl font-bold">{">>>"}</span>
        <span className="text-white text-xl font-semibold">Scholarship</span>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-8 md:gap-20 bg-[#083e5d]">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-5xl font-bold font-serif mb-4">
            Scholarship
          </h2>

          {/* Decorative Underline */}
          <div className="flex items-center justify-center md:justify-start mb-4">
            <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
            <div className="border-t border-white w-44 md:w-64 mx-[1px]"></div>
            <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
          </div>

          {/* Subtext */}
          <p className="text-[#1DB5AC] text-3xl text-center font-serif font-medium leading-relaxed">
            Earn Rewards for Your
            <br />
            Performance
          </p>
        </div>

        {/* Image */}
        <div className="rounded-[30px] border-4 border-[#1DB5AC] overflow-hidden shadow-lg w-64 h-64">
          <img
            src="/doctor.png"
            alt="Doctor"
            width={256}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="bg-[#103f5d] text-white px-6 md:px-20 py-4 text-center">
        {/* Highlighted Heading */}
        <div className="inline-block border border-cyan-400 rounded-full px-6 py-2 mb-6">
          <h3 className="text-xl md:text-2xl font-serif font-thin text-white">
            Know your possibilities. Predict your future
          </h3>
        </div>

        {/* Description Paragraph */}
        <p className="text-base md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
          The Scholarship feature on NEET720 lets students earn credits based on
          their performance in mock tests. These credits act as reward points
          that can be redeemed for scholarships, discounts, or other benefits on
          the platform. By encouraging consistent effort and high scores, this
          feature keeps students motivated and engaged. It also supports
          financially deserving learners by offering practical rewards for
          academic excellence, turning hard work into real opportunities.
        </p>
      </div>

      {/* Features Section */}
      <section className="bg-[#083e5d] py-12 px-4">
        {/* Header */}
        <div className="bg-[#0fa5a5] text-white text-lg font-semibold text-center py-2 px-4 rounded-full w-full shadow-md mb-12">
          Features
        </div>

        {/* Feature Rows */}
        {features.map((item, idx) => (
          <div key={idx}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-5xl mx-auto py-8 px-4">
              {/* Left */}
              <div className="flex justify-center">
                {typeof item.left === "string" ? (
                  <p className="text-white text-center text-3xl font-normal leading-relaxed">
                    {item.left}
                  </p>
                ) : (
                  <div className="bg-gradient-to-b from-[#104662] to-[#12999d] text-white px-6 pt-6 pb-6 rounded-2xl w-full max-w-md mx-auto text-center shadow-md border border-[#1DB5AC]">
                    <div className="flex justify-center mb-4">
                      <img
                        src={item.left.image}
                        alt="Profile"
                        width={72}
                        height={72}
                        className="rounded-full border-4 border-white shadow-md"
                      />
                    </div>
                    <h3 className="font-bold text-2xl">{item.left.title}</h3>
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="flex justify-center">
                {typeof item.right === "string" ? (
                  <p className="text-white text-center text-3xl font-normal leading-relaxed">
                    {item.right}
                  </p>
                ) : (
                  <div className="bg-gradient-to-b from-[#104662] to-[#12999d] text-white px-6 pt-6 pb-6 rounded-xl w-full max-w-md mx-auto text-center shadow-md border border-[#1DB5AC]">
                    <div className="flex justify-center mb-4">
                      <img
                        src={item.right.image}
                        alt="Profile"
                        width={72}
                        height={72}
                        className="rounded-full border-4 border-white shadow-md"
                      />
                    </div>
                    <h3 className="font-bold text-2xl">{item.right.title}</h3>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            {idx < features.length - 1 && (
              <div className="border-t-2 border-[#1DB5AC] max-w-6xl mx-auto my-2"></div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

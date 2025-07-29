import Image from "next/image";

const features = [
  {
    title: "Instant Score Review",
    description: "View marks and analysis right after finishing the test",
    image: "/RT1.png",
  },
  {
    title: "Revisit Mistakes",
    description: "Recheck wrong answers with detailed solutions",
    image: "/RT2.png",
  },
  {
    title: "Track Short-Term Growth",
    description: "Compare recent performances side-by-side",
    image: "/RT3.png",
  },
  {
    title: "Uninterrupted Learning",
    description: "Access tests easily without losing focus flow",
    image: "/RT4.png",
  },
];

export default function FeatureTest() {
  return (
    <section className="bg-gradient-to-br from-[#0f3b63] to-[#079ba1] rounded-3xl sm:rounded-[40px] py-10 px-4 sm:py-14 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-[#029fa5] text-white px-5 py-2 rounded-full font-semibold text-lg shadow-md">
          Features
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 sm:gap-y-20 gap-x-6 sm:gap-x-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#129ea0] relative rounded-3xl sm:rounded-[40px] border text-white pt-16 pb-6 px-6 text-center border-white/50 shadow-md"
          >
            {/* Profile Image */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-lg sm:text-2xl mt-4">{feature.title}</h3>
            <p className="mt-3 text-md sm:text-md leading-relaxed px-1 sm:px-6">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";

const features = [
  {
    title: "Accuracy Analysis",
    description: "Know how many answers you're getting right — and why",
    image: "https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg", // Replace with actual image path
  },
  {
    title: "Speed Tracker",
    description: "Time taken per question and overall test pace",
    image: "https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
  },
  {
    title: "Weak Topic Detection",
    description: "Pinpoint which chapters need more attention",
    image: "https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
  },
  {
    title: "Trend Graphs",
    description: "See your growth over multiple attempts visually",
    image: "https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
  },
];

export default function FeatureResult() {
  return (
    <section className="bg-gradient-to-br from-[#0f3b63] to-[#079ba1] rounded-[40px] py-16 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#029fa5] text-white px-6 py-2 rounded-full font-semibold text-lg shadow-md">
          Features
        </div>
      </div>

      {/* Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-10">
  {features.map((feature, index) => (
    <div
      key={index}
      className="bg-[#129ea0] relative rounded-[48px] border-r-white  text-white pt-16 pb-8 px-6 text-center border border-white/50 shadow-md"
    >
      {/* Profile Image */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={feature.image}
            alt="User"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="font-bold text-[18px]">{feature.title}</h3>
      <p className="mt-2 text-lg leading-relaxed">{feature.description}</p>
    </div>
  ))}
</div>

    </section>
  );
}

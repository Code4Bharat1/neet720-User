import Image from "next/image";

const features = [
  {
    title: "Time-Stamped Alerts",
    description: "Every update is dated for clear tracking",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg", // Replace with your image path
  },
  {
    title: "Categorized Notices",
    description: "Filter by exam tips, schedules, or syllabus updates",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
  },
  {
    title: "Highlight Important Info",
    description: "Key messages stay pinned and visible",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
  },
  {
    title: "Access Past Notices",
    description: "Review older alerts anytime for reference",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
  },
];

export default function Notice() {
  return (
    <div className="bg-[#103f5d]">
      {/* First Section */}
      <section className="bg-[#103f5d] text-white">
        {/* Navbar */}
        <div className="bg-[#1DB5AC] py-4 px-6 flex justify-center items-center space-x-3">
          <span className="text-white text-lg font-semibold">Features</span>
          <span className="text-white text-xl font-bold">{">>>"}</span>
          <span className="text-white text-xl font-semibold">Notice</span>
        </div>

        {/* Content */}
        <div className="py-12 px-6 text-center">
          {/* Image */}
          <div className="flex justify-center md:justify-center mb-6">
            <div className="rounded-[20px] border-2 border-teal-500 p-1 shadow-lg overflow-hidden w-[240px] h-[240px]">
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
          <div className="text-center md:text-left">
            <h2 className="text-white text-center text-5xl font-semibold font-serif mb-4">
              Notice
            </h2>
            <div className="flex items-center justify-center mb-4">
              <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
              <div className="border-t border-white w-44 md:w-40 mx-[1px]"></div>
              <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Subheading */}
          <p className="text-[#18e0d0] text-xl font-serif font-medium mb-6">
            All Important Updates in One Place
          </p>

          {/* Tagline */}
          <div className="text-xl md:text-xl font-serif  font-thin text-white inline-block border border-[#18e0d0]  rounded-md px-4 py-2 mb-6">
            Stay informed. Stay ahead of the game
          </div>

          {/* Description */}
          <div className="text-left text-2xl max-w-4xl mx-auto space-y-3">
            <p>
              Get all important updates like test schedules, syllabus changes,
              tips, and deadlines in one place.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Every notice is time-stamped and categorized for easy tracking
                and quick access.
              </li>
              <li>
                Important alerts are highlighted, and past notices remain
                available for future reference.
              </li>
              <li>
                Keeps students organized, well-informed, and perfectly aligned
                with their prep schedule.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-[#103f5d] py-6 px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-block bg-[#129ea0] text-white font-semibold px-14 py-1 rounded-md text-lg">
            Features
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#1DB5AC] to-[#083e5d] rounded-xl shadow-md text-white p-4 flex flex-col items-center text-center"
            >
              <h3 className="font-bold text-lg mb-4">{feature.title}</h3>
              <div className="w-24 h-24 mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-[#103f5d] py-12 px-4 text-white text-center">
          {/* Oval Title */}
          <div
            className="inline-block bg-gradient-to-r from-[#12979b] to-[#104662] text-white text-2xl font-semibold px-16 py-4 rounded-full shadow-lg border-2 border-[#1DB5AC] mb-10"
            style={{ width: "fit-content" }}
          >
            Benefits Section
          </div>

          {/* List Items */}
          <ul className="text-left max-w-xl mx-auto space-y-4 text-2xl">
            <li>✅ No missed deadlines or surprise changes</li>
            <li>✅ Instant access to important academic information</li>
            <li>✅ One-stop communication hub</li>
            <li>
              ✅ Keeps students aligned with the latest syllabus and test dates
            </li>
            <li>✅ Improves coordination between instructors and learners</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

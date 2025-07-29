"use client";
import Image from "next/image";

const features = [
  {
    title: "New Test Alerts",
    description: "Be notified the moment a new test goes live",
    image: "/Noti1.png",
  },
  {
    title: "Upcoming Task Reminders",
    description: "Get alerts for deadlines, tasks, and quizzes",
    image: "/Noti2.png",
  },
  {
    title: "Result Updates",
    description: "Instant notification when scores are published",
    image: "/Noti3.png",
  },
  {
    title: "Schedule Sync",
    description: "Stay aligned with your daily/weekly study goals",
    image: "/Noti4.png",
  },
];

export default function NotificationSection() {
  return (
    <div className="bg-[#103f5d]">
      {/* Header Section */}
      <section className="bg-[#103f5d] text-white">
        <div className="bg-[#1DB5AC] py-3 px-4 flex justify-center items-center space-x-2">
          <span className="text-white font-semibold">Features</span>
          <span className="font-bold">{">>>"}</span>
          <span className="font-semibold">Notification Section</span>
        </div>

        {/* Hero */}
        <div className="py-8 px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-[20px] border-2 border-teal-500 p-1 shadow-lg overflow-hidden w-[180px] h-[180px] md:w-[240px] md:h-[240px]">
              <Image
                src="/doctor.png"
                alt="Student"
                width={240}
                height={240}
                className="rounded-[14px] object-cover w-full h-full"
              />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold font-serif mb-4">
            Notification Section
          </h2>
          <div className="flex items-center justify-center mb-4">
            <span className="w-2 h-2 bg-white rounded-full" />
            <div className="border-t border-white w-40 mx-[1px]" />
            <span className="w-2 h-2 bg-white rounded-full" />
          </div>

          <p className="text-[#18e0d0] text-xl font-serif font-medium mb-6">
            Stay Alert, Stay Ready
          </p>

          <div className="text-xl font-thin border border-[#18e0d0] rounded-md px-4 py-2 mb-6 inline-block">
            Stay informed. Stay ahead of the game
          </div>

          <div className="text-left max-w-3xl mx-auto text-white text-lg space-y-3">
            <p>
              Instantly notifies students about new tests, pending quizzes, upcoming tasks, and result updates.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Real-time alerts ensure nothing important is missed or delayed.</li>
              <li>Helps manage time better by reminding about key academic events and deadlines.</li>
              <li>Keeps all notifications organized — from urgent updates to general platform activity — in one place.</li>
              <li>Boosts consistency and keeps students active, informed, and well-prepared throughout their journey.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 px-3 text-white">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#129ea0] font-semibold px-14 py-1 rounded-md text-lg">
            Features
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#1DB5AC] to-[#083e5d] rounded-xl shadow-md p-4 flex flex-col items-center text-center"
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
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 text-white text-center">
        <div className="inline-block bg-gradient-to-r from-[#12979b] to-[#104662] text-2xl font-semibold px-16 py-4 rounded-full shadow-lg border-2 border-[#1DB5AC] mb-10">
          Benefits Section
        </div>

        <ul className="text-left max-w-xl mx-auto space-y-4 text-lg">
          <li>✅ Reduces chances of missing important updates</li>
          <li>✅ Helps manage time and stay consistent</li>
          <li>✅ Encourages timely action with real-time alerts</li>
          <li>✅ Centralizes all academic activity in one place</li>
          <li>✅ Keeps learners active, organized, and stress-free</li>
        </ul>
      </section>
    </div>
  );
}

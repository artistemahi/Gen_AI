import React from "react";

const Features = () => {
  const features = [
    "🤖 AI Chatbot Assistant",
    "📊 AI Skill Gap Analyzer",
    "🧩 Job-Hobby Matchmaker",
    "🎨 Career Moodboard Generator",
    "🏆 Micro-Credential Tracker",
    "💡 Soft Skills Match & Tips",
  ];

  return (
    <section id="features" className="py-12 bg-white">
      {/* Section Header */}
      <div className="bg-yellow-100 py-3 text-center mb-10">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Key Features
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex justify-center items-center text-center font-medium text-gray-700 hover:shadow-lg transition"
          >
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

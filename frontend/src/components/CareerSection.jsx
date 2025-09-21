import React from "react";

const CareerSection = () => {
  return (
    <section className="py-16 px-6 flex flex-col gap-8 items-center text-center">
      {/* Yellow Heading */}
      <div className="bg-yellow-300 px-6 py-2 rounded-md shadow-md inline-block">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Feeling Lost in Your Career Journey?
        </h2>
      </div>

      {/* Green Info Box
      <div className="bg-green-300 text-white text-lg md:text-xl p-6 rounded-md shadow-md max-w-2xl text-left leading-relaxed">
        <p>Are you confused about which career path to choose?</p>
        <p className="mt-3">Struggling to identify skill gaps holding you back?</p>
        <p className="mt-3">
          Tired of generic career advice that doesn't fit YOU?
        </p>
      </div> */}

      {/* Red Badge
      <div className="bg-red-400 px-6 py-3 rounded-md shadow-md inline-block">
        <h3 className="text-md md:text-lg font-semibold text-black">
          Meet Your Personal Career Ninja
        </h3>
      </div> */}

      {/* Blue Description */}
      <div className="bg-blue-600 text-white p-6 md:p-8 rounded-lg shadow-lg max-w-3xl leading-relaxed">
        <p>
          Your career deserves more than generic advice. Career Ninja's
          AI-powered platform analyzes your unique skills, interests, and goals
          to create a completely personalized career strategy. From identifying
          skill gaps to matching dream jobs with your hobbies, we provide
          actionable insights tailored specifically for you.
        </p>
      </div>
    </section>
  );
};

export default CareerSection;

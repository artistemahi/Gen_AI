import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <img
        src="body.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Floating card (top-left) */}
      <div className="absolute top-10 left-10 bg-white  shadow-lg rounded-md px-6 py-4 flex flex-col items-center gap-3">
        <img src="ninja-colored.jpg" alt="logo" className="w-50 h-25" />
        <span className="font-semibold text-gray-700">A Trusted Platform</span>
      </div>

      {/* Center content
      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide">
          <span className="block text-black">PUSH</span>
          <span className="block text-pink-500">PASS</span>
          <span className="block text-purple-500">YOURS</span>
          <span className="block text-green-500">LIMITS</span>
        </h1>
      </div> */}
    </section>
  );
};

export default Hero;

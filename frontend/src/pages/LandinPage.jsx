import React, { useState } from "react";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Dreams from "../components/Dreams";
import Nav2 from "../components/Nav2";
import Login from "./Login";
import Signup from "./Signup";
import Features from "../components/Features";
import CareerSection from "../components/CareerSection";
import Hero from "../components/Hero"; // ⬅️ Import Hero component

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  return (
    <div className="font-serif">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <img src="/ninja-colored.jpg" alt="logo" className="w-15 h-10" />
          <span className="text-2xl font-bold font-[Spirax]">Career Ninja</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLoginOpen(true)}
            className="bg-black text-white px-4 py-1.5 rounded-full text-sm"
          >
            Log In
          </button>
          <button
            onClick={() => setSigninOpen(true)}
            className="bg-black text-white px-4 py-1.5 rounded-full text-sm"
          >
            Sign Up
          </button>
          <i className="fa-solid fa-globe text-lg cursor-pointer"></i>
        </div>
      </header>

      {/* Second Header */}
      <Nav2 />

      {/* Hero Section (Full-width Banner) */}
      <Hero />

      {/* Dreams Section */}
      <Dreams />

      {/* About Section */}
      <section
        id="aboutUs"
        className="bg-[#4d4d4d] text-white text-center p-8 rounded-md mx-4 mt-12"
      >
        <h2 className="text-3xl mb-4">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto">
          At Career Ninja, we believe that every individual deserves a career
          path that aligns with their unique skills, passions, and aspirations.
          Unlike traditional career portals that offer generic advice, we've
          built an intelligent platform that understands you — your strengths,
          interests, and career goals.
        </p>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold">
          PUSH PAST YOUR LIMITS - AI POWERED CAREER GUIDANCE
        </h2>
        <p className="text-xl my-4">Start Your Journey Today</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* Features */}
      <Features />

      {/* Career Section */}
      <CareerSection />

      {/* Why Choose Us */}
      <section id="whyChooseUs" className="py-12 px-6">
        <h2 className="text-center text-2xl font-bold mb-8">
          Why choose Career Ninja vs Other Platforms
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-center mb-4">Feature</h3>
            <ul className="space-y-3">
              <li>Personalized guidance</li>
              <li>Skill Gap Analysis</li>
              <li>Job-Hobby Matchmaking</li>
              <li>Holistic Approach</li>
              <li>User Experience</li>
            </ul>
          </div>
          <div className="bg-red-100 p-6 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-center mb-4">Career Ninja</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Tailored AI advice</li>
              <li>Identifies missing skills</li>
              <li>Matches hobbies to jobs</li>
              <li>Complete platform</li>
              <li>Interactive & motivating</li>
            </ul>
          </div>
          <div className="bg-red-100 p-6 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-center mb-4">
              Other Platforms
            </h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Generic tips</li>
              <li>No skill gap insights</li>
              <li>Focus on resumes only</li>
              <li>Narrow scope</li>
              <li>Rigid & boring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {loginOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setLoginOpen(false)}
        >
          <div
            className="bg-white w-96 h-[450px] rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Login />
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-4 text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {signinOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSigninOpen(false)}
        >
          <div
            className="bg-white w-96 h-[650px] rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Signup />
            <button
              onClick={() => setSigninOpen(false)}
              className="absolute top-2 right-4 text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

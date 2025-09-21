import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Track Firebase user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full min-h-screen font-sans text-[#222] bg-white">
      {/* ---------------- Page 1 ---------------- */}
      <section className="page1">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4">
          <div className="flex items-center gap-4">
            <img
              src="/ninja-colored.jpg"
              alt="Career Ninja Logo"
              className="h-14 w-14 rounded-full"
            />
            <span className="font-[Spirax] text-2xl font-bold tracking-[2px]">
              Career Ninja
            </span>
          </div>

          <div className="flex items-center gap-4 text-lg">
            {user ? (
              <>
                <span className="font-bold">
                  {user.displayName || user.email}
                </span>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl sm:text-3xl">
                  🥷
                </div>
              </>
            ) : (
              <span className="text-sm text-gray-600">Not logged in</span>
            )}
            <FaGlobe className="text-2xl cursor-pointer" />
          </div>
        </header>

        {/* Nav bar */}
        <nav className="w-full bg-[#585a62] text-white flex flex-wrap items-center py-2 px-4 gap-6">
          <div className="flex gap-6">
            <a href="#">
              <FaWhatsapp />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
          <div className="flex gap-8 ml-6">
            <a href="/" className="hover:text-yellow-300">
              Home
            </a>
            <a href="/dashboard" className="hover:text-yellow-300">
              Dashboard
            </a>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="flex justify-center mt-6">
          <img
            src="/body.png"
            alt="Push Past Your Limits AI"
            className="w-full max-h-[600px] object-cover"
          />
        </div>

        <div className="text-center my-8">
          <h1 className="font-permanent text-2xl md:text-3xl font-bold mb-6">
            Push Past Your Limits – AI-Powered Career Guidance
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-base md:text-lg">
            <div className="flex items-center gap-2 justify-center">
              🤖 <span>Chatbot Assistant</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              📊 <span>AI Skill Gap Analyzer</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              🧩 <span>Job-Hobby Matchmaker</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              🎨 <span>Career Moodboard Generator</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              🏆 <span>Micro-Credential Tracker &amp; Recommender</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              💡 <span>Soft Skills Match &amp; Development Tips</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Page 2 ---------------- */}
      <section
        id="page2"
        className="page2 min-h-screen bg-cover bg-center text-white py-10 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/banner.png')`,
        }}
      >
        <h2 className="bg-yellow-300 text-black text-center text-2xl font-bold py-4 mb-10">
          Key Features
        </h2>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { title: "🤖 AI Chatbot Assistant", link: "/assistant" },
            { title: "🧩 Job-Hobby Matchmaker", link: "/matchmaker" },
            { title: "📊 Smart Skill Gap Analyzer", link: "/skillgap" },
            { title: "🏆 Micro-Credential Tracker", link: "/tracker" },
            { title: "💡 Soft Skills Development", link: "/softskills" },
            { title: "🎨 Career Moodboard Generator", link: "/moodboard" },
          ].map((f, i) => (
            <a
              key={i}
              href={f.link}
              className="bg-white text-center w-40 h-44 rounded-xl shadow-lg hover:scale-105 transition flex flex-col items-center justify-center"
            >
              <img
                src="/ninja-colored.jpg"
                alt={f.title}
                className="w-16 h-16 rounded-full object-contain mb-2"
              />
              <div className="text-black text-sm font-medium">{f.title}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- Page 3 ---------------- */}
      <section id="page3" className="page3">
        <div className="bg-blue-500 text-white font-bold text-3xl py-6 px-6 border-b-4 border-blue-700 shadow">
          The Ninja Way
        </div>
        <div className="flex justify-center py-10">
          <img
            src="NINJA-WAY.png"
            alt="The Ninja Way Roadmap"
            className="max-w-[1100px] w-full shadow-lg"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

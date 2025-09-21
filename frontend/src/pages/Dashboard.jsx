import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such user document!");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirect to home page after logout
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-600 p-4 flex flex-wrap items-center gap-4">
        <div className="flex gap-3">
          <a href="#">
            <img src="phone.png" alt="Phone" className="w-6 h-6" />
          </a>
          <a href="#">
            <img src="camera.png" alt="Camera" className="w-6 h-6" />
          </a>
          <a href="#">
            <img src="tv.png" alt="TV" className="w-6 h-6" />
          </a>
          <a href="#">
            <img src="LINKEDIN.png" alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
        <div className="ml-auto flex gap-6 text-gray-400 text-sm sm:text-base">
          <Link to="/home" className="hover:text-white">
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-200 hover:text-red-400 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Container */}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-72">
          <div className="flex items-center gap-2 mb-4 cursor-pointer text-lg">
            <span>←</span>
            <span>Back</span>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl sm:text-6xl">
              🥷
            </div>
            <div className="text-left mt-4 space-y-2 text-xs sm:text-sm">
              <div>
                <strong>Name:</strong> {userData?.displayName || "Loading..."}
              </div>
              <div>
                <strong>Age:</strong> {userData?.age || "xx"}
              </div>
              <div>
                <strong>Email:</strong> {userData?.email || "-"}
              </div>
              <div>
                <strong>Phone:</strong> {userData?.phone || "---"}
              </div>
            </div>
            <div className="bg-blue-100 text-xs sm:text-sm font-bold p-3 rounded-lg mt-4">
              Welcome, {userData?.displayName?.toUpperCase() || "User"}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">
            Assessment Center
          </h1>

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <ModuleCard
              title="🤖 AI Assistant Hub"
              img="BOX1.png"
              desc="Get personalized recommendations and guidance through AI-powered assistance for your career journey."
              button="VIEW"
            />
            <ModuleCard
              title="📊 Career Analytics"
              img="BOX2.png"
              desc="Analyze your career progress, skills development, and get insights into your professional growth trajectory."
              button="VIEW"
            />
            <ModuleCard
              title="🎯 Job-Hobby Matchmaker"
              img="BOX3.png"
              desc="Discover career opportunities that align with your personal interests and hobbies for better job satisfaction."
              button="VIEW"
            />
            <ModuleCard
              title="📋 Career Moodboard"
              img="BOX4.png"
              desc="Create visual representations of your career aspirations and track your professional goals."
              button="VIEW"
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard
              title="📅 Activity Center"
              img="BOX5.png"
              desc="Calendar integration, deadline management, course activities, and assessment-related course learning."
              button="Coming soon"
              disabled
            />
            <ModuleCard
              title="🌐 Community & Networking"
              img="BOX6.png"
              desc="Success stories, connect with mentors, and career-related conversations."
              button="Coming soon"
              disabled
            />
            <ModuleCard
              title="🎭 Soft Skills Development"
              img="BOX7.png"
              desc="Communication, teamwork, problem-solving, time management, and improvement suggestions."
              button="Coming soon"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable ModuleCard Component */
function ModuleCard({ title, img, desc, button, disabled }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md relative hover:-translate-y-1 transition">
      <h3 className="font-semibold mb-3 text-sm sm:text-base">{title}</h3>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gray-100 rounded-lg p-3 mb-4">
        <img
          src={img}
          alt={title}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-contain"
        />
        <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
      </div>
      <button
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base ${
          disabled
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-teal-400 hover:bg-teal-500 text-white"
        }`}
      >
        {button}
      </button>
    </div>
  );
}

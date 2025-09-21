import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#1e2a3a] text-white py-10 px-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-500 pb-8">
        {/* Left - Logo + Title */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/ninja-colored.jpg"
              alt="logo"
              className="w-12 rounded mb-2"
            />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Career Ninja
              </h2>
              <p className="text-blue-300 font-semibold">
                Push! Pass Your Limits 🚀🔥
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">
            Be Part of Our Journey ❤️
          </h3>
          <div className="flex justify-center gap-4 text-xl mb-4">
            <FaYoutube className="cursor-pointer hover:text-red-500" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaLinkedin className="cursor-pointer hover:text-blue-500" />
            <FaFacebook className="cursor-pointer hover:text-blue-600" />
          </div>
          <nav className="flex justify-center gap-6 text-sm font-medium">
            <a href="#how" className="hover:underline">
              How It Works
            </a>
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#faqs" className="hover:underline">
              FAQs
            </a>
          </nav>
        </div>

        {/* Right - About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm text-gray-300">
            Career Ninja is an AI-driven platform that serves as your
            personalized career and skill advisor. Unlike traditional methods,
            we deliver smarter, faster, and the best results tailored just for
            you.
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-400 mt-6">
        Copyright © 2025
      </div>
    </footer>
  );
};

export default Footer;

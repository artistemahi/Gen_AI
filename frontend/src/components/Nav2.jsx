import { FaWhatsapp, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from "react-scroll";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-8 py-2 bg-[#2c3e5b] text-white text-sm">
      {/* Social Icons */}
      <div className="flex gap-4 text-lg">
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">
          <FaWhatsapp className="hover:text-green-400 cursor-pointer" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram className="hover:text-pink-400 cursor-pointer" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube className="hover:text-red-500 cursor-pointer" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
        </a>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6">
        <Link
          to="aboutUs"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-blue-300"
        >
          About Us
        </Link>
        <Link
          to="features"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-blue-300"
        >
          Features
        </Link>
        <Link
          to="whyChooseUs"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-blue-300"
        >
          Why Choose Us
        </Link>
        <Link
          to="footer"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-blue-300"
        >
          Contact Team
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Modal from "./Modal";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/ninja-colored.jpg"
            alt="logo"
            className="h-10 w-auto rounded"
          />
          <span className="font-[Spirax] text-2xl">Career Ninja</span>
        </div>

        {/* Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLoginOpen(true)}
            className="text-gray-700 hover:text-blue-600"
          >
            LOG IN
          </button>
          <button
            onClick={() => setSignupOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
          <i className="fa-solid fa-globe text-gray-600"></i>
        </div>
      </header>

      {/* Modals */}
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <Login />
      </Modal>

      <Modal isOpen={isSignupOpen} onClose={() => setSignupOpen(false)}>
        <Signup />
      </Modal>
    </>
  );
};

export default Header;

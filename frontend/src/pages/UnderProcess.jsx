import React from "react";
import { useNavigate } from "react-router-dom";

const UnderProcess = () => {
  const navigate = useNavigate();

  return (
    <main
      className="w-[min(720px,92vw)] text-center p-8 rounded-2xl border border-white/10 
                 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02)),rgba(10,12,25,.45)]
                 shadow-[0_24px_60px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.05)] 
                 backdrop-blur-md text-gray-200 mx-auto my-12"
      role="status"
      aria-live="polite"
    >
      {/* Spinner with centered logo */}
      <div className="relative w-[108px] h-[108px] mx-auto mb-6">
        <div
          className="w-full h-full rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, #ffe952 0 25%, #f39c12 25% 50%, #7dd3fc 50% 75%, #a78bfa 75% 100%)",
            WebkitMask:
              "radial-gradient(circle 46px at 50% 50%, transparent 98%, black 100%)",
            mask: "radial-gradient(circle 46px at 50% 50%, transparent 98%, black 100%)",
          }}
        ></div>
        <img
          src="/ninja-colored.jpg"
          alt="Career Ninja Logo"
          className="absolute left-1/2 top-1/2 w-[58px] h-[58px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-[clamp(22px,4vw,34px)] font-semibold mb-2">
        Under Process
      </h1>

      {/* Loading with dots */}
      <div className="flex items-center justify-center gap-1 text-gray-400 text-[clamp(14px,2.5vw,16px)] mb-4">
        <span>Preparing..</span>
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></span>
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></span>
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:.4s]"></span>
      </div>

      {/* Progress bar */}
      <div className="relative w-[min(520px,90vw)] h-3 mx-auto rounded-full overflow-hidden bg-white/10 shadow-inner mb-3">
        <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-yellow-300 to-orange-500 animate-[progress_2.2s_ease-in-out_infinite]"></div>
      </div>

      <div className="text-gray-400 text-sm">Stay Connected</div>

      {/* Button */}
      <button
        onClick={() => navigate("/home")}
        className="inline-block mt-4 px-5 py-2 rounded-lg font-semibold bg-yellow-300 text-gray-900 shadow-md hover:brightness-95"
      >
        Go Home
      </button>

      {/* Animations */}
      <style>
        {`
          @keyframes progress {
            0% { transform: translateX(-30%); }
            50% { transform: translateX(50%); width: 65%; }
            100% { transform: translateX(130%); width: 30%; }
          }
        `}
      </style>
    </main>
  );
};

export default UnderProcess;

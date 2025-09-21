import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg("❌ Please enter both email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMsg("❌ " + err.message);
    }

    setTimeout(() => setMsg(""), 5000);
  };

  // 🔑 Demo Sign In
  const handleDemoLogin = async () => {
    const demoEmail = "mahesh@gmail.com";
    const demoPassword = "mahesh123";

    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      setMsg("✅ Demo Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMsg("❌ " + err.message);
    }

    setTimeout(() => setMsg(""), 5000);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[350px] p-8 rounded-lg shadow-lg text-center relative">
        {/* Close Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <h1 className="text-3xl mb-2 font-[Spirax]">Career Ninja</h1>
        <p className="text-gray-600 mb-6">
          Inspire someone by your stories and writing
        </p>

        {msg && (
          <div className="bg-blue-500 text-white py-2 px-3 rounded mb-4 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          >
            Log In
          </button>
        </form>

        {/* Demo Sign In Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Demo Sign In
        </button>

        <div className="mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandinPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import UnderProcess from "./pages/UnderProcess";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/skillgap" element={<SkillGapAnalyzer />} />
      <Route path="*" element={<Login />} />
      <Route path="/moodboard" element={<UnderProcess />} />
      <Route path="/softskills" element={<UnderProcess />} />
      <Route path="/tracker" element={<UnderProcess />} />
      <Route path="/matchmaker" element={<UnderProcess />} />
      <Route path="/assistant" element={<UnderProcess />} />
    </Routes>
  );
}

export default App;

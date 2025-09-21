import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandinPage";
import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;

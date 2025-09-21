import { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = {
  web: {
    required: {
      HTML: "Structures web content.",
      CSS: "Design and layouts.",
      JavaScript: "Interactivity and logic.",
      React: "UI library.",
      "Node.js": "Backend runtime.",
      Databases: "Store and query data.",
      APIs: "Connect frontend & backend.",
      Accessibility: "Inclusive web design.",
    },
  },
  frontend: {
    required: {
      HTML: "Page structure.",
      CSS: "Styling and layouts.",
      JavaScript: "Dynamic features.",
      "React/Vue/Angular": "Frontend frameworks.",
      TypeScript: "Typed JS for reliability.",
      "Responsive Design": "Mobile-first layouts.",
      "Webpack/Vite": "Frontend build tools.",
      "Testing (Jest)": "Frontend test automation.",
    },
  },
  backend: {
    required: {
      "Node.js/Express": "Server-side logic.",
      Databases: "SQL/NoSQL data handling.",
      APIs: "REST/GraphQL integration.",
      Authentication: "User login & security.",
      "Docker/Kubernetes": "Containerization.",
      Caching: "Redis/Memcached for performance.",
      Testing: "Unit & integration tests.",
      Scalability: "Handle high loads.",
    },
  },
  fullstack: {
    required: {
      HTML: "Frontend basics.",
      CSS: "Styling.",
      JavaScript: "Logic.",
      React: "Frontend framework.",
      "Node.js": "Backend.",
      Databases: "Storage.",
      APIs: "Integration.",
      DevOps: "CI/CD basics.",
    },
  },
  // ⚡ keep the rest of your roles here...
};

export default function SkillGapAnalyzer() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("web");
  const [results, setResults] = useState("");
  const navigate = useNavigate();

  const analyze = () => {
    const userSkills = skills.split(",").map((s) => s.trim().toLowerCase());
    const role = roles[goal];
    let output = `<h3 class="text-lg font-semibold mb-3">Required Skills for ${goal}:</h3>`;
    for (let skill in role.required) {
      if (userSkills.includes(skill.toLowerCase())) {
        output += `<div class="bg-green-100 border border-green-300 p-2 rounded mb-2">
          <b>${skill}</b> ✅ <br/><small>${role.required[skill]}</small>
        </div>`;
      } else {
        output += `<div class="bg-red-100 border border-red-300 p-2 rounded mb-2">
          <b>${skill}</b> ❌ <br/><small>${role.required[skill]}</small>
        </div>`;
      }
    }
    setResults(output);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative z-10">
        <button
          onClick={() => navigate("/home")}
          className="absolute top-3 right-4 text-gray-500 text-xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold mb-4">Skill Gap Analyzer</h1>

        <label className="block mt-3 font-semibold">
          Enter your current skills (comma separated):
        </label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. Python, SQL, TensorFlow"
          className="w-full border rounded px-3 py-2 mt-1"
        />

        <label className="block mt-3 font-semibold">
          What do you want to become?
        </label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          {Object.keys(roles).map((key) => (
            <option key={key} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          onClick={analyze}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Analyze Skills
        </button>

        <div
          id="results"
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: results }}
        />
      </div>
    </div>
  );
}

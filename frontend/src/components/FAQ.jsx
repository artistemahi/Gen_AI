import { useState } from "react";

const faqs = [
  {
    q: "1. How does the AI analysis work?",
    a: "Our AI analyzes your skills, interests, and goals to compare them with current industry requirements. It then provides personalized career recommendations and identifies specific skill gaps you need to work on. The analysis takes just 10–15 minutes and gives instant results.",
  },
  {
    q: "2. Is my data secure and private?",
    a: "Yes, completely secure. Your data is encrypted and never shared with third parties. You control your information and can delete your profile anytime. We follow industry-standard privacy protocols.",
  },
  {
    q: "3. What makes this different from other career platforms?",
    a: "We’re the only platform that combines skills + interests + hobbies into one analysis. Other platforms only focus on skills or job matching. Our unique features include Job-Hobby Matchmaker, Career Moodboard Generator, and 24/7 AI chatbot support.",
  },
  {
    q: "4. How accurate are the career recommendations?",
    a: "Highly accurate — we use real-time industry data plus your personal profile (skills, interests, personality). Our Job-Hobby Matchmaker ensures you get career paths you’re genuinely passionate about, not just qualified for.",
  },
  {
    q: "5. Can I track my progress?",
    a: "Yes! Our Micro-Credential Tracker automatically monitors your certifications and suggests next learning steps. Your Career Moodboard visually shows your progress and keeps you motivated.",
  },
  {
    q: "6. Is this for students or working professionals?",
    a: "Both! Students can discover career paths before choosing specialization. Working professionals can identify advancement opportunities or explore career transitions. The AI adapts recommendations based on your current stage.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">FAQ’s</h2>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer border border-gray-200"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {item.q}
                <span className="text-blue-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </h3>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 text-sm">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

const questions = [
  {
    q: "Which subject do you enjoy the most?",
    options: [
      { text: "Math & Science", stream: "science" },
      { text: "Business & Finance", stream: "commerce" },
      { text: "Literature & History", stream: "arts" },
    ],
  },
  {
    q: "What kind of work excites you?",
    options: [
      { text: "Research & Experiments", stream: "science" },
      { text: "Managing Accounts", stream: "commerce" },
      { text: "Creative Writing", stream: "arts" },
    ],
  },
  {
    q: "What’s your dream career?",
    options: [
      { text: "Engineer / Doctor", stream: "science" },
      { text: "Business Analyst", stream: "commerce" },
      { text: "Journalist / Artist", stream: "arts" },
    ],
  },
];

export default function CareerQuiz() {
  const navigate = useNavigate();
  const user = storage.get("edu_user");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  function selectOption(stream) {
    setAnswers([...answers, stream]);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // calculate result
      const result = answers.concat(stream);
      const count = {};
      result.forEach((r) => (count[r] = (count[r] || 0) + 1));
      const final = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      storage.set(`career_result_${user.email}`, final);
      navigate("/student/dashboard");
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      <AnimatedBackground />
      <div className="max-w-2xl mx-auto px-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Career Quiz</h1>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-white/10">
          <p className="text-xl mb-6">{questions[step].q}</p>
          <div className="grid gap-4">
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectOption(opt.stream)}
                className="p-4 bg-[#0f172a] border border-white/20 rounded-lg hover:bg-[#252f3f] transition"
              >
                {opt.text}
              </button>
            ))}
          </div>
          <p className="mt-6 text-gray-400 text-sm">
            Question {step + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}

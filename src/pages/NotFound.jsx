import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white text-center px-6">
      <AnimatedBackground />
      <div>
        <h1 className="text-6xl font-bold mb-4">EduVision</h1>
        <p className="text-gray-300 mb-6">"A smart, one-stop solution to guide students in choosing the right career
 and education pathway with clarity and confidence."</p>
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaBookOpen, FaChartLine, FaMoneyBill } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Greeting() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] scroll-smooth">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 pt-32 pb-32 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          EduVision
        </motion.h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
          Your <span className="text-purple-400 font-semibold">One-Stop Career & Education Advisor</span>.  
          Discover the right courses, explore real colleges, and map your career path with AI-driven guidance.
        </p>
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:shadow-purple-500/30 transition-all text-lg font-semibold"
        >
          Get Started →
        </motion.button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#1e1b4b]/40 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduVision?</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0f172a] p-6 rounded-2xl shadow-lg border border-white/10">
            <FaChartLine className="text-purple-400 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Career Quiz</h3>
            <p className="text-gray-400 text-sm">
              Take a fun quiz and get AI-powered career & course suggestions tailored to you.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0f172a] p-6 rounded-2xl shadow-lg border border-white/10">
            <FaGraduationCap className="text-cyan-400 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Explore Colleges</h3>
            <p className="text-gray-400 text-sm">
              Browse nearby government colleges with details about courses, eligibility, and facilities.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0f172a] p-6 rounded-2xl shadow-lg border border-white/10">
            <FaBookOpen className="text-pink-400 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Personalized Guidance</h3>
            <p className="text-gray-400 text-sm">
              Get tailored course-to-career roadmaps with industry insights and government exam options.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0f172a] p-6 rounded-2xl shadow-lg border border-white/10">
            <FaMoneyBill className="text-green-400 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Scholarships</h3>
            <p className="text-gray-400 text-sm">
              Never miss deadlines—track scholarships and admission notifications easily.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-[#0f172a]">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">1. Take a Quiz</h3>
            <p className="text-gray-400 text-sm">Answer a few questions about your interests & strengths.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">2. Explore Colleges</h3>
            <p className="text-gray-400 text-sm">Find government colleges offering your recommended courses.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">3. Plan Your Future</h3>
            <p className="text-gray-400 text-sm">See career paths, exams, and higher study opportunities.</p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 text-center bg-gradient-to-r from-purple-600 to-indigo-600">
        <h2 className="text-4xl font-bold mb-6">Ready to shape your future?</h2>
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-xl bg-white text-purple-700 font-semibold shadow-lg"
        >
          Get Started Now →
        </motion.button>
      </section>
      <Footer />
    </div>
  );
}

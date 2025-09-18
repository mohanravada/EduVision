import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assests/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
         {/* Logo + Name */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="EduVision Logo" className="h-10 w-10" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            EduVision
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#features" className="hover:text-purple-400 transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-purple-400 transition">
            How It Works
          </a>
          <a href="#contact" className="hover:text-purple-400 transition">
            Contact
          </a>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow hover:shadow-purple-500/30 transition"
          >
            Login
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-300"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f172a]/95 px-6 py-4 space-y-4 text-gray-300 border-t border-white/10">
          <a
            href="#features"
            className="block hover:text-purple-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block hover:text-purple-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#contact"
            className="block hover:text-purple-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
            className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}

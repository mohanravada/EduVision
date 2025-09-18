import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-white/10 py-10 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            EduVision
          </h2>
          <p className="mt-3 text-sm">
            One-stop career & education advisor helping students plan their
            future with AI-driven guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-purple-400">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-purple-400">How It Works</a></li>
            <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
            <li><a href="/login" className="hover:text-purple-400">Login</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: <span className="text-white">support@eduvision.com</span></p>
          <p className="mt-2">Phone: <span className="text-white">+91 98765 43210</span></p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-purple-400"><FaFacebook /></a>
            <a href="#" className="hover:text-purple-400"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-purple-400"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500">
        © {new Date().getFullYear()} EduVision. All rights reserved.
      </div>
    </footer>
  );
}

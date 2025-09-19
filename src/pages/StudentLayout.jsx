import { Link, Outlet, useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import logo from "../assests/logo.png";
import {
  FaHome,
  FaSearch,
  FaGraduationCap,
  FaBookmark,
  FaMoneyBill,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
  FaPen,
} from "react-icons/fa";

export default function StudentLayout() {
  const navigate = useNavigate();
  const user = storage.get("edu_user");

  function logout() {
    storage.remove("edu_user");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] border-r border-white/10 p-6 flex flex-col">
        {/* Logo + Name */}
        <div className="flex items-center gap-2 px-4 py-6">
          <img src={logo} alt="EduVision Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            EduVision
          </h1>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-4">
          <Link
            to="/student/dashboard"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            to="/student/quiz"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaPen /> Career Quiz
          </Link>
          <Link to="/student/career-guide" className="flex items-center gap-3 hover:text-purple-400">
  <FaGraduationCap /> Career Guide
</Link>

          
          <Link
            to="/student/search-colleges"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaSearch /> Search Colleges
          </Link>
          <Link
            to="/student/saved-colleges"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaBookmark /> Saved Colleges
          </Link>
          <Link
            to="/student/scholarships"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaMoneyBill /> Scholarships
          </Link>
          <Link
            to="/student/profile"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaUser /> Profile
          </Link>
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 mt-6 text-red-400 hover:text-red-300"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

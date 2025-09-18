import { Link, Outlet, useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import logo from "../assests/logo.png";
import {
  FaUniversity,
  FaBook,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    storage.remove("edu_user");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-6">
  <img src={logo} alt="EduVision Logo" className="h-8 w-8" />
  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
    EduVision
  </h1>
</div>
        <nav className="flex-1 space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaUniversity /> Manage College
          </Link>
          <Link
            to="/admin/courses"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaBook /> Add Courses
          </Link>
          <Link
            to="/admin/students"
            className="flex items-center gap-3 hover:text-purple-400"
          >
            <FaUsers /> View Students
          </Link>
        </nav>
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

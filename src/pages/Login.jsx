import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../assests/logo.png"; // ✅ logo

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student"); // student | admin
  const [mode, setMode] = useState("login"); // login | register | reset

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Demo accounts
  const demoStudent = { email: "user@example.com", password: "password123", name: "Demo Student" };
  const demoAdmin = { email: "admin@college.edu", password: "admin123", name: "Demo Admin", college: "Demo College" };

  // Ensure demo admin exists
  const ensureDefaultAdmin = () => {
    const admins = JSON.parse(localStorage.getItem("edu_admins") || "[]");
    if (!admins.find((a) => a.email === demoAdmin.email)) {
      admins.push(demoAdmin);
      localStorage.setItem("edu_admins", JSON.stringify(admins));
    }
  };
  ensureDefaultAdmin();

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "student") {
      const students = JSON.parse(localStorage.getItem("edu_students") || "[]");
      const found = students.find((s) => s.email === email && s.password === password);
      if (found || (email === demoStudent.email && password === demoStudent.password)) {
        localStorage.setItem("edu_user", JSON.stringify({ email, role: "student" }));
        navigate("/student/dashboard");
      } else {
        alert("Invalid student credentials!");
      }
    } else {
      const admins = JSON.parse(localStorage.getItem("edu_admins") || "[]");
      const found = admins.find((a) => a.email === email && a.password === password);
      if (found) {
        localStorage.setItem("edu_user", JSON.stringify({ email, role: "admin" }));
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials!");
      }
    }
  };

  // Handle register
  const handleRegister = (e) => {
    e.preventDefault();
    if (role === "student") {
      if (!name || !email || !password) return alert("Fill all fields");
      const students = JSON.parse(localStorage.getItem("edu_students") || "[]");
      if (students.find((s) => s.email === email)) return alert("Email already registered!");
      students.push({ name, email, password });
      localStorage.setItem("edu_students", JSON.stringify(students));
      localStorage.setItem("edu_user", JSON.stringify({ email, role: "student" }));
      navigate("/student/dashboard");
    } else {
      if (!name || !college || !email || !password) return alert("Fill all fields");
      const admins = JSON.parse(localStorage.getItem("edu_admins") || "[]");
      if (admins.find((a) => a.email === email)) return alert("Admin already exists!");
      admins.push({ name, email, password, college });
      localStorage.setItem("edu_admins", JSON.stringify(admins));
      localStorage.setItem("edu_user", JSON.stringify({ email, role: "admin" }));
      navigate("/admin/dashboard");
    }
  };

  // Handle password reset
  const handleReset = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter email and new password");

    if (role === "student") {
      let students = JSON.parse(localStorage.getItem("edu_students") || "[]");
      const idx = students.findIndex((s) => s.email === email);
      if (idx >= 0 || email === demoStudent.email) {
        if (idx >= 0) students[idx].password = password;
        if (email === demoStudent.email) demoStudent.password = password;
        localStorage.setItem("edu_students", JSON.stringify(students));
        alert("Password reset successful! Please login.");
        setMode("login");
      } else {
        alert("Student email not found!");
      }
    } else {
      let admins = JSON.parse(localStorage.getItem("edu_admins") || "[]");
      const idx = admins.findIndex((a) => a.email === email);
      if (idx >= 0 || email === demoAdmin.email) {
        if (idx >= 0) admins[idx].password = password;
        if (email === demoAdmin.email) demoAdmin.password = password;
        localStorage.setItem("edu_admins", JSON.stringify(admins));
        alert("Password reset successful! Please login.");
        setMode("login");
      } else {
        alert("Admin email not found!");
      }
    }
  };

  // Google login (mock)
  const handleGoogleLogin = () => {
    alert("Google Sign-In clicked! (Mock only)");
    localStorage.setItem("edu_user", JSON.stringify({ email: "googleuser@gmail.com", role }));
    navigate(role === "student" ? "/student/dashboard" : "/admin/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute top-10 left-10 text-white/20 text-6xl animate-bounce">📚</div>
      <div className="absolute bottom-20 right-16 text-white/20 text-5xl animate-pulse">➡️</div>
      <div className="absolute top-40 right-32 text-white/20 text-7xl animate-spin-slow">🎓</div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mt-20"
      >
        {/* Logo + Name */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={logo} alt="EduVision Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-gray-800">EduVision</h1>
        </div>

        {/* Role toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setRole("student");
              setMode("login");
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "student"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "border border-gray-400 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => {
              setRole("admin");
              setMode("login");
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "admin"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "border border-gray-400 text-gray-700 hover:bg-gray-100"
            }`}
          >
            College Admin
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === "login"
            ? role === "student"
              ? "Student Login"
              : "Admin Login"
            : mode === "register"
            ? role === "student"
              ? "Create Student Account"
              : "Register College Admin"
            : "Reset Password"}
        </h2>

        <form
          onSubmit={mode === "login" ? handleLogin : mode === "register" ? handleRegister : handleReset}
          className="space-y-4"
        >
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder={role === "student" ? "Full Name" : "Admin Name"}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {role === "admin" && (
                <input
                  type="text"
                  placeholder="College Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              )}
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder={mode === "reset" ? "New Password" : "Password"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            >
              {show ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition"
          >
            {mode === "login" ? "Sign In" : mode === "register" ? "Register" : "Reset Password"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        {mode === "login" && (
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Icon" className="w-5 h-5" />
            <span className="font-medium text-gray-700">Sign in with Google</span>
          </button>
        )}

        {/* Links */}
        {mode === "login" && (
          <div className="mt-4 text-center text-sm text-gray-700">
            <p onClick={() => setMode("register")} className="cursor-pointer text-blue-600 hover:underline">
              Create new account
            </p>
            <p onClick={() => setMode("reset")} className="cursor-pointer text-red-500 hover:underline mt-2">
              Forgot Password?
            </p>
          </div>
        )}
        {mode !== "login" && (
          <p onClick={() => setMode("login")} className="mt-4 text-center text-sm text-blue-600 cursor-pointer hover:underline">
            Back to Login
          </p>
        )}
      </motion.div>

      
    </div>
  );
}

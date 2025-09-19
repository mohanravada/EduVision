import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

// Firebase imports
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  // role: student | admin
  const [role, setRole] = useState("student");
  // mode: login | register | reset
  const [mode, setMode] = useState("login");

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

  // Handle normal login
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

  // Handle registration
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

  // ✅ Google Sign-in handler
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      localStorage.setItem(
        "edu_user",
        JSON.stringify({ email: user.email, role: "student" }) // default student role
      );

      navigate("/student/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Floating icons */}
      <div className="absolute top-10 left-10 text-white/20 text-6xl animate-bounce">📚</div>
      <div className="absolute bottom-20 right-16 text-white/20 text-5xl animate-pulse">➡️</div>
      <div className="absolute top-40 right-32 text-white/20 text-7xl animate-spin-slow">🎓</div>

      {/* Role toggle */}
      <div className="absolute top-8 flex gap-4">
        <button
          onClick={() => { setRole("student"); setMode("login"); }}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            role === "student"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "border border-white/60 text-white hover:bg-white/10"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => { setRole("admin"); setMode("login"); }}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            role === "admin"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "border border-white/60 text-white hover:bg-white/10"
          }`}
        >
          College Admin
        </button>
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mt-20"
      >
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

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full mt-3 py-3 flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

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
          <p
            onClick={() => setMode("login")}
            className="mt-4 text-center text-sm text-blue-600 cursor-pointer hover:underline"
          >
            Back to Login
          </p>
        )}
      </motion.div>
    </div>
  );
}

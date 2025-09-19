import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

// Firebase
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../auth/firebaseConfig";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student"); // student | admin
  const [mode, setMode] = useState("login"); // login | register | reset
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.emailVerified) {
        alert("Please verify your Google email before continuing.");
        return;
      }

      localStorage.setItem("edu_user", JSON.stringify({ email: user.email, role: "student" }));
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  // Register with Email/Password + Verification
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert("Verification email sent! Please check your inbox before logging in.");

      // Save role temporarily
      localStorage.setItem("edu_user", JSON.stringify({ email: user.email, role }));

      setMode("login");
    } catch (error) {
      console.error("Error registering:", error.message);
      alert(error.message);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        return alert("Please verify your email before logging in.");
      }

      localStorage.setItem("edu_user", JSON.stringify({ email: user.email, role }));
      navigate(role === "student" ? "/student/dashboard" : "/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  // Resend verification email
  const resendVerification = async () => {
    if (!auth.currentUser) return alert("Please log in again to resend verification.");
    try {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email resent! Check your inbox.");
    } catch (error) {
      console.error("Resend error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Floating background */}
      <div className="absolute top-10 left-10 text-white/20 text-6xl animate-bounce">📚</div>
      <div className="absolute bottom-20 right-16 text-white/20 text-5xl animate-pulse">🎓</div>

      {/* Role toggle */}
      <div className="absolute top-8 flex gap-4">
        <button
          onClick={() => {
            setRole("student");
            setMode("login");
          }}
          className={`px-6 py-2 rounded-full font-semibold ${
            role === "student"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "border border-white/60 text-white"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => {
            setRole("admin");
            setMode("login");
          }}
          className={`px-6 py-2 rounded-full font-semibold ${
            role === "admin"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "border border-white/60 text-white"
          }`}
        >
          College Admin
        </button>
      </div>

      {/* Card */}
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
          onSubmit={mode === "login" ? handleLogin : mode === "register" ? handleRegister : () => {}}
          className="space-y-4"
        >
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder={role === "student" ? "Full Name" : "Admin Name"}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {role === "admin" && (
                <input
                  type="text"
                  placeholder="College Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              )}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
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
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md"
          >
            {mode === "login" ? "Sign In" : mode === "register" ? "Register" : "Submit"}
          </button>
        </form>

        {mode === "login" && (
          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-red-500 text-white rounded-lg mt-3"
            >
              Sign in with Google
            </button>
            <p
              onClick={() => setMode("register")}
              className="cursor-pointer text-blue-600 hover:underline mt-2"
            >
              Create new account
            </p>
            <p
              onClick={resendVerification}
              className="cursor-pointer text-green-600 hover:underline mt-2"
            >
              Resend Verification Email
            </p>
          </div>
        )}

        {mode !== "login" && (
          <p
            onClick={() => setMode("login")}
            className="mt-4 text-center text-blue-600 cursor-pointer hover:underline"
          >
            Back to Login
          </p>
        )}
      </motion.div>
    </div>
  );
}

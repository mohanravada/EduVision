// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import AnimatedBackground from "../components/AnimatedBackground";
import { storage } from "../utils/storage";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState(storage.get("edu_colleges", []));
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [courses, setCourses] = useState("");

  const logout = () => {
    storage.remove("edu_user");
    navigate("/login");
  };

  function addCollege(e) {
    e.preventDefault();
    const arr = [...colleges];
    const newC = { college_name: name, district, city, available_courses: courses.split(",").map(s=>s.trim()), contact_email: "", facilities: [] };
    arr.unshift(newC);
    storage.set("edu_colleges", arr);
    setColleges(arr);
    setName(""); setDistrict(""); setCity(""); setCourses("");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-pink-800 text-white overflow-hidden">
      <AnimatedBackground />
      <nav className="flex justify-between items-center bg-white/6 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg m-6 z-10">
        <h1 className="text-2xl font-bold">EduVision Admin</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 rounded-lg">Logout</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white/6 backdrop-blur rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Register College</h3>
            <form onSubmit={addCollege} className="space-y-3">
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="College name" className="w-full p-2 rounded bg-white/4"/>
              <input value={district} onChange={(e)=>setDistrict(e.target.value)} placeholder="District" className="w-full p-2 rounded bg-white/4"/>
              <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" className="w-full p-2 rounded bg-white/4"/>
              <input value={courses} onChange={(e)=>setCourses(e.target.value)} placeholder="Courses (comma separated)" className="w-full p-2 rounded bg-white/4"/>
              <button className="px-4 py-2 bg-eduYellow text-black rounded-lg">Add College</button>
            </form>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="md:col-span-2 bg-white/6 backdrop-blur rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Registered Colleges</h3>
            {colleges.length === 0 ? <div className="text-gray-300">No colleges registered yet.</div> : (
              <div className="space-y-3">
                {colleges.map((c, idx)=>(
                  <div key={idx} className="p-3 bg-white/4 rounded flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{c.college_name}</div>
                      <div className="text-sm text-gray-300">{c.city} • {c.district}</div>
                    </div>
                    <div className="text-sm text-gray-400">{(c.available_courses||[]).slice(0,3).join(", ")}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

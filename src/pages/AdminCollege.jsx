import { useState, useEffect } from "react";
import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

export default function AdminCollege() {
  const user = storage.get("edu_user");
  const key = `college_${user.email}`;
  const [college, setCollege] = useState(
    storage.get(key, {
      id: user.email, // unique per admin
      name: "",
      location: "",
      facilities: "",
      courses: [],
    })
  );

  useEffect(() => {
    storage.set(key, college);

    // also keep global list for students
    const all = storage.get("all_colleges", []);
    const updated = all.filter((c) => c.id !== college.id).concat(college);
    storage.set("all_colleges", updated);
  }, [college]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCollege({ ...college, [name]: value });
  }

  return (
    <div className="relative min-h-screen text-white">
      <AnimatedBackground />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage College</h1>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-white/10 space-y-4">
          <input
            name="name"
            value={college.name}
            onChange={handleChange}
            placeholder="College Name"
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/20"
          />
          <input
            name="location"
            value={college.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/20"
          />
          <textarea
            name="facilities"
            value={college.facilities}
            onChange={handleChange}
            placeholder="Facilities (comma separated)"
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/20"
          />
        </div>
        <p className="mt-4 text-green-400">✅ Changes saved automatically</p>
      </div>
    </div>
  );
}

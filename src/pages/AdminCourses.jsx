import { useState, useEffect } from "react";
import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

export default function AdminCourses() {
  const user = storage.get("edu_user");
  const key = `college_${user.email}`;
  const [college, setCollege] = useState(storage.get(key, null));
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    if (college) {
      storage.set(key, college);

      // update global list for students
      const all = storage.get("all_colleges", []);
      const updated = all.filter((c) => c.id !== college.id).concat(college);
      storage.set("all_colleges", updated);
    }
  }, [college]);

  function addCourse() {
    if (!newCourse.trim()) return;
    setCollege({
      ...college,
      courses: [...(college.courses || []), newCourse.trim()],
    });
    setNewCourse("");
  }

  function removeCourse(i) {
    setCollege({
      ...college,
      courses: college.courses.filter((_, idx) => idx !== i),
    });
  }

  if (!college)
    return (
      <div className="p-10 text-white">
        Please set up your college details first in "Manage College".
      </div>
    );

  return (
    <div className="relative min-h-screen text-white">
      <AnimatedBackground />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add Courses</h1>
        <div className="flex gap-3 mb-6">
          <input
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="Course Name"
            className="flex-1 p-3 rounded-lg bg-[#0f172a] border border-white/20"
          />
          <button
            onClick={addCourse}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {(college.courses || []).map((c, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-[#1e293b] p-3 rounded-lg border border-white/10"
            >
              {c}
              <button
                onClick={() => removeCourse(i)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

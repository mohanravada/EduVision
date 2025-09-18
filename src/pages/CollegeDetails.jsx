import { useParams } from "react-router-dom";
import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

const colleges = [
  {
    id: "1",
    name: "Government Science College",
    location: "Hyderabad",
    courses: ["B.Sc Computer Science", "B.Sc Physics"],
  },
  {
    id: "2",
    name: "Government Arts College",
    location: "Chennai",
    courses: ["B.A English Literature", "B.A History"],
  },
  {
    id: "3",
    name: "Government Commerce College",
    location: "Bengaluru",
    courses: ["B.Com Accounting", "B.Com Analytics"],
  },
];

export default function CollegeDetails() {
  const { id } = useParams();
  const college = colleges.find((c) => c.id === id);
  const user = storage.get("edu_user");

  function saveCollege() {
    const saved = storage.get(`saved_colleges_${user.email}`, []);
    if (!saved.find((s) => s.id === college.id)) {
      saved.push(college);
      storage.set(`saved_colleges_${user.email}`, saved);
    }
    alert("College saved!");
  }

  if (!college)
    return (
      <div className="p-10 text-white">College not found.</div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      <AnimatedBackground />
      <div className="max-w-3xl mx-auto px-6 pt-24">
        <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
        <p className="text-gray-400 mb-4">{college.location}</p>
        <h2 className="text-xl font-semibold mb-2">Available Courses</h2>
        <ul className="list-disc list-inside mb-6 text-gray-300">
          {college.courses.map((course, i) => (
            <li key={i}>{course}</li>
          ))}
        </ul>
        <button
          onClick={saveCollege}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg"
        >
          Save College
        </button>
      </div>
    </div>
  );
}

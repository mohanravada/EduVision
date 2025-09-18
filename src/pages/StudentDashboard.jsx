import { motion } from "framer-motion";
import {
  FaSearch,
  FaGraduationCap,
  FaUserEdit,
  FaBookmark,
  FaMoneyBill,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import { storage } from "../utils/storage";
import SmallChart from "../components/SmallChart";
import DashboardHeader from "../components/DashboardHeader.jsx";

const allColleges = [
  {
    id: "1",
    name: "Government Science College",
    location: "Hyderabad",
    courses: ["B.Sc Computer Science", "B.Sc Physics"],
    stream: "science",
  },
  {
    id: "2",
    name: "Government Arts College",
    location: "Chennai",
    courses: ["B.A English Literature", "B.A History"],
    stream: "arts",
  },
  {
    id: "3",
    name: "Government Commerce College",
    location: "Bengaluru",
    courses: ["B.Com Accounting", "B.Com Analytics"],
    stream: "commerce",
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = storage.get("edu_user") || { email: "guest" };
  const students = storage.get("edu_students", []);
  const student = students.find((s) => s.email === user.email) || {};

  const fields = ["education", "board", "state", "city", "hobbies", "workPref"];
  const filled = fields.filter(
    (f) => student[f] && student[f].toString().trim() !== ""
  ).length;
  const completion = Math.round((filled / fields.length) * 100);

  const careerResult = storage.get(`career_result_${user.email}`, null);
  const recommended = careerResult
    ? allColleges.filter((c) => c.stream === careerResult)
    : [];



    
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Welcome, Student!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-gray-300"
        >
          Explore personalized tools to guide your academic and career journey.
        </motion.p>

        {/* Profile completion */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              className="h-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Career result */}
        {careerResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-[#1e293b] p-6 rounded-xl shadow-md border border-white/10"
          >
            <h2 className="text-xl text-purple-400 font-semibold">
              Your Recommended Stream
            </h2>
            <p className="text-2xl font-bold capitalize mt-2">{careerResult}</p>
            <p className="text-gray-400 mt-2">
              This stream was recommended based on your Career Quiz responses.
            </p>
          </motion.div>
        )}

        {/* Recommended colleges */}
        {recommended.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">
              🎓 Recommended Colleges
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommended.map((college, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    navigate(`/student/college/${college.id}`)
                  }
                  className="bg-[#1e293b] p-6 rounded-xl shadow-md border border-white/10 hover:bg-[#252f3f] transition cursor-pointer"
                >
                  <h3 className="text-xl font-semibold">{college.name}</h3>
                  <p className="text-gray-400">{college.location}</p>
                  <ul className="mt-3 text-gray-300 text-sm list-disc list-inside">
                    {college.courses.slice(0, 2).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}


        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-white/10"
          >
            <FaSearch className="text-purple-400 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Career Quiz</h2>
            <p className="text-gray-400 mb-6">
              Take our quiz to discover streams, courses, and careers suited for
              you.
            </p>
            <button
              onClick={() => navigate("/student/quiz")}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg"
            >
              Take the Quiz →
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-white/10"
          >
            <FaGraduationCap className="text-cyan-400 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Explore Colleges</h2>
            <p className="text-gray-400 mb-6">
              Search and discover nearby government colleges offering your
              preferred courses.
            </p>
            <button
              onClick={() => navigate("/student/search-colleges")}
              className="px-6 py-3 bg-[#0f172a] text-white border border-white/20 rounded-lg"
            >
              Find Colleges →
            </button>
          </motion.div>
        </div>

        {/* Quick actions */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/student/profile")}
              className="bg-[#1e293b] p-6 rounded-xl shadow-md flex flex-col items-center cursor-pointer hover:bg-[#252f3f] transition"
            >
              <FaUserEdit className="text-purple-400 text-3xl mb-3" />
              <span className="font-semibold">Edit Profile</span>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Update your personal and academic details.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/student/saved-colleges")}
              className="bg-[#1e293b] p-6 rounded-xl shadow-md flex flex-col items-center cursor-pointer hover:bg-[#252f3f] transition"
            >
              <FaBookmark className="text-cyan-400 text-3xl mb-3" />
              <span className="font-semibold">Saved Colleges</span>
              <p className="text-gray-400 text-sm mt-2 text-center">
                View colleges you’ve saved for later.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/student/scholarships")}
              className="bg-[#1e293b] p-6 rounded-xl shadow-md flex flex-col items-center cursor-pointer hover:bg-[#252f3f] transition"
            >
              <FaMoneyBill className="text-green-400 text-3xl mb-3" />
              <span className="font-semibold">Scholarships</span>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Check available scholarships and deadlines.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

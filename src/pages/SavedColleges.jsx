import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

export default function SavedColleges() {
  const user = storage.get("edu_user");
  const saved = storage.get(`saved_colleges_${user.email}`, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      <AnimatedBackground />
      <div className="max-w-3xl mx-auto px-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Saved Colleges</h1>
        {saved.length === 0 ? (
          <p className="text-gray-400">No saved colleges yet.</p>
        ) : (
          <div className="grid gap-6">
            {saved.map((c, i) => (
              <div
                key={i}
                className="bg-[#1e293b] p-6 rounded-xl shadow-md border border-white/10"
              >
                <h2 className="text-xl font-semibold">{c.name}</h2>
                <p className="text-gray-400">{c.location}</p>
                <p className="text-gray-300 text-sm mt-2">
                  Courses: {c.courses.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

export default function AdminStudents() {
  const students = storage.get("edu_students", []);

  return (
    <div className="relative min-h-screen text-white">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Registered Students</h1>
        {students.length === 0 ? (
          <p className="text-gray-400">No students registered yet.</p>
        ) : (
          <table className="w-full bg-[#1e293b] rounded-xl border border-white/10 overflow-hidden">
            <thead>
              <tr className="bg-[#0f172a] text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Education</th>
                <th className="p-3">City</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="p-3">{s.name || "-"}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.education || "-"}</td>
                  <td className="p-3">{s.city || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

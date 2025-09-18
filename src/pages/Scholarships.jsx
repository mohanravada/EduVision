import AnimatedBackground from "../components/AnimatedBackground";

const scholarships = [
  {
    name: "National Scholarship Scheme",
    deadline: "March 31, 2025",
    eligibility: "Open to all UG students",
  },
  {
    name: "Merit-based Scholarship",
    deadline: "April 15, 2025",
    eligibility: "Above 85% in Class 12",
  },
];

export default function Scholarships() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      <AnimatedBackground />
      <div className="max-w-3xl mx-auto px-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Scholarships</h1>
        <div className="grid gap-6">
          {scholarships.map((s, i) => (
            <div
              key={i}
              className="bg-[#1e293b] p-6 rounded-xl shadow-md border border-white/10"
            >
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="text-gray-400">Deadline: {s.deadline}</p>
              <p className="text-gray-300 text-sm mt-2">{s.eligibility}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";

export default function CareerDetails() {
  const { id } = useParams();

  const careerDetails = {
    intermediate: {
      title: "Intermediate (Science, Commerce, Arts)",
      description:
        "After 10th, you can choose intermediate with streams like Science, Commerce, or Arts depending on your interest.",
      opportunities: ["Engineering", "Medical", "Commerce degrees", "Arts degrees"],
    },
    btech: {
      title: "Engineering (B.Tech)",
      description:
        "B.Tech offers specialization in fields like Computer Science, Civil, Mechanical, Electrical, and more.",
      opportunities: ["Software Engineer", "Civil Engineer", "Research", "Higher Studies (M.Tech, MBA)"],
    },
    // Add other careers here...
  };

  const career = careerDetails[id];

  if (!career) {
    return <div className="text-white">Career details not found!</div>;
  }

  return (
    <div className="p-8 text-white bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] min-h-screen">
      <h1 className="text-3xl font-bold text-purple-400 mb-4">{career.title}</h1>
      <p className="mb-6 text-gray-300">{career.description}</p>
      <h2 className="text-xl font-semibold mb-3">Opportunities</h2>
      <ul className="list-disc list-inside text-gray-300">
        {career.opportunities.map((op, idx) => (
          <li key={idx}>{op}</li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import careerData from "../data/careerData.json";

export default function CareerGuide() {
  const [education, setEducation] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Career Guide</h1>
      <p className="mb-4 text-gray-300">
        Select your highest completed education to explore available career
        opportunities:
      </p>

      {/* Dropdown */}
      <select
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-[#1e293b] border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">-- Select Education --</option>
        <option value="10th">10th (SSC)</option>
        <option value="inter">Intermediate (12th / HSC)</option>
        <option value="iti">ITI / Diploma</option>
        <option value="ug">Undergraduate (Degree)</option>
        <option value="pg">Postgraduate (Masters)</option>
      </select>

      {/* Career Options */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {education &&
            careerData[education]?.map((option, idx) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#1e293b] p-6 rounded-xl shadow-md border border-white/10 hover:bg-[#252f3f] cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2 text-purple-400">
                  {option.title}
                </h2>
                <p className="text-gray-300 mb-3">{option.description}</p>
                <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                  {option.paths.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelected(option)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-sm"
                >
                  Learn More →
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1e293b] p-6 rounded-xl max-w-lg w-full shadow-lg border border-white/20"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                {selected.title}
              </h2>
              <p className="text-gray-300 mb-3">{selected.details.scope}</p>
              <p className="text-gray-400 text-sm">
                <strong>Exams:</strong> {selected.details.exams.join(", ")}
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Jobs:</strong> {selected.details.jobs.join(", ")}
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Salary:</strong> {selected.details.salary}
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-red-500 rounded-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

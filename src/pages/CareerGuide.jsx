import { useState } from "react";

export default function CareerGuide() {
  const [education, setEducation] = useState("");

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Career Guide</h1>
      <p className="mb-4 text-gray-300">
        Select your highest completed education to explore available career
        opportunities:
      </p>

      {/* Dropdown for education selection */}
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

      {/* Show options based on selection */}
      <div className="mt-6">
        {education === "10th" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">After 10th Options</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Intermediate (Science, Commerce, Arts)</li>
              <li>Diploma / Polytechnic</li>
              <li>ITI Trades</li>
              <li>Paramedical Courses</li>
            </ul>
          </div>
        )}

        {education === "inter" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">After 12th Options</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Engineering (B.Tech)</li>
              <li>Medical (MBBS, BDS, B.Pharmacy)</li>
              <li>Commerce (B.Com, BBA, CA)</li>
              <li>Arts (B.A, Fine Arts, Design)</li>
            </ul>
          </div>
        )}

        {education === "iti" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">After ITI / Diploma</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Lateral Entry to Engineering</li>
              <li>Advanced Diploma Programs</li>
              <li>Government Jobs (Railways, PSU, etc.)</li>
            </ul>
          </div>
        )}

        {education === "ug" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">After Graduation</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Postgraduate Courses (M.Tech, MBA, etc.)</li>
              <li>Government Exams (UPSC, SSC, Banking)</li>
              <li>Private Sector Jobs</li>
            </ul>
          </div>
        )}

        {education === "pg" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">After Postgraduation</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Ph.D / Research</li>
              <li>Teaching / Academia</li>
              <li>Specialized Government Exams</li>
              <li>Industry Expert Roles</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

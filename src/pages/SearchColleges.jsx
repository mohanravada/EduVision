import { useEffect, useState } from "react";

export default function SearchColleges() {
  const [colleges, setColleges] = useState([]);
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Common city/state synonyms mapping
  const cityMap = {
    bombay: "Mumbai",
    mumbai: "Mumbai",
    bengaluru: "Bangalore",
    bangalore: "Bangalore",
    calcutta: "Kolkata",
    kolkata: "Kolkata",
    madras: "Chennai",
    chennai: "Chennai",
    hyderabad: "Hyderabad",
    delhi: "Delhi",
    lucknow: "Lucknow",
    pune: "Pune",
    patna: "Patna",
    bhopal: "Bhopal",
    jaipur: "Jaipur",
    kanpur: "Kanpur",
    nagpur: "Nagpur",
  };

  // Fetch colleges
  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=India")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Extract cleaned city/state names from college names
  const states = Array.from(
    new Set(
      colleges
        .map((c) => {
          const name = c.name.toLowerCase();

          // Look for city keywords in college name
          for (const key in cityMap) {
            if (name.includes(key)) {
              return cityMap[key];
            }
          }

          return null;
        })
        .filter(Boolean)
    )
  ).sort();

  // Apply filters
  const filtered = colleges.filter((c) => {
    const name = c.name.toLowerCase();
    const matchesName = name.includes(query.toLowerCase());
    const matchesState =
      !stateFilter ||
      Object.keys(cityMap).some(
        (key) => stateFilter === cityMap[key] && name.includes(key)
      );
    return matchesName && matchesState;
  });

  return (
    <div className="p-6 text-white bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Search Colleges</h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by college name..."
          className="flex-1 p-3 rounded-lg text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="p-3 rounded-lg text-black"
        >
          <option value="">Filter by City/State</option>
          {states.map((s, idx) => (
            <option key={idx} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading colleges...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No colleges found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.slice(0, 30).map((college, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-6 rounded-lg shadow hover:bg-[#252f3f] transition"
            >
              <h2 className="text-xl font-semibold">{college.name}</h2>
              <p className="text-gray-400 mt-2">{college.country}</p>
              {college.web_pages?.[0] && (
                <a
                  href={college.web_pages[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline mt-2 block"
                >
                  Visit Website →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

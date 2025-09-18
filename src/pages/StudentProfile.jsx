import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import { storage } from "../utils/storage";
import AnimatedBackground from "../components/AnimatedBackground";

export default function StudentProfile() {
  const navigate = useNavigate();
  const user = storage.get("edu_user") || { email: "guest" };
  const students = storage.get("edu_students", []);
  const found = students.find((s) => s.email === user.email) || {};

  const [education, setEducation] = useState(found.education || "");
  const [board, setBoard] = useState(found.board || "");
  const [state, setState] = useState(found.state || "");
  const [city, setCity] = useState(found.city || "");
  const [hobbies, setHobbies] = useState(found.hobbies || "");
  const [workPref, setWorkPref] = useState(found.workPref || "Full-time");
  const [avatar, setAvatar] = useState(found.avatar || "");

  // Cropper states
  const [rawImage, setRawImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setRawImage(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const saveCroppedImage = async () => {
    try {
      const croppedImg = await getCroppedImg(rawImage, {
        x: (croppedArea.x / (rawImage.width || 100)) * 100,
        y: (croppedArea.y / (rawImage.height || 100)) * 100,
        width: (croppedArea.width / (rawImage.width || 100)) * 100,
        height: (croppedArea.height / (rawImage.height || 100)) * 100,
      });
      setAvatar(croppedImg);
      setShowCropper(false);
    } catch (err) {
      console.error(err);
    }
  };

  function saveProfile() {
    const updated = students.map((s) =>
      s.email === user.email
        ? { ...s, education, board, state, city, hobbies, workPref, avatar }
        : s
    );
    storage.set("edu_students", updated);
    alert("Profile saved successfully!");
    navigate("/student/dashboard");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      <AnimatedBackground />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="text-gray-400 mt-2">
          Help us understand you better to provide personalized recommendations.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Academic Details */}
          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Academic Details</h2>
            <label className="block mb-3">
              <span className="text-sm text-gray-300">Current Education</span>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full mt-1 p-3 bg-[#0f172a] border border-white/20 rounded-lg text-white"
              >
                <option value="">Select...</option>
                <option value="Class 12">Class 12</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </label>
            <label className="block mb-3">
              <span className="text-sm text-gray-300">Board of Study</span>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full mt-1 p-3 bg-[#0f172a] border border-white/20 rounded-lg text-white"
              >
                <option value="">Select...</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          {/* Personal Details */}
          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

            {/* Avatar Upload */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded overflow-hidden bg-gray-700">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-gray-400">
                    No Image
                  </span>
                )}
              </div>
              <label className="cursor-pointer px-4 py-2 bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition">
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            <label className="block mb-3">
              <span className="text-sm text-gray-300">State</span>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g., California"
                className="w-full mt-1 p-3 bg-[#0f172a] border border-white/20 rounded-lg text-white"
              />
            </label>
            <label className="block mb-3">
              <span className="text-sm text-gray-300">City / District</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Los Angeles"
                className="w-full mt-1 p-3 bg-[#0f172a] border border-white/20 rounded-lg text-white"
              />
            </label>
            <label className="block mb-3">
              <span className="text-sm text-gray-300">Hobbies</span>
              <textarea
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                placeholder="e.g., Reading, coding, hiking..."
                rows={3}
                className="w-full mt-1 p-3 bg-[#0f172a] border border-white/20 rounded-lg text-white"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Work Preference</span>
              <div className="flex gap-6 mt-2">
                {["Full-time", "Part-time"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={workPref === opt}
                      onChange={() => setWorkPref(opt)}
                      className="accent-purple-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-10 text-center">
          <button
            onClick={saveProfile}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md hover:shadow-purple-500/30 transition font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
          <div className="relative w-[300px] h-[300px] bg-black">
            <Cropper
              image={rawImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setShowCropper(false)}
              className="px-4 py-2 bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={saveCroppedImage}
              className="px-4 py-2 bg-purple-600 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

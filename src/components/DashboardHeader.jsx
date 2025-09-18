import logo from "../assests/logo.png";

export default function DashboardHeader({ title }) {
  return (
    <div className="flex items-center justify-between bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-40">
      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="EduVision Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          EduVision
        </h1>
      </div>

      {/* Page Title */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
      )}
    </div>
  );
}

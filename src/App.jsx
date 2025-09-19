import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Greeting from "./pages/Greeting.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import CareerQuiz from "./pages/CareerQuiz.jsx";
import SearchColleges from "./pages/SearchColleges.jsx";
import CollegeDetails from "./pages/CollegeDetails.jsx";
import SavedColleges from "./pages/SavedColleges.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StudentLayout from "./pages/StudentLayout.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import CareerGuide from "./pages/CareerGuide.jsx";

export default function App() {
  return (
    <Routes>
      {/* Greeting page */}
      <Route path="/" element={<Greeting />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      <Route path="/student/search-colleges" element={<SearchColleges />} />

      {/* Student routes (protected) */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <Routes>
              <Route index element={<StudentDashboard />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="quiz" element={<CareerQuiz />} />
              <Route path="search-colleges" element={<SearchColleges />} />
              <Route path="college/:id" element={<CollegeDetails />} />
              <Route path="saved-colleges" element={<SavedColleges />} />
              <Route path="scholarships" element={<Scholarships />} />
              <Route path="career-guide" element={<CareerGuide />} />
            </Routes>

            

          </ProtectedRoute>
        }
      />

      {/* Admin routes (protected) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
            </Routes>
          </ProtectedRoute>
        }
      />
      <Route
  path="/student/*"
  element={
    <ProtectedRoute role="student">
      <StudentLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<StudentDashboard />} />
  <Route path="dashboard" element={<StudentDashboard />} />
  <Route path="quiz" element={<CareerQuiz />} />
  <Route path="career-guide" element={<CareerGuide />} />
  <Route path="search-colleges" element={<SearchColleges />} />
  <Route path="college/:id" element={<CollegeDetails />} />
  <Route path="saved-colleges" element={<SavedColleges />} />
  <Route path="scholarships" element={<Scholarships />} />
  <Route path="profile" element={<StudentProfile />} />
</Route>

<Route
  path="/admin/*"
  element={
    <ProtectedRoute role="admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  {/* placeholders for future */}
  <Route path="courses" element={<div className='text-white'>Add Courses Page</div>} />
  <Route path="students" element={<div className='text-white'>View Students Page</div>} />
</Route>


      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

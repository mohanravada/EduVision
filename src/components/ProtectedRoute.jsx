import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects routes based on stored localStorage user role.
 * role: 'student' | 'admin'
 */
export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("edu_user") || "null");
  if (!user) return <Navigate to="/login" replace />;          // not logged in
  if (role && user.role !== role) return <Navigate to="/login" replace />; // wrong role
  return children;
}

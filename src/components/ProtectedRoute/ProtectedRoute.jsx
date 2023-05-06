import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("token");
  if (user) {
  return children;
   }
  return <Navigate to="/login" />;
}

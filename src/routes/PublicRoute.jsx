// PublicRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Prevents logged-in users from visiting login/signup pages.
 * If already logged in, redirect to the appropriate area.
 */
export default function PublicRoute() {
  const { token, user } = useSelector((state) => state.auth);

  if (token) {
    // Redirect logged-in user according to role
    if (user?.platformRole === "admin" || user?.platformRole === "support" || user?.platformRole === "super")
      return <Navigate to="/dashboard" replace />;
    if (user?.platformRole === "customer") return <Navigate to="/customer" replace />;
    // fallback
    return <Navigate to="/" replace />;
  }

  // not logged in -> allow access to public routes
  return <Outlet />;
}

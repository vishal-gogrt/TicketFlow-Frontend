// PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Usage:
 * <Route element={<PrivateRoute allowedRoles={['admin']} />}>
 *   <Route path="/dashboard" element={<DashboardLayout/>}> ... </Route>
 * </Route>
 */
export default function PrivateRoute({ allowedRoles }) {
  const { user, token } = useSelector((state) => state.auth);


  // not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // authenticated but role not permitted
  if (allowedRoles && !allowedRoles.includes(user?.platformRole)) {
    return <Navigate to="/" replace />;
  }

  // allowed -> render nested routes via Outlet
  return <Outlet />;
}

// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

/* Layouts */
import DashboardLayout from "./layouts/DashboardLayout";
import CustomerLayout from "./layouts/CustomerLayout";

/* Pages */
// import Landing from "./pages/Public/Landing";
import Login from "./pages/Public/Login";
import Signup from "./pages/Public/Signup";

import Overview from "./pages/Dashboard/Overview";
import Users from "./pages/Dashboard/Users";
import Organization from "./pages/Dashboard/Organization";

import CustomerHome from "./pages/Customer/CustomerHome";
import CustomerTickets from "./pages/Customer/CustomerTickets";
import CustomerProfile from "./pages/Customer/CustomerProfile";
import { useSelector } from "react-redux";

export default function App() {
  const { mode } = useSelector((state) => state.theme);

  console.log("Current theme mode:", mode);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  return (
    <Routes>
      {/* ---------- Public routes (landing, login, signup) ---------- */}
      <Route element={<PublicRoute />}>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* ---------- Admin (private) ---------- */}
      <Route element={<PrivateRoute allowedRoles={["super", "support"]} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="organization" element={<Organization />} />
          {/* /dashboard/users */}
        </Route>
      </Route>

      {/* ---------- Customer (private) ---------- */}
      {/* <Route element={<PrivateRoute allowedRoles={["customer"]} />}>
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="tickets" element={<CustomerTickets />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>
      </Route> */}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

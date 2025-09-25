/* eslint-disable no-unused-vars */
// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Ticket, Calendar, LogOut, Building2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/dashboard/organization", label: "Organization", icon: Building2 },
    { to: "/teams", label: "Teams", icon: Users },
    { to: "/dashboard/tickets", label: "Tickets", icon: Ticket },
    { to: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <aside className="w-64 theme-bg-primary theme-border border-r min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-blue-600">
        KwicpeFlow
      </div>

      {/* Links */}
      <nav className="flex-1 px-4 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "theme-text-primary theme-bg-hover"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout button */}
      <button
        onClick={() => dispatch(logout())}
        className="flex items-center gap-3 px-4 py-2 m-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}

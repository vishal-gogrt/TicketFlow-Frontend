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
    { to: "/organization", label: "Organization", icon: Building2 },
    { to: "/teams", label: "Teams", icon: Users },
    { to: "/tickets", label: "Tickets", icon: Ticket },
    { to: "/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-blue-600 dark:text-blue-400">
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
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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

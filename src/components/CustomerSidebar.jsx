import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomerSidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Customer</h2>
      <nav className="space-y-2">
        <NavLink to="/customer" end className={({ isActive }) => isActive ? "block p-2 bg-gray-200 dark:bg-gray-700 rounded" : "block p-2"}>Home</NavLink>
        <NavLink to="/customer/tickets" className={({ isActive }) => isActive ? "block p-2 bg-gray-200 dark:bg-gray-700 rounded" : "block p-2"}>Tickets</NavLink>
        <NavLink to="/customer/profile" className={({ isActive }) => isActive ? "block p-2 bg-gray-200 dark:bg-gray-700 rounded" : "block p-2"}>Profile</NavLink>
      </nav>
    </div>
  );
}

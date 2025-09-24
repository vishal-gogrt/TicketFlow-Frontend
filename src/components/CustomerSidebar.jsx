import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomerSidebar() {
  return (
    <div className="w-64 theme-bg-primary shadow-lg min-h-screen p-4">
      <h2 className="text-xl font-bold theme-text-primary mb-6">Customer</h2>
      <nav className="space-y-2">
        <NavLink to="/customer" end className={({ isActive }) => isActive ? "block p-2 theme-bg-hover rounded theme-text-primary" : "block p-2 theme-text-primary"}>Home</NavLink>
        <NavLink to="/customer/tickets" className={({ isActive }) => isActive ? "block p-2 theme-bg-hover rounded theme-text-primary" : "block p-2 theme-text-primary"}>Tickets</NavLink>
        <NavLink to="/customer/profile" className={({ isActive }) => isActive ? "block p-2 theme-bg-hover rounded theme-text-primary" : "block p-2 theme-text-primary"}>Profile</NavLink>
      </nav>
    </div>
  );
}

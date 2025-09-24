// src/components/Navbar.jsx
import React from "react";
import { Bell, Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

export default function Navbar() {
  const { mode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="flex items-center justify-between px-6 py-3 theme-header">
      {/* Left side: Org select placeholder */}
      <div>
        <select className="theme-select px-3 py-1 rounded">
          <option>Select Org</option>
        </select>
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="theme-toggle-btn"
        >
          {mode === "dark" ? (
            <Sun className="theme-toggle-icon theme-toggle-icon--sun" />
          ) : (
            <Moon className="theme-toggle-icon" />
          )}
        </button>

        {/* Notifications */}
        <button className="theme-toggle-btn">
          <Bell className="theme-toggle-icon" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center uppercase">
            {user?.name?.[0] || "U"}
          </div>
          <span className="theme-text-primary">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}

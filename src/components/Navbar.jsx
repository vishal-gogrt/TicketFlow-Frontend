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
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* Left side: Org select placeholder */}
      <div>
        <select className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded">
          <option>Select Org</option>
        </select>
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {mode === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center uppercase">
            {user?.name?.[0] || "U"}
          </div>
          <span className="text-gray-700 dark:text-gray-200">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}

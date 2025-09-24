// src/pages/Dashboard/Overview.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function Overview() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-blue-100">
          Here’s what’s happening with your tickets today.
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-300">Resolved</h3>
          <p className="text-2xl font-bold text-green-500 mt-2">0</p>
          <span className="text-xs text-green-600">Successfully closed</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-300">Overdue</h3>
          <p className="text-2xl font-bold text-red-500 mt-2">0</p>
          <span className="text-xs text-red-600">Needs attention</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-300">Open Tickets</h3>
          <p className="text-2xl font-bold text-orange-500 mt-2">0</p>
          <span className="text-xs text-orange-600">Awaiting response</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-300">Total Tickets</h3>
          <p className="text-2xl font-bold text-blue-500 mt-2">0</p>
          <span className="text-xs text-blue-600">System wide</span>
        </div>
      </div>

      {/* Lower grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Priority Distribution
          </h3>
          {["Urgent", "High", "Medium", "Low"].map((level) => (
            <div key={level} className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{level}</span>
                <span>0</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
                <div className="h-2 bg-blue-500 rounded" style={{ width: "0%" }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Team Performance
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
              <p className="text-xl font-bold text-blue-500">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Agents</p>
              <p className="text-xl font-bold text-green-500">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Avg. Resolution</p>
              <p className="text-xl font-bold text-purple-500">2.5d</p>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Recent Tickets
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>No recent tickets</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

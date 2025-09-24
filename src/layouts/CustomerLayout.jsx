import React from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import Navbar from "../components/Navbar";

export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <CustomerSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

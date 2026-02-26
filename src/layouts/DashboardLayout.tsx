import type * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import TopNavbar from "../components/dashboard/TopNavbar";

const routeTitles: Record<string, string> = {
  "/dashboard/analytics": "Analytics",
  "/dashboard/transactions": "Transactions",
};

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] text-gray-900 dark:bg-[#0F172A] dark:text-white">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-64">
        <TopNavbar pageTitle={pageTitle} />
        <main className="flex-1 p-6" id="main-content" aria-label="Dashboard content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import type * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { FiBarChart2, FiCreditCard } from "react-icons/fi";

const navItems = [
  { path: "/dashboard/analytics", label: "Analytics", icon: FiBarChart2 },
  { path: "/dashboard/transactions", label: "Transactions", icon: FiCreditCard },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0B1220] border-r border-gray-700">
      <div className="flex h-16 items-center px-6 border-b border-gray-700">
        <Link to="/" className="text-xl font-semibold">
          <span className="text-indigo-500">Pay</span>Pilot
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6" aria-label="Dashboard navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] focus-visible:outline-none ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white dark:text-slate-400 dark:hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

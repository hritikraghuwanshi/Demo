import { motion } from "framer-motion";
import type * as React from "react";

type StatCard = {
  label: string;
  value: string;
};

const stats: StatCard[] = [
  { label: "Revenue", value: "$128.4K" },
  { label: "Transactions", value: "8,942" },
  { label: "Success Rate", value: "98.7%" },
];

const DashboardPreview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="w-full rounded-2xl border border-gray-800 bg-[#111827]/70 p-6 shadow-xl backdrop-blur-lg"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-[#1F2937] p-4">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex h-40 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-sm text-gray-400">
        Analytics Overview
      </div>
    </motion.div>
  );
};

export default DashboardPreview;

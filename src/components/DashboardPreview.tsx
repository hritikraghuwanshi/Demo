import type * as React from "react";
import { motion } from "framer-motion";

const DashboardPreview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Browser-style frame */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700/80 dark:bg-gray-900/90 dark:shadow-2xl dark:shadow-indigo-500/5">
        {/* Window header */}
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/80">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-600" />
            <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-600" />
            <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
          <div className="flex flex-1 justify-center">
            <span className="text-xs font-medium text-gray-500">
              dashboard.paypilot.io
            </span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Revenue", value: "$124.2K", change: "+12.4%", color: "indigo" },
              { label: "Transactions", value: "2,847", change: "+8.2%", color: "emerald" },
              { label: "Active Users", value: "1,293", change: "+24.1%", color: "amber" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700/60 dark:bg-gray-800/40"
              >
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p
                  className={`text-[10px] mt-1 ${
                    stat.color === "indigo"
                      ? "text-indigo-400"
                      : stat.color === "emerald"
                        ? "text-emerald-400"
                        : "text-amber-400"
                  }`}
                >
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Chart placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="h-24 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700/60 dark:bg-gray-800/40"
          >
            <div className="flex items-end gap-1 h-full">
              {[40, 65, 45, 80, 55, 70, 90, 65, 75, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-t bg-indigo-500/60 min-w-[6px]"
                />
              ))}
            </div>
          </motion.div>

          {/* Activity list */}
          <div className="space-y-2">
            {[
              { type: "Payment", desc: "Stripe • $2,450.00", time: "2m ago" },
              { type: "Subscription", desc: "Plan upgraded", time: "5m ago" },
              { type: "Refund", desc: "Order #4821", time: "12m ago" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700/40 dark:bg-gray-800/30"
              >
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{item.type}</p>
                  <p className="text-[10px] text-gray-500">{item.desc}</p>
                </div>
                <span className="text-[10px] text-gray-500">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect - dark mode only */}
      <div
        className="absolute -inset-1 -z-10 hidden rounded-2xl blur-xl bg-indigo-500/10 dark:block"
        aria-hidden
      />
    </motion.div>
  );
};

export default DashboardPreview;

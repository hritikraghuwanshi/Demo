import type * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FiAlertCircle } from "react-icons/fi";
import { useThemeStore } from "../../store/themeStore";
import { Button } from "../../components/ui";
import AnalyticsSkeleton from "../../components/ui/AnalyticsSkeleton";
import { fetchAnalytics, type AnalyticsResponse } from "../../services/api";

const Analytics: React.FC = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAnalytics();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900/30"
      >
        <FiAlertCircle className="mb-4 text-red-400" size={48} aria-hidden />
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          Failed to load analytics
        </h3>
        <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
          {error}
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={loadAnalytics}
          aria-label="Retry loading analytics"
        >
          Try again
        </Button>
      </motion.div>
    );
  }

  if (!data) {
    return null;
  }

  const { revenueData, successRateData, stats } = data;

  const chartColor = isDark ? "#6366f1" : "#4f46e5";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      <div className="flex justify-end border-b border-gray-200/80 pb-6 dark:border-gray-800/80">
        <h1 className="text-xs font-medium tracking-[-0.02em] text-gray-900 dark:text-white">
          Analytics Overview
        </h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-[#111827]/80 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-indigo-500/10"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p
              className={`text-sm mt-1 ${
                stat.positive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {stat.change} from last month
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-[#111827]/70 dark:shadow-xl">
        <h2 className="text-lg font-medium text-gray-600 mb-4 dark:text-gray-300">Revenue Trend</h2>
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} fontSize={12} />
              <YAxis stroke={textColor} fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#fff",
                  border: `1px solid ${gridColor}`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: isDark ? "#f8fafc" : "#0f172a" }}
                formatter={(value) => [`$${(value ?? 0).toLocaleString()}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Success rate chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-[#111827]/70 dark:shadow-xl">
        <h2 className="text-lg font-medium text-gray-600 mb-4 dark:text-gray-300">Success Rate (Last 7 Days)</h2>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={successRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" stroke={textColor} fontSize={12} />
              <YAxis
                stroke={textColor}
                fontSize={12}
                domain={[95, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#fff",
                  border: `1px solid ${gridColor}`,
                  borderRadius: "8px",
                }}
                formatter={(value) => [`${value ?? 0}%`, "Success Rate"]}
              />
              <Bar dataKey="rate" fill={chartColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;

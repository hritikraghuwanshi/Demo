import type * as React from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { useThemeStore } from "../../store/themeStore";

interface TopNavbarProps {
  pageTitle: string;
  onToggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ pageTitle, onToggleSidebar }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm dark:border-gray-800 dark:bg-[#0F172A] dark:shadow-none">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden dark:text-gray-300 dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#0F172A]"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <motion.button
          type="button"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg p-2 text-gray-600 transition-colors duration-300 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-gray-400 dark:hover:text-white dark:focus-visible:ring-offset-[#0F172A]"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.span>
        </motion.button>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-medium text-indigo-600 text-sm dark:bg-indigo-500/20 dark:text-indigo-400"
          role="img"
          aria-label="User avatar"
        >
          U
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

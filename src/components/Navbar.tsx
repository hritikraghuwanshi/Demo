import { motion } from "framer-motion";
import type * as React from "react";

const navItems: string[] = ["Features", "Pricing", "Docs"];

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 left-0 z-50 h-20 border-b border-gray-800/60 bg-[#0B0F19]/70 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-6 md:px-20">
        <button
          type="button"
          className="cursor-pointer text-xl font-semibold"
          aria-label="PayPilot home"
        >
          <span className="text-indigo-500">Pay</span>
          <span className="text-white">Pilot</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="text-gray-400 transition-colors duration-300 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            className="text-gray-400 transition-colors duration-300 hover:text-white"
          >
            Sign In
          </button>
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

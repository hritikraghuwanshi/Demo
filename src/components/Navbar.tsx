import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { Container } from "./ui";
import { useThemeStore } from "../store/themeStore";
import { useModalStore } from "../store/modalStore";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { openModal } = useModalStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 flex items-center justify-between border-b transition-all duration-300 ${
        isScrolled
          ? "border-gray-200 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md dark:border-gray-800"
          : "border-gray-200 bg-gray-900 dark:bg-transparent dark:border-gray-800 dark:shadow-none"
      } py-4 md:py-5`}
    >
      <Container className="flex items-center justify-between w-full py-0">
        <Link to="/" className={`text-xl md:text-2xl font-semibold tracking-wide ${isScrolled ? "text-gray-900 dark:text-white" : "text-white dark:text-white"}`}>
          <span className="text-indigo-500">Pay</span>Pilot
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${isScrolled ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" : "text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"}`}
              aria-label={`Go to ${label} section`}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { openModal("contact"); setMobileMenuOpen(false); }}
            className={`transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${isScrolled ? "!text-gray-900 hover:!text-gray-900 dark:!text-gray-300 dark:hover:!text-white" : "!text-white hover:!text-gray-200 dark:!text-gray-300 dark:hover:!text-white"}`}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={`rounded-lg p-2 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${isScrolled ? "!text-gray-900 hover:bg-gray-100 dark:!text-gray-300 dark:hover:bg-white/10" : "!text-white hover:bg-white/10 dark:!text-gray-300 dark:hover:bg-white/10"}`}
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            type="button"
            onClick={() => openModal("request-demo")}
            className={`inline-flex px-4 py-2 text-sm rounded-lg font-medium shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
              isScrolled
                ? "bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-100 dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-white/5"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            Get Started
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className={`md:hidden rounded-lg p-2 transition-colors ${isScrolled ? "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10" : "text-white hover:bg-white/10 dark:text-gray-300 dark:hover:bg-white/10"}`}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-slate-950 shadow-lg"
          >
            <Container className="py-4 space-y-1">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => { openModal("contact"); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => { openModal("request-demo"); setMobileMenuOpen(false); }}
                className="block mx-4 mt-4 w-[calc(100%-2rem)] text-center rounded-lg bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-500"
              >
                Get Started
              </button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

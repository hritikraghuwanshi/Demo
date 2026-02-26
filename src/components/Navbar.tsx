import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ButtonLink, Container } from "./ui";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white py-5 shadow-sm dark:border-gray-800 dark:bg-transparent dark:border-gray-800 dark:shadow-none"
    >
      <Container className="flex items-center justify-between w-full py-0">
      <Link to="/" className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-white">
        <span className="text-indigo-500">Pay</span>Pilot
      </Link>

      <div className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300">
        <a href="#features" className="transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded hover:text-gray-900 dark:hover:text-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950" aria-label="Go to Features section">Features</a>
        <a href="#pricing" className="transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded hover:text-gray-900 dark:hover:text-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950" aria-label="Go to Pricing section">Pricing</a>
        <a href="#faq" className="transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded hover:text-gray-900 dark:hover:text-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950" aria-label="Go to FAQ section">FAQ</a>
      </div>

      <ButtonLink to="/dashboard" variant="primary" className="px-5 py-2">
        Get Started
      </ButtonLink>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
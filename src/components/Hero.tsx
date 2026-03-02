import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ButtonLink, Container } from "./ui";
import DashboardPreview from "./DashboardPreview";
import toast from "react-hot-toast";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Welcome to PayPilot!");
    navigate("/dashboard");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 lg:py-28 dark:from-transparent dark:to-transparent">
      <Container>
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 order-2 md:order-1"
          >
            <span className="inline-flex rounded-full border border-indigo-300 bg-indigo-50 px-4 py-1 text-sm text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-500/10 dark:text-indigo-200">
              Built for modern finance teams
            </span>

            <div className="space-y-4 md:space-y-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
                Real-time visibility for every financial decision
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                Track growth, monitor transactions, and optimize performance
                from a single premium dashboard designed for high-growth fintech
                products.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleGetStarted}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium bg-indigo-600 text-white shadow-md hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Getting started...
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>
              <ButtonLink to="/dashboard" variant="secondary">
                View Demo
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full order-1 md:order-2"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

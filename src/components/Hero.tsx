import type * as React from "react";
import DashboardPreview from "./DashboardPreview";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-200">
              Built for modern finance teams
            </span>

            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Real-time visibility for every financial decision
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Track growth, monitor transactions, and optimize performance
                from a single premium dashboard designed for high-growth fintech
                products.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-400"
              >
                Get Started
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-6 py-3 font-medium text-gray-100 transition-colors hover:border-gray-500 hover:bg-white/5"
              >
                View Demo
              </button>
            </div>
          </div>

          <div className="w-full">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

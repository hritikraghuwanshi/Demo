import type * as React from "react";
import { ButtonLink, Container } from "./ui";
import DashboardPreview from "./DashboardPreview";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 dark:from-transparent dark:to-transparent">
      <Container>
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-indigo-300 bg-indigo-50 px-4 py-1 text-sm text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-500/10 dark:text-indigo-200">
              Built for modern finance teams
            </span>

            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                Real-time visibility for every financial decision
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                Track growth, monitor transactions, and optimize performance
                from a single premium dashboard designed for high-growth fintech
                products.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonLink to="/dashboard" variant="primary">
                Get Started
              </ButtonLink>
              <ButtonLink to="/dashboard" variant="secondary">
                View Demo
              </ButtonLink>
            </div>
          </div>

          <div className="w-full">
            <DashboardPreview />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
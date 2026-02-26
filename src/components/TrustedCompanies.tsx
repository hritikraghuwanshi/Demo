import type * as React from "react";
import { motion } from "framer-motion";
import { Container } from "./ui";

const companies = [
  "Stripe",
  "Razorpay",
  "Vercel",
  "Notion",
  "Linear",
  "Figma",
  "Slack",
  "Discord",
];

const TrustedCompanies: React.FC = () => {
  return (
    <section className="py-16 border-t border-b border-gray-200 bg-gray-50 dark:border-gray-800/50 dark:bg-gray-900/30">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-10"
        >
          Trusted by teams at
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
        >
          {companies.map((company) => (
            <span
              key={company}
              className="text-lg font-semibold text-gray-500 transition-colors hover:text-gray-600 dark:hover:text-gray-400"
            >
              {company}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default TrustedCompanies;

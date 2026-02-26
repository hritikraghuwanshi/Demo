import type * as React from "react";
import { motion } from "framer-motion";
import { FiShield, FiCreditCard, FiRefreshCw } from "react-icons/fi";
import { Card, Container, Section } from "./ui";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Smart Payment Gateway",
    description:
      "Lightning fast transactions with 99.9% uptime and seamless global support.",
    icon: <FiCreditCard size={28} />,
  },
  {
    title: "Subscription Management",
    description:
      "Automated billing, invoicing, retry logic, and flexible pricing models.",
    icon: <FiRefreshCw size={28} />,
  },
  {
    title: "Fraud Detection",
    description:
      "AI-powered monitoring and risk analysis to protect every transaction.",
    icon: <FiShield size={28} />,
  },
];

const Features: React.FC = () => {
  return (
    <Section id="features">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Powerful Financial Infrastructure
        </h2>
        <p className="text-gray-600 mt-4 dark:text-gray-400">
          Everything you need to accept payments, manage subscriptions, and
          scale globally.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} whileHover={{ y: -6 }}>
              <Card hover className="p-8">
                <div className="text-indigo-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Features;
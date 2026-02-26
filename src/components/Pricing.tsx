import type * as React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Button, Card, Container, Section } from "./ui";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "29",
    period: "/month",
    description: "For small teams getting started",
    features: [
      "Up to 1,000 transactions/mo",
      "Basic analytics",
      "Email support",
      "Stripe & Razorpay",
    ],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "99",
    period: "/month",
    description: "For scaling businesses",
    features: [
      "Up to 10,000 transactions/mo",
      "Advanced analytics",
      "Priority support",
      "Custom webhooks",
      "Fraud detection",
      "Subscription management",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale operations",
    features: [
      "Unlimited transactions",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
      "On-premise deployment",
      "24/7 phone support",
    ],
    cta: "Contact sales",
  },
];

const Pricing: React.FC = () => {
  return (
    <Section id="pricing">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.highlighted ? (
                <div className="relative rounded-2xl border-2 border-indigo-500 bg-indigo-50 shadow-lg p-8 dark:border-indigo-500/60 dark:bg-indigo-500/5 dark:shadow-indigo-500/10">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-500 text-sm font-medium text-white">
                    Most popular
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm dark:text-gray-400">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-gray-600 text-sm dark:text-gray-300"
                      >
                        <FiCheck
                          className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400"
                          size={18}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="primary" className="mt-8 w-full">
                    {plan.cta}
                  </Button>
                </div>
              ) : (
                <Card hover className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm dark:text-gray-400">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-500">{plan.period}</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-gray-600 text-sm dark:text-gray-300"
                      >
                        <FiCheck
                          className="mt-0.5 shrink-0 text-indigo-500 dark:text-gray-500"
                          size={18}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" className="mt-8 w-full">
                    {plan.cta}
                  </Button>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Pricing;

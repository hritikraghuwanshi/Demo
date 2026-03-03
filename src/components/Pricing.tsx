import type * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Button, Card, Container, Section } from "./ui";
import { useModalStore } from "../store/modalStore";
import toast from "react-hot-toast";

interface Plan {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaType: "trial" | "contact";
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    priceMonthly: "29",
    priceYearly: "24",
    period: "/month",
    description: "For small teams getting started",
    features: [
      "Up to 1,000 transactions/mo",
      "Basic analytics",
      "Email support",
      "Stripe & Razorpay",
    ],
    cta: "Start free trial",
    ctaType: "trial",
  },
  {
    name: "Growth",
    priceMonthly: "99",
    priceYearly: "83",
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
    ctaType: "trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
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
    ctaType: "contact",
  },
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const openModal = useModalStore((s) => s.openModal);

  const handleCtaClick = async (plan: Plan) => {
    if (plan.ctaType === "contact") {
      openModal("request-demo");
      return;
    }
    setLoadingPlan(plan.name);
    await new Promise((r) => setTimeout(r, 1500));
    setLoadingPlan(null);
    toast.success("Redirecting to dashboard...");
    navigate("/dashboard");
  };

  const getPrice = (plan: Plan) =>
    plan.name === "Enterprise"
      ? "Custom"
      : isYearly
        ? plan.priceYearly
        : plan.priceMonthly;

  return (
    <Section id="pricing">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Monthly / Yearly toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-7 w-12 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  isYearly ? "left-6" : "left-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${isYearly ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Yearly
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded">
              Save 17%
            </span>
          </div>
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
                    {plan.name === "Enterprise" ? (
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-gray-500">{plan.period}</span>
                      </>
                    )}
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
                  <Button
                    variant="primary"
                    className="mt-8 w-full"
                    onClick={() => handleCtaClick(plan)}
                    disabled={loadingPlan !== null}
                  >
                    {loadingPlan === plan.name ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {plan.cta}
                      </span>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </div>
              ) : (
                <Card hover className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm dark:text-gray-400">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    {plan.name === "Enterprise" ? (
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-500">{plan.period}</span>
                      </>
                    )}
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
                  <Button
                    variant="primary"
                    className="mt-8 w-full !text-white"
                    onClick={() => handleCtaClick(plan)}
                    disabled={loadingPlan !== null}
                  >
                    {loadingPlan === plan.name ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {plan.cta}
                      </span>
                    ) : (
                      plan.cta
                    )}
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

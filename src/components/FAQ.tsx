import type * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { Container, Section } from "./ui";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How quickly can I integrate PayPilot?",
    answer:
      "Most teams complete integration within 1-2 days. Our REST API and SDKs are designed for quick setup. We also offer migration support for teams switching from Stripe, Razorpay, or other providers.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We support cards (Visa, Mastercard, Amex), UPI, net banking, wallets, and international payment methods across 150+ countries. New methods are added based on demand.",
  },
  {
    question: "How does fraud detection work?",
    answer:
      "Our AI models analyze transaction patterns, device fingerprints, and behavioral signals in real-time. Suspicious transactions are flagged for review or blocked automatically based on your risk tolerance.",
  },
  {
    question: "Can I use PayPilot with my existing stack?",
    answer:
      "Yes. PayPilot works with any frontend or backend. We provide webhooks, REST APIs, and SDKs for Node, Python, PHP, and more. No vendor lock-in.",
  },
  {
    question: "What happens if a subscription payment fails?",
    answer:
      "Our smart retry logic automatically retries failed payments with configurable schedules. You can set retry rules, send dunning emails, and pause or cancel subscriptions based on your business rules.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <p className="text-gray-600 mt-4 dark:text-gray-400">
            Everything you need to know about PayPilot.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm dark:border-gray-800 dark:bg-[#111827]/40 dark:shadow-none [&_button]:!bg-gray-900 [&_button]:border-0 [&_button]:dark:!bg-transparent"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                aria-label={`${openIndex === index ? "Collapse" : "Expand"} question: ${faq.question}`}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset focus-visible:outline-none hover:bg-gray-800 dark:hover:bg-white/[0.02]"
              >
                <span className="font-medium pr-4 text-white">{faq.question}</span>
                <FiChevronDown
                  className={`shrink-0 text-white transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed dark:text-white">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;

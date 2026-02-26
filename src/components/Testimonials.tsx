import type * as React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { Card, Container, Section } from "./ui";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "PayPilot cut our payment integration time from 3 weeks to 2 days. The API is clean, docs are excellent, and support actually responds.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Flowbase",
    avatar: "SC",
  },
  {
    quote:
      "We switched from manual billing to PayPilot's subscription management. Revenue recovery from failed payments went up 40% in the first month.",
    author: "Marcus Johnson",
    role: "Founder",
    company: "SaaSify",
    avatar: "MJ",
  },
  {
    quote:
      "The fraud detection caught a suspicious pattern before we lost money. For a fintech startup, that peace of mind is invaluable.",
    author: "Priya Sharma",
    role: "Head of Finance",
    company: "Edify",
    avatar: "PS",
  },
];

const Testimonials: React.FC = () => {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Loved by finance teams
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto dark:text-gray-400">
            See what teams building the future of payments are saying.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 hover:border-gray-300 dark:hover:border-gray-700/80">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-amber-400 fill-amber-400"
                    size={18}
                  />
                ))}
              </div>
              <blockquote className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold dark:bg-indigo-500/20 dark:text-indigo-300">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;

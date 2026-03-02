import type * as React from "react";
import { useState } from "react";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { Container } from "./ui";
import { useModalStore } from "../store/modalStore";
import toast from "react-hot-toast";

const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Status"],
  Resources: ["Documentation", "API Reference", "Guides", "Blog", "Support"],
  Company: ["About", "Careers", "Contact", "Partners", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const getLinkHref = (link: string): string => {
  if (link === "Features") return "/#features";
  if (link === "Pricing") return "/#pricing";
  return "#";
};

const Footer: React.FC = () => {
  const openModal = useModalStore((s) => s.openModal);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setEmail("");
    toast.success("Thanks for subscribing! Check your inbox.");
  };

  const handleLinkClick = (link: string) => {
    if (link === "Contact") {
      openModal("contact");
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-[#F1F5F9] py-12 md:py-16 dark:border-gray-800 dark:bg-[#0B1220]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-gray-900 dark:text-white">
              <span className="text-indigo-500">Pay</span>Pilot
            </h2>
            <p className="mt-4 text-sm text-gray-600 max-w-xs dark:text-gray-400">
              Modern payment infrastructure for startups and scale-ups.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
            </div>

            {/* Newsletter signup */}
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Stay in the loop</p>
              <form onSubmit={handleNewsletterSubmit} className="mt-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => email && validateEmail(email)}
                    placeholder="you@company.com"
                    disabled={isSubmitting}
                    className={`flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm text-gray-900 dark:text-white dark:bg-slate-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder:text-gray-400 ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-70 transition-colors"
                  >
                    {isSubmitting ? "..." : "Subscribe"}
                  </button>
                </div>
                {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
              </form>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wide dark:text-gray-300">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    {link === "Contact" ? (
                      <button
                        type="button"
                        onClick={() => handleLinkClick(link)}
                        className="!bg-transparent !border-0 !p-0 text-sm text-indigo-600 transition-colors duration-200 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                      >
                        {link}
                      </button>
                    ) : (
                      <a
                        href={getLinkHref(link)}
                        className="text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} PayPilot. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built for modern finance teams.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

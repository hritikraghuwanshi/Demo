import type * as React from "react";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { Container } from "./ui";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Status"],
  Resources: ["Documentation", "API Reference", "Guides", "Blog", "Support"],
  Company: ["About", "Careers", "Contact", "Partners", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#F1F5F9] py-16 dark:border-gray-800 dark:bg-[#0B1220]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-white">
              <span className="text-indigo-500">Pay</span>Pilot
            </h2>
            <p className="mt-4 text-sm text-gray-600 max-w-xs dark:text-gray-400">
              Modern payment infrastructure for startups and scale-ups.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
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
                    <a
                      href="#"
                      className="text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      {link}
                    </a>
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

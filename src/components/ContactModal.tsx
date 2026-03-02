import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Button } from "./ui";
import { useModalStore } from "../store/modalStore";
import toast from "react-hot-toast";

const FIELD_REQUIRED = "This field is required";
const EMAIL_INVALID = "Please enter a valid email address";

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

const ContactModal: React.FC = () => {
  const { isOpen, modalType, closeModal } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = FIELD_REQUIRED;
    if (!formData.email.trim()) newErrors.email = FIELD_REQUIRED;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = EMAIL_INVALID;
    if (modalType === "request-demo" && !formData.company.trim()) newErrors.company = FIELD_REQUIRED;
    if (!formData.message.trim()) newErrors.message = FIELD_REQUIRED;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    setErrors({});
    toast.success("Thank you! We'll get back to you soon.");
    setTimeout(() => {
      closeModal();
      setIsSuccess(false);
    }, 1500);
  };

  const handleClose = () => {
    if (!isLoading) {
      closeModal();
      setFormData({ name: "", email: "", company: "", message: "" });
      setErrors({});
      setIsSuccess(false);
    }
  };

  if (!isOpen || !modalType) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
          aria-hidden
        />
        <motion.dialog
          open
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-slate-900"
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {modalType === "request-demo" ? "Request a Demo" : "Contact Us"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Fill out the form below and we&apos;ll reach out within 24 hours.
          </p>

          {isSuccess ? (
            <div className="mt-8 py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20">
                <span className="text-3xl text-indigo-600 dark:text-indigo-400">✓</span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">Message sent successfully!</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-lg border px-4 py-3 text-gray-900 dark:text-white dark:bg-slate-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your name"
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-lg border px-4 py-3 text-gray-900 dark:text-white dark:bg-slate-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@company.com"
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              {modalType === "request-demo" && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company *
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className={`mt-1 w-full rounded-lg border px-4 py-3 text-gray-900 dark:text-white dark:bg-slate-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Company name"
                    disabled={isLoading}
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                </div>
              )}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-lg border px-4 py-3 text-gray-900 dark:text-white dark:bg-slate-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="How can we help?"
                  disabled={isLoading}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </motion.dialog>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;

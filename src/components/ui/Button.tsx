import type * as React from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 !text-white shadow-md hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-slate-950",
  secondary:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-600 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-white/5 dark:focus-visible:ring-offset-slate-950",
  ghost:
    "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 dark:focus-visible:ring-offset-slate-950",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

// Link styled as button - for navigation CTAs
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  to: string;
  className?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant = "primary",
  children,
  to,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantLinkStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-indigo-600 !text-white shadow-md hover:bg-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-offset-white dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-slate-950",
    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 focus-visible:ring-offset-white dark:border-gray-600 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-white/5 dark:focus-visible:ring-offset-slate-950",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500 focus-visible:ring-offset-white dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 dark:focus-visible:ring-offset-slate-950",
  };

  return (
    <Link
      to={to}
      className={`${baseStyles} ${variantLinkStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
};

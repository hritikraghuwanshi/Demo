import type * as React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  as: Component = "div",
}) => {
  const baseStyles =
    "rounded-2xl bg-white border border-gray-200 shadow-md dark:bg-[#111827]/60 dark:backdrop-blur-sm dark:border-gray-800 dark:shadow-none";
  const hoverStyles = hover
    ? "transition duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-indigo-500/40 dark:hover:shadow-lg dark:hover:shadow-indigo-500/10"
    : "";

  return (
    <Component
      className={`${baseStyles} ${hoverStyles} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default Card;

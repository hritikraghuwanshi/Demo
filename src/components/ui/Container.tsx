import type * as React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "main" | "section";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  as: Component = "div",
}) => {
  return (
    <Component
      className={`max-w-7xl mx-auto px-6 md:px-20 ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default Container;

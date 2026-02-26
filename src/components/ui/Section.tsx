import type * as React from "react";
import { forwardRef } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = "", id }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`py-28 border-t border-gray-200 dark:border-gray-800/50 ${className}`.trim()}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;

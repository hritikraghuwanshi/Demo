import type * as React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700/50 ${className}`.trim()}
      aria-hidden
    />
  );
};

export default Skeleton;

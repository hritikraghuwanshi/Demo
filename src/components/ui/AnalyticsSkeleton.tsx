import Skeleton from "./Skeleton";

const AnalyticsSkeleton: React.FC = () => {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-6 w-40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111827]/80"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-2 h-4 w-16" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111827]/70">
        <Skeleton className="mb-4 h-6 w-32" />
        <Skeleton className="mt-4 h-80 w-full" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111827]/70">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;

const PageLoader: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
};

export default PageLoader;

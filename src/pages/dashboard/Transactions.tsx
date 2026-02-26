import type * as React from "react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiInbox,
  FiAlertCircle,
} from "react-icons/fi";
import { useThemeStore } from "../../store/themeStore";
import { Button, Skeleton, Table, type Column } from "../../components/ui";
import { fetchTransactions, type Transaction } from "../../services/api";

const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;
const STATUS_OPTIONS = ["all", "success", "failed", "pending"] as const;

const statusBadgeStyles: Record<Transaction["status"], string> = {
  success: "bg-emerald-500/20 text-emerald-400",
  failed: "bg-red-500/20 text-red-400",
  pending: "bg-amber-500/20 text-amber-400",
};

const TransactionColumns: Column<Transaction>[] = [
  {
    key: "id",
    header: "ID",
    render: (row) => (
      <span className="font-mono text-slate-400">{row.id}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (row) => (
      <span className="font-medium">${row.amount.toFixed(2)}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadgeStyles[row.status]}`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (row) => (
      <span className="text-slate-500">
        {new Date(row.date).toLocaleString()}
      </span>
    ),
  },
];

// ============ MAIN COMPONENT ============

const Transactions: React.FC = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  // Search: raw input + debounced value
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("all");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<10 | 5 | 20>(10);

  // API state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============ FETCH TRANSACTIONS ============
  const loadTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // ============ DEBOUNCED SEARCH (300ms) ============
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // ============ FILTERED DATA (useMemo) ============
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        debouncedSearch === "" ||
        txn.id.toLowerCase().includes(debouncedSearch);
      const matchesStatus =
        statusFilter === "all" || txn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, debouncedSearch, statusFilter]);

  // ============ PAGINATION (useMemo) ============
  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = useMemo(
    () =>
      filteredTransactions.slice(
        (page - 1) * pageSize,
        page * pageSize
      ),
    [filteredTransactions, page, pageSize]
  );

  // Reset page when filters change
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(e.target.value as (typeof STATUS_OPTIONS)[number]);
      setPage(1);
    },
    []
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value) as 5 | 10 | 20);
      setPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setSearchInput("");
    setDebouncedSearch("");
    setStatusFilter("all");
    setPage(1);
  }, []);

  const showEmptyState = !isLoading && !error && filteredTransactions.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Transactions
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          View and filter all payment transactions
        </p>
      </div>

      {/* Filters */}
      <div
        className={`flex flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:flex-row ${
          isDark
            ? "border-gray-800 bg-[#111827]/80"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="search"
            placeholder="Search by transaction ID..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search transactions by ID"
            className={`w-full rounded-lg border px-4 py-2 pl-10 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white placeholder-slate-500"
                : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400"
            }`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          aria-label="Filter by status"
          className={`rounded-lg border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
            isDark
              ? "border-slate-700 bg-slate-800 text-white"
              : "border-slate-200 bg-slate-50 text-slate-900"
          }`}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Content: Loading | Error | Empty | Table */}
      {isLoading ? (
        <div
          className={`overflow-hidden rounded-2xl border ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div className="space-y-4 p-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div
          className={`flex flex-col items-center justify-center rounded-xl border px-6 py-16 ${
            isDark ? "border-slate-800 bg-slate-900/30" : "border-slate-200 bg-slate-50"
          }`}
        >
          <FiAlertCircle
            className="mb-4 text-red-400"
            size={48}
            aria-hidden
          />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Failed to load transactions
          </h3>
          <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
            {error}
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={loadTransactions}
            aria-label="Retry loading transactions"
          >
            Try again
          </Button>
        </div>
      ) : showEmptyState ? (
        <div
          className={`flex flex-col items-center justify-center rounded-xl border px-6 py-16 ${
            isDark ? "border-slate-800 bg-slate-900/30" : "border-slate-200 bg-slate-50"
          }`}
        >
          <FiInbox
            className="mb-4 text-slate-400"
            size={48}
            aria-hidden
          />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            No transactions found
          </h3>
          <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
            {debouncedSearch || statusFilter !== "all"
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Transactions will appear here once you start processing payments."}
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={handleClearFilters}
            aria-label="Clear search and filters"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div
          className={`overflow-hidden rounded-2xl border shadow-md ${
            isDark
              ? "border-slate-800 bg-[#111827]/70"
              : "border-gray-200 bg-white"
          }`}
        >
          <Table<Transaction>
            columns={TransactionColumns}
            data={paginatedTransactions}
            getRowKey={(row) => row.id}
            isDark={isDark}
          />

          {/* Pagination */}
          <div
            className={`flex flex-wrap items-center justify-between gap-4 border-t px-6 py-4 ${
              isDark
                ? "border-slate-800 bg-slate-900/30"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-500">
                Showing {(page - 1) * pageSize + 1} to{" "}
                {Math.min(page * pageSize, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} results
              </p>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                aria-label="Items per page"
                className={`rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isDark
                    ? "border-slate-700 bg-slate-800 text-white"
                    : "border-slate-200 bg-slate-100 text-slate-900"
                }`}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size} per page
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className={`rounded-lg p-2 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? "text-slate-400 hover:bg-slate-700"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FiChevronLeft size={20} />
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-300" aria-live="polite">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                aria-label="Next page"
                className={`rounded-lg p-2 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? "text-slate-400 hover:bg-slate-700"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Transactions;

/**
 * API simulation layer — simulates async backend calls with delay.
 */

const API_DELAY_MS = 800;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ============ TYPES ============

export interface Transaction {
  id: string;
  amount: number;
  status: "success" | "failed" | "pending";
  date: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  transactions: number;
}

export interface SuccessRateDataPoint {
  day: string;
  rate: number;
}

export interface AnalyticsStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface AnalyticsResponse {
  revenueData: RevenueDataPoint[];
  successRateData: SuccessRateDataPoint[];
  stats: AnalyticsStat[];
}

// ============ MOCK DATA GENERATORS ============

const STATUSES: Transaction["status"][] = ["success", "failed", "pending"];

function generateTransactions(): Transaction[] {
  return Array.from({ length: 52 }, (_, i) => ({
    id: `txn_${String(10000 + i).padStart(6, "0")}`,
    amount: Math.round((Math.random() * 500 + 20) * 100) / 100,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    date: new Date(Date.now() - i * 3600000).toISOString(),
  }));
}

function generateAnalytics(): AnalyticsResponse {
  return {
    revenueData: [
      { month: "Jan", revenue: 12400, transactions: 1240 },
      { month: "Feb", revenue: 15800, transactions: 1580 },
      { month: "Mar", revenue: 14200, transactions: 1420 },
      { month: "Apr", revenue: 18900, transactions: 1890 },
      { month: "May", revenue: 22100, transactions: 2210 },
      { month: "Jun", revenue: 24800, transactions: 2480 },
    ],
    successRateData: [
      { day: "Mon", rate: 98.2 },
      { day: "Tue", rate: 97.8 },
      { day: "Wed", rate: 99.1 },
      { day: "Thu", rate: 98.5 },
      { day: "Fri", rate: 99.4 },
      { day: "Sat", rate: 97.2 },
      { day: "Sun", rate: 98.8 },
    ],
    stats: [
      { label: "Total Revenue", value: "$108.2K", change: "+12.4%", positive: true },
      { label: "Transactions", value: "10,820", change: "+8.2%", positive: true },
      { label: "Success Rate", value: "98.7%", change: "+0.3%", positive: true },
      { label: "Avg. Order", value: "$156", change: "-2.1%", positive: false },
    ],
  };
}

// ============ API FUNCTIONS ============

/**
 * Fetches transactions from the API (simulated).
 */
export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    await delay(API_DELAY_MS);
    return generateTransactions();
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to fetch transactions"
    );
  }
}

/**
 * Fetches analytics data from the API (simulated).
 */
export async function fetchAnalytics(): Promise<AnalyticsResponse> {
  try {
    await delay(API_DELAY_MS);
    return generateAnalytics();
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to fetch analytics"
    );
  }
}

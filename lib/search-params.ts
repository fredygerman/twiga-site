import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

// Registration status enum
const statusOptions = ["all", "pending", "approved", "rejected"] as const;

// Helper function to get default date range (last 30 days)
function getDefaultDateRange() {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return {
    startDate: thirtyDaysAgo.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  };
}

const defaultDates = getDefaultDateRange();

// Create search params cache for admin dashboard filters
export const adminDashboardSearchParamsCache = createSearchParamsCache({
  // Search filter
  search: parseAsString.withDefault(""),

  // Status filter
  status: parseAsStringEnum([...statusOptions]).withDefault("all"),

  // Date range filters
  startDate: parseAsString.withDefault(defaultDates.startDate),
  endDate: parseAsString.withDefault(defaultDates.endDate),
});

export type AdminDashboardSearchParams = {
  search: string;
  status: "all" | "pending" | "approved" | "rejected";
  startDate: string;
  endDate: string;
};

// Export the helper function for use in components
export { getDefaultDateRange };

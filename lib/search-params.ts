import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

// User status enum (matching your database schema)
const statusOptions = [
  "all",
  "blocked",
  "rate_limited",
  "new",
  "onboarding",
  "active",
] as const;

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

  // Status filter (using user states)
  status: parseAsStringEnum([...statusOptions]).withDefault("all"),

  // Date range filters
  startDate: parseAsString.withDefault(defaultDates.startDate),
  endDate: parseAsString.withDefault(defaultDates.endDate),
});

export type AdminDashboardSearchParams = {
  search: string;
  status: "all" | "blocked" | "rate_limited" | "new" | "onboarding" | "active";
  startDate: string;
  endDate: string;
};

// Export the helper function for use in components
export { getDefaultDateRange };

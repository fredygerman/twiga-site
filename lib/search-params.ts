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
  "approved",
  "onboarding",
  "active",
  "inactive",
  "in_review",
] as const;

// Create search params cache for admin dashboard filters
export const adminDashboardSearchParamsCache = createSearchParamsCache({
  // Search filter
  search: parseAsString.withDefault(""),

  // Status filter (using user states)
  status: parseAsStringEnum([...statusOptions]).withDefault("all"),

  // Date range filters (no default date filtering)
  startDate: parseAsString.withDefault(""),
  endDate: parseAsString.withDefault(""),
});

export type AdminDashboardSearchParams = {
  search: string;
  status:
    | "all"
    | "blocked"
    | "rate_limited"
    | "approved"
    | "onboarding"
    | "active"
    | "inactive"
    | "in_review";
  startDate: string;
  endDate: string;
};

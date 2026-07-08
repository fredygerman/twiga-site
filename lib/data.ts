import { cache } from "react";
import { and, desc, eq, gte, ilike, lte, or } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { registrationWindows, type RegistrationStats } from "@/lib/metrics";
import type { AdminDashboardSearchParams } from "@/lib/search-params";

/**
 * Fetches users matching the dashboard filters.
 *
 * Wrapped in React cache() so independent dashboard sections can each call it
 * with the same filters object and still trigger a single query per request.
 * Errors intentionally propagate so sections show an error state instead of a
 * false "no users" empty state.
 */
export const getUsers = cache(
  async (filters?: Partial<AdminDashboardSearchParams>) => {
    const query = db.select().from(users);

    const conditions = [];

    // Search filter (searches in name, wa_id, school_name, and region)
    if (filters?.search && filters.search.trim()) {
      const searchTerm = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(users.name, searchTerm),
          ilike(users.wa_id, searchTerm),
          ilike(users.school_name, searchTerm),
          ilike(users.region, searchTerm)
        )
      );
    }

    // Status filter (using user state)
    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(users.state, filters.status));
    }

    // Date range filters
    if (filters?.startDate) {
      conditions.push(gte(users.created_at, new Date(filters.startDate)));
    }

    if (filters?.endDate) {
      // Add 1 day to endDate to include the entire day
      const endDate = new Date(filters.endDate);
      endDate.setDate(endDate.getDate() + 1);
      conditions.push(lte(users.created_at, endDate));
    }

    const finalQuery =
      conditions.length > 0 ? query.where(and(...conditions)) : query;

    return finalQuery.orderBy(desc(users.created_at));
  }
);

/**
 * Global registration counts (today / 7d / 30d with prior windows) plus
 * per-day acquisition rates. Always unfiltered: the growth KPIs and the
 * acquisition velocity must not shrink when dashboard filters are applied.
 */
export const getRegistrationStats = cache(
  async (): Promise<RegistrationStats> => {
    const rows = await db
      .select({ created_at: users.created_at })
      .from(users);

    return registrationWindows(rows.map((row) => row.created_at));
  }
);

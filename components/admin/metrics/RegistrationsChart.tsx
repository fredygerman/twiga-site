import { getUsers } from "@/lib/data";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { RegistrationsChartClient } from "@/components/admin/metrics/RegistrationsChartClient";

/**
 * Server side of the registrations chart: fetches the filtered users and
 * hands their creation timestamps to the interactive client chart.
 * Follows the dashboard filters.
 */
export async function RegistrationsChart() {
  const filters = adminDashboardSearchParamsCache.all();
  const users = await getUsers(filters);
  const timestamps = users
    .filter((user) => user.created_at)
    .map((user) => user.created_at!.getTime());

  return <RegistrationsChartClient timestamps={timestamps} />;
}

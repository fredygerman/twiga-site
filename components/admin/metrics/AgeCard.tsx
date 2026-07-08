import { User } from "lucide-react";

import { getUsers } from "@/lib/data";
import { ageBands } from "@/lib/metrics";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { MetricInfo } from "@/components/admin/MetricInfo";

/**
 * Teacher age bands derived from shared birthdays. Follows the dashboard
 * filters. Renders as one cell of the analytics quad.
 */
export async function AgeCard() {
  const filters = adminDashboardSearchParamsCache.all();
  const users = await getUsers(filters);
  const { bands, unknown } = ageBands(users);

  const known = bands.reduce((sum, band) => sum + band.count, 0);
  const max = Math.max(...bands.map((band) => band.count), 1);

  return (
    <div className="group relative flex h-full flex-col bg-card p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <User className="h-4 w-4" />
        Age distribution
      </h2>
      <p className="mt-0.5 mb-3 text-xs text-muted-foreground">
        Teacher age bands, from shared birthdays
      </p>

      {known === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-6 text-center">
          <p className="text-sm font-medium text-slate-600">
            No birthdays shared yet
          </p>
          <p className="text-xs text-muted-foreground">
            Ages appear here once teachers share their birthday.
          </p>
        </div>
      ) : (
        <div className="mt-auto flex h-32 items-end gap-2">
          {bands.map((band) => (
            <div
              key={band.label}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
              title={`${band.label}: ${band.count} teachers`}
            >
              <span className="text-[11px] font-semibold text-slate-900">
                {band.count}
              </span>
              <div
                className="w-full max-w-9 rounded-t-md bg-green-600 transition-colors hover:bg-green-700"
                style={{
                  height: `${Math.max((band.count / max) * 100, 2)}%`,
                }}
              />
              <span className="whitespace-nowrap text-[10.5px] text-muted-foreground">
                {band.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {unknown > 0 && (
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          {unknown} without birthday (excluded)
        </p>
      )}

      <MetricInfo infoKey="age" />
    </div>
  );
}

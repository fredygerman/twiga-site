import { GraduationCap } from "lucide-react";

import { getUsers } from "@/lib/data";
import { classLoadHistogram } from "@/lib/metrics";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { MetricInfo } from "@/components/admin/MetricInfo";

/**
 * Teaching load distribution: how many classes each teacher listed.
 * Follows the dashboard filters. Renders as one cell of the analytics quad.
 */
export async function ClassesCard() {
  const filters = adminDashboardSearchParamsCache.all();
  const users = await getUsers(filters);
  const { buckets, averageClasses, teachers } = classLoadHistogram(users);
  const max = Math.max(...buckets.map((bucket) => bucket.count), 1);

  return (
    <div className="group relative flex h-full flex-col bg-card p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <GraduationCap className="h-4 w-4" />
        Classes per teacher
      </h2>
      <p className="mt-0.5 mb-3 text-xs text-muted-foreground">
        Teaching load distribution
      </p>

      {teachers === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-6 text-center">
          <p className="text-sm font-medium text-slate-600">No teachers yet</p>
          <p className="text-xs text-muted-foreground">
            Load appears here once teachers register.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-auto flex h-32 items-end gap-2">
            {buckets.map((bucket) => (
              <div
                key={bucket.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                title={`${bucket.label} classes: ${bucket.count} teachers`}
              >
                <span className="text-[11px] font-semibold text-slate-900">
                  {bucket.count}
                </span>
                <div
                  className="w-full max-w-9 rounded-t-md bg-green-600 transition-colors hover:bg-green-700"
                  style={{
                    height: `${Math.max((bucket.count / max) * 100, 2)}%`,
                  }}
                />
                <span className="text-[10.5px] text-muted-foreground">
                  {bucket.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Avg {averageClasses.toFixed(1)} classes/teacher &middot; {teachers}{" "}
            teachers
          </p>
        </>
      )}

      <MetricInfo infoKey="classes" />
    </div>
  );
}

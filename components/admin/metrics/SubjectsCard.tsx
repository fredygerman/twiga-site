import { BookOpen } from "lucide-react";

import { getUsers } from "@/lib/data";
import { subjectCounts } from "@/lib/metrics";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { MetricInfo } from "@/components/admin/MetricInfo";

/**
 * Top subjects by number of teachers teaching them, from class_info.
 * Follows the dashboard filters. Renders as one cell of the analytics quad.
 */
export async function SubjectsCard() {
  const filters = adminDashboardSearchParamsCache.all();
  const users = await getUsers(filters);
  const subjects = subjectCounts(users, 8);
  const max = subjects[0]?.count ?? 1;

  return (
    <div className="group relative flex h-full flex-col bg-card p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <BookOpen className="h-4 w-4" />
        Subject popularity
      </h2>
      <p className="mt-0.5 mb-3 text-xs text-muted-foreground">
        Teachers per subject, top {subjects.length || 8}
      </p>

      {subjects.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-6 text-center">
          <p className="text-sm font-medium text-slate-600">
            No subjects listed yet
          </p>
          <p className="text-xs text-muted-foreground">
            Subjects appear here once teachers add their classes.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {subjects.map((entry, index) => {
            // Humanize raw keys like "computer_science"
            const label = entry.subject.replace(/_/g, " ");
            return (
            <div
              key={entry.subject}
              className="grid grid-cols-[90px_1fr_34px] items-center gap-2"
              title={`${label}: ${entry.count} teachers`}
            >
              <span className="truncate text-xs capitalize text-slate-900">
                {label}
              </span>
              <div className="h-4 overflow-hidden rounded border bg-gray-50">
                <div
                  className="h-full rounded-l bg-green-600"
                  style={{
                    width: `${(entry.count / max) * 100}%`,
                    opacity: 1 - (index / Math.max(subjects.length, 1)) * 0.5,
                  }}
                />
              </div>
              <span className="text-right text-xs font-semibold text-slate-600">
                {entry.count}
              </span>
            </div>
            );
          })}
        </div>
      )}

      <MetricInfo infoKey="subjects" />
    </div>
  );
}

import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";

import { getRegistrationStats, getUsers } from "@/lib/data";
import { formatDuration, onboardingVelocity } from "@/lib/metrics";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { MetricInfo } from "@/components/admin/MetricInfo";

function SourceChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border bg-gray-50 px-1.5 py-px font-mono text-[10px] font-medium normal-case tracking-normal text-muted-foreground">
      {children}
    </span>
  );
}

function SectionLabel({
  children,
  chip,
}: {
  children: React.ReactNode;
  chip: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
      {children}
      {chip}
    </div>
  );
}

function Stat({ cap, children }: { cap: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {cap}
      </div>
      <div className="text-2xl font-bold leading-tight text-slate-900">
        {children}
      </div>
    </div>
  );
}

/**
 * Two speeds in one card: teacher acquisition (global sign-ups per day) and
 * onboarding time (filtered, proxy from updated_at - created_at).
 * Renders as one cell of the analytics quad.
 */
export async function VelocityCard() {
  const filters = adminDashboardSearchParamsCache.all();
  const [users, stats] = await Promise.all([
    getUsers(filters),
    getRegistrationStats(),
  ]);
  const velocity = onboardingVelocity(users);

  const pace =
    stats.perDay30 === 0
      ? null
      : ((stats.perDay7 - stats.perDay30) / stats.perDay30) * 100;
  const paceUp = pace !== null && pace >= 0;
  const PaceArrow = paceUp ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="group relative flex h-full flex-col bg-card p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Clock className="h-4 w-4" />
        Velocity
      </h2>
      <p className="mt-0.5 mb-3 text-xs text-muted-foreground">
        Acquisition pace &amp; onboarding time
      </p>

      <SectionLabel chip={<SourceChip>created_at</SourceChip>}>
        Teacher acquisition
      </SectionLabel>
      {stats.total === 0 ? (
        <p className="text-sm text-muted-foreground">No sign-ups yet.</p>
      ) : (
        <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
          <Stat cap="Last 7d">
            {stats.perDay7.toFixed(1)}
            <span className="text-sm font-semibold text-muted-foreground">/day</span>
          </Stat>
          <Stat cap="Last 30d">
            {stats.perDay30.toFixed(1)}
            <span className="text-sm font-semibold text-muted-foreground">/day</span>
          </Stat>
          <Stat cap="Pace">
            {pace === null ? (
              <span className="text-sm font-semibold text-muted-foreground">
                n/a
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-0.5 text-base font-bold ${
                  paceUp ? "text-green-600" : "text-red-600"
                }`}
              >
                <PaceArrow className="h-4 w-4" />
                {pace >= 0 ? "+" : ""}
                {pace.toFixed(0)}%
              </span>
            )}
          </Stat>
        </div>
      )}

      <hr className="my-3 border-border" />

      <SectionLabel chip={<SourceChip>proxy</SourceChip>}>
        Onboarding time
      </SectionLabel>
      {velocity === null ? (
        <p className="text-sm text-muted-foreground">
          No completed onboardings yet.
        </p>
      ) : (
        <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
          <Stat cap="Median">{formatDuration(velocity.medianDays)}</Stat>
          <Stat cap="Average">{formatDuration(velocity.averageDays)}</Stat>
          <Stat cap="Done">{velocity.completed}</Stat>
        </div>
      )}

      <p className="mt-auto pt-3 text-[11px] leading-snug text-muted-foreground">
        <span className="mr-1 inline-block h-2.5 w-0.5 translate-y-px bg-yellow-500" />
        Setup time is an estimate based on when each account was last changed.
      </p>

      <MetricInfo infoKey="velocity" />
    </div>
  );
}

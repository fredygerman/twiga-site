import {
  AlertTriangle,
  Check,
  Clock,
  Eye,
  UserMinus,
  Users,
  UserX,
} from "lucide-react";

import { getUsers } from "@/lib/data";
import { stateCounts, type StateCounts } from "@/lib/metrics";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { MetricInfo } from "@/components/admin/MetricInfo";
import type { MetricInfoKey } from "@/lib/metric-info";

interface Tile {
  key: keyof StateCounts;
  label: string;
  numberClass: string;
  infoKey: MetricInfoKey;
  icon: React.ReactNode;
}

const TILES: Tile[] = [
  {
    key: "total",
    label: "Total Users",
    numberClass: "text-slate-900",
    infoKey: "stat_total",
    icon: <Users className="h-4 w-4 flex-none text-blue-500" />,
  },
  {
    key: "active",
    label: "Active",
    numberClass: "text-green-600",
    infoKey: "stat_active",
    icon: <Check className="h-4 w-4 flex-none text-green-500" />,
  },
  {
    key: "onboarding",
    label: "Onboarding",
    numberClass: "text-blue-600",
    infoKey: "stat_onboarding",
    icon: <Clock className="h-4 w-4 flex-none text-blue-500" />,
  },
  {
    key: "approved",
    label: "Approved",
    numberClass: "text-blue-600",
    infoKey: "stat_approved",
    icon: <Check className="h-4 w-4 flex-none text-blue-500" />,
  },
  {
    key: "blocked",
    label: "Blocked",
    numberClass: "text-red-600",
    infoKey: "stat_blocked",
    icon: <UserX className="h-4 w-4 flex-none text-red-500" />,
  },
  {
    key: "rate_limited",
    label: "Rate Limited",
    numberClass: "text-yellow-600",
    infoKey: "stat_rate_limited",
    icon: <AlertTriangle className="h-4 w-4 flex-none text-yellow-500" />,
  },
  {
    key: "inactive",
    label: "Inactive",
    numberClass: "text-gray-500",
    infoKey: "stat_inactive",
    icon: <UserMinus className="h-4 w-4 flex-none text-gray-400" />,
  },
  {
    key: "in_review",
    label: "In Review",
    numberClass: "text-purple-600",
    infoKey: "stat_in_review",
    icon: <Eye className="h-4 w-4 flex-none text-purple-500" />,
  },
];

/**
 * One segmented card with hairline dividers: the 8 user-state counts.
 * Follows the dashboard filters. The gap-px/bg-border trick keeps dividers
 * correct in both directions at every breakpoint (8 / 4 / 2 columns).
 */
export async function StatStrip() {
  const filters = adminDashboardSearchParamsCache.all();
  const users = await getUsers(filters);
  const counts = stateCounts(users);

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border shadow-xs sm:grid-cols-4 xl:grid-cols-8">
      {TILES.map((tile) => (
        <div
          key={tile.key}
          className="group relative flex items-center gap-2.5 bg-card px-3.5 py-3"
        >
          {tile.icon}
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-slate-600">
              {tile.label}
            </div>
            <div className={`text-lg font-bold leading-tight ${tile.numberClass}`}>
              {counts[tile.key]}
            </div>
          </div>
          <MetricInfo infoKey={tile.infoKey} />
        </div>
      ))}
    </div>
  );
}

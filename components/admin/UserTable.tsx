"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnToggle,
  ColumnVisibility,
} from "@/components/admin/ColumnToggle";
import { UserDetailDialog } from "@/components/admin/UserDetailDialog";
import { StatusActions } from "@/components/admin/StatusActions";
import { Users } from "lucide-react";

interface User {
  id: number;
  name: string | null;
  wa_id: string;
  state: string;
  onboarding_state: string | null;
  role: string;
  class_info: Record<string, string[]> | null;
  school_name: string | null;
  birthday: string | null;
  region: string | null;
  last_message_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

interface UserTableProps {
  users: User[];
}

// Soft pill badge per user state, consistent with the metric-card pills.
const STATE_BADGES: Record<string, { pill: string; dot: string }> = {
  active: {
    pill: "border-green-200 bg-green-50 text-green-700",
    dot: "bg-green-500",
  },
  approved: {
    pill: "border-blue-200 bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
  onboarding: {
    pill: "border-sky-200 bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  blocked: {
    pill: "border-red-200 bg-red-50 text-red-700",
    dot: "bg-red-500",
  },
  rate_limited: {
    pill: "border-yellow-200 bg-yellow-50 text-yellow-700",
    dot: "bg-yellow-500",
  },
  inactive: {
    pill: "border-gray-200 bg-gray-50 text-gray-600",
    dot: "bg-gray-400",
  },
  in_review: {
    pill: "border-purple-200 bg-purple-50 text-purple-700",
    dot: "bg-purple-500",
  },
};

function StateBadge({ state }: { state: string }) {
  const badge = STATE_BADGES[state] ?? {
    pill: "border-gray-200 bg-gray-50 text-gray-600",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${badge.pill}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} aria-hidden />
      {state.replace("_", " ")}
    </span>
  );
}

// Tiny uppercase header label, matching the metric cards' section labels.
const headClass =
  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground";

export function UserTable({ users }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    wa_id: true,
    school_name: true,
    region: false,
    role: true,
    state: true,
    onboarding_state: false,
    class_info: true,
    birthday: false,
    last_message_at: false, // Hidden by default as requested
    created_at: true,
    actions: true,
  });

  function formatDate(date: Date | string | null) {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  function handleUserClick(user: User) {
    setSelectedUser(user);
    setDialogOpen(true);
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-12 text-center">
        <Users className="mb-2 h-8 w-8 text-slate-300" />
        <p className="text-sm font-medium text-slate-600">No users found</p>
        <p className="text-xs text-muted-foreground">
          Users appear here when they join the platform, or when you clear
          your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          {users.length} user{users.length !== 1 ? "s" : ""} found
        </p>
        <ColumnToggle
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columnVisibility.name && (
                <TableHead className={headClass}>Name</TableHead>
              )}
              {columnVisibility.wa_id && (
                <TableHead className={headClass}>WhatsApp ID</TableHead>
              )}
              {columnVisibility.school_name && (
                <TableHead className={headClass}>School</TableHead>
              )}
              {columnVisibility.region && (
                <TableHead className={headClass}>Region</TableHead>
              )}
              {columnVisibility.role && (
                <TableHead className={headClass}>Role</TableHead>
              )}
              {columnVisibility.state && (
                <TableHead className={headClass}>State</TableHead>
              )}
              {columnVisibility.onboarding_state && (
                <TableHead className={headClass}>Onboarding</TableHead>
              )}
              {columnVisibility.class_info && (
                <TableHead className={headClass}>Classes</TableHead>
              )}
              {columnVisibility.birthday && (
                <TableHead className={headClass}>Birthday</TableHead>
              )}
              {columnVisibility.last_message_at && (
                <TableHead className={headClass}>Last Message</TableHead>
              )}
              {columnVisibility.created_at && (
                <TableHead className={headClass}>Created</TableHead>
              )}
              {columnVisibility.actions && (
                <TableHead className={headClass}>Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-gray-50/80"
                onClick={() => handleUserClick(user)}
              >
                {columnVisibility.name && (
                  <TableCell className="py-2.5 font-medium text-slate-900">
                    {user.name || "—"}
                  </TableCell>
                )}
                {columnVisibility.wa_id && (
                  <TableCell className="py-2.5 font-mono text-xs text-slate-600">
                    {user.wa_id}
                  </TableCell>
                )}
                {columnVisibility.school_name && (
                  <TableCell className="py-2.5 text-sm text-slate-700">
                    {user.school_name || "—"}
                  </TableCell>
                )}
                {columnVisibility.region && (
                  <TableCell className="py-2.5 text-sm text-slate-700">
                    {user.region || "—"}
                  </TableCell>
                )}
                {columnVisibility.role && (
                  <TableCell className="py-2.5">
                    {user.role === "admin" ? (
                      <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold capitalize text-purple-700">
                        {user.role}
                      </span>
                    ) : (
                      <span className="text-sm capitalize text-slate-600">
                        {user.role}
                      </span>
                    )}
                  </TableCell>
                )}
                {columnVisibility.state && (
                  <TableCell className="py-2.5">
                    <StateBadge state={user.state} />
                  </TableCell>
                )}
                {columnVisibility.onboarding_state && (
                  <TableCell className="py-2.5 text-xs text-slate-600">
                    {user.onboarding_state || "—"}
                  </TableCell>
                )}
                {columnVisibility.class_info && (
                  <TableCell className="py-2.5 text-xs text-slate-600">
                    {user.class_info ? (
                      <div
                        className="max-w-32 truncate"
                        title={JSON.stringify(user.class_info)}
                      >
                        {Object.keys(user.class_info).length} subject(s)
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                )}
                {columnVisibility.birthday && (
                  <TableCell className="whitespace-nowrap py-2.5 text-xs text-muted-foreground">
                    {user.birthday ? formatDate(user.birthday) : "—"}
                  </TableCell>
                )}
                {columnVisibility.last_message_at && (
                  <TableCell className="whitespace-nowrap py-2.5 text-xs text-muted-foreground">
                    {formatDate(user.last_message_at)}
                  </TableCell>
                )}
                {columnVisibility.created_at && (
                  <TableCell className="whitespace-nowrap py-2.5 text-xs text-muted-foreground">
                    {formatDate(user.created_at)}
                  </TableCell>
                )}
                {columnVisibility.actions && (
                  <TableCell
                    className="py-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StatusActions
                      userId={user.id!}
                      currentState={user.state}
                      onViewDetails={() => handleUserClick(user)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDetailDialog
        user={selectedUser}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}

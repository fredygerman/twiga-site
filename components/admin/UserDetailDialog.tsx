"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Same soft pills as the user table, so the dialog reads as one system.
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

function RolePill({ role }: { role: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
        role === "admin"
          ? "border-purple-200 bg-purple-50 text-purple-700"
          : "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {role}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="pb-1 pt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground first:pt-0">
      {children}
    </p>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="flex-none text-xs text-muted-foreground">{label}</span>
      <span className="min-w-0 text-right text-sm text-slate-900">
        {children}
      </span>
    </div>
  );
}

function Empty() {
  return <span className="text-muted-foreground">—</span>;
}

export function UserDetailDialog({
  user,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!user) return null;

  function formatDate(date: Date | string | null) {
    if (!date) return null;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(date));
  }

  function formatDay(date: string | null) {
    if (!date) return null;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));
  }

  const subjects = user.class_info ? Object.entries(user.class_info) : [];

  const content = (
    <div>
      {/* Identity block */}
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-slate-900">
          {user.name || "Unnamed user"}
        </h3>
        <StateBadge state={user.state} />
        <RolePill role={user.role} />
      </div>
      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
        {user.wa_id} · #{user.id}
      </p>

      <div className="mt-4">
        <SectionLabel>Profile</SectionLabel>
        <div className="divide-y divide-border">
          <Row label="Birthday">
            {formatDay(user.birthday) ?? <Empty />}
          </Row>
          <Row label="School">{user.school_name || <Empty />}</Row>
          <Row label="Region">{user.region || <Empty />}</Row>
        </div>

        <SectionLabel>Teaching</SectionLabel>
        <div className="divide-y divide-border">
          {subjects.length === 0 ? (
            <Row label="Classes">
              <Empty />
            </Row>
          ) : (
            subjects.map(([subject, classes]) => (
              <div
                key={subject}
                className="flex items-baseline justify-between gap-4 py-2"
              >
                <span className="flex-none text-xs capitalize text-muted-foreground">
                  {subject.replace(/_/g, " ")}
                </span>
                <span className="flex min-w-0 flex-wrap justify-end gap-1">
                  {classes.length === 0 ? (
                    <Empty />
                  ) : (
                    classes.map((className) => (
                      <span
                        key={className}
                        className="rounded border bg-gray-50 px-1.5 py-px text-xs text-slate-700"
                      >
                        {className}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))
          )}
        </div>

        <SectionLabel>Activity</SectionLabel>
        <div className="divide-y divide-border">
          <Row label="Onboarding">
            {user.onboarding_state ? (
              <span className="capitalize">
                {user.onboarding_state.replace(/_/g, " ")}
              </span>
            ) : (
              <Empty />
            )}
          </Row>
          <Row label="Last message">
            {formatDate(user.last_message_at) ?? "Never"}
          </Row>
          <Row label="Created">{formatDate(user.created_at) ?? <Empty />}</Row>
          <Row label="Last updated">
            {formatDate(user.updated_at) ?? <Empty />}
          </Row>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>User details</DrawerTitle>
            <DrawerDescription>
              Details for {user.name || "unnamed user"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6 pt-2">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto rounded-md p-5">
        <DialogHeader className="sr-only">
          <DialogTitle>User details</DialogTitle>
          <DialogDescription>
            Details for {user.name || "unnamed user"}
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

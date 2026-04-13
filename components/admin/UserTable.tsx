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
import {
  Check,
  Clock,
  UserX,
  AlertTriangle,
  Users,
  UserMinus,
  Eye,
} from "lucide-react";

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

  function getStateIcon(state: string) {
    switch (state) {
      case "active":
        return <Check className="w-4 h-4 text-green-500" />;
      case "approved":
        return <Check className="w-4 h-4 text-blue-500" />;
      case "blocked":
        return <UserX className="w-4 h-4 text-red-500" />;
      case "rate_limited":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "onboarding":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "inactive":
        return <UserMinus className="w-4 h-4 text-gray-400" />;
      case "in_review":
        return <Eye className="w-4 h-4 text-purple-500" />;
      default:
        return <Users className="w-4 h-4 text-gray-500" />;
    }
  }

  function getStateColor(state: string) {
    switch (state) {
      case "active":
        return "text-green-600";
      case "approved":
        return "text-blue-600";
      case "blocked":
        return "text-red-600";
      case "rate_limited":
        return "text-yellow-600";
      case "onboarding":
        return "text-blue-600";
      case "inactive":
        return "text-gray-500";
      case "in_review":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  }

  function handleUserClick(user: User) {
    setSelectedUser(user);
    setDialogOpen(true);
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 mb-2">
          No users found
        </h3>
        <p className="text-slate-500">
          Users will appear here when they join the platform.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {users.length} user{users.length !== 1 ? "s" : ""} found
        </h3>
        <ColumnToggle
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columnVisibility.name && <TableHead>Name</TableHead>}
              {columnVisibility.wa_id && <TableHead>WhatsApp ID</TableHead>}
              {columnVisibility.school_name && <TableHead>School</TableHead>}
              {columnVisibility.region && <TableHead>Region</TableHead>}
              {columnVisibility.role && <TableHead>Role</TableHead>}
              {columnVisibility.state && <TableHead>State</TableHead>}
              {columnVisibility.onboarding_state && (
                <TableHead>Onboarding</TableHead>
              )}
              {columnVisibility.class_info && <TableHead>Classes</TableHead>}
              {columnVisibility.birthday && <TableHead>Birthday</TableHead>}
              {columnVisibility.last_message_at && (
                <TableHead>Last Message</TableHead>
              )}
              {columnVisibility.created_at && <TableHead>Created</TableHead>}
              {columnVisibility.actions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleUserClick(user)}
              >
                {columnVisibility.name && (
                  <TableCell className="font-medium">
                    {user.name || "—"}
                  </TableCell>
                )}
                {columnVisibility.wa_id && (
                  <TableCell className="font-mono text-sm">
                    {user.wa_id}
                  </TableCell>
                )}
                {columnVisibility.school_name && (
                  <TableCell>{user.school_name || "—"}</TableCell>
                )}
                {columnVisibility.region && (
                  <TableCell>{user.region || "—"}</TableCell>
                )}
                {columnVisibility.role && (
                  <TableCell>
                    <span
                      className={`capitalize ${
                        user.role === "admin"
                          ? "font-semibold text-purple-600"
                          : "text-slate-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                )}
                {columnVisibility.state && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStateIcon(user.state)}
                      <span
                        className={`capitalize text-sm ${getStateColor(
                          user.state
                        )}`}
                      >
                        {user.state.replace("_", " ")}
                      </span>
                    </div>
                  </TableCell>
                )}
                {columnVisibility.onboarding_state && (
                  <TableCell className="text-sm">
                    {user.onboarding_state || "—"}
                  </TableCell>
                )}
                {columnVisibility.class_info && (
                  <TableCell className="text-sm">
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
                  <TableCell className="text-sm text-slate-500">
                    {user.birthday ? formatDate(user.birthday) : "—"}
                  </TableCell>
                )}
                {columnVisibility.last_message_at && (
                  <TableCell className="text-sm text-slate-500">
                    {formatDate(user.last_message_at)}
                  </TableCell>
                )}
                {columnVisibility.created_at && (
                  <TableCell className="text-slate-500 text-sm">
                    {formatDate(user.created_at)}
                  </TableCell>
                )}
                {columnVisibility.actions && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
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

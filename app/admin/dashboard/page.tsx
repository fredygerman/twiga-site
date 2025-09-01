import { checkAdminAuth } from "@/lib/auth";
import { getUsers, adminLogout } from "@/lib/actions";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  LogOut,
  Check,
  Clock,
  UserX,
  AlertTriangle,
} from "lucide-react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { StatusActions } from "@/components/admin/StatusActions";
import { Suspense } from "react";

// Force dynamic rendering to ensure search params changes trigger re-renders
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await checkAdminAuth();

  // Parse search params with defaults
  const parsedSearchParams = adminDashboardSearchParamsCache.parse(
    await searchParams
  );

  // Fetch filtered users
  const users = await getUsers(parsedSearchParams);

  const stats = {
    total: users.length,
    active: users.filter((u) => u.state === "active").length,
    onboarding: users.filter((u) => u.state === "onboarding").length,
    new: users.filter((u) => u.state === "new").length,
    blocked: users.filter((u) => u.state === "blocked").length,
    rate_limited: users.filter((u) => u.state === "rate_limited").length,
  };

  function formatDate(date: Date) {
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
      case "blocked":
        return <UserX className="w-4 h-4 text-red-500" />;
      case "rate_limited":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "onboarding":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "new":
        return <Users className="w-4 h-4 text-gray-500" />;
      default:
        return <Users className="w-4 h-4 text-gray-500" />;
    }
  }

  function getStateColor(state: string) {
    switch (state) {
      case "active":
        return "text-green-600";
      case "blocked":
        return "text-red-600";
      case "rate_limited":
        return "text-yellow-600";
      case "onboarding":
        return "text-blue-600";
      case "new":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-700">
                  Twiga Admin Dashboard
                </h1>
                <p className="text-slate-600">
                  Manage users and access control
                </p>
              </div>
            </div>
            <form action={adminLogout}>
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Suspense fallback={<div>Loading filters...</div>}>
          <AdminFilters />
        </Suspense>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.active}
                  </p>
                </div>
                <Check className="w-6 h-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Onboarding
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.onboarding}
                  </p>
                </div>
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">New</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {stats.new}
                  </p>
                </div>
                <Users className="w-6 h-6 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Blocked</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.blocked}
                  </p>
                </div>
                <UserX className="w-6 h-6 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Rate Limited
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.rate_limited}
                  </p>
                </div>
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  No users found
                </h3>
                <p className="text-slate-500">
                  Users will appear here when they join the platform.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>WhatsApp ID</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Classes</TableHead>
                      <TableHead>Last Message</TableHead>
                      <TableHead>Actions</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name || "—"}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {user.wa_id}
                        </TableCell>
                        <TableCell>{user.school_name || "—"}</TableCell>
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
                        <TableCell className="text-sm text-slate-500">
                          {user.last_message_at
                            ? formatDate(user.last_message_at)
                            : "Never"}
                        </TableCell>
                        <TableCell>
                          <StatusActions
                            userId={user.id!}
                            currentState={user.state}
                          />
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm">
                          {formatDate(user.created_at!)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

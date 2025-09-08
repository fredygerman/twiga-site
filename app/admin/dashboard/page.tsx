import { checkAdminAuth } from "@/lib/auth";
import { getUsers, adminLogout } from "@/lib/actions";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  LogOut,
  Check,
  Clock,
  UserX,
  AlertTriangle,
  UserMinus,
  Eye,
} from "lucide-react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { UserTable } from "@/components/admin/UserTable";
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
    inactive: users.filter((u) => u.state === "inactive").length,
    in_review: users.filter((u) => u.state === "in_review").length,
  };

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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
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

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Inactive</p>
                  <p className="text-2xl font-bold text-gray-500">
                    {stats.inactive}
                  </p>
                </div>
                <UserMinus className="w-6 h-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    In Review
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.in_review}
                  </p>
                </div>
                <Eye className="w-6 h-6 text-purple-500" />
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
            <UserTable users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

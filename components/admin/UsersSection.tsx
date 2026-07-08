import { Users } from "lucide-react";

import { getUsers } from "@/lib/data";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/admin/UserTable";

/**
 * The User Management table, as its own independently-streamed section.
 * The table itself (UserTable and friends) is unchanged.
 */
export async function UsersSection() {
  const filters = adminDashboardSearchParamsCache.all();
  const users = await getUsers(filters);

  return (
    <Card className="rounded-md shadow-xs">
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
  );
}

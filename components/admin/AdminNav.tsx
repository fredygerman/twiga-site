import { LogOut, Users } from "lucide-react";

import { adminLogout } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { FilterPopover } from "@/components/admin/FilterPopover";

/**
 * Slim sticky admin nav: brand on the left, grouped actions on the right.
 * Filters live behind a popover so the bar stays compact at every width.
 */
export function AdminNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-green-100 bg-white">
      <div className="container mx-auto flex items-center gap-3 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green-100">
            <Users className="h-4 w-4 text-green-600" />
          </div>
          <h1 className="whitespace-nowrap text-lg font-bold text-green-700">
            Twiga Admin
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <FilterPopover />
          <form action={adminLogout}>
            <Button variant="outline" className="gap-2 rounded-md">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { updateUserState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Loader2, UserX, AlertTriangle, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface StatusActionsProps {
  userId: number;
  currentState: string;
}

export function StatusActions({ userId, currentState }: StatusActionsProps) {
  const [stateLoading, setStateLoading] = useState<string | null>(null);

  const handleStateUpdate = async (
    newState: "blocked" | "rate_limited" | "approved" | "onboarding" | "active"
  ) => {
    setStateLoading(newState);

    try {
      const result = await updateUserState(userId, newState);

      if (result.success) {
        toast.success(`User state updated to ${newState.replace("_", " ")}`);
      } else {
        toast.error(result.error || "Failed to update user state");
      }
    } catch (error) {
      toast.error("An error occurred while updating user state");
    } finally {
      setStateLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {currentState !== "approved" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
          onClick={() => handleStateUpdate("approved")}
          disabled={stateLoading !== null}
          title="Approve user"
        >
          {stateLoading === "approved" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <UserCheck className="w-3 h-3" />
          )}
        </Button>
      )}

      {currentState !== "blocked" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => handleStateUpdate("blocked")}
          disabled={stateLoading !== null}
          title="Block user"
        >
          {stateLoading === "blocked" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <UserX className="w-3 h-3" />
          )}
        </Button>
      )}

      {currentState !== "rate_limited" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
          onClick={() => handleStateUpdate("rate_limited")}
          disabled={stateLoading !== null}
          title="Rate limit user"
        >
          {stateLoading === "rate_limited" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <AlertTriangle className="w-3 h-3" />
          )}
        </Button>
      )}
    </div>
  );
}

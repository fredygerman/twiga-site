"use client";

import { useState } from "react";
import { updateUserState, approveUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  UserX,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  UserMinus,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface StatusActionsProps {
  userId: number;
  currentState: string;
}

export function StatusActions({ userId, currentState }: StatusActionsProps) {
  const [stateLoading, setStateLoading] = useState<string | null>(null);

  const handleStateUpdate = async (
    newState:
      | "blocked"
      | "rate_limited"
      | "new"
      | "onboarding"
      | "active"
      | "inactive"
      | "in_review"
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

  const handleApprove = async () => {
    setStateLoading("approve");

    try {
      const result = await approveUser(userId);

      if (result.success) {
        toast.success("User approved successfully");
      } else {
        toast.error(result.error || "Failed to approve user");
      }
    } catch (error) {
      toast.error("An error occurred while approving user");
    } finally {
      setStateLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Show approve button for users in review */}
      {currentState === "in_review" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={handleApprove}
          disabled={stateLoading !== null}
          title="Approve user"
        >
          {stateLoading === "approve" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <CheckCircle className="w-3 h-3" />
          )}
        </Button>
      )}

      {/* Show activate button for non-active users (except in_review) */}
      {currentState !== "active" && currentState !== "in_review" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
          onClick={() => handleStateUpdate("active")}
          disabled={stateLoading !== null}
          title="Activate user"
        >
          {stateLoading === "active" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <UserCheck className="w-3 h-3" />
          )}
        </Button>
      )}

      {/* Show block button for non-blocked users */}
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

      {/* Show rate limit button for non-rate-limited users */}
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

      {/* Show inactive button for active users */}
      {currentState === "active" && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          onClick={() => handleStateUpdate("inactive")}
          disabled={stateLoading !== null}
          title="Set as inactive"
        >
          {stateLoading === "inactive" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <UserMinus className="w-3 h-3" />
          )}
        </Button>
      )}

      {/* Show in review button for certain states */}
      {!["in_review", "blocked"].includes(currentState) && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          onClick={() => handleStateUpdate("in_review")}
          disabled={stateLoading !== null}
          title="Move to review"
        >
          {stateLoading === "in_review" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </Button>
      )}
    </div>
  );
}

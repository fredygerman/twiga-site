"use client";

import { useState } from "react";
import { updateUserState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  UserX,
  UserCheck,
  MoreHorizontal,
  AlertTriangle,
  Clock,
  UserMinus,
  Eye,
  Zap,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

type UserState =
  | "blocked"
  | "rate_limited"
  | "approved"
  | "onboarding"
  | "active"
  | "inactive"
  | "in_review";

interface StatusActionsProps {
  userId: number;
  currentState: string;
  onViewDetails?: () => void;
}

export function StatusActions({
  userId,
  currentState,
  onViewDetails,
}: StatusActionsProps) {
  const [stateLoading, setStateLoading] = useState<string | null>(null);

  const handleStateUpdate = async (newState: UserState) => {
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

  // Can only approve users who are in_review
  const canApprove = currentState === "in_review";
  // Can only block users who are not already blocked
  const canBlock = currentState !== "blocked";

  // Other states available in dropdown (excluding current state and main actions)
  const allOtherStates: {
    state: UserState;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      state: "active",
      label: "Set Active",
      icon: <Zap className="w-4 h-4 text-green-500" />,
    },
    {
      state: "inactive",
      label: "Set Inactive",
      icon: <UserMinus className="w-4 h-4 text-gray-400" />,
    },
    {
      state: "onboarding",
      label: "Set Onboarding",
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
    {
      state: "rate_limited",
      label: "Rate Limit",
      icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    },
    {
      state: "in_review",
      label: "Set In Review",
      icon: <Eye className="w-4 h-4 text-purple-500" />,
    },
  ];

  const otherStates = allOtherStates.filter(
    (item) => item.state !== currentState
  );

  return (
    <div className="flex items-center gap-1">
      {/* Open/View details button */}
      {onViewDetails && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={onViewDetails}
          title="View details"
        >
          <ExternalLink className="w-3 h-3" />
        </Button>
      )}

      {/* Approve button - only visible for users in_review */}
      {canApprove && (
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

      {/* Block button - visible for all non-blocked users */}
      {canBlock && (
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

      {/* Dropdown for other state changes */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2"
            disabled={stateLoading !== null}
            title="More actions"
          >
            {stateLoading && !["approved", "blocked"].includes(stateLoading) ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <MoreHorizontal className="w-3 h-3" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {otherStates.map((item, index) => (
            <DropdownMenuItem
              key={item.state}
              onClick={() => handleStateUpdate(item.state)}
              className="cursor-pointer"
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </DropdownMenuItem>
          ))}
          {currentState === "blocked" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleStateUpdate("approved")}
                className="cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-green-500 mr-2" />
                Unblock (Approve)
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

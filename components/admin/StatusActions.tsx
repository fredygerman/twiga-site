"use client";

import { useState } from "react";
import { updateRegistrationStatus } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StatusActionsProps {
  registrationId: number;
  currentStatus: string;
}

export function StatusActions({
  registrationId,
  currentStatus,
}: StatusActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusUpdate = async (
    newStatus: "pending" | "approved" | "rejected"
  ) => {
    setLoading(newStatus);

    try {
      const result = await updateRegistrationStatus(registrationId, newStatus);

      if (result.success) {
        toast.success(`Registration ${newStatus} successfully`);
      } else {
        toast.error(result.error || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="min-w-[80px]">{getStatusBadge(currentStatus)}</div>

      <div className="flex items-center gap-1">
        {currentStatus !== "approved" && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={() => handleStatusUpdate("approved")}
            disabled={loading !== null}
          >
            {loading === "approved" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Check className="w-3 h-3" />
            )}
          </Button>
        )}

        {currentStatus !== "rejected" && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleStatusUpdate("rejected")}
            disabled={loading !== null}
          >
            {loading === "rejected" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <X className="w-3 h-3" />
            )}
          </Button>
        )}

        {currentStatus !== "pending" && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
            onClick={() => handleStatusUpdate("pending")}
            disabled={loading !== null}
          >
            {loading === "pending" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Clock,
  UserX,
  AlertTriangle,
  Users,
  Calendar,
  School,
  MapPin,
  MessageSquare,
  User,
  Hash,
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

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

    // Set initial value
    checkScreenSize();

    // Add event listener with throttling for better performance
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
    if (!date) return "Not set";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
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
        return "bg-green-100 text-green-800 border-green-200";
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200";
      case "rate_limited":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "onboarding":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "new":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getRoleColor(role: string) {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "teacher":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "student":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  const UserDetailContent = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-4 h-4" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-sm text-gray-900 mt-1">
                {user.name || "Not provided"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                WhatsApp ID
              </label>
              <p className="text-sm font-mono text-gray-900 mt-1">
                {user.wa_id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                User ID
              </label>
              <p className="text-sm font-mono text-gray-900 mt-1 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                {user.id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Birthday
              </label>
              <p className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {user.birthday ? formatDate(user.birthday) : "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status & Role */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-4 h-4" />
            Status & Role
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Current State
              </label>
              <div className="mt-1">
                <Badge
                  className={`${getStateColor(
                    user.state
                  )} flex items-center gap-1 w-fit`}
                >
                  {getStateIcon(user.state)}
                  {user.state.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <div className="mt-1">
                <Badge
                  className={`${getRoleColor(user.role)} capitalize w-fit`}
                >
                  {user.role}
                </Badge>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-600">
                Onboarding State
              </label>
              <p className="text-sm text-gray-900 mt-1">
                {user.onboarding_state || "Not set"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <School className="w-4 h-4" />
            Educational Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                School
              </label>
              <p className="text-sm text-gray-900 mt-1">
                {user.school_name || "Not provided"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Region
              </label>
              <p className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {user.region || "Not provided"}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-600">
                Class Information
              </label>
              <div className="mt-1">
                {user.class_info ? (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(user.class_info, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-sm text-gray-900">
                    No class information available
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Activity Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Last Message
              </label>
              <p className="text-sm text-gray-900 mt-1">
                {formatDate(user.last_message_at)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Account Created
              </label>
              <p className="text-sm text-gray-900 mt-1">
                {formatDate(user.created_at)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Last Updated
              </label>
              <p className="text-sm text-gray-900 mt-1">
                {formatDate(user.updated_at)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Details
            </DrawerTitle>
            <DrawerDescription>
              Complete information for {user.name || "Unnamed User"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            <UserDetailContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Details
          </DialogTitle>
          <DialogDescription>
            Complete information for {user.name || "Unnamed User"}
          </DialogDescription>
        </DialogHeader>
        <UserDetailContent />
      </DialogContent>
    </Dialog>
  );
}

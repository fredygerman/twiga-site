"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Columns } from "lucide-react";

export interface ColumnVisibility {
  name: boolean;
  wa_id: boolean;
  school_name: boolean;
  region: boolean;
  role: boolean;
  state: boolean;
  onboarding_state: boolean;
  class_info: boolean;
  birthday: boolean;
  last_message_at: boolean;
  created_at: boolean;
  actions: boolean;
}

interface ColumnToggleProps {
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (visibility: ColumnVisibility) => void;
}

export function ColumnToggle({
  columnVisibility,
  onColumnVisibilityChange,
}: ColumnToggleProps) {
  const handleToggle = (column: keyof ColumnVisibility) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };

  const columnLabels: Record<keyof ColumnVisibility, string> = {
    name: "Name",
    wa_id: "WhatsApp ID",
    school_name: "School",
    region: "Region",
    role: "Role",
    state: "State",
    onboarding_state: "Onboarding",
    class_info: "Classes",
    birthday: "Birthday",
    last_message_at: "Last Message",
    created_at: "Created",
    actions: "Actions",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Columns className="w-4 h-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(columnLabels).map(([key, label]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={columnVisibility[key as keyof ColumnVisibility]}
            onCheckedChange={() => handleToggle(key as keyof ColumnVisibility)}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

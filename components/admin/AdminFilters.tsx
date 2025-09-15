"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { getDefaultDateRange } from "@/lib/search-params";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const statusOptions = [
  { value: "all", label: "All States" },
  { value: "active", label: "Active" },
  { value: "onboarding", label: "Onboarding" },
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "blocked", label: "Blocked" },
  { value: "rate_limited", label: "Rate Limited" },
  { value: "inactive", label: "Inactive" },
];

export function AdminFilters() {
  const router = useRouter();
  const defaultDates = getDefaultDateRange();

  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "all" });
  const [startDate, setStartDate] = useQueryState("startDate", {
    defaultValue: defaultDates.startDate,
  });
  const [endDate, setEndDate] = useQueryState("endDate", {
    defaultValue: defaultDates.endDate,
  });

  const [searchValue, setSearchValue] = React.useState(search);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => {
      if (startDate && endDate) {
        return {
          from: new Date(startDate),
          to: new Date(endDate),
        };
      }
      return undefined;
    }
  );

  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Debounced search
  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearch(searchValue);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchValue, setSearch]);

  // Trigger router refresh when filters change (debounced)
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.refresh();
    }, 100); // Small delay to ensure URL is updated first

    return () => clearTimeout(timeoutId);
  }, [search, status, startDate, endDate, router]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from && range?.to) {
      setStartDate(format(range.from, "yyyy-MM-dd"));
      setEndDate(format(range.to, "yyyy-MM-dd"));
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  const clearAllFilters = () => {
    setSearchValue("");
    setSearch("");
    setStatus("all");
    setStartDate("");
    setEndDate("");
    setDateRange(undefined);
  };

  const hasActiveFilters = search || status !== "all" || startDate || endDate;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <h3 className="font-medium text-slate-900">Filters</h3>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Search
              </label>
              <Input
                placeholder="Search by name, school, or WhatsApp..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Filter */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Registration Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Pick a date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

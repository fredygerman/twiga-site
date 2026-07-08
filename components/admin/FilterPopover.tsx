"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { format, subDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Filter,
  X,
} from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
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

const statusOptions = [
  { value: "all", label: "All States" },
  { value: "active", label: "Active" },
  { value: "approved", label: "Approved" },
  { value: "onboarding", label: "Onboarding" },
  { value: "in_review", label: "In Review" },
  { value: "blocked", label: "Blocked" },
  { value: "rate_limited", label: "Rate Limited" },
  { value: "inactive", label: "Inactive" },
];

const presets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

/**
 * Dashboard filters, grouped behind a single "Filters" button in the nav.
 *
 * Search and status apply live. The date range is draft-based: pick a start
 * and end date (or a preset) on the inline calendar, then press Apply to
 * commit it to the URL. shallow:false makes every committed change re-render
 * the server sections, so all filter-following data updates together.
 */
export function FilterPopover() {
  const [isPending, startTransition] = React.useTransition();
  const queryOptions = { shallow: false, startTransition };

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    ...queryOptions,
  });
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "all",
    ...queryOptions,
  });
  const [startDate, setStartDate] = useQueryState("startDate", {
    defaultValue: "",
    ...queryOptions,
  });
  const [endDate, setEndDate] = useQueryState("endDate", {
    defaultValue: "",
    ...queryOptions,
  });

  const [searchValue, setSearchValue] = React.useState(search);

  // Draft range: what's picked on the calendar but not applied yet.
  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>(
    () =>
      startDate && endDate
        ? { from: new Date(startDate), to: new Date(endDate) }
        : undefined
  );
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  // Debounced search
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue !== search) {
        setSearch(searchValue);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchValue, search, setSearch]);

  const applyDateRange = () => {
    if (!draftRange?.from) return;
    // Selecting a single day means that day is both start and end.
    const from = draftRange.from;
    const to = draftRange.to ?? draftRange.from;
    setStartDate(format(from, "yyyy-MM-dd"));
    setEndDate(format(to, "yyyy-MM-dd"));
    setCalendarOpen(false);
  };

  const clearDateRange = () => {
    setDraftRange(undefined);
    if (startDate || endDate) {
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
    setDraftRange(undefined);
    setCalendarOpen(false);
  };

  const hasActiveFilters = Boolean(
    search || status !== "all" || startDate || endDate
  );
  const hasAppliedDates = Boolean(startDate && endDate);

  // What the date field shows: the APPLIED range, not the draft.
  const appliedLabel = hasAppliedDates
    ? `${format(new Date(startDate), "LLL dd, y")} - ${format(
        new Date(endDate),
        "LLL dd, y"
      )}`
    : "Pick a date range";

  // Caption under the calendar: the DRAFT being built.
  const draftLabel = draftRange?.from
    ? draftRange.to
      ? `${format(draftRange.from, "LLL dd, y")} → ${format(
          draftRange.to,
          "LLL dd, y"
        )}`
      : `${format(draftRange.from, "LLL dd, y")} → pick an end date`
    : "Pick a start date";

  // Has the draft diverged from what's applied?
  const draftMatchesApplied =
    hasAppliedDates &&
    draftRange?.from &&
    format(draftRange.from, "yyyy-MM-dd") === startDate &&
    format(draftRange.to ?? draftRange.from, "yyyy-MM-dd") === endDate;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative rounded-md",
            isPending && "opacity-70",
            hasActiveFilters && "border-green-600 text-green-700"
          )}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span
              aria-hidden
              className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 rounded-md p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-red-600"
              >
                <X className="h-3 w-3" />
                Clear all
              </Button>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Search
            </label>
            <Input
              placeholder="Search by name, school, or WhatsApp..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
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

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Registration Date Range
            </label>
            <Button
              variant="outline"
              onClick={() => setCalendarOpen((open) => !open)}
              aria-expanded={calendarOpen}
              className={cn(
                "w-full justify-start rounded-md text-left font-normal",
                !hasAppliedDates && "text-muted-foreground",
                hasAppliedDates && "border-green-600/50 text-slate-900"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {appliedLabel}
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 text-muted-foreground transition-transform",
                  calendarOpen && "rotate-180"
                )}
              />
            </Button>

            {calendarOpen && (
              <div className="mt-2 rounded-md border">
                <div className="flex gap-1.5 border-b p-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset.days}
                      variant="outline"
                      size="sm"
                      className="h-7 flex-1 rounded px-1 text-[11px]"
                      onClick={() =>
                        setDraftRange({
                          from: subDays(new Date(), preset.days - 1),
                          to: new Date(),
                        })
                      }
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>

                <Calendar
                  mode="range"
                  numberOfMonths={1}
                  selected={draftRange}
                  onSelect={setDraftRange}
                  defaultMonth={draftRange?.from}
                  disabled={{ after: new Date() }}
                />

                <div className="flex items-center justify-between gap-2 border-t p-2">
                  <p className="min-w-0 truncate text-[11px] text-muted-foreground">
                    {draftLabel}
                  </p>
                  <div className="flex flex-none gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-muted-foreground"
                      onClick={clearDateRange}
                      disabled={!draftRange && !hasAppliedDates}
                    >
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 bg-green-600 px-3 text-xs text-white hover:bg-green-700"
                      onClick={applyDateRange}
                      disabled={!draftRange?.from || Boolean(draftMatchesApplied)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

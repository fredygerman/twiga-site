"use client";

import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { metricInfo, type MetricInfoKey } from "@/lib/metric-info";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * Tiny "i" button pinned to the top-right corner of a metric card.
 *
 * The host element must have the `group relative` classes: the button is
 * absolutely positioned (so it never shifts the layout) and stays invisible
 * until the card is hovered, the button is focused, or its popover is open.
 * Clicking it opens a floating explainer with plain-language copy.
 */
export function MetricInfo({
  infoKey,
  className,
}: {
  infoKey: MetricInfoKey;
  className?: string;
}) {
  const info = metricInfo[infoKey];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`About ${info.title}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute top-1.5 right-1.5 z-10 grid h-[18px] w-[18px] place-items-center rounded-full border border-border bg-white text-muted-foreground",
            "opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100",
            "hover:border-green-600 hover:bg-green-50 hover:text-green-700 data-[state=open]:border-green-600 data-[state=open]:text-green-700",
            className
          )}
        >
          <Info className="h-3 w-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 rounded-md p-4">
        <p className="text-sm font-bold text-slate-900">{info.title}</p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          What this shows
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
          {info.what}
        </p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Where it comes from
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
          {info.how}
        </p>
      </PopoverContent>
    </Popover>
  );
}

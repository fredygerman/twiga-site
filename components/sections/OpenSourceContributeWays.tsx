"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Code2,
  FlaskConical,
  Languages,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const contributeWays: {
  label: string;
  icon: LucideIcon;
  hint: string;
}[] = [
  {
    label: "Code development & bug fixes",
    icon: Code2,
    hint: "You can help build Twiga by contributing code on GitHub—fixing bugs, shipping features, reviewing pull requests, and improving the services that power the teaching companion.",
  },
  {
    label: "Educational content creation",
    icon: BookOpen,
    hint: "You can help build Twiga by shaping lesson ideas, exercises, and resources aligned with Tanzanian curricula so teachers get accurate, classroom-ready support.",
  },
  {
    label: "Translation & localization",
    icon: Languages,
    hint: "You can help build Twiga by translating interfaces, prompts, and materials into Swahili and other languages teachers use every day.",
  },
  {
    label: "Testing & feedback",
    icon: FlaskConical,
    hint: "You can help build Twiga by trying flows end-to-end, reporting what breaks or confuses you, and suggesting improvements so the experience stays reliable for educators.",
  },
];

export function OpenSourceContributeWays() {
  return (
    <TooltipProvider>
      <ul className="mt-12 grid list-none grid-cols-2 gap-4 p-0 md:mt-14 md:grid-cols-4 md:gap-5">
        {contributeWays.map(({ label, icon: Icon, hint }) => (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex h-full w-full cursor-help flex-col items-center gap-3 rounded-xl border border-twiga-cream-dark bg-white px-4 py-5 text-center transition-colors hover:border-twiga-forest-light/40 hover:bg-twiga-forest-pale/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-twiga-forest/25 md:px-5"
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-twiga-forest-pale text-twiga-forest"
                    aria-hidden
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-twiga-text">
                    {label}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[min(20rem,calc(100vw-2rem))]">
                <p>{hint}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}

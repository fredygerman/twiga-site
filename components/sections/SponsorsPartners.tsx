"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Entry = {
  name: string;
  desc: string;
  badge: string;
  url: string;
  logo: string;
  logoAlt: string;
  iconBg: string;
  iconRing?: string;
  badgeClass: string;
  icon?: "award" | "users" | "check";
};

const sponsors: Entry[] = [
  {
    name: "Meta",
    desc: "Meta Llama Impact Grant Innovation Award 2024",
    badge: "Grant Award Winner",
    url: "https://www.meta.com/",
    logo: "/logos/meta.png",
    logoAlt: "Meta logo",
    iconBg: "bg-blue-50 ring-blue-100",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "award",
  },
  {
    name: "Neon",
    desc: "Database infrastructure sponsor powering Twiga's data layer",
    badge: "Infrastructure Partner",
    url: "https://neon.com/",
    logo: "/logos/neon.png",
    logoAlt: "Neon logo",
    iconBg: "bg-purple-50 ring-purple-100",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
  },
  {
    name: "Tanzania AI Community",
    desc: "Open-source community leading the Twiga project",
    badge: "Community Partner",
    url: "https://ai.or.tz/",
    logo: "/logos/t-ai-c.png",
    logoAlt: "Tanzania AI Community logo",
    iconBg: "bg-slate-900 ring-slate-700",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
  },
];

const partners: Entry[] = [
  {
    name: "KTH AI Society",
    desc: "A participatory community for everyone into AI, KTH Royal Institute of Technology",
    badge: "Development Partner",
    url: "https://kthais.com/",
    logo: "/logos/kthis.png",
    logoAlt: "KTH AI Society logo",
    iconBg: "bg-slate-900 ring-slate-700",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "users",
  },
  {
    name: "TIB",
    desc: "Leibniz Information Center for Science and Technology research",
    badge: "MOU Signed",
    url: "https://www.tib.eu/en/",
    logo: "/logos/tib.png",
    logoAlt: "TIB logo",
    iconBg: "bg-amber-50 ring-amber-100",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "check",
  },
];

function BadgeIcon({ type }: { type?: Entry["icon"] }) {
  if (type === "award")
    return <Award className="size-3.5 shrink-0" strokeWidth={2} />;
  if (type === "users")
    return <Users className="size-3.5 shrink-0" strokeWidth={2} />;
  if (type === "check")
    return <CheckCircle className="size-3.5 shrink-0" strokeWidth={2} />;
  return null;
}

function SponsorGrid({ entries }: { entries: Entry[] }) {
  return (
    <div className="flex flex-wrap gap-4 md:gap-6">
      {entries.map((s) => (
        <Link
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl border border-twiga-cream-dark bg-white p-6 no-underline transition-shadow hover:shadow-[0_4px_20px_rgba(26,61,43,0.08)]"
        >
          <div
            className={`mb-1 flex size-14 shrink-0 items-center justify-center rounded-xl shadow-inner ring-1 ${s.iconBg}`}
          >
            <Image
              src={s.logo}
              alt={s.logoAlt}
              width={48}
              height={48}
              className="size-12 object-contain"
            />
          </div>
          <span className="font-semibold text-twiga-text">{s.name}</span>
          <span className="text-sm font-light leading-snug text-twiga-text-muted">
            {s.desc}
          </span>
          <span
            className={`mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide ${s.badgeClass}`}
          >
            <BadgeIcon type={s.icon} />
            {s.badge}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function SponsorsPartners() {
  return (
    <section className="bg-twiga-cream-mid px-6 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-10 md:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-amber">
            Partners &amp; Sponsors
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-tight text-twiga-forest">
            Supported by those who
            <br />
            believe in Tanzanian education
          </h2>
        </header>

        <Tabs defaultValue="sponsors" className="gap-0">
          <TabsList className="mb-8 h-auto w-full justify-start gap-0 rounded-none border-0 border-b border-twiga-cream-dark bg-transparent p-0">
            <TabsTrigger
              value="sponsors"
              className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-6 py-2.5 text-xs font-semibold tracking-wider text-twiga-text-muted uppercase shadow-none data-[state=active]:border-twiga-forest data-[state=active]:bg-transparent data-[state=active]:text-twiga-forest data-[state=active]:shadow-none"
            >
              Sponsors
            </TabsTrigger>
            <TabsTrigger
              value="partners"
              className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-6 py-2.5 text-xs font-semibold tracking-wider text-twiga-text-muted uppercase shadow-none data-[state=active]:border-twiga-forest data-[state=active]:bg-transparent data-[state=active]:text-twiga-forest data-[state=active]:shadow-none"
            >
              Partners
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sponsors" className="mt-0">
            <SponsorGrid entries={sponsors} />
          </TabsContent>
          <TabsContent value="partners" className="mt-0">
            <SponsorGrid entries={partners} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

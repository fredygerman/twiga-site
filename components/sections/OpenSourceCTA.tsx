import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";

const contributeItems = [
  "Code development & bug fixes",
  "Educational content creation",
  "Translation & localization",
  "Testing & feedback",
];

export default function OpenSourceCTA() {
  return (
    <section className="px-6 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1100px] items-start gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-amber">
            Open Source
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-tight text-twiga-forest">
            Built in the open,
            <br />
            by the community
          </h2>
          <p className="mt-4 max-w-[520px] font-light leading-relaxed text-twiga-text-muted">
            Twiga is proudly developed by the Tanzania AI Community with
            contributions from developers, educators, and AI enthusiasts
            worldwide.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {contributeItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-twiga-cream-dark bg-white px-4 py-3 text-sm text-twiga-text"
              >
                <span
                  className="size-1.5 shrink-0 rounded-full bg-twiga-forest-light"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://github.com/Tanzania-AI-Community/twiga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-twiga-forest bg-transparent px-5 py-2.5 text-sm font-semibold text-twiga-forest transition-colors hover:bg-twiga-forest hover:text-twiga-cream"
            >
              <Github className="size-4" />
              View on GitHub
            </Link>
            <Link
              href="https://discord.com/invite/bCe2HfZY2C"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-twiga-forest bg-transparent px-5 py-2.5 text-sm font-semibold text-twiga-forest transition-colors hover:bg-twiga-forest hover:text-twiga-cream"
            >
              <MessageCircle className="size-4" />
              Join Discord
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-2xl bg-twiga-forest p-10">
          <div>
            <div className="font-display text-[2.5rem] font-semibold leading-none text-twiga-cream">
              15+
            </div>
            <div className="mt-2 text-xs font-light text-twiga-cream/60">
              Contributors worldwide
            </div>
          </div>
          <div>
            <div className="font-display text-[2.5rem] font-semibold leading-none text-twiga-cream">
              MIT
            </div>
            <div className="mt-2 text-xs font-light text-twiga-cream/60">
              Open source license
            </div>
          </div>
          <div>
            <div className="font-display text-[2.5rem] font-semibold leading-none text-twiga-cream">
              RAG
            </div>
            <div className="mt-2 text-xs font-light text-twiga-cream/60">
              Powered by TIE curriculum
            </div>
          </div>
          <div>
            <div className="font-display text-[2.5rem] font-semibold leading-none text-twiga-cream">
              ∞
            </div>
            <div className="mt-2 text-xs font-light text-twiga-cream/60">
              Ways to contribute
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

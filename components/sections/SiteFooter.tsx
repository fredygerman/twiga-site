import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="bg-twiga-footer px-6 py-16 text-twiga-cream md:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr] md:gap-12">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/logos/twiga_icon.png"
                alt=""
                width={28}
                height={28}
                className="size-7"
              />
              <span className="font-display text-lg text-twiga-cream">
                Twiga
              </span>
            </div>
            <p className="max-w-[260px] text-sm font-light leading-relaxed text-twiga-cream/50">
              Empowering Tanzanian education with AI, one teacher at a time.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-twiga-cream/40">
              Project
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-light">
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-twiga-cream/40">
              Community
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-light">
              <li>
                <Link
                  href="https://discord.com/invite/bCe2HfZY2C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://ai.or.tz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Tanzania AI Community
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Contributors
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Tanzania-AI-Community/twiga/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twiga-cream/65 transition-colors hover:text-twiga-cream"
                >
                  Releases
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light text-twiga-cream/35">
            © 2024 Twiga Project. Built with{" "}
            <span className="text-twiga-forest-light">♥</span> by the Tanzania
            AI Community.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://github.com/Tanzania-AI-Community/twiga/blob/development/docs/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-twiga-cream/35 transition-colors hover:text-twiga-cream/65"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

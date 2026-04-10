export default function Impact() {
  return (
    <section id="about" className="bg-twiga-forest px-6 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <blockquote className="border-l-[3px] border-twiga-forest-light pl-6 font-display text-[clamp(1.1rem,2vw,1.35rem)] font-light italic leading-relaxed text-twiga-cream/90">
            &ldquo;Twiga uses retrieval-augmented generation (RAG) to combine the
            adaptive capabilities of LLMs with knowledge from the Tanzanian
            Institute of Education curriculum and textbooks.&rdquo;
            <cite className="mt-4 block font-sans text-xs font-normal not-italic uppercase tracking-wider text-twiga-forest-light">
              Tanzania AI Community · Open Source
            </cite>
          </blockquote>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-[3.5rem] font-semibold leading-none text-twiga-cream">
                500+
              </span>
              <span className="text-sm font-light text-twiga-cream/60">
                teachers already onboard
              </span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-[3.5rem] font-semibold leading-none text-twiga-cream">
                100%
              </span>
              <span className="text-sm font-light text-twiga-cream/60">
                designed for Tanzanian classrooms
              </span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-[3.5rem] font-semibold leading-none text-twiga-cream">
                Free
              </span>
              <span className="text-sm font-light text-twiga-cream/60">
                for all Tanzanian educators
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

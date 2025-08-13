import SiteHeader from "@/components/sections/SiteHeader";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Impact from "@/components/sections/Impact";
import SponsorsPartners from "@/components/sections/SponsorsPartners";
import OpenSourceCTA from "@/components/sections/OpenSourceCTA";
import Registration from "@/components/sections/Registration";
import SiteFooter from "@/components/sections/SiteFooter";

export default function TwigaLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SiteHeader />
      <Hero />
      <Features />
      <Impact />
      <SponsorsPartners />
      <OpenSourceCTA />
      <Registration />
      <SiteFooter />
    </div>
  );
}

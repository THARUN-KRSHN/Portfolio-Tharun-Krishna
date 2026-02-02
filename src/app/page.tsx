import { Hero } from "@/components/Hero";
import { ResumeSnapshot } from "@/components/ResumeSnapshot";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedLogos } from "@/components/FeaturedLogos";
import { DesignWorks } from "@/components/DesignWorks";
import { Contact } from "@/components/Contact";
import { FrontendLab } from "@/components/FrontendLab";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
      <Hero />
      <ResumeSnapshot />

      {/* Logo Section */}
      <SectionHeader title="Logo Folio" subtitle="Curated Brand Identities" theme="dark" />
      <FeaturedLogos />

      {/* Heroic Poster Scroll */}
      <DesignWorks categories={["poster"]} />

      {/* Technical Lab */}
      <FrontendLab />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Other Design Works (Brochure) & Social */}
      <DesignWorks categories={["brochure", "social"]} />

      <Contact />
    </main>
  );
}

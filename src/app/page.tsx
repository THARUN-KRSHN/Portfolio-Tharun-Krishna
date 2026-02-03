import { Hero } from "@/components/Hero";
import { ResumeSnapshot } from "@/components/ResumeSnapshot";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedLogos } from "@/components/FeaturedLogos";
import { VisualNarrative } from "@/components/VisualNarrative";
import { DesignWorks } from "@/components/DesignWorks";
import { Contact } from "@/components/Contact";
import { FrontendLab } from "@/components/FrontendLab";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { AboutSection } from "@/components/AboutSection";
import { FallingSkills } from "@/components/FallingSkills";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
      <Hero />
      <AboutSection />
      <FallingSkills />

      {/* Logo Section */}
      <div id="featured-logos">
        <FeaturedLogos />
      </div>

      {/* Visual Narrative Section */}
      <div id="visual-narrative">
        <VisualNarrative />
      </div>

      {/* Technical Lab */}
      <div id="frontend-lab">
        <FrontendLab />
      </div>

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Other Design Works (Brochure) & Social */}
      <DesignWorks categories={["brochure", "social"]} />

      <Contact />
    </main>
  );
}

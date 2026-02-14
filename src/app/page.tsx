"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";

const ResumeSnapshot = dynamic(() => import("@/components/ResumeSnapshot").then(mod => mod.ResumeSnapshot));
const SectionHeader = dynamic(() => import("@/components/SectionHeader").then(mod => mod.SectionHeader));
const FeaturedLogos = dynamic(() => import("@/components/FeaturedLogos").then(mod => mod.FeaturedLogos));
const VisualNarrative = dynamic(() => import("@/components/VisualNarrative").then(mod => mod.VisualNarrative));
const DesignWorks = dynamic(() => import("@/components/DesignWorks").then(mod => mod.DesignWorks));
const Contact = dynamic(() => import("@/components/Contact").then(mod => mod.Contact));
const FrontendLab = dynamic(() => import("@/components/FrontendLab").then(mod => mod.FrontendLab));
const ExperienceTimeline = dynamic(() => import("@/components/ExperienceTimeline").then(mod => mod.ExperienceTimeline));
const AboutSection = dynamic(() => import("@/components/AboutSection").then(mod => mod.AboutSection));
const FallingSkills = dynamic(() => import("@/components/FallingSkills").then(mod => mod.FallingSkills));
const ServicesBento = dynamic(() => import("@/components/ServicesBento").then(mod => mod.ServicesBento));

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-lime-400 selection:text-black">
      <Preloader />
      {isMounted && <CustomCursor />}

      <Hero />

      <div id="about">
        <AboutSection />
      </div>

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

      {/* Services Section */}
      <ServicesBento />

      {/* Other Design Works (Brochure) & Social */}
      <DesignWorks />

      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}

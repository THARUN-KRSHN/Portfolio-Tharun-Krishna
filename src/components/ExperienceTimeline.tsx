"use client";
import React from "react";
import { motion, useScroll } from "framer-motion";

const experiences = [
    {
        year: "2025 - Present",
        role: "Co-COO & Exec Committee",
        org: "IEDC CCE",
        desc: "Driving innovation and entrepreneurship initiatives. coordinating large-scale technical events."
    },
    {
        year: "2024 - Present",
        role: "Core Member & Tech Lead",
        org: "Beach Hack Season 7",
        desc: "Leading technical execution for one of the largest beach hackathons. Designed brand identity and web assets."
    },
    {
        year: "2024 - 2025",
        role: "Frontend Developer",
        org: "Agape",
        desc: "Built responsive, accessible frontend interfaces for the core product. Collaborated with backend teams for seamless integration."
    },
    {
        year: "2024",
        role: "CS Team Lead Intern",
        org: "Underwater Rover Project",
        desc: "Led the control system interface design using QGroundControl and custom Python dashboards."
    },
    {
        year: "2023 - 2024",
        role: "Event Coordinator",
        org: "Techletics / Evolv",
        desc: "Managed logistics and scheduling for college-level technical fests and workshops."
    }
];

export const ExperienceTimeline = () => {
    return (
        <section className="py-32 px-6 md:px-20 bg-background relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

                {/* --- Sticky Left Column --- */}
                <div className="w-full md:w-1/3 relative">
                    <div className="sticky top-32">
                        <h2 className="text-4xl font-display font-medium mb-2">Journey</h2>
                        <p className="text-muted-foreground">
                            Key roles, leadership positions, and milestrones defining my professional path.
                        </p>
                    </div>
                </div>

                {/* --- Scrolling Right Column --- */}
                <div className="w-full md:w-2/3 space-y-20">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.5 }}
                            className="group"
                        >
                            <span className="inline-block px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-mono mb-4 text-muted-foreground group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-colors">
                                {exp.year}
                            </span>
                            <h3 className="text-3xl font-bold mb-2 group-hover:text-emerald-500 transition-colors duration-300">
                                {exp.role}
                            </h3>
                            <h4 className="text-xl text-zinc-500 mb-4">{exp.org}</h4>
                            <p className="text-lg leading-relaxed text-muted-foreground/80 max-w-xl">
                                {exp.desc}
                            </p>
                        </motion.div>
                    ))}

                    {/* Visual End Marker */}
                    <div className="h-20 flex items-center text-zinc-300 dark:text-zinc-800">
                        <div className="h-[1px] w-20 bg-current mr-4" />
                        <span className="text-xs tracking-widest uppercase">To be continued</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

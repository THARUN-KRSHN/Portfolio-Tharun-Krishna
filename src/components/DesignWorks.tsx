"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProjectsByCategory, ProjectCategory } from "@/data/portfolio";
import { BentoGrid } from "./BentoGrid";

// Sub-component for Horizontal Scroll Mode
const HorizontalPosters = ({ posters }: { posters: any[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-stone-50 dark:bg-zinc-950">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="px-20 mb-auto mt-32 absolute left-0 z-10">
                    <h3 className="text-4xl md:text-6xl font-display font-medium text-zinc-900 dark:text-zinc-100 mix-blend-difference">
                        Visual <br /> Narratives
                    </h3>
                    <p className="mt-4 text-zinc-500 max-w-xs font-medium">
                        A curated collection of posters and editorial graphics.
                    </p>
                </div>

                <motion.div style={{ x }} className="flex gap-12 pl-[40vw]">
                    {posters.map((project, index) => (
                        <div
                            key={project.id}
                            className="relative group h-[60vh] aspect-[3/4] flex-shrink-0 bg-zinc-200 dark:bg-zinc-900 rounded-none overflow-hidden perspective-1000"
                        >
                            <motion.div
                                whileHover={{ scale: 0.98, rotateX: 5 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full transition-transform duration-500"
                            >
                                {project.thumbnail && (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h4 className="text-white text-xl font-bold">{project.title}</h4>
                                    <div className="text-zinc-300 text-sm">{project.tags.join(" • ")}</div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                    <div className="h-[60vh] w-[20vw] flex items-center justify-center text-zinc-300 font-display text-9xl opacity-20">
                        END
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export const DesignWorks = ({ categories = ["poster", "brochure"] }: { categories?: ProjectCategory[] }) => {
    const posters = categories.includes("poster") ? getProjectsByCategory("poster") : [];
    const brochures = categories.includes("brochure") ? getProjectsByCategory("brochure") : [];
    const social = categories.includes("social") ? getProjectsByCategory("social") : [];

    // Logic for Horizontal Mode: Only if specifically asking for Posters solo
    const isHorizontalMode = categories.length === 1 && categories.includes("poster") && posters.length > 3;

    if (isHorizontalMode) {
        return <HorizontalPosters posters={posters} />;
    }

    // --- STANDARD GRID / BENTO FALLBACK (Brochures, Social, Mixed) ---
    return (
        <section className="bg-background py-24 px-6 md:px-20">
            {/* Render Bento for Posters if mixed mode */}
            {!isHorizontalMode && posters.length > 0 && (
                <div className="mb-20">
                    <BentoGrid projects={posters.slice(0, 5)} />
                </div>
            )}

            {/* Brochures Grid */}
            {brochures.length > 0 && (
                <div className="mb-20">
                    <h3 className="text-3xl font-display mb-8">Print & Editorial</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {brochures.map(p => (
                            <div key={p.id} className="group cursor-pointer">
                                <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative">
                                    <img src={p.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <h4 className="mt-4 text-xl font-bold">{p.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Grid */}
            {social.length > 0 && (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {social.map(p => (
                            <div key={p.id} className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative group">
                                <img src={p.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold p-2 text-center">
                                    {p.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

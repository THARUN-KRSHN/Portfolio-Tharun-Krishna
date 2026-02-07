"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProjectsByCategory } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export const VisualNarrative = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Horizontal scroll calculation
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    // Check for mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const projects = getProjectsByCategory("poster");
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section ref={targetRef} className="relative h-auto md:h-[400vh] bg-background" id="visual-narrative-section">

            <div className="relative md:sticky md:top-0 h-auto md:h-screen flex flex-col md:flex-row overflow-hidden">

                {/* --- LEFT TITLE PANEL --- */}
                <div className="w-full md:w-1/3 h-auto md:h-full flex flex-col justify-between p-6 md:p-20 z-20 bg-background/95 md:backdrop-blur-sm md:border-r md:border-white/5">

                    {/* Circle Counter */}
                    <div className="relative w-24 h-24 md:w-48 md:h-48 group mb-8 md:mb-0">
                        <svg className="w-full h-full -rotate-90 transform transition-all duration-500 group-hover:scale-75">
                            <circle cx="50%" cy="50%" r="45%" className="stroke-white/10 fill-none stroke-1" />
                            <motion.circle
                                cx="50%" cy="50%" r="45%"
                                className="stroke-white fill-none stroke-[2px]"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: (activeIndex + 1) / projects.length }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Project</span>
                            <div className="flex items-baseline text-2xl md:text-4xl font-display font-bold">
                                <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                                <span className="text-sm md:text-lg text-muted-foreground mx-1">|</span>
                                <span className="text-sm md:text-lg text-muted-foreground">{String(projects.length).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="mb-10 md:mb-20">
                        <h2 className="text-5xl md:text-8xl font-black font-display text-white leading-[0.9]">
                            Visual <br /> Narrative
                        </h2>
                        <p className="mt-4 md:mt-8 text-sm md:text-lg text-muted-foreground font-light max-w-sm">
                            A curated collection of impactful designs, editorial graphics, and visual storytelling experiments.
                        </p>

                        <a href="#design-works" className="mt-8 md:mt-12 flex items-center gap-4 group cursor-pointer w-fit">
                            <div className="px-4 py-2 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-colors">
                                Explore All
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:rotate-45 transition-all" />
                        </a>
                    </div>
                </div>

                {/* --- RIGHT GALLERY PANEL --- */}
                <div className="w-full md:w-21/3 h-[60vh] md:h-full flex items-center overflow-x-auto md:overflow-hidden relative snap-x snap-mandatory">
                    {/* 
                         Mobile: Regular horizontal scroll with snap. 
                         Desktop: Motion value driven transform.
                     */}
                    <motion.div
                        style={{ x: isMobile ? 0 : x }}
                        className="flex gap-6 md:gap-20 px-6 md:pl-20 items-center w-max md:w-auto pb-6 md:pb-0"
                    >
                        {projects.map((project, index) => (
                            <div key={project.id} className="snap-center shrink-0">
                                <NarrativeCard
                                    project={project}
                                    index={index}
                                    setActiveIndex={setActiveIndex}
                                    isMobile={isMobile}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

const NarrativeCard = ({ project, index, setActiveIndex, isMobile }: { project: any, index: number, setActiveIndex: (n: number) => void, isMobile: boolean }) => {
    return (
        <motion.div
            className="relative h-[50vh] w-[80vw] md:h-[65vh] md:w-[45vh] bg-[#111] rounded-[2rem] overflow-hidden group flex-shrink-0 border border-white/5"
            onViewportEnter={() => isMobile && setActiveIndex(index)} // Simple active tracking mobile
            onHoverStart={() => !isMobile && setActiveIndex(index)} // Mouse tracking desktop
            whileHover={{ scale: 1.02 }}
        >
            <div className="w-full h-full relative">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 md:opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <div className="mb-2 md:mb-4">
                        <span className="inline-block px-3 py-1 mb-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] md:text-xs font-mono uppercase tracking-widest">
                            {project.category}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2 leading-none">
                        {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2 text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {project.tags.map((t: string) => (
                            <span key={t}>• {t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

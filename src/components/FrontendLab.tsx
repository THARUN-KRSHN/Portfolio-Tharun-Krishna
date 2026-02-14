"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Code2, Zap } from "lucide-react";
import { getProjectsByCategory, Project } from "@/data/portfolio";
import { Button } from "./ui/Button";

// --- Background Grid Component ---
const RetroGrid = () => {
    const [highlight, setHighlight] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

    useEffect(() => {
        const interval = setInterval(() => {
            const x = Math.floor(Math.random() * 30) * 40;
            const y = Math.floor(Math.random() * 20) * 40;
            setHighlight({ x, y, active: true });

            setTimeout(() => setHighlight(prev => ({ ...prev, active: false })), 1000);
        }, 2000); // Faster flash

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Fixed background pattern that stays with the section */}
            <div className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                }}
            />
            <AnimatePresence>
                {highlight.active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            left: highlight.x,
                            top: highlight.y,
                            width: 40,
                            height: 40
                        }}
                        className="absolute bg-[#ccff00]"
                    />
                )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>
    );
};

// --- Project Card Component ---
const ProjectCard = ({ project, index, isExpanded }: { project: Project; index: number; isExpanded: boolean }) => {
    // Logic:
    // If NOT expanded (Stack Mode):
    // - All cards stick to the SAME top position (e.g., 150px)
    // - They have a large margin-bottom to allow scrolling to reach the next card
    // - New cards slide UP and cover the previous one because of higher z-index and DOM order

    // If EXPANDED (List Mode):
    // - No sticky
    // - Normal margins

    const stickyTop = 150;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
                zIndex: index + 10
            }}
            className={`
                w-full 
                ${isExpanded ? 'relative mb-12' : 'sticky top-24 md:top-[150px] mb-[30vh] md:mb-[40vh]'} 
                last:mb-0
            `}
        >
            <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                {/* Image Section */}
                <div className="aspect-video w-full overflow-hidden bg-zinc-950 relative">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

                    {/* Hover Overlay with Logic Hint */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <a
                            href="https://github.com/THARUN-KRSHN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-950/80 border border-zinc-700 px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-zinc-800 cursor-pointer"
                        >
                            <span className="text-[#ccff00] text-xs font-mono">view_project.exe</span>
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </a>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 relative bg-zinc-900">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex gap-2 mb-3">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-zinc-400 border border-zinc-800 px-2 py-1 rounded bg-zinc-950/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <motion.h3
                                whileInView={{ color: "#ccff00" }}
                                viewport={{ margin: "-10%", once: true }}
                                transition={{ duration: 0.3 }}
                                className="text-3xl md:text-4xl font-display text-white mb-2 group-hover:text-[#ccff00] transition-colors"
                            >
                                {project.title}
                            </motion.h3>
                        </div>
                        <div className="text-zinc-600 font-mono text-xl md:text-2xl font-bold opacity-30">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                    </div>

                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {project.description || "A cutting-edge frontend experiment pushing the boundaries of interaction design and performance."}
                    </p>

                    <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-auto">
                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                            <Code2 className="w-4 h-4" />
                            <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                            {project.category === 'dev' && <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#ccff00]" /> Production Ready</span>}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const FrontendLab = () => {
    const allProjects = getProjectsByCategory("dev");
    const [isExpanded, setIsExpanded] = useState(false);

    // If expanded, show all. If not, show only 3.
    const displayedProjects = isExpanded ? allProjects : allProjects.slice(0, 3);
    const hasMore = allProjects.length > 3;

    return (
        <section className="relative w-full py-20 md:py-32 bg-zinc-950 text-white min-h-screen">
            <RetroGrid />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left Side: Sticky Headers */}
                    <div className="w-full lg:w-5/12 pointer-events-none md:pointer-events-auto">
                        <div className="static lg:sticky lg:top-32 flex flex-col items-start space-y-8">

                            {/* Heading */}
                            <h2 className="text-6xl md:text-8xl font-display font-medium tracking-tighter leading-[0.9]">
                                Frontend
                                <br />
                                <span
                                    className="text-[#ccff00] inline-block transition-transform duration-300 hover:-skew-x-12 origin-left cursor-default"
                                >
                                    Labs
                                </span>
                            </h2>

                            <div className="space-y-6 max-w-md">
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    Where design systems meet complex logic. A collection of experimental interfaces, micro-interactions, and production-grade applications.
                                </p>

                                <div className="hidden md:block p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-3 h-3 rounded-full bg-[#ccff00] animate-pulse" />
                                        <span className="text-xs font-mono text-zinc-400">LIVE ENVIRONMENT</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[70%] bg-zinc-600 rounded-full" />
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[45%] bg-zinc-700 rounded-full" />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-zinc-500 pt-1">
                                            <span>CPU: 12%</span>
                                            <span>MEM: 402MB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Scrollable Card Stack */}
                    <div className="w-full lg:w-7/12 relative">
                        <div className="flex flex-col pb-20">
                            {displayedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    isExpanded={isExpanded}
                                />
                            ))}

                            {/* Spacer to distinguish end of stack mode */}
                            {!isExpanded && <div className="h-[20vh]" />}

                            {hasMore && !isExpanded && (
                                <div className="flex justify-center mt-8 relative z-20">
                                    <Button
                                        onClick={() => setIsExpanded(true)}
                                        variant="outline"
                                        className="gap-2 group text-zinc-300 border-zinc-700 hover:text-[#ccff00] hover:border-[#ccff00]"
                                    >
                                        Show More Projects
                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                                    </Button>
                                </div>
                            )}

                            {isExpanded && (
                                <div className="flex justify-center mt-12">
                                    <span className="text-zinc-500 font-mono text-xs">END OF LIST</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

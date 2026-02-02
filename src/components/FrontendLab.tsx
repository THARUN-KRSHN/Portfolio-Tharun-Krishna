"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Copy, Maximize2, GitBranch } from "lucide-react";
import { getProjectsByCategory } from "@/data/portfolio";
import { Button } from "./ui/Button";

// Logic Snippet for "Flip" Backside
const CodeSnippet = () => (
    <div className="font-mono text-[10px] sm:text-xs leading-relaxed text-emerald-400 p-4 overflow-hidden">
        <div className="opacity-50 mb-2">// Core Logic Architecture</div>
        <div className="text-purple-400">interface<span className="text-white"> AI_Agent</span> {"{"}</div>
        <div className="pl-4 text-blue-300">transparencyScore<span className="text-white">:</span> number;</div>
        <div className="pl-4 text-blue-300">reasoningChain<span className="text-white">:</span> string[];</div>
        <div className="text-white">{"}"}</div>
        <br />
        <div className="text-purple-400">const<span className="text-yellow-300"> analyzePattern</span> = <span className="text-blue-300">(input)</span> <span className="text-purple-400">=&gt;</span> {"{"}</div>
        <div className="pl-4 text-zinc-400">return input.reduce((acc, curr) =&gt; ...</div>
        <div className="text-white">{"}"}</div>
    </div>
);

const ProjectLabCard = ({ project }: { project: any }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group relative h-[400px] w-full perspective-1000"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
                {/* --- FRONT: Video/Image --- */}
                <div className="absolute inset-0 backface-hidden bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                    <div className="h-8 bg-zinc-950 border-b border-zinc-800 flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                        </div>
                        <div className="ml-4 text-[10px] font-mono text-zinc-500 flex-1 text-center truncate">
                            {project.title.toLowerCase().replace(/\s/g, '-')}.app
                        </div>
                    </div>

                    <div className="relative h-[calc(100%-32px)] w-full bg-zinc-950 flex items-center justify-center group-hover:bg-zinc-900 transition-colors">
                        {/* If video exists, we would use it here. Using a placeholder or image for now. */}
                        {project.thumbnail && !project.thumbnail.includes("placehold") ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80"
                            />
                        ) : (
                            <div className="text-zinc-700 font-mono text-sm border border-zinc-800 p-4 rounded bg-zinc-900/50">
                                [ Live Demo Input Stream ]
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                            <div className="flex gap-2">
                                {project.tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider border border-white/20 px-2 py-0.5 rounded text-white/60">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BACK: Logic/Diagram --- */}
                <div
                    className="absolute inset-0 backface-hidden bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden rotate-y-180 flex flex-col"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="h-8 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-3">
                        <span className="text-[10px] font-mono text-emerald-500">logic_core.ts</span>
                        <GitBranch className="w-3 h-3 text-zinc-600" />
                    </div>
                    <div className="flex-1 bg-black/50 relative">
                        <CodeSnippet />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 w-full text-center">
                            <Button variant="outline" size="sm" className="text-xs h-8 bg-zinc-900 border-zinc-700 hover:bg-zinc-800">
                                View Architecture <Maximize2 className="w-3 h-3 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export const FrontendLab = () => {
    // Specifically getting 'dev' projects
    const projects = getProjectsByCategory("dev").slice(0, 3);

    if (projects.length === 0) return null;

    return (
        <section className="py-32 px-6 md:px-20 bg-zinc-950 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <h2 className="text-5xl md:text-7xl font-display font-medium mb-4 tracking-tighter">
                        Frontend <span className="text-zinc-700">Lab</span>
                    </h2>
                    <p className="text-zinc-400 max-w-lg text-lg">
                        Experimental features, complex state management, and production-grade applications.
                    </p>
                </div>
                <div className="hidden md:block text-right">
                    <div className="font-mono text-xs text-emerald-500 mb-1">System Status</div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        All Systems Operational
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <ProjectLabCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

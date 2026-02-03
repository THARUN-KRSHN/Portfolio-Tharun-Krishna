"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Code, Terminal } from "lucide-react";
import { Button } from "./ui/Button";

// Bento Grid Item Component
const BentoItem = ({
    className,
    children,
    delay = 0
}: {
    className?: string,
    children: React.ReactNode,
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`bg-secondary border border-border rounded-3xl p-6 relative overflow-hidden group hover:border-accent/50 transition-colors ${className}`}
    >
        {children}
    </motion.div>
);

export const ResumeSnapshot = () => {
    return (
        <section className="py-32 px-6 md:px-20 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
                        Capabilities <span className="text-muted-foreground">&</span> <br />
                        Deployments
                    </h2>
                </div>

                {/* 12-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">

                    {/* --- LARGE CARD: Lead Role --- */}
                    <BentoItem className="col-span-1 md:col-span-8 md:row-span-2 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-mono uppercase tracking-wider">
                                    Current Role
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Frontend Developer @ Agape</h3>
                            <p className="text-muted-foreground max-w-lg text-lg">
                                Leading the frontend architecture for high-performance web applications. Implementing accessible design systems and scalable React patterns.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-2 flex-wrap">
                            <span className="bg-background px-3 py-1 rounded-md text-xs border font-mono">React</span>
                            <span className="bg-background px-3 py-1 rounded-md text-xs border font-mono">Next.js 14</span>
                            <span className="bg-background px-3 py-1 rounded-md text-xs border font-mono">TypeScript</span>
                        </div>
                        <ArrowUpRight className="absolute top-6 right-6 w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors group-hover:rotate-45 duration-300" />
                    </BentoItem>

                    {/* --- MEDIUM CARD: Leadership --- */}
                    <BentoItem className="col-span-1 md:col-span-4 md:row-span-1" delay={0.1}>
                        <div className="h-full flex flex-col justify-between">
                            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent-foreground flex items-center justify-center mb-4">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Tech Lead</h4>
                                <p className="text-sm text-muted-foreground">Beach Hack Season 7</p>
                            </div>
                        </div>
                    </BentoItem>

                    {/* --- EXPERT PILLS: Tech Stack --- */}
                    <BentoItem className="col-span-1 md:col-span-4 md:row-span-1" delay={0.2}>
                        <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Core Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Next.js", "React", "Tailwind", "Framer", "Java", "Python"].map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-background rounded text-xs font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </BentoItem>

                    {/* --- WIDE CARD: Key Project --- */}
                    <BentoItem className="col-span-1 md:col-span-6 md:row-span-1" delay={0.3}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-xl mb-1">Sahayak Portal</h4>
                                <p className="text-sm text-muted-foreground">GovTech Accessibility Platform</p>
                            </div>
                            <Layers className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            In Development
                        </div>
                    </BentoItem>

                    {/* --- WIDE CARD: Key Project 2 --- */}
                    <BentoItem className="col-span-1 md:col-span-6 md:row-span-1 bg-secondary text-foreground" delay={0.4}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-xl mb-1">UAAT MVP</h4>
                                <p className="text-sm opacity-70">Automated Testing Suite</p>
                            </div>
                            <Terminal className="w-5 h-5 opacity-70" />
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-xs font-mono opacity-60">
                            Java • Swing • MySQL
                        </div>
                    </BentoItem>

                    {/* --- TALL CARD: Design System --- */}
                    <BentoItem className="col-span-1 md:col-span-4 md:row-span-2" delay={0.5}>
                        <div className="h-full flex flex-col">
                            <h4 className="font-bold text-lg mb-4">Design Systems</h4>
                            <p className="text-sm text-muted-foreground mb-6">
                                Obsessed with tokenization, component libraries, and pixel-perfect implementation.
                            </p>
                            <div className="flex-1 rounded-xl bg-gradient-to-br from-secondary to-muted p-4 border border-border">
                                <div className="space-y-2">
                                    <div className="h-2 w-1/2 bg-zinc-400/50 rounded"></div>
                                    <div className="h-2 w-3/4 bg-zinc-400/50 rounded"></div>
                                    <div className="h-8 w-full bg-accent/20 rounded mt-4"></div>
                                </div>
                            </div>
                        </div>
                    </BentoItem>

                    {/* --- STAT CARD --- */}
                    <BentoItem className="col-span-1 md:col-span-4 md:row-span-1" delay={0.6}>
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="text-4xl font-display font-bold">15+</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Projects Shipped</div>
                            </div>
                        </div>
                    </BentoItem>

                    {/* --- CTA CARD --- */}
                    <BentoItem className="col-span-1 md:col-span-4 md:row-span-1 bg-accent/10 border-accent/20" delay={0.7}>
                        <div className="h-full flex flex-col justify-center items-center text-center">
                            <h4 className="font-bold text-lg text-accent-foreground mb-2">Open for roles</h4>
                            <p className="text-xs text-muted-foreground">
                                Frontend / Fullstack
                            </p>
                        </div>
                    </BentoItem>

                </div>
            </div>
        </section>
    );
};

"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, Code2, Palette } from "lucide-react";

export const Hero = () => {
    const { scrollY } = useScroll();

    // Parallax & Scroll Transforms
    const yLeft = useTransform(scrollY, [0, 500], [0, 100]);
    const yRight = useTransform(scrollY, [0, 500], [0, -100]);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / 50);
        mouseY.set((clientY - centerY) / 50);
    };

    const springConfig = { damping: 25, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-background"
        >
            {/* --- Left Split: Design Core --- */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-20 border-b md:border-b-0 md:border-r border-border/50 group">
                <div className="absolute inset-0 bg-stone-50/5 dark:bg-zinc-900/20 -z-10" />

                {/* Ambient Blur Logic for Design */}
                <motion.div
                    style={{ x: springX, y: springY }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] opacity-60"
                />

                <motion.div style={{ y: yLeft }} className="z-10">
                    <div className="flex items-center gap-3 mb-6 text-muted-foreground">
                        <Palette className="w-5 h-5" />
                        <span className="font-display tracking-widest uppercase text-sm">Visual Core</span>
                    </div>

                    <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] text-foreground mix-blend-difference mb-6">
                        Visual <br />
                        <span className="italic font-serif font-light text-muted-foreground">Storyteller</span>
                    </h1>

                    <p className="max-w-md text-lg text-muted-foreground/80 leading-relaxed">
                        Crafting brand identities and digital experiences that feel crafted, deliberate, and undeniably human.
                    </p>
                </motion.div>
            </div>

            {/* --- Right Split: Technical Core --- */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-20 bg-grid-pattern group">
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <motion.div
                    style={{ x: springX, y: springY }}
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] opacity-60"
                />

                <motion.div style={{ y: yRight }} className="z-10 text-right md:text-left pl-0 md:pl-12">
                    <div className="flex items-center justify-end md:justify-start gap-3 mb-6 text-muted-foreground">
                        <Code2 className="w-5 h-5" />
                        <span className="font-mono tracking-widest uppercase text-sm">Logic Core</span>
                    </div>

                    <h1 className="font-sans text-6xl md:text-8xl font-bold leading-[0.9] text-foreground mb-6 tracking-tighter">
                        Creative <br />
                        <span className="font-mono font-normal text-emerald-500/80 dark:text-emerald-400">Technologist</span>
                    </h1>

                    <p className="max-w-md ml-auto md:ml-0 text-lg text-muted-foreground/80 leading-relaxed font-mono text-sm md:text-base">
                        &lt;Engineering&gt;<br />
                        Building scalable, performant, and accessible web architecture with precision.<br />
                        &lt;/Engineering&gt;
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40 mix-blend-difference z-20"
            >
                <div className="h-12 w-[1px] bg-current mb-2" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Explore</span>
            </motion.div>
        </section>
    );
};

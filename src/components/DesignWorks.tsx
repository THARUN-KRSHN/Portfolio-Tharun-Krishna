"use client";
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useVelocity,
    useAnimationFrame,
    useMotionValue
} from "framer-motion";
import { getProjectsByCategory, ProjectCategory } from "@/data/portfolio";

// --- Utility for wrapping ---
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- Horizontal Velocity Scroll Row (Respected Aspect Ratio) ---
const VelocityScrollRow = ({ baseVelocity, items }: { baseVelocity: number; items: any[] }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    // Wrap for infinite loop effect
    const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

    useAnimationFrame((t, delta) => {
        const velocity = velocityFactor.get();
        // Pause when not scrolling
        if (Math.abs(velocity) < 0.05) return;

        let moveBy = baseVelocity * (delta / 1000);

        // Apply scroll direction
        if (velocity < 0) {
            moveBy = -moveBy;
        }

        // Use the magnitude of scroll velocity to drive speed
        moveBy = moveBy * Math.abs(velocity);

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="w-full overflow-hidden flex my-2">
            <motion.div className="flex gap-8 w-max" style={{ x }}>
                {items.map((project, idx) => (
                    <div
                        key={`${project.id}-${idx}`}
                        className="relative shrink-0 h-[25vh] md:h-[40vh] rounded-lg overflow-hidden group bg-transparent"
                    >
                        {/* Image handles its own width to maintain aspect ratio */}
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
                                {project.title}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

// --- Vertical Parallax Column (Respected Aspect Ratio) ---
const VerticalScrollColumn = ({ projects, direction = 1, speed = 1 }: { projects: any[]; direction?: number; speed?: number }) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: columnRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to Y translation
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 1 ? ["10%", "-10%"] : ["-10%", "10%"]
    );

    return (
        <div ref={columnRef} className="h-[120vh] overflow-hidden relative">
            <motion.div style={{ y }} className="flex flex-col gap-6 py-6 w-full">
                {projects.map((project, idx) => (
                    <div
                        key={`${project.id}-${idx}`}
                        className="relative w-full rounded-lg overflow-hidden group bg-secondary"
                    >
                        {/* Image handles height to maintain aspect ratio */}
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <h5 className="text-white text-xs font-bold truncate">{project.title}</h5>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export const DesignWorks = () => {
    // --- 1. Gather ALL Data ---
    const brochures = getProjectsByCategory("brochure");
    const ui = getProjectsByCategory("ui");
    const dev = getProjectsByCategory("dev"); // Dev often has landscape mockups
    const posters = getProjectsByCategory("poster");
    const social = getProjectsByCategory("social");

    // --- 2. Group by Orientation (Approximate) ---
    // Landscape Group
    const landscapeProjects = [...brochures, ...ui, ...dev];
    // Portrait Group
    const portraitProjects = [...posters, ...social];

    // Duplicate for infinite marquee density
    const landscapeRowItems = [...landscapeProjects, ...landscapeProjects, ...landscapeProjects, ...landscapeProjects];
    // Vertical columns handle duplication internally or just stack enough items? 
    // We'll duplicate portrait list for the columns to ensure they are tall enough
    const portraitColumnItems = [...portraitProjects, ...portraitProjects];

    return (
        <section id="design-works" className="bg-background py-32 overflow-hidden flex flex-col gap-32">

            {/* --- Section Title --- */}
            <div className="px-6 md:px-20">
                <h3 className="text-4xl md:text-6xl font-display font-medium text-foreground dark:mix-blend-difference mb-4">
                    Visual <br /> Narratives
                </h3>
                <p className="text-muted-foreground max-w-sm font-medium"> // Increased padding-bottom to avoid cut off
                    A holistic view of design and development works across various mediums.
                </p>
            </div>

            {/* --- Horizontal Marquee (Landscape) --- */}
            <div className="flex flex-col gap-8 w-full border-y border-white/5 py-12 bg-secondary/5">
                {/* Row 1: Left to Right (Velocity > 0 ?) 
                    User asked: "horizontal movement left to right and right to left"
                    Usually "Left to Right" means moving towards Right (positive velocity).
                    Let's try 3 and -3.
                */}
                <VelocityScrollRow baseVelocity={-2} items={landscapeRowItems} />
                <VelocityScrollRow baseVelocity={2} items={landscapeRowItems} />
            </div>

            {/* --- Vertical Marquee (Portrait) --- */}
            <div className="px-6 md:px-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-[100vh] overflow-hidden masked-gradient">
                    {/* 
                       Logic: 
                       1st col: Top to Bottom (or Bottom to Top?)
                       User said: "1st coloum to top then next coloum to bottom"
                       "To Top" usually means content moves UP (visual shift positive Y to negative Y). 
                       My `VerticalScrollColumn` does `["10%", "-10%"]` if direction is 1. This moves content UP (visual scroll down moves content up relative to viewport).
                    */}
                    <VerticalScrollColumn projects={portraitColumnItems.filter((_, i) => i % 4 === 0)} direction={1} />
                    <VerticalScrollColumn projects={portraitColumnItems.filter((_, i) => i % 4 === 1)} direction={-1} />
                    <VerticalScrollColumn projects={portraitColumnItems.filter((_, i) => i % 4 === 2)} direction={1} />
                    <VerticalScrollColumn projects={portraitColumnItems.filter((_, i) => i % 4 === 3)} direction={-1} />
                </div>
            </div>

        </section>
    );
};

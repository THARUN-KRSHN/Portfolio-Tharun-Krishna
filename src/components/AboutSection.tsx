"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/Button";

// Background grid with random flashing lines
const AnimatedGrid = () => {
    const [activeLine, setActiveLine] = useState<number | null>(null);
    const cols = 6; // Number of vertical grid lines

    useEffect(() => {
        const interval = setInterval(() => {
            const randomCol = Math.floor(Math.random() * cols);
            setActiveLine(randomCol);

            // Turn off after a short burst
            setTimeout(() => setActiveLine(null), 2000);
        }, 5000); // Trigger every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0 flex justify-between px-6 md:px-20 pointer-events-none">
            {Array.from({ length: cols }).map((_, i) => (
                <div
                    key={i}
                    className="h-full w-[1px] bg-border transition-colors duration-1000 ease-in-out relative"
                >
                    {/* The flashing neon line overlay */}
                    <div
                        className={`absolute inset-0 w-full h-full bg-primary/50 shadow-[0_0_15px_1px_rgba(204,255,0,0.4)] transition-opacity duration-1000 ${activeLine === i ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>
            ))}
        </div>
    );
};

export const AboutSection = () => {
    const textRef = useRef(null);
    const isInView = useInView(textRef, { margin: "-20% 0px -20% 0px", once: true });

    // Text content split for animation
    const words = [
        { text: "I'm", highlight: false },
        { text: "a", highlight: false },
        { text: "creative", highlight: false },
        { text: "developer", highlight: true }, // Highlighted
        { text: "&", highlight: false },
        { text: "designer", highlight: true },
        { text: "working", highlight: false },
        { text: "at", highlight: false },
        { text: "the", highlight: false },
        { text: "intersection", highlight: false },
        { text: "of", highlight: false },
        { text: "visual", highlight: true },
        { text: "design", highlight: false },
        { text: "and", highlight: false },
        { text: "technology.", highlight: true },
        { text: "I", highlight: false },
        { text: "help", highlight: false },
        { text: "brands", highlight: true },
        { text: "craft", highlight: false },
        { text: "expressive", highlight: false },
        { text: "digital", highlight: false },
        { text: "experiences", highlight: true },
        { text: "that", highlight: false },
        { text: "feel", highlight: false },
        { text: "bold,", highlight: true },
        { text: "intuitive,", highlight: false },
        { text: "and", highlight: false },
        { text: "built", highlight: false },
        { text: "to", highlight: false },
        { text: "stand", highlight: false },
        { text: "out.", highlight: true },
    ];

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const child = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            } as any // Cast to any to avoid strict type mismatch if inferred incorrectly
        }
    };

    return (
        <section className="relative min-h-[80vh] bg-background flex flex-col py-20 overflow-hidden">
            <AnimatedGrid />

            {/* Top Section: About Bio */}
            <div className="relative z-10 w-full px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-32">

                {/* --- Left Column: Portrait --- */}
                <div className="md:col-span-4 order-2 md:order-1 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "grayscale(100%)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "grayscale(0%)" }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="relative w-full aspect-[3/4] overflow-hidden bg-secondary shadow-2xl transition-all duration-700 group"
                    >
                        {/* Placeholder for user portrait */}
                        <Image
                            src="/images/profile.jpeg"
                            alt="Tharun Krishna"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />

                        {/* More About Me Button Overlay */}
                        <div className="absolute bottom-4 left-4">
                            <a href="/resume/Resume-Tharun Krishna C U.pdf" target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black uppercase text-xs tracking-widest backdrop-blur-md border-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                                    More About Me
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <div className="mt-4 font-mono text-xs uppercase text-muted-foreground opacity-50">
                        <p>Tharun Krishna [19]</p>
                        <p>Kerala, India</p>
                    </div>
                </div>

                {/* --- Right Column: Text --- */}
                <div className="md:col-span-8 order-1 md:order-2 md:pb-20">
                    <motion.div
                        ref={textRef}
                        variants={container}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex flex-wrap gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-2"
                    >
                        {words.map((word, idx) => (
                            <motion.span
                                key={idx}
                                variants={child}
                                className={`text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-[1.1] tracking-tight ${word.highlight ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors duration-300"
                                    }`}
                            >
                                {word.text}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

            </div>

            {/* --- Project Showcase Extension --- */}
            <div className="relative z-10 w-full px-6 md:px-20 flex flex-col gap-32 items-center">
                {[
                    { title: "Graphic Design", type: "Poster", image: "/images/poster1.png", ratio: "aspect-[3/4]", align: "end" },
                    { title: "Development", type: "Web App", image: "/images/webapp.png", ratio: "aspect-[16/10]", align: "start" },
                    { title: "Graphic Design", type: "Identity", image: "/images/identity.png", ratio: "aspect-[3/4]", align: "end" }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className={`w-full flex ${item.align === "end" ? "justify-end" : "justify-start"}`}
                    >
                        <motion.div
                            initial={{ filter: "grayscale(100%)" }}
                            whileInView={{ filter: "grayscale(0%)" }}
                            viewport={{ margin: "-20%" }}
                            transition={{ duration: 0.5 }}
                            className={`relative ${item.ratio} w-full md:w-[25vw] bg-secondary group transition-all duration-500 hover:scale-125 hover:z-50 hover:shadow-2xl`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-all duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-primary uppercase tracking-widest backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.type}
                            </div>
                            {/* Hover Overlay Title */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <h3 className="font-display text-4xl text-white font-bold tracking-tighter drop-shadow-md">{item.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* --- Show All Button --- */}
            <div className="relative z-10 w-full flex justify-center py-32">
                <a href="#visual-narrative-section" className="group relative cursor-pointer">
                    <h2 className="text-8xl md:text[10vw] font-black font-display uppercase tracking-[-0.05em] text-foreground transition-transform duration-300 md:group-hover:skew-x-12">
                        Show All
                        <sup className="text-2xl md:text-4xl ml-2 border border-foreground rounded-full h-12 w-12 inline-flex items-center justify-center pb-1">®</sup>
                    </h2>
                    <div className="w-full h-1 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-2" />
                </a>
            </div>
        </section>
    );
};

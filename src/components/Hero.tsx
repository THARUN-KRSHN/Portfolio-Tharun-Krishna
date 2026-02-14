"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 3D Transforms for the Laptop
    const rotateX = useTransform(scrollYProgress, [0, 0.4], [50, 0]); // Tilts up
    const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1.2]); // Grows slightly
    const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]); // Moves up effectively
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]); // Fades in fully

    // Text Parallax
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    // Time for the footer
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[250vh] bg-background">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden [perspective:1000px]">

                {/* --- BACKGROUND TYPOGRAPHY --- */}
                <motion.div
                    style={{ y: textY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none"
                >
                    <h1 className="text-[18vw] leading-[0.8] font-black font-display text-center uppercase text-foreground opacity-10 dark:opacity-20 dark:mix-blend-difference tracking-tighter">
                        THARUN
                    </h1>
                    <h1 className="text-[18vw] leading-[0.8] font-black font-display text-center uppercase text-foreground opacity-10 dark:opacity-20 dark:mix-blend-difference tracking-tighter">
                        KRISHNA
                    </h1>
                </motion.div>

                {/* --- 3D LAPTOP CONTAINER --- */}
                <motion.div
                    style={{ rotateX, scale, y, opacity }}
                    className="relative z-10 w-[80vw] md:w-[60vw] aspect-[16/10] bg-[#111] rounded-[2rem] p-2 md:p-4 shadow-2xl ring-1 ring-white/10"
                >
                    {/* Laptop Lid/Bezel */}
                    <div className="relative w-full h-full bg-black rounded-[1.5rem] overflow-hidden border border-white/5">
                        {/* Camera Dot */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20 z-20"></div>

                        {/* Screen Content - Demo Video */}
                        <video
                            src="/images/ui_demo.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />

                        {/* Reflexion/Gloss Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </div>

                    {/* Laptop Base (Suggestions of hinge/depth) */}
                    <div className="absolute -bottom-4 left-[10%] right-[10%] h-4 bg-[#222] rounded-b-xl -z-10 shadow-xl"></div>
                </motion.div>

                {/* --- FOOTER INFO (Absolute Bottom) --- */}
                <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 flex justify-between items-end text-xs md:text-sm font-mono text-muted-foreground z-20">
                    <div className="flex flex-col gap-1">
                        <span className="uppercase tracking-widest opacity-60">Design By</span>
                        <span className="font-bold text-foreground">Tharun Krishna</span>
                    </div>

                    <div className="hidden md:flex flex-col gap-1 text-center">
                        <span className="uppercase tracking-widest opacity-60">Local Time</span>
                        <span className="font-bold text-foreground">{time}</span>
                    </div>

                    <div className="flex flex-col gap-1 text-right max-w-[200px]">
                        <span className="uppercase tracking-widest opacity-60">Mission</span>
                        <span className="text-foreground leading-tight">
                            Crafting experience-driven websites for brands that move with purpose.
                        </span>
                    </div>
                </div>

                {/* --- SCROLL INDICATOR --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 text-muted-foreground z-20"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Open</span>
                        <ArrowDown className="w-4 h-4" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

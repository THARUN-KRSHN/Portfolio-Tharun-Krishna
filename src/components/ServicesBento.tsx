"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, Palette, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Clock Component ---
const LiveClock = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl md:text-6xl font-mono font-bold tracking-widest text-primary/80">
                {time}
            </div>
            <div className="text-xs md:text-sm text-neutral-400 mt-2 uppercase tracking-widest">
                Local Time
            </div>
        </div>
    );
};

// --- Globe Component (Simplified CSS Animation) ---
const RotatingGlobe = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.1)_0%,transparent_70%)]" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-primary/20 flex items-center justify-center"
            >
                <Globe className="w-16 h-16 text-primary/40" />
                <div className="absolute inset-0 rounded-full border-t border-primary/40 rotate-45" />
                <div className="absolute inset-2 rounded-full border-b border-primary/20 -rotate-12" />
            </motion.div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-neutral-400">Kerala, India</span>
            </div>
        </div>
    );
};

export const ServicesBento = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden" id="services">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
                        Services <span className="text-primary italic">&</span> <br />
                        Solutions
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">

                    {/* 1. Graphic Designing (Large Box) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-8 flex flex-col justify-between hover:border-primary/50 transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Palette className="w-12 h-12 text-primary mb-4" />
                        <div>
                            <h3 className="text-3xl font-display font-bold text-white mb-2">Graphic Designing</h3>
                            <p className="text-neutral-400 max-w-sm">Brand Identity, Visual Systems, Marketing Assets, and Digital Art Direction that stands out.</p>
                        </div>

                        {/* Abstract Decor */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    </motion.div>

                    {/* 2. Computer Icon Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-3xl border border-white/10 bg-neutral-900/50 flex items-center justify-center p-8 group hover:bg-neutral-900 hover:border-primary/50 transition-all"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Monitor className="w-24 h-24 text-neutral-700 group-hover:text-primary transition-colors duration-500 stroke-1" />
                        </div>
                        <div className="absolute inset-0 border border-primary/20 rounded-3xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                    </motion.div>

                    {/* 3. Date & Time */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-3xl border border-white/10 bg-neutral-900/50 p-6 flex items-center justify-center relative overflow-hidden"
                    >
                        <LiveClock />
                    </motion.div>

                    {/* 4. Frontend Development (Large Box) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-8 flex flex-col justify-between hover:border-primary/50 transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Monitor className="w-12 h-12 text-primary mb-4" />
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2">Frontend Dev</h3>
                            <p className="text-neutral-400 text-sm">Responsive, interactive, and performant web applications using modern tech stacks.</p>
                        </div>
                    </motion.div>

                    {/* 5. Location / Globe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative rounded-3xl border border-white/10 bg-neutral-900/50 overflow-hidden"
                    >
                        <RotatingGlobe />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

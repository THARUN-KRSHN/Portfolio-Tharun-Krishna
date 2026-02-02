"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/portfolio";

interface BentoGridProps {
    projects: Project[];
}

export const BentoGrid = ({ projects }: BentoGridProps) => {
    // Take top 5 projects for the bento grid
    const bentoItems = projects.slice(0, 5);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-6 h-[120vh] md:h-[80vh]">
            {/* 1. Large Feature (Top Left) */}
            {bentoItems[0] && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group"
                >
                    <img src={bentoItems[0].thumbnail} alt={bentoItems[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                        <h4 className="text-white text-2xl font-bold">{bentoItems[0].title}</h4>
                    </div>
                </motion.div>
            )}

            {/* 2. Vertical Strip (Top Right) */}
            {bentoItems[1] && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="md:col-span-1 md:row-span-3 relative rounded-2xl overflow-hidden group"
                >
                    <img src={bentoItems[1].thumbnail} alt={bentoItems[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                        <h4 className="text-white text-lg font-bold">{bentoItems[1].title}</h4>
                    </div>
                </motion.div>
            )}

            {/* 3. Square (Middle Rightish) */}
            {bentoItems[2] && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group"
                >
                    <img src={bentoItems[2].thumbnail} alt={bentoItems[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </motion.div>
            )}

            {/* 4. Wide Horizontal (Bottom) */}
            {bentoItems[3] && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden group bg-zinc-100"
                >
                    <div className="w-full h-full grid grid-cols-2">
                        <div className="p-6 flex flex-col justify-center">
                            <h4 className="text-xl font-bold mb-2 text-black">{bentoItems[3].title}</h4>
                            <p className="text-sm text-zinc-600">{bentoItems[3].tags.join(", ")}</p>
                        </div>
                        <div className="overflow-hidden h-full">
                            <img src={bentoItems[3].thumbnail} alt={bentoItems[3].title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* 5. Detail Shot */}
            {bentoItems[4] && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden group"
                >
                    {/* Zoomed in effect CSS */}
                    <img src={bentoItems[4].thumbnail} alt={bentoItems[4].title} className="w-full h-full object-cover scale-150 transition-transform duration-700 group-hover:scale-125" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-black">Detail</span>
                    </div>
                </motion.div>
            )}

        </div>
    );
};

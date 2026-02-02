"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    theme?: "dark" | "light" | "accent";
}

export const SectionHeader = ({ title, subtitle, theme = "dark" }: SectionHeaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section
            ref={containerRef}
            className={`relative h-[80vh] flex flex-col items-center justify-center overflow-hidden 
        ${theme === 'light' ? 'bg-secondary text-primary' :
                    theme === 'accent' ? 'bg-accent text-accent-foreground' :
                        'bg-background text-foreground'}`}
        >
            <motion.div
                style={{ scale, opacity }}
                className="text-center z-10"
            >
                <h2 className="text-[12vw] md:text-[15vw] leading-[0.8] font-bold font-display tracking-tighter uppercase">
                    {title}
                </h2>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-3xl mt-8 font-light tracking-wide opacity-80"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>
        </section>
    );
};

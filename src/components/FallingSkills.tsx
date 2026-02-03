"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- DATA ---
const categories = [
    {
        id: "tech",
        label: "Tech Stack",
        items: [
            "Python", "Java", "C", "C++", "JavaScript",
            "HTML", "CSS", "React", "Next.js", "Tailwind CSS",
            "Django", "QML", "Git", "GitHub", "Figma",
            "Adobe Photoshop", "Canva", "MS Office", "Framer",
            "Arduino UNO", "ESP32 (IoT)"
        ]
    },
    {
        id: "core",
        label: "Core Skills",
        items: [
            "Frontend Dev", "Designing", "Graphic Design",
            "UI/UX Design", "Full Stack", "Website Testing",
            "Version Control", "Documentation", "Prototyping",
            "Wireframing", "User Research", "Accessibility"
        ]
    },
    {
        id: "lead",
        label: "Leadership",
        items: [
            "Team Management", "Leadership", "Event Coord",
            "Operations", "Mentorship", "Public Speaking",
            "Agile Scrum", "Strategy", "Client Relations"
        ]
    }
];

// Random utility to pick colors and positions
const getRandomStyles = (index: number) => {
    const rotations = [-12, -6, -3, 3, 6, 12, 15, -15];
    const themes = [
        "bg-primary text-black border-primary", // Lime/Black
        "bg-black text-white border-white/20",  // Black/White
        "bg-white text-black border-black/10",  // White/Black
        "bg-black text-primary border-primary/50" // Black/Lime
    ];

    // Pseudo-random but deterministic for same index to avoid hydration mismatch if possible, 
    // but here we rely on standard random for the "fall" effect. 
    // We'll use index to seed slightly or just pure random.
    return {
        rotate: rotations[index % rotations.length] + (Math.random() * 10 - 5),
        theme: themes[index % themes.length],
        left: `${Math.random() * 80 + 5}%`, // 5% to 85% width
        bottom: `${Math.random() * 30 + 5}%`, // Stack at bottom 5-30%
        delay: Math.random() * 0.5
    };
};

export const FallingSkills = () => {
    const [activeTab, setActiveTab] = useState(categories[0].id);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-100px", once: true });

    // Store positions in state to keep them stable during the "sediment" phase
    const [itemsWithStyles, setItemsWithStyles] = useState<any[]>([]);

    useEffect(() => {
        // Regenerate items when tab changes
        const currentCategory = categories.find(c => c.id === activeTab);
        if (currentCategory) {
            const newItems = currentCategory.items.map((item, i) => ({
                text: item,
                ...getRandomStyles(i)
            }));
            setItemsWithStyles(newItems);
        }
    }, [activeTab]);

    return (
        <section ref={containerRef} className="py-20 bg-background overflow-hidden min-h-[800px] flex flex-col justify-end relative">

            {/* --- Card Reveal Animation --- */}
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full bg-[#111] dark:bg-[#0a0a0a] rounded-t-[3rem] min-h-[600px] border-t border-white/10 relative p-6 md:p-12 shadow-2xl z-10"
            >
                {/* --- Header & Tabs --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 sticky top-0 z-20">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white leading-tight">
                        Capabilities <span className="text-primary italic">&</span> <br />
                        Deployments
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${activeTab === cat.id
                                        ? "bg-primary text-black border-primary"
                                        : "bg-transparent text-muted-foreground border-white/10 hover:border-white/50"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Falling Area --- */}
                <div className="relative w-full h-[400px] md:h-[500px] bg-black/20 rounded-3xl overflow-hidden border border-white/5">
                    {/* Grid Background inside the "tank" */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {itemsWithStyles.map((item, idx) => (
                                <motion.div
                                    key={item.text + idx}
                                    initial={{ y: -500, x: 0, opacity: 0, rotate: 0 }}
                                    animate={{
                                        y: 0, // We position relative to bottom so y=0 is the sediment spot 
                                        opacity: 1,
                                        rotate: item.rotate
                                    }}
                                    transition={{
                                        type: "spring",
                                        damping: 12,
                                        stiffness: 100,
                                        delay: idx * 0.05, // Staggered rain
                                        duration: 0.8
                                    }}
                                    style={{
                                        position: "absolute",
                                        left: item.left,
                                        bottom: item.bottom,
                                    }}
                                    className={`px-4 py-3 rounded-xl border font-bold shadow-lg backdrop-blur-sm whitespace-nowrap text-sm md:text-base cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10 ${item.theme}`}
                                    drag
                                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                                >
                                    {item.text}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Floor reflection/glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                </div>

            </motion.div>
        </section>
    );
};

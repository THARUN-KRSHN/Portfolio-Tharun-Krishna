"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X } from "lucide-react";

export const Header = () => {
    // Nav Items (Contact moved to dedicated button)
    const navItems = [
        { label: "About", id: "about" },
        { label: "Work", id: "visual-narrative" },
        { label: "Logos", id: "featured-logos" },
        { label: "Services", id: "services" },
        { label: "Lab", id: "frontend-lab" },
    ];

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <span className="font-display font-black text-3xl tracking-tighter text-lime-400">
                    T
                </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12 bg-black/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                {navItems.map((item) => (
                    <div
                        key={item.label}
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => scrollToSection(item.id)}
                    >
                        <div className="flex items-center gap-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                animate={{
                                    opacity: hoveredItem === item.label ? 1 : 0,
                                    scale: hoveredItem === item.label ? 1 : 0,
                                    rotate: hoveredItem === item.label ? 0 : -45
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <Star className="w-3 h-3 text-lime-400 fill-lime-400" />
                            </motion.div>
                            <span className="font-mono text-sm uppercase tracking-widest text-white/80 group-hover:text-lime-400 transition-colors">
                                {item.label}
                            </span>
                        </div>
                    </div>
                ))}
            </nav>

            {/* Contact Button (Desktop) */}
            <div className="hidden md:flex">
                <button
                    onClick={() => scrollToSection("contact")}
                    className="px-6 py-2 rounded-full border border-lime-400 text-lime-400 font-mono uppercase tracking-widest text-sm hover:bg-lime-400 hover:text-black transition-all duration-300"
                >
                    Contact
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50 backdrop-blur-sm p-2 rounded-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="text-white w-8 h-8" /> : <Menu className="text-white w-8 h-8" />}
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl p-8 pt-32 flex flex-col gap-8 md:hidden z-40 overflow-y-auto"
                    >
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                onClick={() => scrollToSection(item.id)}
                                className="text-4xl font-display font-bold text-white uppercase tracking-tighter"
                            >
                                {item.label}
                            </div>
                        ))}
                        <div
                            onClick={() => scrollToSection("contact")}
                            className="text-4xl font-display font-bold text-lime-400 uppercase tracking-tighter mt-4"
                        >
                            Contact
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

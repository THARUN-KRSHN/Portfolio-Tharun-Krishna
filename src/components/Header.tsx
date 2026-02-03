"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X } from "lucide-react";

export const Header = () => {
    // Nav Items mapping to Component Names/IDs
    const navItems = [
        { label: "About", id: "about" },
        { label: "Work", id: "visual-narrative" }, // VisualNarrative section
        { label: "Logos", id: "featured-logos" }, // FeaturedLogos orbit
        { label: "Services", id: "services" },
        { label: "Lab", id: "frontend-lab" }
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
                <span className="font-display font-black text-3xl tracking-tighter text-primary">
                    T
                </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
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
                                <Star className="w-3 h-3 text-primary fill-primary" />
                            </motion.div>
                            <span className="font-mono text-sm uppercase tracking-widest text-white/80 group-hover:text-primary transition-colors">
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
                    className="flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-primary">
                        Contact
                    </span>
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 right-0 bg-black/95 backdrop-blur-xl p-8 pt-24 border-b border-white/10 flex flex-col gap-6 md:hidden"
                    >
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                onClick={() => scrollToSection(item.id)}
                                className="text-2xl font-display font-bold text-white uppercase"
                            >
                                {item.label}
                            </div>
                        ))}
                        <div
                            onClick={() => scrollToSection("contact")}
                            className="text-2xl font-display font-bold text-primary uppercase mt-4"
                        >
                            Contact
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

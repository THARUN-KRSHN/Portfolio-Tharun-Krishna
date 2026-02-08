"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time, ensuring minimal display time for the animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200); // 2.2s duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="relative">
                        <motion.h1
                            className="text-4xl md:text-6xl font-display font-medium relative z-10"
                            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                        >
                            Hello, it&apos;s <span className="text-primary italic">Tharun</span> here...
                        </motion.h1>

                        {/* Typing / Slanting Effect for Name */}
                        <motion.div
                            className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>

                    <motion.div
                        className="mt-8 h-1 w-48 bg-neutral-800 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

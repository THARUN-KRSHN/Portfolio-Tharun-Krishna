"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import { getProjectsByCategory } from "@/data/portfolio";

export const FeaturedLogos = () => {
    // We duplicate the logos array to simulate a "loop" by padding the start and end.
    // In a real seamless infinite loop, we'd need more complex index math, but for this 'orbit',
    // a simple repetition or just ensuring enough items exist works for the 'orbit' feel.
    // However, the user asked for "loop current logos".
    // For a physical drag orbit, "looping" means teleporting rotation.
    // We will stick to the array map for now but ensure the initial view is centered.
    const rawLogos = getProjectsByCategory("logo");
    // Ensure we have enough to fill the arc visually.
    const logos = [...rawLogos, ...rawLogos];

    const containerRef = useRef<HTMLDivElement>(null);
    const orbitControls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);

    // Orbit State
    const rotation = useMotionValue(0);

    // Initial Animation: Rotate to show center
    // We want 3 logos visible: Center (Index X), Left (X-1), Right (X+1)
    // If we map them on a circle, we just need to ensure the spacing fits 3 comfortably in the view cone.

    // --- Config ---
    const radius = 1200;
    const angleStep = 25; // Adjusted for tight 3-item clustering
    const centerIndex = Math.floor(logos.length / 2);
    // Initial rotation should center the 'centerIndex'
    const initialRotation = -1 * (centerIndex * angleStep);

    useEffect(() => {
        // Set initial state without animation first if needed, or animate TO it.
        // We set it to a bit off-center then easing in.
        const startRot = initialRotation + 45;

        orbitControls.start({
            rotate: [startRot, initialRotation],
            transition: { duration: 2, ease: "easeOut" }
        });

        // Update motion value to match
        rotation.set(initialRotation);
    }, [orbitControls, initialRotation, rotation]); // Depend on calc values

    // Drag Logic
    const onDrag = (event: any, info: PanInfo) => {
        const newRotation = rotation.get() + info.delta.x * 0.1;
        rotation.set(newRotation);
    };

    return (
        <section ref={containerRef} className="relative h-screen bg-background overflow-hidden flex flex-col pt-32">

            {/* --- 1. Top Title (Left Aligned) --- */}
            <div className="z-20 px-6 md:px-20 mb-20 w-full flex flex-col items-start pointer-events-none">
                <div className="overflow-hidden">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className="text-6xl md:text-9xl font-black font-display uppercase tracking-[-0.05em] leading-none"
                    >
                        Logo <span className="text-primary italic">Folio</span>
                    </motion.h2>
                </div>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-2 w-32 bg-primary mt-4 origin-left"
                />
            </div>

            {/* --- 2. Orbit Container --- */}
            <div
                className="absolute top-[40%] left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing perspective-1000 z-10"
                style={{ width: radius * 2, height: radius * 2 }}
            >
                {/* Visible "Neon Lime" Orbit Line */}
                <div className="absolute inset-0 rounded-full border border-primary/20 pointer-events-none" />

                <motion.div
                    className="w-full h-full rounded-full relative flex justify-center items-start"
                    style={{ rotate: rotation, x: 0 }} // Force x to 0
                    animate={orbitControls}
                    drag="x"
                    dragElastic={0} // No rubber banding
                    dragConstraints={{ left: 0, right: 0 }} // Prevent physical movement
                    dragMomentum={false} // Handle momentum via rotation manually if needed, or just strict 1:1
                    onDrag={onDrag}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {logos.map((logo, index) => {
                        // Distribute logos via angle
                        const angle = index * angleStep;

                        return (
                            <OrbitItem
                                key={`${logo.id}-${index}`}
                                project={logo}
                                angle={angle}
                                radius={radius}
                                parentRotation={rotation}
                            />
                        );
                    })}
                </motion.div>
            </div>

            {/* Side Masks to Hide "Most Left and Right" if user rotates too far, creating focused view */}
            <div className="absolute inset-y-0 left-0 w-[10vw] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[10vw] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            {/* Bottom Fade Mask */}
            <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

        </section>
    );
};

const OrbitItem = ({ project, angle, radius, parentRotation }: { project: any, angle: number, radius: number, parentRotation: any }) => {
    // Counter rotation logic
    const currentRotation = useTransform(parentRotation, (r: number) => -1 * (r + angle));

    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0 flex flex-col items-center justify-start origin-top"
            style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px)`
            }}
        >
            <motion.div
                style={{ rotate: currentRotation }}
                className="group relative flex flex-col items-center"
            >
                {/* Logo Container */}
                <div className="w-[300px] h-[300px] flex items-center justify-center p-8 transition-all duration-500 overflow-visible group-hover:scale-105">
                    <div className="relative w-full h-full p-6 bg-transparent rounded-3xl group-hover:bg-white/5 transition-colors duration-500">
                        <div className="relative w-full h-full">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 150px, 300px"
                                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Text Reveal Below Center Logo */}
                {/* 
                   Logic: Reveal only if hovered OR if it's the center item? 
                   User said: "on hovering the center logo a heading lime colour... reveal from bottom"
                */}
                <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-4 text-center overflow-hidden w-[300px] pointer-events-none group-hover:pointer-events-auto">
                    <motion.div
                        initial={{ y: "110%", opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-3xl font-bold font-display text-primary">{project.title}</h3>
                        <div className="h-0.5 w-12 bg-primary/50 my-2" />
                        <p className="text-sm text-zinc-400 max-w-[250px] leading-tight">
                            {project.description || "Crafting bold identities for the digital age."}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

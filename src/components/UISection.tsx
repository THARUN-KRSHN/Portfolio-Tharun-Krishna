"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { getProjectsByCategory } from "@/data/portfolio";

const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

    useEffect(() => {
        if (isInView) {
            videoRef.current?.play().catch(() => { });
        } else {
            videoRef.current?.pause();
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className="w-full h-full bg-black">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                controls={false}
            />
        </div>
    );
};

export const UISection = () => {
    const projects = getProjectsByCategory("dev");

    if (projects.length === 0) return null;

    return (
        <section className="py-24 px-6 md:px-20 bg-background text-foreground overflow-hidden">
            <div className="mb-16">
                <h3 className="text-4xl md:text-5xl font-display mb-4">Selected Projects</h3>
                <p className="text-muted-foreground max-w-xl">
                    High-impact frontend applications, design systems, and technical solutions.
                </p>
            </div>

            {/* Video Showcase */}
            <div className="flex justify-center mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl bg-secondary border border-border"
                >
                    {/* Browser Header for Video */}
                    <div className="h-10 bg-secondary/90 backdrop-blur border-b border-border flex items-center px-4 gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                        </div>
                        <div className="mx-auto px-4 py-1 bg-muted rounded-md text-[10px] text-muted-foreground font-mono">
                            demo.mp4
                        </div>
                    </div>

                    <VideoPlayer src="/images/ui_demo.mp4" />
                </motion.div>
            </div>

            {/* Remaining Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-xl bg-secondary border border-border">
                            <div className={`aspect-[16/9] w-full overflow-hidden relative bg-secondary`}>
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-1">{project.title}</h4>
                                <p className="text-sm text-muted-foreground">{project.tags.join(" • ")}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

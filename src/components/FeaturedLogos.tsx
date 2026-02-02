"use client";
import React from "react";
import { motion } from "framer-motion";
import { getProjectsByCategory, ProjectCategory } from "@/data/portfolio";

interface FeaturedLogosProps {
    category?: ProjectCategory;
}

export const FeaturedLogos = ({ category = "logo" }: FeaturedLogosProps) => {
    const projects = getProjectsByCategory(category);

    return (
        <section className="py-24 px-6 md:px-20 bg-background">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-20">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div className={`aspect-square w-full rounded-2xl overflow-hidden relative ${project.color} bg-opacity-5 p-10 md:p-12 transition-colors duration-500 group-hover:bg-opacity-10`}>
                            {/* Logo Image */}
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-6xl font-display font-bold opacity-20 uppercase">
                                        {project.title.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <h3 className="text-lg font-medium mb-1 opacity-80 group-hover:opacity-100 transition-opacity">{project.title}</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">{project.tags[0]}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

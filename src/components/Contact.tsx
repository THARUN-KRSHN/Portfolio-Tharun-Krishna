"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";

export const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 md:px-20 bg-background text-foreground relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[0.9]"
                >
                    Let’s Build <br /> Something Visual
                </motion.h2>

                <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto">
                    Have a project in mind? Looking for a design partner who cares about the details? Let's chat.
                </p>

                <form
                    className="max-w-xl mx-auto space-y-4 text-left"
                    action="mailto:tharunkrishnachoolikattil@gmail.com"
                    method="post"
                    encType="text/plain"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            className="w-full bg-secondary hover:bg-muted transition-colors border-none rounded-2xl px-6 py-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full bg-secondary hover:bg-muted transition-colors border-none rounded-2xl px-6 py-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell me about your project..."
                        required
                        className="w-full bg-secondary hover:bg-muted transition-colors border-none rounded-2xl px-6 py-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    <Button size="lg" className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
                        Send Message
                    </Button>
                </form>

                <div className="mt-20 flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border">
                    <div className="flex gap-8 text-lg font-medium">
                        <a href="www.linkedin.com/in/tharun-krishna-c-u-872a4b325" className="hover:underline">LinkedIn</a>
                        <a href="https://github.com/THARUN-KRSHN" className="hover:underline">GitHub</a>
                        <a href="https://www.instagram.com/tharuneyyh.in/" className="hover:underline">Instagram</a>
                    </div>
                    <div className="mt-8 md:mt-0 text-sm opacity-50">
                        &copy; 2026 Tharun Krishna. All rights reserved.
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { submitToGoogleSheet } from "@/lib/submitToSheet";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            await submitToGoogleSheet({
                name: formData.name,
                email: formData.email,
                projectDetails: formData.message,
            });
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again or email me directly.");
        }
    };

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

                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 text-green-500 p-8 rounded-2xl border border-green-500/20"
                    >
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p>Thanks for reaching out. I'll get back to you soon.</p>
                        <Button
                            className="mt-6 bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10"
                            onClick={() => setStatus("idle")}
                        >
                            Send another message
                        </Button>
                    </motion.div>
                ) : (
                    <form
                        className="max-w-xl mx-auto space-y-4 text-left"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full bg-secondary hover:bg-muted transition-colors border-none rounded-2xl px-6 py-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="w-full bg-secondary hover:bg-muted transition-colors border-none rounded-2xl px-6 py-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell me about your project..."
                            required
                            className="w-full bg-secondary hover:bg-muted transition-colors border-none rounded-2xl px-6 py-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        {status === "error" && (
                            <div className="text-red-500 text-sm text-center">
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            disabled={status === "loading"}
                            className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                )}

                <div className="mt-20 flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border">
                    <div className="flex gap-8 text-lg font-medium">
                        <a href="https://www.linkedin.com/in/tharun-krishna-c-u-872a4b325" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                        <a href="https://github.com/THARUN-KRSHN" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                        <a href="https://www.instagram.com/tharuneyyh.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                    </div>
                    <div className="mt-8 md:mt-0 text-sm opacity-50">
                        &copy; 2026 Tharun Krishna. All rights reserved.
                    </div>
                </div>
            </div>
        </section>
    );
};

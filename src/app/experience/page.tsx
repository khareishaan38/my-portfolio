"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { experiences } from "@/config/experience-config";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

export default function ExperiencePage() {
    // Each card has its own independent expanded state
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const toggleCard = (index: number) => {
        setExpandedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pt-24 px-6 pb-16">
                <div className="mx-auto max-w-6xl">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                            <span className="text-gradient">Experience</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            2.5+ years of building consumer-facing products across Fintech and BFSI sectors.
                        </p>
                    </motion.div>

                    {/* Experience Cards - using items-start to prevent cards from stretching */}
                    <div className="grid gap-6 md:grid-cols-3 items-start">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.02,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                className="cursor-pointer"
                            >
                                <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/20">
                                    {/* Logo */}
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 overflow-hidden">
                                        <Image
                                            src={exp.logo}
                                            alt={exp.company}
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Company & Role */}
                                    <h3 className="mb-1 text-xl font-bold text-white">{exp.company}</h3>
                                    <p className="mb-1 text-violet-400 font-medium">{exp.role}</p>
                                    <p className="mb-4 text-sm text-zinc-500">{exp.duration}</p>

                                    {/* Description */}
                                    <p className="mb-4 text-sm text-zinc-400 leading-relaxed">
                                        {exp.description}
                                    </p>

                                    {/* Projects Toggle */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCard(index);
                                        }}
                                        className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-violet-400 transition-colors"
                                    >
                                        <Briefcase className="h-4 w-4" />
                                        <span>Key Projects ({exp.projects.length})</span>
                                        <motion.div
                                            animate={{ rotate: expandedCards.has(index) ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </motion.div>
                                    </button>

                                    {/* Collapsible Projects */}
                                    <AnimatePresence>
                                        {expandedCards.has(index) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                                                    {exp.projects.map((project, i) => (
                                                        <motion.div
                                                            key={project.title}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="rounded-lg bg-white/5 p-3"
                                                        >
                                                            <h4 className="mb-1 text-sm font-semibold text-white">
                                                                {project.title}
                                                            </h4>
                                                            <p className="text-xs text-zinc-400">
                                                                {project.description}
                                                            </p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

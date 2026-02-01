"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, Medal, Award } from "lucide-react";
import { Navbar } from "@/components/navbar";

const education = [
    {
        degree: "MBA in Marketing",
        institution: "SCMHRD Pune",
        duration: "2021 - 2023",
        description: "Youngest Top 20 B-school in India",
        achievements: [
            {
                icon: Trophy,
                title: "Top 100 B-school Leaders in India",
                description: "Selected from 32,700+ nominations across all campuses",
            },
            {
                icon: Medal,
                title: "#6 in Case Competition Rankings",
                description: "Ranked 6th out of 400+ students at SCMHRD",
            },
            {
                icon: Award,
                title: "#1 in Marketing Batch",
                description: "Top performer among 108 marketing specialization students",
            },
        ],
    },
    {
        degree: "B.E. in Industrial & Production Engineering",
        institution: "Jabalpur Engineering College",
        duration: "2015 - 2019",
        description: "Formerly Government Engineering College",
        achievements: [
            {
                icon: Medal,
                title: "Gold Medalist",
                description: "Batch topper with highest CGPA",
            },
            {
                icon: Trophy,
                title: "GATE 2019 AIR 53",
                description: "All India Rank 53 in GATE 2019 examination",
            },
        ],
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

export default function EducationPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pt-24 px-6 pb-16">
                <div className="mx-auto max-w-4xl">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                            <span className="text-gradient">Education</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            Academic journey marked by consistent excellence and recognition.
                        </p>
                    </motion.div>

                    {/* Education Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-purple-500 to-transparent hidden md:block" />

                        <div className="space-y-12">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={edu.institution}
                                    variants={fadeInUp}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="relative"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-6 top-8 hidden h-4 w-4 rounded-full border-4 border-violet-500 bg-zinc-950 md:block" />

                                    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 md:ml-16">
                                        {/* Header */}
                                        <div className="mb-6 flex items-start gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30">
                                                <GraduationCap className="h-7 w-7 text-violet-400" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white md:text-2xl">
                                                    {edu.degree}
                                                </h2>
                                                <p className="text-violet-400 font-medium">{edu.institution}</p>
                                                <p className="text-sm text-zinc-500">
                                                    {edu.duration} • {edu.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {edu.achievements.map((achievement, i) => (
                                                <motion.div
                                                    key={achievement.title}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                    className="rounded-xl bg-white/5 p-4 border border-white/5 hover:border-violet-500/30 transition-colors"
                                                >
                                                    <achievement.icon className="mb-2 h-5 w-5 text-amber-400" />
                                                    <h3 className="mb-1 text-sm font-semibold text-white">
                                                        {achievement.title}
                                                    </h3>
                                                    <p className="text-xs text-zinc-400">
                                                        {achievement.description}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

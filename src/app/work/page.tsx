"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/config/projects-config";
import { Navbar } from "@/components/navbar";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

export default function WorkPage() {
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
                            <span className="text-gradient">My Work</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            Projects I&apos;ve built to solve real problems and push the boundaries of AI-powered products.
                        </p>
                    </motion.div>

                    {/* Projects */}
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial="initial"
                            animate="animate"
                            variants={{
                                initial: { opacity: 0 },
                                animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
                            }}
                            className="mb-16"
                        >
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
                                {/* Video Section */}
                                <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-800/50 border border-white/10 group">
                                        {project.videoUrl ? (
                                            <iframe
                                                src={project.videoUrl}
                                                title={project.title}
                                                className="h-full w-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                                                <div className="text-center">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer"
                                                    >
                                                        <Play className="h-8 w-8 text-white ml-1" />
                                                    </motion.div>
                                                    <p className="text-sm text-zinc-400">Video coming soon</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Content Section */}
                                <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
                                    <div>
                                        <h2 className="mb-2 text-3xl font-bold text-white">{project.title}</h2>
                                        <p className="text-lg text-violet-400">{project.tagline}</p>
                                    </div>

                                    <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="bg-white/5 text-zinc-300 border-white/10"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Metrics */}
                                    {project.metrics && (
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Impact</h3>
                                            <ul className="space-y-1">
                                                {project.metrics.map((metric, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-zinc-300">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                                        {metric}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* CTAs */}
                                    <div className="flex gap-3 pt-2">
                                        {project.liveUrl && (
                                            <Button className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                                                <ExternalLink className="h-4 w-4" />
                                                View Live
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                                                <Github className="h-4 w-4" />
                                                Source Code
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </>
    );
}

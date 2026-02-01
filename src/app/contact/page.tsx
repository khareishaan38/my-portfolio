"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

const contactLinks = [
    {
        icon: Mail,
        label: "Email",
        value: "khareishaan97@gmail.com",
        href: "mailto:khareishaan97@gmail.com",
        color: "from-red-500 to-orange-500",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/ishaan-khare",
        href: "https://www.linkedin.com/in/ishaan-khare/",
        color: "from-blue-500 to-blue-600",
    },
    {
        icon: Github,
        label: "GitHub",
        value: "github.com/khareishaan38",
        href: "https://github.com/khareishaan38",
        color: "from-zinc-500 to-zinc-600",
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pt-24 px-6 pb-16 flex items-center">
                <div className="mx-auto max-w-4xl w-full">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            <span className="text-gradient">Let&apos;s Connect</span>
                        </h1>
                        <p className="mx-auto max-w-xl text-lg text-zinc-400">
                            Always excited to discuss product ideas, AI innovations, or potential collaborations.
                        </p>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-10 flex items-center justify-center gap-2 text-zinc-500"
                    >
                        <MapPin className="h-4 w-4" />
                        <span>Based in India • Open to remote opportunities</span>
                    </motion.div>

                    {/* Contact Cards */}
                    <div className="grid gap-4 md:grid-cols-3 mb-12">
                        {contactLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.label !== "Email" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="group glass rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                            >
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${link.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <link.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-1 text-lg font-semibold text-white">{link.label}</h3>
                                <p className="text-sm text-zinc-400 group-hover:text-violet-400 transition-colors">
                                    {link.value}
                                </p>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center"
                    >
                        <Button
                            size="lg"
                            className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 px-8"
                            asChild
                        >
                            <a href="mailto:khareishaan97@gmail.com">
                                <Send className="h-4 w-4" />
                                Send me an email
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </main>
        </>
    );
}

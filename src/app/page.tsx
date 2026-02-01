"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-[20%] h-[80vh] w-[80vh] rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] right-[10%] h-[60vh] w-[60vh] rounded-full bg-gradient-to-l from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute top-[40%] right-[30%] h-[40vh] w-[40vh] rounded-full bg-gradient-to-t from-zinc-500/5 to-transparent blur-3xl" />
      </div>

      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Status badge */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm text-zinc-400">Available for work</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient">Hi, I&apos;m Ishaan</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-xl text-zinc-400 md:text-2xl"
          >
            AI Product Manager & UI/UX Enthusiast
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-12 max-w-2xl text-base text-zinc-500 md:text-lg"
          >
            I work on scaled consumer facing products, optimising for funnel conversion and retention metrics. I also build AI powered products as side projects, trying to solve one user problem at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-white text-black hover:bg-zinc-100"
            >
              <Link href="/work">
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass border-white/10 hover:bg-white/5"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com/khareishaan38", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/ishaan-khare/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:khareishaan97@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full glass transition-all hover:bg-white/5"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

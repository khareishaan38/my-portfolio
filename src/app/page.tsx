"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <motion.a
            href="/"
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-gradient">IK</span>
          </motion.a>

          <div className="hidden items-center gap-8 md:flex">
            {["About", "Work", "Experience", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="outline"
              className="glass border-white/10 text-sm hover:bg-white/5"
            >
              Resume
            </Button>
          </motion.div>
        </div>
      </motion.nav>

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
              size="lg"
              className="group relative overflow-hidden bg-white text-black hover:bg-zinc-100"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-white/10 hover:bg-white/5"
            >
              Get in Touch
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-zinc-500">Scroll</span>
            <ArrowDown className="h-4 w-4 text-zinc-500" />
          </motion.div>
        </motion.div>
      </main>

      {/* About Section Placeholder */}
      <section id="about" className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm uppercase tracking-widest text-zinc-500">About</h2>
            <h3 className="mb-8 text-4xl font-bold md:text-5xl">
              <span className="text-gradient">Crafting digital experiences</span>
            </h3>
            <p className="max-w-3xl text-lg text-zinc-400 leading-relaxed">
              With a passion for clean code and beautiful design, I bring ideas to life
              through thoughtful development. My approach combines technical excellence
              with creative problem-solving to build products that truly resonate with users.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

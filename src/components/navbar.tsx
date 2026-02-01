"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "About", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Experience", href: "/experience" },
    { label: "Education", href: "/education" },
    { label: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        <span className="text-gradient">IK</span>
                    </Link>
                </motion.div>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item, i) => {
                        const isActive = pathname === item.href;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.4 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`relative text-sm transition-colors ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        className="glass border-white/10 text-sm hover:bg-white/5"
                        asChild
                    >
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                            Resume
                        </a>
                    </Button>
                </motion.div>
            </div>
        </motion.nav>
    );
}

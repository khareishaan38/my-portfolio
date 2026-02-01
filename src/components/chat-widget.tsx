"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96"
                    >
                        <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                            <MessageCircle className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">Ask me anything about Ishaan!</h3>
                                        <p className="text-xs text-zinc-400">AI-powered assistant</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="h-4 w-4 text-zinc-400" />
                                </button>
                            </div>

                            {/* Chat Body - Placeholder */}
                            <div className="h-72 flex flex-col items-center justify-center px-6 py-8">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                                    <MessageCircle className="h-8 w-8 text-violet-400" />
                                </div>
                                <h4 className="text-lg font-medium text-white mb-2">Coming Soon</h4>
                                <p className="text-sm text-zinc-400 text-center leading-relaxed">
                                    An AI-powered chatbot to answer questions about my experience, projects, and skills.
                                </p>
                            </div>

                            {/* Input - Disabled Placeholder */}
                            <div className="px-4 py-3 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ask a question..."
                                        disabled
                                        className="flex-1 bg-white/5 rounded-lg px-4 py-2.5 text-sm text-zinc-400 placeholder:text-zinc-500 border border-white/10 cursor-not-allowed"
                                    />
                                    <button
                                        disabled
                                        className="p-2.5 rounded-lg bg-violet-500/50 cursor-not-allowed"
                                        aria-label="Send message"
                                    >
                                        <Send className="h-4 w-4 text-white/50" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button with Label */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.3, type: "spring" }}
                className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
            >
                {/* Always visible label */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25"
                        >
                            <span className="text-sm font-medium text-white whitespace-nowrap">
                                Ask me anything about Ishaan!
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Chat Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group relative"
                    aria-label="Open chat"
                >
                    {/* Animated pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-20" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                    {/* Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/30 border border-white/20"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <X className="h-7 w-7 text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="chat"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <MessageCircle className="h-7 w-7 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </button>
            </motion.div>
        </>
    );
}

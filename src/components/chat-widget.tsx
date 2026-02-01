"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { quickReplies, chatConfig } from "@/config/chat-config";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: chatConfig.welcomeMessage },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: text.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Add placeholder for assistant response
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error("No response stream");
            }

            let fullContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullContent += chunk;

                // Update the last message with streaming content
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: "assistant",
                        content: fullContent,
                    };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleQuickReply = (text: string) => {
        sendMessage(text);
    };

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
                        <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                            <MessageCircle className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">{chatConfig.headerTitle}</h3>
                                        <p className="text-xs text-zinc-400">{chatConfig.headerSubtitle}</p>
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

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${message.role === "user"
                                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                                                    : "bg-white/10 text-zinc-100"
                                                }`}
                                        >
                                            {message.role === "assistant" ? (
                                                <div className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                                                    <ReactMarkdown>{message.content || "..."}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="text-sm">{message.content}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && messages[messages.length - 1]?.content === "" && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 rounded-2xl px-4 py-2.5">
                                            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Replies */}
                            {messages.length <= 2 && !isLoading && (
                                <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                                    {quickReplies.map((reply, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickReply(reply)}
                                            className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white transition-colors"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/10 shrink-0">
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={chatConfig.inputPlaceholder}
                                        disabled={isLoading}
                                        className="flex-1 bg-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 border border-white/10 focus:border-violet-500/50 focus:outline-none transition-colors disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="p-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        aria-label="Send message"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 text-white animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4 text-white" />
                                        )}
                                    </button>
                                </div>
                            </form>
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

"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

const pageOrder = ["/", "/work", "/experience", "/education", "/contact"];

export function ScrollIndicator() {
    const pathname = usePathname();
    const router = useRouter();

    const currentIndex = pageOrder.indexOf(pathname);
    const isLastPage = currentIndex === pageOrder.length - 1;
    const nextPage = isLastPage ? "/" : pageOrder[currentIndex + 1];
    const label = isLastPage ? "Back to top" : "Next";

    const handleClick = () => {
        if (isLastPage) {
            // Scroll to top then navigate
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => router.push("/"), 300);
        } else {
            router.push(nextPage);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
            <motion.button
                onClick={handleClick}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                aria-label={isLastPage ? "Scroll to top" : "Go to next page"}
            >
                <span className="text-xs text-zinc-500 group-hover:text-white transition-colors">
                    {label}
                </span>
                {isLastPage ? (
                    <ArrowUp className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                ) : (
                    <ArrowDown className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                )}
            </motion.button>
        </motion.div>
    );
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const pageOrder = ["/", "/work", "/experience", "/education", "/contact"];

export function usePageScroll() {
    const pathname = usePathname();
    const router = useRouter();
    const isNavigating = useRef(false);
    const lastScrollTime = useRef(0);

    const navigateToPage = useCallback(
        (direction: "next" | "prev") => {
            const currentIndex = pageOrder.indexOf(pathname);
            if (currentIndex === -1) return;

            const now = Date.now();
            // Debounce: prevent rapid navigation (800ms cooldown)
            if (now - lastScrollTime.current < 800) return;
            if (isNavigating.current) return;

            let targetIndex: number;
            if (direction === "next") {
                targetIndex = Math.min(currentIndex + 1, pageOrder.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }

            if (targetIndex !== currentIndex) {
                isNavigating.current = true;
                lastScrollTime.current = now;
                router.push(pageOrder[targetIndex]);

                // Reset navigation lock after transition
                setTimeout(() => {
                    isNavigating.current = false;
                }, 600);
            }
        },
        [pathname, router]
    );

    useEffect(() => {
        let accumulatedDelta = 0;
        const scrollThreshold = 50; // Pixels of scroll before triggering navigation

        const handleWheel = (e: WheelEvent) => {
            // Check if we're at the top or bottom of the page content
            const atTop = window.scrollY <= 0;
            const atBottom =
                window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

            // Only capture scroll for page navigation when at boundaries
            if (e.deltaY > 0 && atBottom) {
                // Scrolling down at bottom
                accumulatedDelta += e.deltaY;
                if (accumulatedDelta > scrollThreshold) {
                    navigateToPage("next");
                    accumulatedDelta = 0;
                }
                e.preventDefault();
            } else if (e.deltaY < 0 && atTop) {
                // Scrolling up at top
                accumulatedDelta += Math.abs(e.deltaY);
                if (accumulatedDelta > scrollThreshold) {
                    navigateToPage("prev");
                    accumulatedDelta = 0;
                }
                e.preventDefault();
            } else {
                // Reset accumulated delta if scroll direction changes or not at boundary
                accumulatedDelta = 0;
            }
        };

        // Handle trackpad/touch gestures
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            const atTop = window.scrollY <= 0;
            const atBottom =
                window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

            if (Math.abs(deltaY) > 80) {
                if (deltaY > 0 && atBottom) {
                    navigateToPage("next");
                } else if (deltaY < 0 && atTop) {
                    navigateToPage("prev");
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [navigateToPage]);

    return { navigateToPage };
}

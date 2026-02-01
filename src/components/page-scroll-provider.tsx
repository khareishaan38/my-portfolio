"use client";

import { usePageScroll } from "@/hooks/use-page-scroll";

export function PageScrollProvider({ children }: { children: React.ReactNode }) {
    usePageScroll();
    return <>{children}</>;
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    techStack: string[];
    videoUrl?: string; // YouTube, Loom, or local path
    videoPlaceholder?: string; // Placeholder image if no video
    liveUrl?: string;
    githubUrl?: string;
    metrics?: string[];
}

export const projects: Project[] = [
    {
        id: "pmsense",
        title: "PMSense",
        tagline: "AI-Powered RCA Simulator for Product Managers",
        description: `Building the future of PM upskilling by moving away from static theory toward high-stakes, real-time simulation.

I built an AI powered RCA simulator where users are thrown into real life like instances and they have to debug/go to the depth of the issue to practice. They can chat with the AI agent as a coworker and at the end get evaluated on their strengths and weaknesses.

Current library includes 5 high-fidelity scenarios: iOS Checkout drops, Organic Search collapse, Notification/DAU divergence, Onboarding Funnel decline, and Fintech Login failures.`,
        techStack: ["Antigravity", "Gemini AI APIs", "SupaBase", "Vercel", "Mermaid.js"],
        // videoUrl: "https://youtube.com/...", // Add your video URL here
        videoPlaceholder: "/images/pmsense-preview.png",
        metrics: [
            "20+ users in 2 days after LinkedIn post",
            "5 high-fidelity RCA scenarios",
            "End-to-end AI-powered evaluation",
        ],
    },
];

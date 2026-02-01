export interface Experience {
    company: string;
    logo: string;
    role: string;
    duration: string;
    description: string;
    projects: {
        title: string;
        description: string;
    }[];
}

export const experiences: Experience[] = [
    {
        company: "BharatPe",
        logo: "/logos/bharatpe.svg",
        role: "Associate Product Manager",
        duration: "June 2025 - Present",
        description:
            "Completely own the Business Loan journey end to end on the BharatPe for Business iOS and Android App. Grew disbursals from 3.2cr to 15+cr a month.",
        projects: [
            {
                title: "Business Loan Journey Optimization",
                description:
                    "Optimised funnel for reduced drop offs at key stages - achieved 15% drop reduction in Account Aggregator step.",
            },
            {
                title: "Loan Marketplace",
                description:
                    "Building the Loan Marketplace module from scratch to offer multiple lending options to merchants.",
            },
            {
                title: "Credit Line (Supply Chain Finance)",
                description:
                    "Developing a new Credit Line product for supply chain finance from ground up.",
            },
        ],
    },
    {
        company: "Kissht",
        logo: "/logos/kissht.svg",
        role: "Associate Product Manager",
        duration: "June 2024 - May 2025",
        description:
            "Led the Payments pod, responsible for eNACH and UPI Autopay modules on the personal loan journey on Kissht and PaywithRing app.",
        projects: [
            {
                title: "eNACH Integration",
                description:
                    "Streamlined the eNACH mandate registration flow improving success rates.",
            },
            {
                title: "UPI Autopay Module",
                description:
                    "Built and optimized UPI Autopay for recurring loan payments across Kissht and PaywithRing.",
            },
        ],
    },
    {
        company: "YES BANK",
        logo: "/logos/yesbank.svg",
        role: "Product Manager",
        duration: "May 2023 - June 2024",
        description:
            "Led Fintech integration projects, working on co-origination journeys and deep SDK/API integration with fintech partners.",
        projects: [
            {
                title: "Fintech Co-origination Platform",
                description:
                    "Designed and shipped co-lending journeys with multiple fintech partners.",
            },
            {
                title: "SDK/API Integration Framework",
                description:
                    "Built a standardized framework for deep SDK/API integrations with external partners.",
            },
        ],
    },
];

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat-widget";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { PageScrollProvider } from "@/components/page-scroll-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Ishaan Khare",
  description: "Professional portfolio showcasing my work and expertise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <PageScrollProvider>
          {children}
          <ScrollIndicator />
          <ChatWidget />
        </PageScrollProvider>
      </body>
    </html>
  );
}

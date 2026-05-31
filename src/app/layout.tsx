import type { Metadata } from "next";
import "./globals.css";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ThemeScript } from "@/components/ui/theme-script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Wahab Sohail | Computer Engineer & AI Developer",
    template: "%s | Wahab Sohail",
  },
  description:
    "Computer Engineering graduate from NUST specializing in AI, machine learning, computer vision, and edge computing on Linux-based embedded platforms. Building intelligent, real-time systems.",
  keywords: [
    "Wahab Sohail",
    "Computer Engineer",
    "AI Developer",
    "Machine Learning Engineer",
    "Computer Vision",
    "Embedded Systems",
    "Python Developer",
    "Raspberry Pi",
    "NUST Graduate",
    "Pakistan",
  ],
  authors: [{ name: "Wahab Sohail" }],
  creator: "Wahab Sohail",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Wahab Sohail | Computer Engineer & AI Developer",
    description:
      "Computer Engineering graduate from NUST specializing in AI, ML, computer vision, and edge computing.",
    siteName: "Wahab Sohail Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wahab Sohail | Computer Engineer & AI Developer",
    description:
      "Computer Engineering graduate from NUST. AI, ML, computer vision, and embedded systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <ThemeScript />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <CursorFollower />
        <ScrollProgress />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--card)",
              border: "1px solid var(--card-border)",
              color: "var(--foreground)",
            },
          }}
        />
      </body>
    </html>
  );
}

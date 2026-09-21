import type { Metadata } from "next";
import "./globals.css";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ThemeScript } from "@/components/ui/theme-script";
import { MotionProvider } from "@/components/ui/motion-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Wahab Sohail | AI Engineer — Conversational AI & Voice Systems",
    template: "%s | Wahab Sohail",
  },
  description:
    "AI Engineer specializing in conversational AI, Urdu voice systems, LLM fine-tuning, and RAG. Building production voice agents, multi-agent research systems, and low-resource speech tools.",
  keywords: [
    "Wahab Sohail",
    "AI Engineer",
    "Conversational AI",
    "Voice AI",
    "LLM",
    "LangGraph",
    "RAG",
    "Urdu ASR",
    "TTS",
    "Hugging Face",
    "Python Developer",
    "Pakistan",
  ],
  authors: [{ name: "Wahab Sohail" }],
  creator: "Wahab Sohail",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Wahab Sohail | AI Engineer — Conversational AI & Voice Systems",
    description:
      "AI Engineer specializing in conversational AI, Urdu voice systems, LLM fine-tuning, and RAG.",
    siteName: "Wahab Sohail Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wahab Sohail | AI Engineer — Conversational AI & Voice Systems",
    description:
      "AI Engineer specializing in conversational AI, Urdu voice systems, LLM fine-tuning, and RAG.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
        <MotionProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <CursorFollower />
          <ScrollProgress />
          {children}
        </MotionProvider>
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

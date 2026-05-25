import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

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
    creator: "@wahab_sohail",
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
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans bg-[#0a0a0a] text-white antialiased overflow-x-hidden`}
      >
        <CursorFollower />
        <ScrollProgress />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111111",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}

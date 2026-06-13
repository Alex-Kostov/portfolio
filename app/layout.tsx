import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aleksandar Kostov — Full-Stack Developer",
  description:
    "Full-Stack Developer in Sofia, Bulgaria — React, Next.js, Node.js, PHP, and AI/LLM integrations.",
  openGraph: {
    title: "Aleksandar Kostov — Full-Stack Developer",
    description:
      "Full-Stack Developer in Sofia, Bulgaria — React, Next.js, Node.js, PHP, and AI/LLM integrations.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

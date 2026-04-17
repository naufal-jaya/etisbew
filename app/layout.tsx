import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Space_Grotesk,
  DM_Mono,
} from "next/font/google";
import { cn } from "@/lib/utils";
// @ts-ignore
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "IEEE Student Branch IPB | Innovation & Technology Excellence",
  description:
    "IEEE Student Branch IPB - Advancing technology for humanity. Join us in fostering innovation, technical excellence, and professional development.",
  keywords: [
    "IEEE",
    "IPB",
    "Student Branch",
    "Technology",
    "Innovation",
    "Engineering",
  ],
  authors: [{ name: "IEEE Student Branch IPB" }],
  openGraph: {
    title: "IEEE Student Branch IPB",
    description:
      "Advancing technology for humanity through innovation and excellence",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "antialiased")}>{children}</body>
    </html>
  );
}

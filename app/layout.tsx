import type { Metadata } from "next";
import { inter } from "@/app/fonts";
//@ts-ignore
import "./globals.css";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "IEEE Student Branch IPB",
  description:
    "IEEE Student Branch IPB - Advancing technology for humanity",
  keywords: [
    "IEEE",
    "IPB",
    "Student Branch",
    "Technology",
    "Innovation",
    "Engineering",
  ],
  authors: [{ name: "IEEE Student Branch IPB" }],
  icons: {
    icon: "/images/layout/Logo_IEEE_IPB_Icon.png",
    shortcut: "/images/layout/Logo_IEEE_IPB_Icon.png",
    apple: "/images/layout/Logo_IEEE_IPB_Icon.png",
  },
  openGraph: {
    title: "IEEE Student Branch IPB",
    description:
      "Advancing technology for humanity through innovation, engineering, and research",
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

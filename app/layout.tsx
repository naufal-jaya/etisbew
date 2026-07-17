import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
//@ts-ignore
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-orm.ipb.ac.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "IEEE Student Branch IPB University",
  description:
    "IEEE Student Branch IPB University - Advancing technology for humanity. Join us in fostering innovation, technical excellence, and professional development.",
  keywords: [
    "IEEE",
    "IPB",
    "Student Branch",
    "IEEE SB IPB",
    "IEEE IPB",
    "IEEE Student Branch IPB",
    "IEEE Student Branch IPB University",
    "IEEE SB IPB University",
    "IEEE Indonesia",
    "IPB University",
    "Technology",
    "Innovation",
    "Engineering",
  ],
  authors: [{ name: "IEEE Student Branch IPB" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/layout/Logo_IEEE_IPB_Icon.png",
    shortcut: "/images/layout/Logo_IEEE_IPB_Icon.png",
    apple: "/images/layout/Logo_IEEE_IPB_Icon.png",
  },
  openGraph: {
    title: "IEEE Student Branch IPB University",
    description:
      "IEEE Student Branch IPB University - Advancing technology for humanity through innovation and excellence.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "IEEE Student Branch IPB University",
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Student Branch IPB University",
    description:
      "IEEE Student Branch IPB University - Advancing technology for humanity through innovation and excellence.",
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

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IEEE Student Branch IPB | Innovation & Technology Excellence',
  description: 'IEEE Student Branch IPB - Advancing technology for humanity. Join us in fostering innovation, technical excellence, and professional development.',
  keywords: ['IEEE', 'IPB', 'Student Branch', 'Technology', 'Innovation', 'Engineering'],
  authors: [{ name: 'IEEE Student Branch IPB' }],
  openGraph: {
    title: 'IEEE Student Branch IPB',
    description: 'Advancing technology for humanity through innovation and excellence',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
}

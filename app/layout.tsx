import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Define viewport separately
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' }
  ],
};

// Define metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://mark.engineering"),
  title: {
    default: "Mark | Home",
    template: "%s | Mark",
  },
  description: "Unlock your intellectual potential with Mark—an AI-powered ecosystem that transforms reading into a smarter, more connected experience. Enhance retention, track progress, and spark curiosity with beautifully designed tools that bridge print and digital learning.",
  keywords: "smart reading, AI-powered, intellectual growth, cognitive enhancement, e-ink, productivity tool, digital detox, deep work, innovation hub, connected learning, book tracking, smart bookmark, note-taking, AI recall, knowledge management, lifelong learning, premium design, minimalism, quantified self, focus optimization, memory retention, Strava for books, smart device, reading analytics, habit tracking, knowledge ecosystem",
  openGraph: {
    title: "Mark",
    description: "AI Bookmark that helps you remember readings",
    url: "https://mark.engineering",
    siteName: "Mark",
    images: [
      {
        url: "https://mark.engineering/Mark_Assets/still8.png",
        width: 1200,
        height: 630,
        alt: "Mark",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark",
    description: "Unlock your intellectual Potential.",
    images: ["https://mark.engineering/Mark_Assets/still8.png"],
  },
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="Mark" content="Mark" />
      </head>
      <body className="min-h-screen bg-background antialiased">
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  );
}
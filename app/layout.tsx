import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
});

export const generateThemeColor = () => "#ffffff";

export const metadata: Metadata = {
  title: "Mark | AI Hardware bookmark for Knowledge Retention",
  description:
    "Mark One by Mark: A transformative AI hardware bookmark designed to enhance knowledge retention with elegance and functionality.",
  keywords: [
    "Mark One",
    "AI Hardware",
    "Knowledge Retention",
    "Bookmark Manager",
    "Mark Engineering",
    "Aluminum Bookmark",
    "Physical AI Device",
  ],
  authors: [{ name: "Mark Engineering", url: "https://mark.engineering" }],
  openGraph: {
    title: "Mark One | bookmark that Transforms Knowledge Retention",
    description:
      "Discover Mark One, a groundbreaking AI hardware bookmark by Mark, crafted from premium aluminum to enhance how you retain and organize knowledge.",
    url: "https://mark.engineering",
    siteName: "Mark",
    images: [
      {
        url: "https://mark.engineering/mark_demo.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Mark One - AI Hardware Bookmark",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark One | AI Hardware for Knowledge Retention",
    description:
      "Mark One by Mark: A premium AI hardware bookmark revolutionizing how we retain knowledge. Built with sleek aluminum and cutting-edge AI.",
    images: ["https://mark.engineering/mark_demo.png"], // Replace with your actual image URL
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

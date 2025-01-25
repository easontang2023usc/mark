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

// Define metadata object directly in the layout
export const metadata: Metadata = {
  title: "Mark | Redefining the way we retain knowledge",
  description:
    "Mark: A transformative AI hardware bookmark designed to enhance knowledge retention with elegance and functionality.",
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
  viewport: "width=device-width, initial-scale=1", // This can stay here
  themeColor: "#ffffff", // This can stay here
  openGraph: {
    title: "Mark | Redefining the way we retain knowledge",
    description:
      "Mark: Redefining the way we retain knowledge.",
    url: "https://mark.engineering",
    siteName: "Mark",
    images: [
      {
        url: "https://mark.engineering/black_banner.png",
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
    title: "Mark | Redefining the way we retain knowledge",
    description:
      "Premium AI Hardware",
    images: ["https://mark.engineering/black_banner.png"],
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

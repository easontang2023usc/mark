import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Define viewport separately
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
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
    description: "A brief description for social media sharing.",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="Mark" content="Mark" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
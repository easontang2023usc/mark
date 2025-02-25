// app/layout.tsx
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Define metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Mark | Home", // Default title for all pages
    template: "%s | Mark", // Template for dynamic page titles
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
        url: "https://yourwebsite.com/Mark_Assets/still8.png", // Replace with your Open Graph image
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
    images: ["/Mark_Assets/still8.png"], // Replace with your Twitter image
  },
  robots: "index, follow", // Instructs search engines to index the page
  viewport: "width=device-width, initial-scale=1.0", // Responsive design
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Character encoding */}
        <meta charSet="UTF-8" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Optional: Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Optional: Additional SEO meta tags */}
        <meta name="author" content="Your Name or Company" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
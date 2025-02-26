"use client";

import { useEffect, useState } from "react";
import Typography from "@/components/ui/Typography";
import MobileWaitlist from "./mobileWaitlist";

// Constants
const HERO_IMAGE_PATH = "/Mark_Assets/webiste_header.png";
const IMAGE_ALT_TEXT = "Mark 1 bookmark device";

const MobileHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [variant, setVariant] = useState("A"); // Default to A

  useEffect(() => {
    // Read the A/B test variant from cookies
    const cookies = document.cookie.split("; ");
    const abTestCookie = cookies.find((row) => row.startsWith("ab_test_variant="));
    
    // Only update variant if cookie exists and has a valid value
    if (abTestCookie) {
      const cookieValue = abTestCookie.split("=")[1];
      if (cookieValue === "A" || cookieValue === "B") {
        setVariant(cookieValue);
      }
    } else {
      // If no cookie exists, we can either:
      // 1. Keep default "A" as already set
      // 2. Randomly assign a variant and set the cookie
      
      // Option 2 (randomly assign):
      const randomVariant = Math.random() < 0.5 ? "A" : "B";
      setVariant(randomVariant);
      document.cookie = `ab_test_variant=${randomVariant}; path=/; max-age=2592000`; // 30 days
    }

    // Preload image based on selected variant
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = HERO_IMAGE_PATH;
    
    return () => {
      img.onload = null;
    };
  }, [variant]); // Add variant as dependency

  return (
    <section className="relative mt-16 bg-[#FCFCFC] flex flex-col items-center min-h-[calc(100vh-64px)] [padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)]">
      <div className="w-full max-w-md mx-auto flex flex-col flex-grow justify-between px-4 pt-16 pb-10">
        {/* Header */}
        <header className="text-center space-y-3 mb-6">
          <Typography
            variant="h1"
            className="text-black text-[2.5rem] font-semibold leading-tight px-2"
          >
            {variant === "B"
              ? "The AI bookmark for physical readers"
              : "The first AI bookmark for physical readers"}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 text-[1rem] leading-relaxed px-4"
          >
            Access summaries, friends & data seemlessly synced to your device
          </Typography>
        </header>

        {/* CTA */}
        <footer className="mt-auto pb-4">
          <MobileWaitlist />
        </footer>

        {/* Image with gradient fade effect */}
        <div className="flex-1 flex items-center justify-center mb-6 px-2 relative">
          <div className="relative w-full max-w-[320px]">
            <picture>
              <img
                src={HERO_IMAGE_PATH}
                alt={IMAGE_ALT_TEXT}
                className={`w-full h-auto object-contain transition-opacity duration-300 block ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="eager"
                decoding="async"
              />
            </picture>
            {/* Gradient overlay for fading effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FCFCFC] to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;
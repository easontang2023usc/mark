"use client";

import { useEffect, useState } from "react";
import Typography from "@/components/ui/Typography";
import MobileWaitlist from "./mobileWaitlist";

// Constants
const HERO_IMAGE_PATH = "/Mark_Assets/webiste_header.png";
const IMAGE_ALT_TEXT = "Mark 1 bookmark device";

const MobileHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = HERO_IMAGE_PATH;
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <section className="relative mt-16 bg-[#FCFCFC] flex flex-col items-center min-h-[calc(100vh-64px)] [padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)]">
      <div className="w-full max-w-md mx-auto flex flex-col flex-grow justify-between px-4 pt-16 pb-10">
        {/* Header */}
        <header className="text-center space-y-3 mb-6">
          <Typography
            variant="h1"
            className="text-black text-[2.5rem] font-semibold leading-tight px-2"
          >
            Unlock your intellectual potential
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 text-[1rem] leading-relaxed px-4"
          >
            Meet Mark 1 – a smart bookmark that tracks and summarizes your reading
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
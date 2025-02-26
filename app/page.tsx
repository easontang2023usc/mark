"use client";

import React, { useState, useEffect } from "react";
import BentoBox from "@/components/BentoBox";
import FinalJoinWaitlist from "@/components/FinalJoinWaitlist";
import ContainerScroll from "@/components/ContainerScroll";
import Hero3D from "@/components/Hero3D";
import MobileHero from "@/components/mobileHero";
import LoadingScreen from "@/components/loadingScreen";
import HowItWorksPage from "@/components/HowItWorks";
import ExplainSection from "@/components/explainSection";
import StickyScrollDemo from "@/components/StickyScrollDemo";
import MobileHowItWorksPage from "@/components/mobileHowItWorks";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Full spin frames for MobileHowItWorksPage
  const spinFrames = Array.from({ length: 55 }, (_, i) =>
    `/Mark_Assets/mark_spin/${String(i + 30).padStart(3, "0")}.jpg`
  );

  // Critical hero frames (keep as is for Hero3D)
  const criticalHeroFrames = Array.from({ length: 10 }, (_, i) =>
    `/Mark_Assets/frames2/frame-${String(i + 1).padStart(4, "0")}.png`
  );

  const imageSequences: string[][] = [spinFrames, criticalHeroFrames];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLoadComplete = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setContentVisible(true);
      if (!isMobile) {
        loadRemainingFrames();
      }
    }, 300);
  };

  const loadRemainingFrames = () => {
    const remainingHeroFrames = Array.from({ length: 75 }, (_, i) =>
      `/Mark_Assets/frames2/frame-${String(i + 11).padStart(4, "0")}.png`
    );

    const loadFramesInBatches = (frames: string[], batchSize: number, delayBetweenBatches: number) => {
      for (let i = 0; i < frames.length; i += batchSize) {
        setTimeout(() => {
          const batch = frames.slice(i, i + batchSize);
          batch.forEach((src) => {
            const img = new Image();
            img.onload = () => console.log(`Loaded: ${src}`);
            img.onerror = () => console.error(`Failed to load: ${src}`);
            img.src = src;
          });
        }, Math.floor(i / batchSize) * delayBetweenBatches);
      }
    };

    loadFramesInBatches(remainingHeroFrames, 3, 200);
  };

  return (
    <>
      <LoadingScreen
        imageSequences={imageSequences}
        onLoadComplete={handleLoadComplete}
        minimumLoadTime={1500}
      />
      {isLoaded && (
        <div
          className="transition-opacity duration-500 ease-in"
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          {isMobile ? <MobileHero /> : <Hero3D />}
          <StickyScrollDemo />
          {isMobile ? <MobileHowItWorksPage /> : <HowItWorksPage />}
          <ExplainSection />
          <ContainerScroll />
          <BentoBox />
          <FinalJoinWaitlist />
        </div>
      )}
    </>
  );
}
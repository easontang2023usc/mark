'use client'

import React, { useState, useEffect } from 'react';
import BentoBox from "@/components/BentoBox";
import FinalJoinWaitlist from "@/components/FinalJoinWaitlist";
import ContainerScroll from "@/components/ContainerScroll";
import Hero3D from "@/components/Hero3D";
import LoadingScreen from "@/components/loadingScreen";
import HowItWorksPage from "@/components/HowItWorks";
import ExplainSection from "@/components/explainSection";
import StickyScrollDemo from "@/components/StickyScrollDemo";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  
  // Define the image sequences to preload - prioritize important frames only
  
  // For the first sequence (mark_spin), load fewer frames initially
  const criticalSpinFrames = Array.from({ length: 20 }, (_, i) =>
    `/Mark_Assets/mark_spin/${String(i + 30).padStart(3, "0")}.jpg`
  );

  // For the second sequence, only load the first few critical frames
  const criticalHeroFrames = Array.from({ length: 10 }, (_, i) =>
    `/Mark_Assets/frames2/frame-${String(i + 1).padStart(4, "0")}.png`
  );

  // Group your critical image sequences for initial loading
  const imageSequences: string[][] = [
    criticalSpinFrames,
    criticalHeroFrames
  ];

  const handleLoadComplete = () => {
    // Mark as loaded first
    setIsLoaded(true);
    
    // Add pre-render time for components to initialize
    setTimeout(() => {
      setContentVisible(true);
      
      // Load the remaining frames after the page is visible
      loadRemainingFrames();
    }, 300);
  };
  
  const loadRemainingFrames = () => {
    // Define the remaining frames to load
    const remainingSpinFrames = Array.from({ length: 35 }, (_, i) =>
      `/Mark_Assets/mark_spin/${String(i + 50).padStart(3, "0")}.jpg`
    );
    
    const remainingHeroFrames = Array.from({ length: 75 }, (_, i) =>
      `/Mark_Assets/frames2/frame-${String(i + 11).padStart(4, "0")}.png`
    );
    
    // Function to load frames in small batches with delays
    const loadFramesInBatches = (frames: string[], batchSize: number, delayBetweenBatches: number) => {
      for (let i = 0; i < frames.length; i += batchSize) {
        setTimeout(() => {
          const batch = frames.slice(i, i + batchSize);
          console.log(`Loading batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(frames.length/batchSize)}`);
          
          batch.forEach(src => {
            const img = new Image();
            img.onload = () => {
              // console.log(`Loaded: ${src}`);
            };
            img.onerror = () => {
              console.error(`Failed to load: ${src}`);
            };
            img.src = src;
          });
        }, Math.floor(i / batchSize) * delayBetweenBatches);
      }
    };
    
    // Load spin frames first (smaller set)
    loadFramesInBatches(remainingSpinFrames, 5, 150);
    
    // Start loading hero frames after a delay
    setTimeout(() => {
      loadFramesInBatches(remainingHeroFrames, 3, 200);
    }, 1000);
  };
  
  return (
    <>
      <LoadingScreen 
        imageSequences={imageSequences}
        onLoadComplete={handleLoadComplete}
        minimumLoadTime={1500} // Ensure loading screen shows for at least 1.5 seconds
      />
      
      {isLoaded && (
        <div 
          className="transition-opacity duration-500 ease-in" 
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          <Hero3D />
          <StickyScrollDemo />
          <HowItWorksPage />
          <ExplainSection />
          <ContainerScroll />
          <BentoBox />
          <FinalJoinWaitlist />
        </div>
      )}
    </>
  );
}
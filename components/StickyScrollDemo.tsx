"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bookTitles = [
  "MARK®",
  "Today, book readers struggle to retain everything they read.",
  "But you want that paper feel, not that pixel screen bullsh*t.",
  "65% of Americans feel the same way.",
  "We hear you.",
  "",
];

const StickyScrollDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Add throttle reference
  
  // For the transition effect
  const initialScale = 1;
  const finalScale = 0.8;
  // We'll keep opacity at 1 since we don't want a fade effect
  const initialOpacity = 1;
  const finalOpacity = 1;
  // Added radius animation values
  const initialRadius = 0;
  const finalRadius = 32;
  
  // Each "slide" takes 40vh worth of scroll for even faster transitions
  const sectionHeight = bookTitles.length * 40;
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Safely access offsetTop with a null check
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      
      // Calculate total scroll area
      const totalScrollArea = containerTop + sectionHeight * windowHeight;
      
      // Check if we're in the sticky section
      const isInStickyRange = scrollPosition >= containerTop && scrollPosition < totalScrollArea;
      setIsSticky(isInStickyRange);
      
      if (isInStickyRange) {
        // Calculate which text to show based on scroll position
        const relativeScroll = scrollPosition - containerTop;
        // Using a even faster transition
        const newIndex = Math.min(
          Math.floor(relativeScroll / (windowHeight * 0.4)),
          bookTitles.length - 1
        );
        
        setCurrentIndex(newIndex);
        
        // Calculate progress for the scale transition when reaching the last slide
        if (newIndex === bookTitles.length - 1) {
          const lastSlideStart = (bookTitles.length - 1) * windowHeight * 0.4;
          const progressInLastSlide = (relativeScroll - lastSlideStart) / (windowHeight * 0.4);
          setScrollProgress(Math.max(0, Math.min(progressInLastSlide, 1)));
        } else {
          setScrollProgress(0);
        }
        
        // Instead of releasing the sticky state, we'll keep it 
        // at maximum scale down but still visible
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionHeight, scrollProgress]);

  // Calculate scale, opacity, and border radius based on scroll progress
  const scale = initialScale - (scrollProgress * (initialScale - finalScale));
  const opacity = initialOpacity - (scrollProgress * (initialOpacity - finalOpacity));
  const borderRadius = initialRadius + (scrollProgress * (finalRadius - initialRadius));

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ height: `${sectionHeight + 100}vh` }}
    >
      <div
        className={`h-screen w-full flex items-center justify-start text-white bg-black pl-24 transition-opacity duration-300 ease-out ${
          isSticky ? "sticky top-0 z-10" : "relative"
        }`}
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: "transform 50ms ease-out, border-radius 50ms ease-out",
          transformOrigin: "top center", // Scale from left and right, keeping top fixed
          borderRadius: `0 0 ${borderRadius}px ${borderRadius}px` // Animated border radius
        }}
      >
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-12 z-20">
          {bookTitles.map((_, index) => {
            const distance = Math.abs(currentIndex - index);
            const isActive = currentIndex === index;
            const opacity = isActive ? "opacity-100" : distance === 1 ? "opacity-60" : "opacity-30";
            const width = isActive ? "w-16" : distance === 1 ? "w-10" : "w-8";

            return (
              <motion.div
                key={index}
                className={`h-0.5 bg-white rounded-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-300`}
                style={{ 
                  width: isActive ? 64 : distance === 1 ? 40 : 32, 
                  opacity: isActive ? 1 : distance === 1 ? 0.6 : 0.3 
                }}
                onClick={() => {
                  // Scroll to the appropriate position when indicator is clicked
                  if (!containerRef.current) return;
                  const targetScroll = containerRef.current.offsetTop + index * window.innerHeight * 0.4;
                  window.scrollTo({
                    top: targetScroll,
                    behavior: "smooth"
                  });
                }}
              />
            );
          })}
        </div>
        <div className="flex flex-col items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              className="m-0 p-4 text-left text-5xl font-bold text-white max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }} // Faster appear animation
            >
              {currentIndex === 3 ? (
                <>
                  <span className="text-orange-500 font-bold">65%</span> of Americans feel the same way.
                </>
              ) : currentIndex === 2 ? (
                <>
                  But you want that paper feel, not that pixel screen{" "}
                  <span className="text-orange-500 font-bold">bullsh*t</span>.
                </>
              ) : (
                bookTitles[currentIndex]
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StickyScrollDemo;
"use client";
import React, { useState, createContext, useRef, useEffect, ReactElement } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Typography from "@/components/ui/Typography";

interface CarouselProps {
  items: ReactElement[];
  title?: string; // Added title prop
}

type Card = {
  src: string;
  title: string;
  category: string;
  description: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, title }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Set up card refs and check device width
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
    
    // Initialize mobile check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [items]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    const cardElement = cardRefs.current[index];
    if (cardElement && scrollContainerRef.current) {
      if (isMobile) {
        // On mobile, scroll to the exact card's position
        scrollContainerRef.current.scrollTo({
          left: index * scrollContainerRef.current.offsetWidth,
          behavior: 'smooth'
        });
      } else {
        // On desktop, use the original calculation with padding
        const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
        const cardLeft = cardElement.getBoundingClientRect().left;
        const offset = cardLeft - containerLeft - 192; // 12rem (pl-48)
        
        scrollContainerRef.current.scrollBy({
          left: offset,
          behavior: 'smooth'
        });
      }
    }
  };

  // Track scroll position to update the current index when scrubbing
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      if (isMobile) {
        // On mobile, calculate based on scroll position relative to viewport width
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const cardWidth = scrollContainerRef.current.offsetWidth;
        const newIndex = Math.round(scrollPosition / cardWidth);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
          setCurrentIndex(newIndex);
        }
      } else {
        // On desktop, use the original calculation
        const offsetLeft = 192; // 12rem (pl-48)
        
        // Find which card is closest to the left edge + offset
        let closestIndex = 0;
        let closestDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
          if (card) {
            const cardRect = card.getBoundingClientRect();
            const container = scrollContainerRef.current;
            
            if (container) {
              const containerRect = container.getBoundingClientRect();
              const distance = Math.abs(cardRect.left - containerRect.left - offsetLeft);
              
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
              }
            }
          }
        });

        if (closestIndex !== currentIndex) {
          setCurrentIndex(closestIndex);
        }
      }
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: () => {}, currentIndex }}>
      <div className="relative w-full overflow-hidden">
        {/* Header section with title on the left - mobile only */}
        {title && isMobile && (
          <div className="flex justify-between items-center mb-4 pl-4 pr-4">
            <Typography variant="h2" className="text-left">{title}</Typography>
          </div>
        )}
        
        {/* Header for desktop */}
        {title && !isMobile && (
          <div className="flex justify-between items-center mb-4 pl-48 pr-48">
            <Typography variant="h2">{title}</Typography>
          </div>
        )}
        
        {/* Mobile navigation arrows (centered) */}
        {isMobile && (
          <div className="absolute top-1/2 left-0 right-0 z-40 flex justify-between px-4 transform -translate-y-1/2 pointer-events-none">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors pointer-events-auto"
            >
              <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors pointer-events-auto"
            >
              <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex w-full overflow-x-scroll overscroll-x-auto py-6 md:py-20 scroll-smooth [scrollbar-width:none] snap-x snap-mandatory md:snap-none"
          onScroll={handleScroll}
        >
          <div className={`flex flex-row justify-start ${isMobile ? 'gap-0' : 'gap-4 pl-48'} max-w-full`}>
            {items.map((item, index) => (
              <motion.div
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" } }}
                key={"card" + index}
                className={`carousel-card ${isMobile ? 'w-full min-w-full snap-center px-4' : 'last:pr-[33%] mx-4'} rounded-3xl cursor-pointer transition-all duration-300 ${index === currentIndex ? 'scale-100 md:scale-105' : 'scale-100 md:opacity-70'}`}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Desktop navigation buttons (original position) */}
        {!isMobile && (
          <div className="flex justify-end gap-2 pr-48">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
              <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
              <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card }: { card: Card }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <div className={`flex flex-col items-start gap-6 transition-all duration-300 my-4`}>
      {/* Box */}
      <div className={`aspect-square ${isMobile ? 'w-full' : 'w-[28rem]'} bg-gray-100 dark:bg-neutral-900 rounded-3xl overflow-hidden relative`}>
        <BlurImage src={card.src} alt={card.title} className="object-cover w-full h-full" />
      </div>

      {/* Text Block Below the Box */}
      <div className={`text-left w-full`}>
        <Typography variant="body2" className="text-gray-500 mb-1">{card.category}</Typography>
        <Typography variant="h3" className="mb-2">{card.title}</Typography>
        <Typography variant="body1" className="text-gray-500">
          {card.description}
        </Typography>
      </div>
    </div>
  );
};

export const BlurImage = ({ src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <Image
        className={cn("transition duration-300 object-cover", isLoading ? "blur-sm" : "blur-0", className)}
        onLoad={() => setLoading(false)}
        src={src}
        fill
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt ? alt : "Feature image"}
        {...rest}
      />
    </div>
  );
};
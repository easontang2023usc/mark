"use client";
import React, { useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Typography from "@/components/ui/Typography";

interface CarouselProps {
  items: JSX.Element[];
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

export const Carousel = ({ items }: CarouselProps) => {
  return (
    <CarouselContext.Provider value={{ onCardClose: () => {}, currentIndex: 0 }}>
      <div className="relative w-full">
        <div className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]">
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" } }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50">
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50">
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }: { card: Card; index: number }) => {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Box */}
      <div className="aspect-square w-72 md:w-[28rem] bg-gray-100 dark:bg-neutral-900 rounded-3xl overflow-hidden relative">
        <BlurImage src={card.src} alt={card.title} className="object-cover w-full h-full" />
      </div>

      {/* Text Block Below the Box */}
      <div className="text-left px-2 md:px-4">
        <Typography variant="body2" className="text-gray-500">{card.category}</Typography>
        <Typography variant="h3">{card.title}</Typography>
        <Typography variant="body1" className="text-gray-500">
          <span className="font-semibold text-black">{getBoldSubject(card.description)}</span> {getRemainingDescription(card.description)}
        </Typography>
      </div>
    </div>
  );
};

/**
 * Extracts the first word or phrase from the description to make it bold.
 */
const getBoldSubject = (description: string) => {
  const words = description.split(" ");
  return words.length > 0 ? words[0] : "";
};

/**
 * Returns the remaining part of the description after the first bold word.
 */
const getRemainingDescription = (description: string) => {
  const words = description.split(" ");
  return words.slice(1).join(" ");
};

export const BlurImage = ({ src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  if (!src || src.trim() === "") {
    return null;
  }

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
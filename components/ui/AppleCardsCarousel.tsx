"use client";
import React, { useState, useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/Typography";

interface CarouselProps {
  items: JSX.Element[];
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

const StepNumber = ({ number, isHovered }: { number: number; isHovered: boolean }) => (
  <div
    className={`flex items-center justify-center w-8 h-8 md:w-5 md:h-5 rounded-full border transition-all duration-300
        ${isHovered ? "border-[#FB6839] text-[#FB6839]" : "border-neutral-500 text-neutral-600"}`}
  >
    <Typography variant="body2">{number}</Typography>
  </div>
);

export const Carousel = ({ items }: CarouselProps) => {
  return (
    <CarouselContext.Provider value={{ onCardClose: () => {}, currentIndex: 0 }}>
      <div className="relative w-full">
        {/* Increased gap between cards */}
        <div className="flex justify-center gap-16">
          {items.map((item, index) => (
            <motion.div
              key={"card" + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Text content above the card */}
      <motion.div 
        className="absolute w-full z-20"
        animate={{ y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="text-left mb-4">
          <div className="flex items-center gap-2">
            <StepNumber number={index + 1} isHovered={isHovered} />
            {/* Line between the number and the text */}
            <div className={`h-[1px] w-3 transition-all duration-300 ${isHovered ? "bg-[#FB6839]" : "bg-neutral-500"}`} />
            <Typography variant="body2" className="text-neutral-600">
              {card.category}
            </Typography>
          </div>
          <Typography variant="h3" className="mt-1 transition-colors duration-300">
            {card.title}
          </Typography>
        </div>
      </motion.div>

      {/* Card with image */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-72 w-72 md:h-[30rem] md:w-80 overflow-hidden relative z-10 mt-10"
      >
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </div>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
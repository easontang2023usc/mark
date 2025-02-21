"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import Typography from "@/components/ui/Typography";

const features = [
  {
    title: "Learn everything",
    description:
      "Books have the power to transform the human species for generations to come. Mark is the key that will make that happen.",
    image: "/Mark_Assets/learning.png",
    className: "lg:col-span-4 border-r border-b dark:border-neutral-800",
  },
  {
    title: "Titanium Grade 5",
    description:
      "Alpha-beta alloy, renowned for its high strength and toughness, and alloyed with 6% aluminium and 4% vanadium.",
    image: "/Mark_Assets/still7.png",
    className: "lg:col-span-2 border-b dark:border-neutral-800",
  },
  {
    title: "Uninterrupted Reading",
    description:
      "Step away from the noise that comes with your devices. Mark provides distraction-free technology that elevates the physical book reading experience.",
    image: "/Mark_Assets/reading.png",
    className: "lg:col-span-3 border-r border-b dark:border-neutral-800",
  },
  {
    title: "Social - Gamifying Reading",
    description:
      "Engage with friends, track reading streaks, and challenge others in reading quests for an immersive social experience.",
    image: "/Mark_Assets/social.svg",
    className: "lg:col-span-3 border-b dark:border-neutral-800",
  },
];

const BentoBox = () => {
  return (
    <section className="relative z-20 py-10 lg:py-32 max-w-7xl mx-auto">
      <div className="px-8">
        {/* **Section Header with Universal Typography** */}
        <Typography variant="h2" className="text-center">
          Explore Mark's Features
        </Typography>
        <Typography variant="body1" className="text-center text-neutral-500 mt-2">
          Mark is built for book lovers, crafted with the best materials, and designed to keep you immersed in reading.
        </Typography>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mt-12 xl:border dark:border-neutral-800">
          {features.map((feature, index) => (
            <FeatureCard key={index} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-60 md:h-72 flex items-center justify-center overflow-hidden"
              >
                {/* Left Blur */}
                <div className="absolute left-0 w-10 h-full bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
                
                {/* Top Blur */}
                <div className="absolute top-0 h-10 w-full bg-gradient-to-b from-white dark:from-black to-transparent pointer-events-none" />

                {/* Image */}
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={400}
                  className="rounded-md object-cover w-full h-full"
                />

                {/* Bottom Blur */}
                <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />

                {/* Right Blur */}
                <div className="absolute right-0 w-10 h-full bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
              </motion.div>

            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-6 md:p-8 relative overflow-hidden border dark:border-neutral-800`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug font-semibold mb-4">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-neutral-500 font-normal dark:text-neutral-300 mb-6">
      {children}
    </p>
  );
};

export default BentoBox;
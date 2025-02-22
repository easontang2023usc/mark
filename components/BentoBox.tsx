"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import Typography from "@/components/ui/Typography";

export function BentoBox() {
  const cards = features.map((feature, index) => (
    <Card key={feature.image} card={feature} index={index} />
  ));

  return (
    <section className="relative z-20 py-10 lg:py-32 max-w-vh mx-auto">
      <div className="px-8">
        <Typography variant="h2" className="text-center">
          Explore Mark's Features
        </Typography>
        <Typography variant="body1" className="text-center text-neutral-500 mt-2">
          Mark is built for book lovers, crafted with the best materials, and designed to keep you immersed in reading.
        </Typography>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

const features = [
  {
    category: "learn everything",
    title: "Learn everything",
    description: "Learn everything Books have the power to transform the human species for generations to come. Mark is the key that will make that happen.",
    image: "/Mark_Assets/learning.png",
  },
  {
    category: "Materials",
    title: "Titanium Grade 5",
    description: "Titanium Grade 5 Alpha-beta alloy, renowned for its high strength and toughness, and alloyed with 6% aluminium and 4% vanadium.",
    image: "/Mark_Assets/still7.png",
  },
  {
    category: "Experience",
    title: "Uninterrupted Reading",
    description: "Premium design Mark’s craftsmanship showcases eloquence and status, combining timeless aesthetics with cutting-edge technology to create a product that stands out.",
    image: "/Mark_Assets/reading.png",
  },
  {
    category: "Social",
    title: "Gamifying Reading",
    description: "Data and friends motivate you to to keep learning by tracking your progress and sharing achievements for a collaborative reading experience.",
    image: "/Mark_Assets/social.svg",
  },
  
  
];

export default BentoBox;

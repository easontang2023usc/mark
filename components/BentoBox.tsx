"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Typography from "@/components/ui/Typography";

export function BentoBox() {
  const cards = features.map((feature, index) => (
    <Card key={feature.src} card={feature} index={index} />
  ));

  return (
    <section className="relative z-20 py-10 lg:py-32 mx-auto">
      <div className="px-8 text-left pl-48">
        <Typography variant="h3">Explore Mark's Features</Typography>
        <Typography variant="body1" className="text-neutral-500 mt-2">
          Mark is built for book lovers, crafted with the best materials, and designed to keep you immersed in reading.
        </Typography>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

const features = [
  {
    category: "Learn",
    title: "Learn Everything",
    description: "Books have the power to transform the human species for generations to come. Mark is the key that will make that happen.",
    src: "/Mark_Assets/learning.svg",
  },
  {
    category: "Materials",
    title: "Titanium Grade 5",
    description: "Titanium Grade 5 Alpha-beta alloy, renowned for its high strength and toughness, and alloyed with 6% aluminium and 4% vanadium.",
    src: "/Mark_Assets/titanium.svg",
  },
  {
    category: "Social",
    title: "Gamifying Reading",
    description: "Data and friends motivate you to keep learning by tracking your progress and sharing achievements for a collaborative reading experience.",
    src: "/Mark_Assets/social.svg",
  },
  {
    category: "Experience",
    title: "Uninterrupted Reading",
    description: "Premium design showcases eloquence and status, combining timeless aesthetics with cutting-edge technology to create a product that stands out.",
    src: "/Mark_Assets/premium.svg",
  },
];

export default BentoBox;
"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Typography from "@/components/ui/Typography";
import Image from 'next/image';

// Define the Feature type
interface Feature {
  category: string;
  title: string;
  description: string;
  src: string;
}

// Define features array
const features: Feature[] = [
  {
    category: "",
    title: "Learn Everything",
    description: "Mark help you retain knowledge.",
    src: "/Mark_Assets/learning.svg",
  },
  {
    category: "",
    title: "Titanium Grade 5",
    description: "Same material as Boeing 777.",
    src: "/Mark_Assets/titanium.svg",
  },
  {
    category: "",
    title: "Gamifying Reading",
    description: "Data and friends motivate you to keep learning.",
    src: "/Mark_Assets/social.svg",
  },
  {
    category: "",
    title: "Design That Just Works",
    description: "So sleek, it becomes part of the lifestyle.",
    src: "/Mark_Assets/premium.svg",
  },
];

export function BentoBox() {
  const cards = features.map((feature) => (
    <Card key={feature.src} card={feature} />
  ));

  return (
    <section className="relative z-20 py-10 lg:py-32 mx-auto">
      <div className="px-8 text-left md:pl-48 pl-6 mt-8 md:mt-0">
        <Typography variant="h3">Explore Mark&apos;s Features</Typography>
        <Typography variant="body1" className="text-neutral-500 mt-2">
          Mark is built for book lovers, crafted with the best materials, and designed to keep you immersed in reading.
        </Typography>
      </div>
      <Carousel items={cards} />
      <Image
        src="/path/to/your/image.jpg"
        alt="Description of the image"
        width={500}
        height={300}
        className="your-custom-class"
      />
    </section>
  );
}

export default BentoBox;
"use client";

import { Carousel, Card } from "@/components/ui/AppleCardsCarousel";
import Typography from "@/components/ui/Typography";

const cards = [
  { src: "/Mark_Assets/step1.png", category: "Read as usual", content: "Follow the setup guide..." },
  { src: "/Mark_Assets/step2.svg", category: "Set page # when done", content: "Sync with your books..." },
  { src: "/Mark_Assets/step3.png", category: "Send to Mark", content: "Enjoy distraction-free reading!" },
];

export default function HowItWorks() {
  return (
    <section className="relative my-16 py-12 flex flex-col items-center">
      {/* Section Title */}
      <div className="text-center max-w-2xl">
        <Typography variant="h3" className="text-lg font-semibold text-primary">
          How It Works
        </Typography>
        <Typography variant="h3" className="text-4xl font-bold mt-2">
          Discover the power of seamless AI
        </Typography>
        <Typography variant="body1" className="text-neutral-500 mt-2">
          Mark is tailored to your usual reading experience.
        </Typography>
      </div>

      {/* Cards Carousel */}
      <div className="w-full mt-10 max-w-4xl">
        <Carousel items={cards.map((card, i) => <Card key={i} card={card} index={i} />)} />
      </div>
    </section>
  );
}

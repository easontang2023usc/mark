"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    description: "The world holds centuries of brilliance.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white text-3xl font-medium px-6 text-center">
        The world holds centuries of brilliance.
      </div>
    ),
  },
  {
    description: "Einstein's physics, Nietzsche's philosophy, Jobs' innovation.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white text-3xl font-medium px-6 text-center">
        Einstein's physics, Nietzsche's philosophy, Jobs' innovation.
      </div>
    ),
  },
  {
    description: "Visionaries spend lifetimes refining ideas and distilling their wisdom into books.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white text-3xl font-medium px-6 text-center">
        Visionaries spend lifetimes refining ideas and distilling their wisdom into books.
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <StickyScroll content={content} />
    </div>
  );
}
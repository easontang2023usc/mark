"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Crosshair from "@/components/crosshair";
import CursorImage from "@/components/cursor-image";
import Clock from "@/components/clock";
import TwitterLink from "@/components/twitter-link";
import { InputWithButton } from "@/components/waitlist";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [crosshairColor, setCrosshairColor] = useState("black");
  const [cursorOpacity, setCursorOpacity] = useState(0);

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center "
    >
      {/* Interactive Elements */}
      <Crosshair containerRef={containerRef} color={crosshairColor} />
      <CursorImage imageUrl="/mark_demo.png" size={80} opacity={cursorOpacity}/>

      {/* Hero Section */}
      <div className="flex flex-col items-center px-4 w-full max-w-[500px] mx-auto">
        <Image
          src="/mark_logo.png"
          alt="mark logo"
          className="w-full h-auto cursor-pointer"
          width={0}
          height={0}
          sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
          onMouseEnter={() => {
            setCrosshairColor("red");
            setCursorOpacity(1);
          }}
          onMouseLeave={() => {
            setCrosshairColor("black");
            setCursorOpacity(0);
          }}
        />
        
        <h1 className="text-1xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
          Transform how you retain knowledge
        </h1>
        
        <p className="text-xs md:text-lg font-light text-gray-600 mt-4 mb-14">
          COMING SOON
        </p>

        {/* Waitlist Section */}
        <div className="w-full mb-1 items-center flex justify-center">
          <InputWithButton />
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-ful bg-opacity-90 backdrop-blur-sm py-6">
        <div className="flex justify-center gap-16 md:gap-24">
          <TwitterLink username="easontang23"/>
          <TwitterLink username="henryyinn"/>
        </div>
      </footer>
    </main>
  );
}
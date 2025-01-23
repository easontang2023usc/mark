"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Crosshair from "@/components/crosshair";
import CursorImage from "@/components/cursor-image";
import Clock from "@/components/clock";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [crosshairColor, setCrosshairColor] = useState("black");
  const [cursorOpacity, setCursorOpacity] = useState(0);

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center gap-8 min-h-screen bg-white"
    >
      <Crosshair containerRef={containerRef} color={crosshairColor} />
      <CursorImage imageUrl="/mark_demo.png" size={80} opacity={cursorOpacity}/>

      <Clock/>
      
      <Image
        src="/mark_logo.png"
        alt="mark logo"
        className="w-1/4 h-auto cursor-pointer"
        width={0}
        height={0}
        sizes="25vw"
        onMouseEnter={() => {
          setCrosshairColor("red");
          setCursorOpacity(1);
        }}
        onMouseLeave={() => {
          setCrosshairColor("black");
          setCursorOpacity(0);
        }}
      />
      <h1 className="text-black text-1xl font-light pb-10">COMING SOON</h1>
      
    </div>
  );
}
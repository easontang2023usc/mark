"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Crosshair from "@/components/crosshair";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [crosshairColor, setCrosshairColor] = useState("black");

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center gap-8 min-h-screen bg-white"
    >
      <Crosshair containerRef={containerRef} color={crosshairColor} />
      <Image
        src="/mark_logo.png"
        alt="mark logo"
        className="w-1/4 h-auto cursor-pointer"
        width={0}
        height={0}
        sizes="25vw"
        onMouseEnter={() => setCrosshairColor("red")}
        onMouseLeave={() => setCrosshairColor("black")}
      />
      <h1 className="text-black text-1xl font-medium">Coming Soon</h1>
    </div>
  );
}
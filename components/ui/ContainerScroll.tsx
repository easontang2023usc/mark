"use client";
import React, { useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import DockTabs from "@/components/ui/DockTabs"; // Import DockTabs
import Typography from "./Typography";

export const ContainerScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [activeTab, setActiveTab] = useState("Summary");

  const scaleDimensions = () => [1.1, 1];
  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex flex-col items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <motion.div
          style={{ translateY: translate }}
          className="max-w-5xl mx-auto text-center mb-6"
        >
          {/* <h2 className="text-3xl font-bold">Synced directly to your devices</h2>
          <p className="text-sm text-gray-500">Grow on the go</p> */}
          <Typography variant="h3">Synced directly to your devices</Typography>
          <Typography variant="body1" className="text-neutral-500 mt-2">Grow on the go</Typography>
        </motion.div>

        {/* iPhone Container */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15)",
          }}
          className="relative w-[290px] h-[600px] md:w-[330px] md:h-[650px] mx-auto border-[1.5px] border-[#6C6C6C] p-3 bg-[#222222] rounded-[45px] shadow-lg flex flex-col items-center justify-center"
        >
          {/* Dynamic Island (Notch) */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-full shadow-md" />

          {/* Dynamic Content Inside iPhone */}
          <div className="h-full w-full overflow-hidden rounded-[35px] bg-gray-100 dark:bg-zinc-900 p-4 flex flex-col items-center justify-center">
            <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone />
          </div>
        </motion.div>

        {/* Dock BELOW the iPhone */}
        <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone={false} />
      </div>
    </div>
  );
};

export default ContainerScroll;
"use client";
import React, { useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DockTabs from "@/components/ui/DockTabs";
import Typography from "./ui/Typography";

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

  const tabDescriptions: Record<string, string> = {
    Summary: "Review key takeaways from your latest reading.",
    Friends: "See what your friends are reading and share insights.",
    Games: "Engage in interactive reading challenges and games.",
    Data: "Visualize your reading habits and track progress.",
  };

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 "
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* iPhone and Tabs Container */}
          <div className="flex flex-col items-center gap-4" style={{ perspective: "1000px" }}>
            {/* iPhone Container */}
            <motion.div
              style={{
                rotateX: rotate,
                scale,
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15)",
              }}
              className="w-[290px] h-[600px] md:w-[330px] md:h-[650px] border-[1.5px] border-[#6C6C6C] p-3 bg-[#222222] rounded-[45px] shadow-lg flex flex-col items-center justify-center relative"
            >
              {/* iPhone Island - Now has a higher z-index to always stay on top */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-full shadow-md z-20" />

              <div className="h-full w-full overflow-hidden rounded-[35px] bg-gray-100 dark:bg-zinc-900 p-4 flex flex-col items-center justify-center relative">
                <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone />
              </div>
            </motion.div>

            {/* Dock below iPhone */}
            <div className="w-full flex justify-center">
              <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone={false} />
            </div>
          </div>
           {/* Text Section */}
           <motion.div
            style={{ translateY: translate }}
            className="text-left max-w-md"
          >
            <Typography variant="body1">Synced directly to your devices</Typography>
            <Typography variant="h3" className="textneut">
              {tabDescriptions[activeTab] || ""}
            </Typography>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContainerScroll;
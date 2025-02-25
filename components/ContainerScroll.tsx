"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DockTabs from "@/components/ui/DockTabs";
import Typography from "./ui/Typography";

export const ContainerScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [activeTab, setActiveTab] = useState("Summary");
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile when component mounts and on window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Different animation ranges for mobile and desktop
  const mobileRange = [0, 0.1];
  const desktopRange = [0, 0.15];
  
  const animationRange = isMobile ? mobileRange : desktopRange;
  
  // For mobile: start static (0 rotation, 1 scale) and animate as scrolling
  // For desktop: keep original behavior (start animated, end static)
  const rotate = useTransform(
    scrollYProgress,
    animationRange,
    isMobile ? [0, 20] : [20, 0] // Mobile: 0 -> 20, Desktop: 20 -> 0
  );
  const scale = useTransform(
    scrollYProgress,
    animationRange,
    isMobile ? [1, 1.1] : [1.1, 1] // Mobile: 1 -> 1.1, Desktop: 1.1 -> 1
  );
  const translate = useTransform(
    scrollYProgress,
    animationRange,
    isMobile ? [-50, 0] : [0, -50] // Mobile: -50 -> 0, Desktop: 0 -> -50
  );

  const tabDescriptions: Record<string, string> = {
    Summary: "Review key takeaways from your latest reading.",
    Friends: "See what your friends are reading and share insights.",
    Games: "Engage in interactive reading challenges and games.",
    Data: "Visualize your reading habits and track progress.",
  };

  return (
    <div
      className="h-[55rem] md:h-[70rem] flex items-center justify-center relative p-4 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative max-w-6xl mx-auto pt-56">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* iPhone and Tabs Container */}
          <div className="flex flex-col items-center gap-6 md:gap-4" style={{ perspective: "1000px" }}>
            {/* iPhone Container */}
            <motion.div
              style={{
                rotateX: rotate,
                scale,
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15)",
              }}
              className="w-[250px] h-[520px] md:w-[330px] md:h-[650px] border-[1.5px] border-[#6C6C6C] p-3 bg-[#222222] rounded-[45px] shadow-lg flex flex-col items-center justify-center relative"
            >
              {/* iPhone Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-full shadow-md z-20" />
              <div className="h-full w-full overflow-hidden rounded-[35px] bg-gray-100 dark:bg-zinc-900 p-4 flex flex-col items-center justify-center relative">
                <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone />
              </div>
            </motion.div>

            {/* Dock below iPhone */}
            <div className="w-full flex justify-center mb-4 md:mb-0">
              <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone={false} />
            </div>
          </div>
          {/* Text Section */}
          <motion.div
            style={{ translateY: translate }}
            className="text-left max-w-md px-12 pt-6 md:px-0"
          >
            <Typography variant="body1" className="mb-2">Synced directly to your devices</Typography>
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
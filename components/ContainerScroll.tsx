"use client";
import React, { useRef, useState, useEffect } from "react";
import DockTabs from "@/components/ui/DockTabs";
import Typography from "./ui/Typography";

export const ContainerScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Summary");
  const [isMobile, setIsMobile] = useState(false);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    setTextKey((prev) => prev + 1);
  }, [activeTab]);

  const tabDescriptions: Record<string, string> = {
    Summary: "Review key takeaways from your latest reading.",
    Friends: "See what your friends are reading and share insights.",
    Games: "Engage in interactive reading challenges and games.",
    Data: "Visualize your reading habits and track progress.",
  };

  return (
    <div
      className={`h-auto min-h-[55rem] ${
        isMobile ? "p-4 pb-12" : "md:min-h-[70rem] md:p-20 md:pb-20"
      } flex items-center justify-center relative`}
      ref={containerRef}
    >
      <div className="py-8 md:py-20 w-full relative max-w-6xl mx-auto pt-20 md:pt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="text-left max-w-md px-4 md:px-0 order-1 md:order-2">
            <Typography
              variant="body1"
              className={`mb-1 md:mb-2 ${
                isMobile ? "text-sm" : "md:text-base"
              } leading-tight`}
            >
              Synced directly to your devices
            </Typography>
            <div
              className="transition-opacity duration-300 ease-in-out"
              style={{ opacity: 0, animation: "fadeIn 0.3s ease-in-out forwards" }}
              key={textKey}
            >
              <Typography
                variant="h3"
                className={`textneut ${
                  isMobile ? "text-xl leading-snug" : "md:text-2xl md:leading-normal"
                }`}
              >
                {tabDescriptions[activeTab] || ""}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:gap-6 order-2 md:order-1">
            <div
              className={`${
                isMobile
                  ? "w-[220px] h-[460px]"
                  : "md:w-[330px] md:h-[650px]"
              } border-[1.5px] border-[#6C6C6C] p-2 md:p-3 bg-[#222222] rounded-[45px] shadow-lg flex flex-col items-center justify-center relative`}
            >
              <div
                className={`absolute top-4 ${
                  isMobile ? "w-16 h-4" : "md:top-5 md:w-24 md:h-6"
                } left-1/2 -translate-x-1/2 bg-black rounded-full shadow-md z-20`}
              />
              <div
                className={`h-full w-full overflow-hidden rounded-[35px] bg-gray-100 dark:bg-zinc-900 ${
                  isMobile ? "p-2" : "md:p-3"
                } flex flex-col items-center justify-between relative`}
              >
                <DockTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  insideIphone
                />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <DockTabs activeTab={activeTab} setActiveTab={setActiveTab} insideIphone={false} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ContainerScroll;
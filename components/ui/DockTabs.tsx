"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/ui/Typography";
import Image from "next/image";

const tabs = ["Summary", "Friends", "Games", "Data"];

// Fixed image mapping with consistent casing and error handling
const tabContent = {
  "Summary": { 
    image: "/Mark_Assets/Summary.jpg", 
    fallbackImage: "/Mark_Assets/Summary.jpg", // Fallback to working image
    text: "Review key takeaways from your latest reading." 
  },
  "Friends": { 
    image: "/Mark_Assets/Friends.jpg", 
    fallbackImage: "/Mark_Assets/Friends.jpg",
    text: "See what your friends are reading and share insights." 
  },
  "Games": { 
    image: "/Mark_Assets/Games.jpg", 
    fallbackImage: "/Mark_Assets/Games.jpg",
    text: "Engage in interactive reading challenges and games." 
  },
  "Data": { 
    image: "/Mark_Assets/Data.jpg", 
    fallbackImage: "/Mark_Assets/Data.jpg",
    text: "Visualize your reading habits and track progress." 
  }
};

const DockTabs = ({
  activeTab,
  setActiveTab,
  insideIphone,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  insideIphone?: boolean;
}) => {
  const [imgSrc, setImgSrc] = React.useState(
    tabContent[activeTab as keyof typeof tabContent]?.image || ""
  );

  // Reset image source when activeTab changes
  React.useEffect(() => {
    setImgSrc(tabContent[activeTab as keyof typeof tabContent]?.image || "");
  }, [activeTab]);

  // Handle image load error
  const handleImageError = () => {
    console.error(`Failed to load image for ${activeTab}`);
    setImgSrc(tabContent[activeTab as keyof typeof tabContent]?.fallbackImage || "");
  };

  return insideIphone ? (
    <motion.div
      key={activeTab}
      className="w-full flex flex-col items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image 
        src={imgSrc} 
        alt={activeTab}
        width={500}
        height={500}
        className="max-w-[112%] -mt-3 relative z-10"
        priority
        onError={handleImageError}
      />
      <Typography 
        variant="body3" 
        className="mt-2 text-center px-4"
      >
        {tabContent[activeTab as keyof typeof tabContent]?.text}
      </Typography>
    </motion.div>
  ) : (
    <div className="mt-6 flex items-center justify-center bg-white p-3 rounded-full shadow-md">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`w-20 h-10 text-sm font-semibold rounded-full ${
            activeTab === tab ? "bg-[#FB6839] text-white" : "text-gray-600 hover:bg-gray-100"
          } transition-colors duration-200`}
          onClick={() => setActiveTab(tab)}
        >
          <Typography variant="body3">
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
};

export default DockTabs;
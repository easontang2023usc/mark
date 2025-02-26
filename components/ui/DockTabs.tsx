"use client";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/ui/Typography";
import Image from "next/image";

const tabs = ["Summary", "Friends", "Games", "Data"];

const DockTabs = ({
  activeTab,
  setActiveTab,
  insideIphone,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  insideIphone?: boolean;
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case "Summary":
        return { image: "/Mark_Assets/summary.jpg", text: "Review key takeaways from your latest reading." };
      case "Friends":
        return { image: "/Mark_Assets/friends.jpg", text: "See what your friends are reading and share insights." };
      case "Games":
        return { image: "/Mark_Assets/games.jpg", text: "Engage in interactive reading challenges and games." };
      case "Data":
        return { image: "/Mark_Assets/Data.jpg", text: "Visualize your reading habits and track progress." };
      default:
        return {};
    }
  };

  const content = renderContent();

  return insideIphone ? (
    <motion.div
      key={activeTab}
      className="w-full flex flex-col items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image 
        src={content.image || ''} 
        alt={activeTab}
        width={500}
        height={500}
        className="max-w-[112%] mt-3 relative z-10"
        priority
      />
      <Typography 
        variant="body3" 
        className="mt-2 text-center px-4"
      >
        {content.text}
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
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/Typography"; // Import Typography

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
        return { image: "/Mark_Assets/summary.svg", text: "Review key takeaways from your latest reading." };
      case "Friends":
        return { image: "/Mark_Assets/friends.svg", text: "See what your friends are reading and share insights." };
      case "Games":
        return { image: "/Mark_Assets/games.svg", text: "Engage in interactive reading challenges and games." };
      case "Data":
        return { image: "/Mark_Assets/Data.svg", text: "Visualize your reading habits and track progress." };
      default:
        return {};
    }
  };

  const content = renderContent();

  return insideIphone ? (
    <motion.div
      key={activeTab}
      className="w-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img src={content.image} alt={activeTab} className="max-w-[112%] mt-3" />
    </motion.div>
  ) : (
    <div className="mt-6 flex items-center justify-center bg-white p-3 rounded-full shadow-md relative">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`relative flex items-center justify-center w-20 h-10 text-sm font-semibold transition-all ${
            activeTab === tab ? "text-white" : "text-gray-600"
          } hover:text-[#FB6839]`}
          onClick={() => setActiveTab(tab)}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="dockHighlight"
              className="absolute inset-0 w-full h-full bg-[#FB6839] rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
          <Typography variant="body3" className="relative z-10">
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
};

export default DockTabs;
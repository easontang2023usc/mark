"use client";
import React from "react";
import { motion } from "framer-motion";

export function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-700 opacity-20"
      />
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-indigo-700 opacity-10"
      />
    </div>
  );
}
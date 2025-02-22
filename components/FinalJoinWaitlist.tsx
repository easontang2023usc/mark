"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function FinalJoinWaitlist() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white relative">
      <div className="max-w-2xl mx-auto p-6 text-center">
        {/* Title */}
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-gray-800">
          Join the Waitlist
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-lg mx-auto mt-4 text-sm md:text-lg relative z-10">
          Be the first to experience Mark.
        </p>

        {/* Email Input & Submit Button */}
        <div className="flex items-center gap-3 mt-6 bg-gray-100 px-2 py-2 rounded-full shadow-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow p-3 border-none rounded-full focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-500"
          />
          <button
            className="px-6 py-3 bg-[#FB6839] text-white font-semibold rounded-full hover:bg-[#E25F33] transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}

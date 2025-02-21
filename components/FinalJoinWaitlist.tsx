"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function FinalJoinWaitlist() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white relative">
      <div className="max-w-2xl mx-auto p-6 text-center">
        {/* Title */}
        <h1 className="relative z-10 text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-500 font-bold">
          Join the Waitlist
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-lg mx-auto mt-4 text-sm md:text-lg relative z-10">
          Be the first to experience Mark.
        </p>

        {/* Email Input & Submit Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-96 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500 bg-gray-100 text-gray-900"
          />
          <button className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-200">
            Submit
          </button>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}
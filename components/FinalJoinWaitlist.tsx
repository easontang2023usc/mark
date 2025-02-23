"use client";
import React from "react";
import Typography from "@/components/ui/Typography";

export default function FinalJoinWaitlist() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white relative pb-0">
      <div className="max-w-2xl mx-auto p-6 text-center">
        {/* Title */}
        <Typography variant="h1" className="relative z-10 text-gray-800">
          Join the Waitlist
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" className="text-gray-600 max-w-lg mx-auto mt-4 relative z-10">
          Be the first to experience Mark.
        </Typography>

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

      {/* Large Image Below Button */}
      <div className="w-full relative flex justify-center">
        <img
          src="/Mark_Assets/still4.svg"
          alt="Summary Feature"
          className="w-full max-w-9xl h-auto object-cover opacity-90"
        />
      </div>
    </div>
  );
}
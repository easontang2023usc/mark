"use client";
import React from "react";
import Typography from "@/components/ui/Typography";
import WaitlistDialog from "./waitlistForm";

export default function FinalJoinWaitlist() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white pb-0">
      <div className="max-w-2xl mx-auto p-6 text-center space-y-4">
        {/* Title */}
        <Typography variant="h1" className="relative z-10 text-gray-800">
          Join the Waitlist
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" className="text-gray-600 max-w-lg mx-auto mt-4">
          Be the first to experience Mark.
        </Typography>

        {/* Email Input & Submit Button */}
        <WaitlistDialog />
      </div>

      {/* Large Image Below Button */}
       {/* Large Image Below Button */}
      <div className="w-full flex justify-center overflow-hidden relative h-[500px]"> {/* Adjust height */}
        <img
          src="/Mark_Assets/still8.png"
          alt="Summary Feature"
          className="w-full max-w-7xl h-auto object-cover object-[50%_-150px] relative left-10"
        />
      </div>
    </div>
  );
}

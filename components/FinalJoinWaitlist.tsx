"use client";
import React from "react";
import Typography from "@/components/ui/Typography";
import WaitlistDialog from "./waitlistForm";
import MobileWaitlist from "./mobileWaitlist";
import Image from "next/image"; // Import the Image component

export default function FinalJoinWaitlist() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      {/* Text Content - Responsive padding and spacing */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-2 sm:mb-4 md:mb-2">
        <Typography variant="h1" className="relative z-10 text-gray-800">
          Join the Waitlist
        </Typography>
        <Typography variant="body1" className="text-gray-600 max-w-lg mx-auto mt-2 sm:mt-4">
          Be the first to experience Mark.
        </Typography>
        <div className="hidden sm:block">
          <WaitlistDialog />
        </div>
        <div className="block sm:hidden">
          <MobileWaitlist />
        </div>
      </div>

      {/* Responsive Image Container */}
      <div className="w-full flex justify-center overflow-hidden mt-2 sm:mt-0">
        <Image
          src="/Mark_Assets/still8.png"
          alt="Summary Feature"
          width={1440} // Adjust based on your max-w-7xl (7xl = 80rem = 1280px typically, but tweak as needed)
          height={600} // Estimate based on your image’s aspect ratio
          className="w-full max-w-7xl object-cover translate-x-0 sm:translate-x-2 md:translate-x-4 lg:translate-x-8 relative"
          quality={75} // Optional: Adjust quality for optimization (default is 75)
          priority={false} // Set to true if this is above-the-fold content
        />
      </div>
    </div>
  );
}
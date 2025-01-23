import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Image
        src="/mark_logo.png"
        alt="mark logo"
        className="w-1/4 h-auto" // Optional Tailwind class for additional styling
        width={0} // Set to 0 to use intrinsic width
        height={0} // Set to 0 to use intrinsic height
        sizes="25vw" // 25% of the viewport width
      />
    </div>
  );
}

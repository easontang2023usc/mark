"use client"

import { useState } from "react";
import Link from "next/link";
import WaitlistDialog from "./waitlistForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-[2%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[900px] rounded-full bg-[rgba(84,84,84,0.6)] backdrop-blur-md shadow-md flex items-center justify-between px-6 py-3 z-50">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              src="/Mark_Assets/Mark_logo_full_white.png"
              alt="Mark Logo"
              className="h-7 w-auto"
            />
          </Link>
        </div>

        <WaitlistDialog />
      
      </nav>
    </>
  );
}
"use client";
import "../styles/Footer.css";
import Typography from "@/components/ui/Typography";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer className="flex flex-col items-center w-full bg-white text-black">
      <div className="w-full h-px bg-gray-500"></div>
      
      <div className="w-11/12 max-w-5xl py-4 md:py-8 flex flex-col space-y-5">
        {/* Row 1: Home, Terms, Privacy, Contact */}
        <div className={`flex ${isMobile ? 'flex-col items-center gap-4' : 'justify-between'} flex-wrap`}>
          <Link href="/" className="text-black hover:text-[#FB6839] transition-colors">
            <Typography variant="body2">Home</Typography>
          </Link>
          <div className="flex space-x-6 flex-wrap gap-4">
            <Link href="/terms-and-service" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
            <Link href="/privacy-policy" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
            <Link href="mailto:contact@mark.engineering" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Contact@Mark.Engineering</Typography>
            </Link>
          </div>
        </div>

        {/* Row 2: Manifesto and Social Links */}
        <div className={`flex ${isMobile ? 'flex-col items-center gap-4' : 'justify-between'} flex-wrap`}>
          <Link href="/manifesto" className="text-black hover:text-[#FB6839] transition-colors">
            <Typography variant="body2">Manifesto</Typography>
          </Link>
          <div className="flex space-x-6 flex-wrap gap-4">
            <Link 
              href="https://x.com/markhardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#FB6839] transition-colors"
            >
              <Typography variant="body2">X</Typography>
            </Link>
            <Link 
              href="https://www.linkedin.com/company/markhardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#FB6839] transition-colors"
            >
              <Typography variant="body2">LinkedIn</Typography>
            </Link>
            <Link 
              href="https://www.instagram.com/mark.engineering" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#FB6839] transition-colors"
            >
              <Typography variant="body2">Instagram</Typography>
            </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <Typography variant="body2" className="text-gray-500 font-normal">
            Created by <a href="https://x.com/EasonTang23" className="font-bold">Eason Tang</a> and <a href="https://x.com/Henryyinn" className="font-bold">Henry Yin</a>
          </Typography>
        </div>

         {/* Row 4: Designed in Los Angeles */}
         <div className="flex justify-end">
          <Typography variant="body2" className="text-gray-500 font-normal">
            Designed in Los Angeles, California
          </Typography>
        </div>
      </div>

      <div className="footer-hover-text my-2">
        <TextHoverEffect text="MARK ENGINEERING" />
      </div>

      <div className="text-sm text-gray-500 pb-4">
        <Typography variant="body2">© 2025 Mark Engineering. All rights reserved.</Typography>
      </div>
      <div className="w-full h-px bg-gray-500"></div>
    </footer>
  );
}
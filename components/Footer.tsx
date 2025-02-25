"use client";
import "../styles/Footer.css";
import Typography from "@/components/ui/Typography";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer className="flex flex-col items-center justify-center text-center w-full bg-white text-black">
      <div className="w-full h-px bg-gray-500"></div>
      
      {/* Main Footer Content */}
      <div className={`w-11/12 max-w-5xl py-4 md:py-8 ${isMobile ? 'h-auto' : 'h-48'}`}>
        {/* Desktop Layout */}
        <div className={`${isMobile ? 'hidden' : 'flex'} justify-between items-start w-full`}>
          {/* Footer Left Section */}
          <div className="flex flex-col items-start space-y-2">
            <Link href="/" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Home</Typography>
            </Link>
            <Link href="/manifesto" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Manifesto</Typography>
            </Link>
          </div>

          {/* Footer Right Section */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex gap-6">
              <Link href="/terms-and-service" className="text-black hover:text-[#FB6839] transition-colors">
                <Typography variant="body2">Terms of Service</Typography>
              </Link>
              <Link href="/privacy-policy" className="text-black hover:text-[#FB6839] transition-colors">
                <Typography variant="body2">Privacy Policy</Typography>
              </Link>
              <Link href="mailto:contact@mark.engineering" target="_blank" className="text-black hover:text-[#FB6839] transition-colors">
                <Typography variant="body2">Contact@Mark.Engineering</Typography>
              </Link>
            </div>
            <div className="flex gap-6">
              <Link 
                href="https://x.com/markhardware" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-[#FB6839] transition-colors mt-2"
              >
                <Typography variant="body2">X</Typography>
              </Link>
              <Link 
                href="https://www.linkedin.com/company/markhardware" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-[#FB6839] transition-colors mt-2"
              >
                <Typography variant="body2">LinkedIn</Typography>
              </Link>
              <Link 
                href="https://www.instagram.com/mark.engineering" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-[#FB6839] transition-colors mt-2"
              >
                <Typography variant="body2">Instagram</Typography>
              </Link>
            </div>
            <Typography variant="body2" className="text-gray-500">
              Designed in Los Angeles
            </Typography>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className={`${isMobile ? 'flex' : 'hidden'} flex-col items-center w-full space-y-6`}>
          {/* Top Navigation Links */}
          <div className="flex flex-col items-center space-y-2">
            <Link href="/" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Home</Typography>
            </Link>
            <Link href="/manifesto" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Manifesto</Typography>
            </Link>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col items-center space-y-2">
            <Link href="/terms-and-service" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
            <Link href="/privacy-policy" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
            <Link href="mailto:contact@mark.engineering" target="_blank" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Contact@Mark.Engineering</Typography>
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6">
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

          <Typography variant="body2" className="text-gray-500">
            Designed in Los Angeles
          </Typography>
        </div>
      </div>

      {/* Hover Effect Text - Responsive */}
      <div className="footer-hover-text my-2">
        <TextHoverEffect text="MARK ENGINEERING" />
      </div>

      {/* Footer Bottom Text */}
      <div className="text-sm text-gray-500 pb-4">
        <Typography variant="body2">© 2025 Mark Engineering. All rights reserved.</Typography>
      </div>
      <div className="w-full h-px bg-gray-500"></div>
    </footer>
  );
}
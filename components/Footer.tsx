"use client";
import "../styles/Footer.css";
import Typography from "@/components/ui/Typography";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center text-center w-full bg-white text-black">
      <div className="w-full h-px bg-gray-500"></div>
      <div className="flex justify-between items-start w-11/12 max-w-5xl py-8 h-48">
        
        {/* Footer Left Section */}
        <div className="flex flex-col items-start space-y-2">
          <a href="#" className="text-black hover:text-[#FB6839] transition-colors">
            <Typography variant="body2">Home</Typography>
          </a>
          <a href="#" className="text-black hover:text-[#FB6839] transition-colors">
            <Typography variant="body2">Manifesto</Typography>
          </a>
        </div>

        {/* Footer Right Section */}
        <div className="flex flex-col items-end space-y-2">
          <div className="flex gap-6">
            <a href="#" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Terms of Service</Typography>
            </a>
            <a href="#" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Privacy Policy</Typography>
            </a>
            <a href="#" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Contact Us</Typography>
            </a>
            {/* <a href="#" className="text-black hover:text-[#FB6839] transition-colors">
              <Typography variant="body2">Returns</Typography>
            </a> */}
          </div>
          <div className="flex gap-6">
            <a 
              href="https://x.com/markhardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#FB6839] transition-colors mt-2"
            >
              <Typography variant="body2">X</Typography>
            </a>
            <a 
              href="https://www.linkedin.com/company/markhardware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#FB6839] transition-colors mt-2"
            >
              <Typography variant="body2">LinkedIn</Typography>
            </a>
            <a 
              href="https://www.instagram.com/mark.engineering" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#FB6839] transition-colors mt-2"
            >
              <Typography variant="body2">Instagram</Typography>
            </a>
          </div>
         
          <Typography variant="body2" className="text-gray-500">
            Designed in Los Angeles
          </Typography>
         
          
        </div>
      </div>

      {/* Hover Effect Text */}
      <div className="footer-hover-text">
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
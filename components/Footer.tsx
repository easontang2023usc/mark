"use client";
import "../styles/Footer.css";
import Typography from "@/components/ui/Typography";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line"></div>
      <div className="footer-content">
      
        {/* Footer Left Section */}
        <div className="footer-left">
        <a href="#">
            <Typography variant="body2"></Typography>
          </a>
          <a href="#">
            <Typography variant="body2">Home</Typography>
          </a>
          <a href="#">
            <Typography variant="body2">Manifesto</Typography>
          </a>
        </div>

        {/* Footer Right Section */}
        <div className="footer-right">
          <Typography variant="body2" className="text-gray-500">
            Designed in Los Angeles
          </Typography>
          <div className="footer-links">
            <a href="#">
              <Typography variant="body2">Terms of Service</Typography>
            </a>
            <a href="#">
              <Typography variant="body2">Privacy Policy</Typography>
            </a>
            <a href="#">
              <Typography variant="body2">Returns</Typography>
            </a>
          </div>
          <a href="#" className="footer-x">
            <Typography variant="body2">X</Typography>
          </a>
        </div>
      </div>

      <div className="footer-hover-text">
        <TextHoverEffect text="MARK ENGINEERING" />
      </div>

      {/* Footer Bottom Text */}
      <div className="footer-bottom">
        <Typography variant="body2" className="text-gray-500">
          © 2025 Mark Engineering. All rights reserved.
        </Typography>
      </div>

      <div className="footer-line"></div>

      {/* Hover Effect Text in the Footer */}
      
    </footer>
  );
}
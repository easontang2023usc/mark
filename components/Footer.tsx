"use client";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line"></div>
      <div className="footer-left">
        <a href="#">Home</a>
        <a href="#">Manifesto</a>
      </div>
      <div className="footer-right">
        <p>Designed in Los Angeles</p>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Returns</a>
        <a href="#">X</a>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Mark Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
}
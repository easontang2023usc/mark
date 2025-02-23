"use client";
import Link from "next/link";
import "../styles/Navbar.css";
import Typography from "@/components/ui/Typography";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/Mark_Assets/Mark_logo_only_black.png" alt="Mark Logo" className="logo-img" />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link href="#manifesto">
          <Typography variant="body3">Manifesto</Typography>
        </Link>
        <Link href="#waitlist" className="joinwaitlist">
          <Typography variant="body3" className="text-white">Join Waitlist</Typography>
        </Link>
      </div>
    </nav>
  );
}
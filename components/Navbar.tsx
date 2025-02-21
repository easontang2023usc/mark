"use client";
import Link from "next/link";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Mark_Assets/Mark_logo_only_black.png" alt="Mark Logo" className="logo-img" />
      </div>
      <div className="nav-links">
        <Link href="#manifesto">Manifesto</Link>
        <Link href="#waitlist" className="joinwaitlist">Join Waitlist</Link>
      </div>
    </nav>
  );
}
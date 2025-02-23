"use client";
import "../styles/Hero.css";
import Typography from "@/components/ui/Typography";

export default function Hero() {
  return (
    <section className="hero">
      <Typography variant="h1">Reach your intellectual potential</Typography>
      <Typography variant="body1" className="hero-text">
        Introducing Mark 1, the physical bookmark that tracks and summarizes the pages you read.
      </Typography>
      <button className="join-waitlist-button">Join Waitlist</button>

      {/* Image Sticking to Bottom Right */}
      <div className="hero-image">
        <img src="/Mark_Assets/still6.png" alt="Mark Still 6" className="Markstill6-img" />
      </div>
    </section>
  );
}
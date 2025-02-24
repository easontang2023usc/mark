"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/BookScroll.css";

const bookTitles = [
  "MARK®",
  "Today, book readers struggle to retain everything they read.",
  "But you want that paper feel, not that pixel screen bullsh*t.",
  "65% of Americans feel the same way.",
  "We hear you.",
  "",
];

const StickyScrollDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const targetIndexRef = useRef(0);
  const scrollAccumulator = useRef(0);
  const lastScrollPosition = useRef(0);
  const SCROLL_THRESHOLD = 80;
  const EASING = 0.08;
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasReachedStart, setHasReachedStart] = useState(false);

  const animate = () => {
    if (Math.abs(targetIndexRef.current - currentIndex) > 0.01) {
      setCurrentIndex((prev) => prev + (targetIndexRef.current - prev) * EASING);
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCurrentIndex(targetIndexRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  const jumpToIndex = (index: number) => {
    targetIndexRef.current = index;
    setCurrentIndex(index);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollDirection = window.scrollY - lastScrollPosition.current;
      lastScrollPosition.current = window.scrollY;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight && !hasReachedEnd && !hasReachedStart) {
        setIsSticky(true);
      }

      if (hasReachedEnd && scrollDirection > 0) {
        setIsSticky(false);
      }

      if (hasReachedStart && scrollDirection < 0) {
        setIsSticky(false);
      }

      if (rect.top > 0) {
        setHasReachedStart(false);
        setHasReachedEnd(false);
        targetIndexRef.current = 0;
        setCurrentIndex(0);
        setIsSticky(false);
      }

      if (rect.bottom < window.innerHeight) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasReachedEnd, hasReachedStart]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isSticky) return;
      e.preventDefault();

      scrollAccumulator.current += Math.abs(e.deltaY);

      if (scrollAccumulator.current >= SCROLL_THRESHOLD) {
        scrollAccumulator.current = 0;

        if (e.deltaY > 0) {
          if (targetIndexRef.current < bookTitles.length - 1) {
            targetIndexRef.current++;
            setHasReachedStart(false);
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setHasReachedEnd(true);
            setIsSticky(false);
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }
        } else {
          if (targetIndexRef.current > 0) {
            targetIndexRef.current--;
            setHasReachedEnd(false);
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setHasReachedStart(true);
            setIsSticky(false);
            window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
          }
        }
      }
    };

    if (isSticky) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSticky]);

  return (
    <div ref={containerRef} className="book-scroll-container">
      <div className={`book-scroll ${isSticky ? "sticky" : ""}`}>
        <div className="scroll-lines-container">
          {bookTitles.map((_, index) => {
            const isActive = Math.abs(currentIndex - index) < 1;
            return (
              <div
                key={index}
                className="scroll-line"
                style={{
                  opacity: isActive ? 1 : 0.3,
                  width: isActive ? "50px" : "40px",
                }}
                onClick={() => jumpToIndex(index)}
              />
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="book-container"
        >
          <p className="book-title faded">{bookTitles[Math.floor(currentIndex - 1)] || ""}</p>
          <p className="book-title main">
            {Math.floor(currentIndex) === 3 ? (
              <>
                <span className="highlight">65%</span> of Americans feel the same way.
              </>
            ) : Math.floor(currentIndex) === 2 ? (
              <>
                But you want that paper feel, not that pixel screen{" "}
                <span className="highlight">bullsh*t</span>.
              </>
            ) : (
              bookTitles[Math.floor(currentIndex)]
            )}
          </p>
          <p className="book-title faded">{bookTitles[Math.floor(currentIndex + 1)] || ""}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StickyScrollDemo;
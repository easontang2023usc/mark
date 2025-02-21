"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero3D = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoDuration, setVideoDuration] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameRate = 60; // Adjust based on video frame rate

  // Scroll tracking within the video section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth animations
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["15px", "0px", "10px"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration || 1);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Ensure video only moves forward, does not rewind, and plays full duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoEnded) return;

    const handleScroll = () => {
      const scrollPercentage = Math.min(scrollYProgress.get(), 1);
      const totalFrames = videoDuration * frameRate;
      const newFrame = Math.floor(scrollPercentage * totalFrames);
      const newTime = newFrame / frameRate;

      if (newTime > video.currentTime) {
        video.currentTime = newTime;
        setCurrentFrame(newFrame);
      }

      // If the last frame is reached, prevent scrolling until video actually ends
      if (newFrame >= totalFrames - 1) {
        video.play();
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollYProgress, videoDuration, frameRate, videoEnded]);

  // Unlock scrolling when video ends and smoothly transition
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setVideoEnded(true);

      // Smooth scroll to the next section once video fully plays
      setTimeout(() => {
        window.scrollTo({
          top: containerRef.current?.offsetTop + containerRef.current?.offsetHeight,
          behavior: "smooth",
        });
      }, 500); // Slight delay for better effect
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${videoEnded ? "h-0" : "h-[200vh]"}`}>
      {/* Video is sticky until finished, then disappears */}
      {!videoEnded && (
        <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">
          <motion.video
            ref={videoRef}
            src="/Mark_Assets/mark-video.mp4"
            playsInline
            muted
            className="absolute w-full h-full object-cover"
            style={{ opacity, scale, filter: blur }}
          />
        </div>
      )}
    </div>
  );
};

export default Hero3D;
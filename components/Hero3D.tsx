"use client";

import { useEffect, useRef, useState } from "react";
import Typography from "@/components/ui/Typography";
import "../styles/Hero.css";
import WaitlistDialog from "./waitlistForm";

const Hero3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);

  const images = useRef<HTMLImageElement[]>([]);
  const totalFrames = 85;
  const framePaths = Array.from({ length: totalFrames }, (_, i) =>
    `/Mark_Assets/frames2/frame-${String(i + 1).padStart(4, "0")}.png`
  );

  // Define handleResize function properly before calling it
  const handleResize = () => {
    if (!images.current[0]) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const imageAspectRatio = images.current[0].width / images.current[0].height;
    let width, height;

    if (windowWidth / windowHeight > imageAspectRatio) {
      height = windowHeight;
      width = height * imageAspectRatio;
    } else {
      width = windowWidth;
      height = width / imageAspectRatio;
    }

    setDimensions({ width, height });

    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const ctx = canvasRef.current.getContext("2d");
      const currentImage = images.current[currentFrame];

      if (ctx && currentImage) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(currentImage, 0, 0, width, height);
      }
    }
  };

  useEffect(() => {
    let loadedCount = 0;

    const preloadImages = async () => {
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      try {
        const firstFrame = await loadImage(framePaths[0]);
        images.current[0] = firstFrame;
        loadedCount++;
        setLoadingProgress((loadedCount / totalFrames) * 100);

        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          ctx?.drawImage(firstFrame, 0, 0, firstFrame.width, firstFrame.height);
        }

        for (let i = 1; i < framePaths.length; i++) {
          const img = await loadImage(framePaths[i]);
          images.current[i] = img;
          loadedCount++;
          setLoadingProgress((loadedCount / totalFrames) * 100);
        }

        setIsLoading(false);
        handleResize(); // Call handleResize after all images are loaded
      } catch (error) {
        console.error("Error loading frames:", error);
      }
    };

    preloadImages();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isLoading && images.current.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.drawImage(images.current[0], 0, 0, dimensions.width, dimensions.height);
    }
  }, [isLoading, dimensions]);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + scrollTop;
      const containerHeight = containerRect.height;

      const progress = (scrollTop - containerTop) / (containerHeight - window.innerHeight);
      const frameIndex = Math.min(
        Math.max(0, Math.floor(progress * (totalFrames - 1))),
        totalFrames - 1
      );

      if (frameIndex !== currentFrame) {
        setCurrentFrame(frameIndex);
        const ctx = canvasRef.current.getContext("2d");
        const currentImage = images.current[frameIndex];

        if (ctx && currentImage) {
          ctx.clearRect(0, 0, dimensions.width, dimensions.height);
          ctx.drawImage(currentImage, 0, 0, dimensions.width, dimensions.height);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, dimensions, currentFrame]);

  return (
    <div className="relative">
      {/* Section before animation starts */}
      <div className="py-[2%] flex flex-col items-center justify-center text-center bg-[#FCFCFC] px-6 pt-40">
        <Typography
          variant="h1"
          className="bg-gradient-to-b from-black to-gray-500 bg-clip-text text-transparent pb-5"
        >
          Ready to remember everything?
        </Typography>
      </div>

      {/* Scrollable animation section */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 w-screen h-screen flex flex-col justify-between bg-[#FCFCFC]">
          {/* Canvas positioned at bottom */}
          <div className="flex-grow flex items-end justify-center">
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              className="max-w-full max-h-full object-contain"
              style={{ objectPosition: "bottom" }}
            />
          </div>

          {/* Fading Text and Button (Centered Correctly) */}
          <div
            className={`absolute px-4 flex flex-col items-center gap-5 transition-opacity duration-500 transform ${
              currentFrame >= 30 && currentFrame <= 63
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              top: "15vh",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "600px",
              textAlign: "center"
            }}
          >
            <Typography variant="h2" className="text-black w-[700]" >
              Reach your intellectual potential
            </Typography>
            <Typography variant="body2" className="hero-text">
              Introducing Mark 1, the physical bookmark that tracks and summarizes the pages you read.
            </Typography>

            <WaitlistDialog />
          </div>

          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FCFCFC] bg-opacity-50">
              <div className="text-black text-lg">
                Loading frames... {Math.round(loadingProgress)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
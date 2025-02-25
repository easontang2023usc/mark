"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Typography from "@/components/ui/Typography";
import "../styles/Hero.css";
import WaitlistDialog from "./waitlistForm";

const Hero3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const totalFrames = 85;
  const framePaths = Array.from({ length: totalFrames }, (_, i) =>
    `/Mark_Assets/frames2/frame-${String(i + 1).padStart(4, "0")}.png`
  );

  /** Function to draw a frame */
  const updateCanvas = useCallback(
    (frameIndex: number) => {
      if (!canvasRef.current || !images.current[frameIndex] || !imagesLoaded) return;

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        ctx.drawImage(images.current[frameIndex], 0, 0, dimensions.width, dimensions.height);
      }
    },
    [dimensions, imagesLoaded]
  );

  /** Function to resize canvas dynamically */
  const handleResize = useCallback(() => {
    if (!imagesLoaded || !images.current[0] || !canvasRef.current) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const imageAspectRatio = images.current[0].width / images.current[0].height;

    let width = windowWidth;
    let height = width / imageAspectRatio;

    if (height > windowHeight) {
      height = windowHeight;
      width = height * imageAspectRatio;
    }

    setDimensions((prev) => (prev.width !== width || prev.height !== height ? { width, height } : prev));

    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      updateCanvas(currentFrame);
    }
  }, [imagesLoaded, currentFrame, updateCanvas]);

  /** Function to handle scrolling animation */
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !canvasRef.current || !imagesLoaded) return;

    const container = containerRef.current;
    const scrollTop = window.scrollY;
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const containerHeight = containerRect.height;

    const frameProgress = (scrollTop - containerTop) / (containerHeight - window.innerHeight);
    const frameIndex = Math.min(
      Math.max(0, Math.floor(frameProgress * (totalFrames - 1))),
      totalFrames - 1
    );

    if (frameIndex !== currentFrame) {
      setCurrentFrame(frameIndex);
      updateCanvas(frameIndex);
    }
  }, [imagesLoaded, currentFrame, totalFrames, updateCanvas]);

  /** Load images into memory */
  useEffect(() => {
    if (imagesLoaded) return;

    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          framePaths.map((path) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = () => resolve(img);
              img.src = path;
            })
          )
        );

        images.current = loadedImages;
        setImagesLoaded(true);

        if (loadedImages[0]) {
          handleResize();
          updateCanvas(0);
        }
      } catch (error) {
        console.error("Error loading frames:", error);
      }
    };

    loadImages();
  }, [framePaths, imagesLoaded, updateCanvas, handleResize]);

  /** Scroll event listener */
  useEffect(() => {
    if (!imagesLoaded) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [imagesLoaded, handleScroll]);

  /** Resize event listener */
  useEffect(() => {
    if (!imagesLoaded) return;

    window.addEventListener("resize", handleResize);
    requestAnimationFrame(() => {
      handleResize();
      handleScroll();
    });

    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, handleResize, handleScroll]);

  return (
    <div className="relative overflow-x-clip">
      <div className="py-[2%] flex flex-col items-center justify-center text-center bg-[#FCFCFC] px-6 pt-40">
        <Typography
          variant="h1"
          className="bg-gradient-to-b from-black to-gray-500 bg-clip-text text-transparent pb-5"
        >
          Ready to remember everything?
        </Typography>
      </div>

      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 w-screen h-screen flex flex-col justify-between bg-[#FCFCFC]">
          <div className="flex-grow flex items-end justify-center">
            <canvas
              ref={canvasRef}
              width={dimensions.width || 100}
              height={dimensions.height || 100}
              className="max-w-full max-h-full object-contain"
              style={{ objectPosition: "bottom" }}
            />
          </div>

          <div
            className={`absolute px-4 flex flex-col items-center gap-5 transition-opacity duration-500 transform ${
              currentFrame >= 30 && currentFrame <= 63 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              top: "15vh",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "600px",
              textAlign: "center",
            }}
          >
            <Typography variant="h2" className="text-black w-[700]">
              Unlock your intellectual potential
            </Typography>
            <Typography variant="body1" className="hero-text w-[1000px]">
              Introducing Mark 1, the physical bookmark that tracks and summarizes the pages you read.
            </Typography>
            <WaitlistDialog />
          </div>

          {!imagesLoaded && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FCFCFC] bg-opacity-50">
              <div className="text-black text-lg">Loading frames...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero3D;

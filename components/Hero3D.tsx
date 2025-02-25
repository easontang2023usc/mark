"use client";

import { useEffect, useRef, useState } from "react";
import Typography from "@/components/ui/Typography";
import "../styles/Hero.css";
import WaitlistDialog from "./waitlistForm";

const Hero3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState<boolean[]>([]);

  const images = useRef<HTMLImageElement[]>([]);
  const totalFrames = 85;
  const framePaths = Array.from({ length: totalFrames }, (_, i) =>
    `/Mark_Assets/frames2/frame-${String(i + 1).padStart(4, "0")}.png`
  );

  // Define handleResize function
  const handleResize = () => {
    if (!images.current[0] || !canvasRef.current) return;

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

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    // Always redraw after resize
    drawFrame(currentFrame);
  };

  // Helper function to draw a specific frame
  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current || !images.current[frameIndex]) return;
    
    const ctx = canvasRef.current.getContext("2d");
    const currentImage = images.current[frameIndex];

    if (ctx && currentImage) {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.drawImage(currentImage, 0, 0, dimensions.width, dimensions.height);
    }
  };

  // Priority loading for frames
  useEffect(() => {
    // Initialize frames loaded array with all false
    setFramesLoaded(Array(totalFrames).fill(false));
    
    // First, load just the first frame with high priority
    const loadFirstFrame = async () => {
      try {
        const firstImg = new Image();
        const firstLoadPromise = new Promise<HTMLImageElement>((resolve) => {
          firstImg.onload = () => resolve(firstImg);
          firstImg.onerror = () => {
            console.error(`Failed to load first frame`);
            resolve(firstImg);
          };
          firstImg.src = framePaths[0];
        });

        const firstFrame = await firstLoadPromise;
        images.current[0] = firstFrame;
        
        const newFramesLoaded = [...framesLoaded];
        newFramesLoaded[0] = true;
        setFramesLoaded(newFramesLoaded);
        
        // Set initial dimensions and draw first frame as soon as it's loaded
        if (canvasRef.current && firstFrame) {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const imageAspectRatio = firstFrame.width / firstFrame.height;
          let width, height;

          if (windowWidth / windowHeight > imageAspectRatio) {
            height = windowHeight;
            width = height * imageAspectRatio;
          } else {
            width = windowWidth;
            height = width / imageAspectRatio;
          }

          canvasRef.current.width = width;
          canvasRef.current.height = height;
          setDimensions({ width, height });
          
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(firstFrame, 0, 0, width, height);
            setInitialRenderComplete(true);
          }
        }
        
        // Now load the rest of the frames in batches
        loadRemainingFramesInBatches();
      } catch (error) {
        console.error("Error loading first frame:", error);
      }
    };
    
    // Function to load remaining frames in batches to avoid resource exhaustion
    const loadRemainingFramesInBatches = () => {
      const batchSize = 5;
      const loadBatch = (startIndex: number) => {
        if (startIndex >= totalFrames) return;
        
        const endIndex = Math.min(startIndex + batchSize, totalFrames);
        const batchPromises = [];
        
        for (let i = startIndex; i < endIndex; i++) {
          batchPromises.push(
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => {
                images.current[i] = img;
                const newFramesLoaded = [...framesLoaded];
                newFramesLoaded[i] = true;
                setFramesLoaded(newFramesLoaded);
                resolve();
              };
              img.onerror = () => {
                console.error(`Failed to load frame ${i + 1}`);
                resolve();
              };
              img.src = framePaths[i];
            })
          );
        }
        
        Promise.all(batchPromises).then(() => {
          // Load the next batch after a small delay
          setTimeout(() => loadBatch(endIndex), 100);
        });
      };
      
      // Start loading from frame 1 (index 1) since we already loaded frame 0
      loadBatch(1);
    };
    
    loadFirstFrame();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Force draw first frame when initial render completes
  useEffect(() => {
    if (initialRenderComplete && images.current[0]) {
      drawFrame(0);
      // Trigger scroll calculation manually to set the correct initial frame
      handleScrollPosition();
    }
  }, [initialRenderComplete]);

  // Handle scroll for animation
  const handleScrollPosition = () => {
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

    if (frameIndex !== currentFrame && images.current[frameIndex]) {
      setCurrentFrame(frameIndex);
      drawFrame(frameIndex);
    }
  };

  useEffect(() => {
    if (!initialRenderComplete) return;

    window.addEventListener("scroll", handleScrollPosition, { passive: true });
    
    // Important: Call once immediately to set correct frame without requiring scroll
    handleScrollPosition();
    
    return () => window.removeEventListener("scroll", handleScrollPosition);
  }, [dimensions, currentFrame, initialRenderComplete, framesLoaded]);

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
              width={dimensions.width || 100} // Default size to prevent zero-sized canvas
              height={dimensions.height || 100}
              className="max-w-full max-h-full object-contain"
              style={{ objectPosition: "bottom" }}
            />
          </div>

          {/* Fading Text and Button */}
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
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
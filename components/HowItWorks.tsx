"use client";

import { useEffect, useRef, useState } from "react";

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const images = useRef<HTMLImageElement[]>([]);
  const totalFrames = 55; // 002.jpg to 120.jpg
  const framePaths = Array.from({ length: totalFrames }, (_, i) =>
    `/Mark_Assets/mark_spin/${String(i + 30).padStart(3, "0")}.jpg`
  );

  const initialScale = 1;
  const finalScale = 0.9;
  const initialPadding = 0;
  const finalPadding = 36;
  const initialRadius = 0;
  const finalRadius = 32;

  // Handle canvas resizing
  const handleResize = () => {
    if (!images.current[0] || !canvasRef.current) return;
  
    const windowWidth = window.innerWidth;
    const imageAspectRatio = images.current[0].width / images.current[0].height;
    let width, height;
  
    // Set width to full window width
    width = windowWidth;
    height = width / imageAspectRatio; // Adjust height to maintain aspect ratio
  
    // Ensure height doesn't exceed window height (optional, if you want to cap it)
    const windowHeight = window.innerHeight;
    if (height > windowHeight) {
      height = windowHeight;
      width = height * imageAspectRatio;
    }
  
    setDimensions({ width, height });
  
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext("2d");
    const currentImage = images.current[currentFrame];
  
    if (ctx && currentImage) {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(currentImage, 0, 0, width, height);
    }
  };

  // Preload images
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
        handleResize();
      } catch (error) {
        console.error("Error loading frames:", error);
      }
    };

    preloadImages();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll for both frame scrubbing and parallax effects
  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + scrollTop;
      const containerHeight = containerRect.height;

      // Calculate progress for frame scrubbing
      const frameProgress = (scrollTop - containerTop) / (containerHeight - window.innerHeight);
      const frameIndex = Math.min(
        Math.max(0, Math.floor(frameProgress * (totalFrames - 1))),
        totalFrames - 1
      );

      // Calculate progress for scale and parallax (similar to original HowItWorksPage)
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight / 2;
      const endPoint = startPoint - 550; // Scroll range from original
      const elementTop = containerRect.top;
      let parallaxProgress = 0;

      if (elementTop <= startPoint && elementTop >= endPoint) {
        parallaxProgress = (startPoint - elementTop) / 550;
      } else if (elementTop < endPoint) {
        parallaxProgress = 1;
      }

      setScrollProgress(Math.max(0, Math.min(parallaxProgress, 1)));
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

  // Calculate dynamic styles based on scroll progress
  const radius = initialRadius + (finalRadius - initialRadius) * scrollProgress;
  const scale = initialScale + (finalScale - initialScale) * scrollProgress;
  const padding = initialPadding + (finalPadding - initialPadding) * scrollProgress;

  return (
    <main className="min-h-[120vh] bg-white">
      <div className="container mx-auto px-24 pt-20">
        <div className="max-w-[1000px]">
          <h2 className="text-[21px] text-gray-600 font-medium mb-2">
            So easy to use
          </h2>
          <h1 className="text-[48px] leading-[1.1] font-semibold tracking-[-0.003em] md:text-[80px] md:leading-[1.05] md:tracking-[-0.015em]">
            Read, Mark, Send
          </h1>
        </div>

      </div>

      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-white">
          <div
            style={{
              padding: `${padding}px`,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              transition: "padding 50ms ease-out, transform 50ms ease-out",
            }}
          >
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              style={{
                borderRadius: `${radius}px`,
                overflow: "hidden",
              }}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50">
              <div className="text-black text-lg">
                Loading frames... {Math.round(loadingProgress)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
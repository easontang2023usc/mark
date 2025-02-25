"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function MobileHowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = useRef<HTMLImageElement[]>([]);
  const totalFrames = 55; // 002.jpg to 120.jpg
  const framePaths = Array.from({ length: totalFrames }, (_, i) =>
    `/Mark_Assets/mark_spin/${String(i + 30).padStart(3, "0")}.jpg`
  );

  const initialScale = 1;
  const finalScale = 0.9; // This will be used to maintain aspect ratio
  const initialPadding = 0;
  const finalPadding = 32;
  const initialRadius = 0;
  const finalRadius = 18;
  // Initial and final container dimensions
  const initialHeight = 100; // Percentage value
  const finalHeight = 140; // Taller final height but not too tall

  // Define updateCanvas first as it's used by other functions
  const updateCanvas = useCallback((frameIndex: number) => {
    if (!canvasRef.current || !images.current[frameIndex] || !imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const currentImage = images.current[frameIndex];

    if (ctx && currentImage) {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.drawImage(currentImage, 0, 0, dimensions.width, dimensions.height);
    }
  }, [imagesLoaded, dimensions.width, dimensions.height]);

  // Define handleScroll before it's used
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

    const windowHeight = window.innerHeight;
    const startPoint = windowHeight / 2;
    const endPoint = startPoint - 550;
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
      updateCanvas(frameIndex);
    }
  }, [imagesLoaded, totalFrames, currentFrame, updateCanvas]);

  // Define handleResize after updateCanvas is defined
  const handleResize = useCallback(() => {
    if (!imagesLoaded || !images.current[0] || !canvasRef.current) return;

    const windowWidth = window.innerWidth;
    const imageAspectRatio = images.current[0].width / images.current[0].height;
    let width = windowWidth;
    let height = width / imageAspectRatio;

    const windowHeight = window.innerHeight;
    if (height > windowHeight) {
      height = windowHeight;
      width = height * imageAspectRatio;
    }

    setDimensions({ width, height });
    
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      updateCanvas(currentFrame);
    }
  }, [imagesLoaded, updateCanvas, currentFrame]);

  // Load images into memory
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const loadImages = async () => {
      try {
        // Create image objects for all frames
        const loadedImages = await Promise.all(
          framePaths.map(path => {
            return new Promise<HTMLImageElement>((resolve) => {
              const img = new Image();
              
              img.onload = () => resolve(img);
              img.onerror = () => {
                console.error(`Failed to load ${path}`);
                resolve(img); // Resolve anyway to prevent blocking
              };
              
              img.src = path;
            });
          })
        );
        
        images.current = loadedImages;
        setImagesLoaded(true);
        
        // Initialize sizes once first image is loaded
        if (loadedImages[0] && canvasRef.current) {
          const windowWidth = window.innerWidth;
          const imageAspectRatio = loadedImages[0].width / loadedImages[0].height;
          let width = windowWidth;
          let height = width / imageAspectRatio;

          const windowHeight = window.innerHeight;
          if (height > windowHeight) {
            height = windowHeight;
            width = height * imageAspectRatio;
          }

          if (canvasRef.current) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            setDimensions({ width, height });
          }
          
          // Draw the first frame immediately
          updateCanvas(0);
        }
      } catch (error) {
        console.error("Error loading frames:", error);
      }
    };

    loadImages();
  }, [imagesLoaded, framePaths, updateCanvas]);

  // Set up resize handler after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imagesLoaded, handleResize, handleScroll]);

  // Dynamic styles
  const radius = initialRadius + (finalRadius - initialRadius) * scrollProgress;
  const scale = initialScale + (finalScale - initialScale) * scrollProgress;
  const padding = initialPadding + (finalPadding - initialPadding) * scrollProgress;
  const containerHeight = initialHeight + (finalHeight - initialHeight) * scrollProgress + '%';

  return (
    <main className="min-h-[80vh] bg-white">
      {/* Reduced top padding from pt-6 to pt-2 */}
      <div className="px-4 pt-2">
        <div className="flex flex-col items-left mx-8">
          <h2 className="text-md text-gray-600 font-medium mr-2">
            So easy to use
          </h2>
          <h1 className="font-semibold tracking-tight text-5xl">
            Read, Mark, Send
          </h1>
        </div>
      </div>

      {/* Further reduced height from 150vh to 120vh to reduce bottom spacing */}
      <div ref={containerRef} className="relative h-[120vh">
        {/* Reduced the top margin and adjusted height */}
        <div className="sticky top-8 w-full h-[75vh] flex items-start justify-center bg-white pt-4">
          <div
            style={{
              padding: `${padding}px`,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              height: containerHeight,
              width: '100%',
              transition: "padding 50ms ease-out, transform 50ms ease-out, height 50ms ease-out",
            }}
          >
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              style={{
                borderRadius: `${radius}px`,
                overflow: "hidden",
                display: "block",
                opacity: imagesLoaded ? 1 : 0, // Only show when images are loaded
                transition: "opacity 300ms ease-in",
              }}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
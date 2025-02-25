"use client";

import { useEffect, useRef, useState } from "react";

export default function HowItWorksPage() {
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
  const finalScale = 0.9;
  const initialPadding = 0;
  const finalPadding = 36;
  const initialRadius = 0;
  const finalRadius = 32;

  // Handle canvas resizing and drawing
  const updateCanvas = (frameIndex: number) => {
    if (!canvasRef.current || !images.current[frameIndex] || !imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const currentImage = images.current[frameIndex];

    if (ctx && currentImage) {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.drawImage(currentImage, 0, 0, dimensions.width, dimensions.height);
    }
  };

  const handleResize = () => {
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
      
      // Draw the current frame immediately after resizing
      updateCanvas(currentFrame);
    }
  };

  // Load images into memory
  useEffect(() => {
    // Skip loading if already loaded
    if (imagesLoaded) return;
    
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
  }, [framePaths]);

  // Set up resize handler after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    
    // Set up resize listener
    window.addEventListener("resize", handleResize);
    
    // Manually trigger scroll calculation for initial position
    requestAnimationFrame(() => {
      handleResize();
      handleScroll();
    });
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesLoaded]);

  // Handle scroll for frame scrubbing and parallax effects
  const handleScroll = () => {
    if (!containerRef.current || !canvasRef.current || !imagesLoaded) return;

    const container = containerRef.current;
    const scrollTop = window.scrollY;
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const containerHeight = containerRect.height;

    // Frame scrubbing progress
    const frameProgress = (scrollTop - containerTop) / (containerHeight - window.innerHeight);
    const frameIndex = Math.min(
      Math.max(0, Math.floor(frameProgress * (totalFrames - 1))),
      totalFrames - 1
    );

    // Parallax progress
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
  };

  // Attach scroll handler after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial call to set up proper frame for current scroll position
    requestAnimationFrame(handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [imagesLoaded, dimensions]);

  // Dynamic styles
  const radius = initialRadius + (finalRadius - initialRadius) * scrollProgress;
  const scale = initialScale + (finalScale - initialScale) * scrollProgress;
  const padding = initialPadding + (finalPadding - initialPadding) * scrollProgress;

  return (
    <main className="min-h-[80vh] bg-white">
      <div className="mx-auto px-24 pt-20">
        <div className="max-w-[1000px]">
          <h2 className="text-[21px] text-gray-600 font-medium">
            So easy to use
          </h2>
          <h1 className="text-[48px] leading-[1.1] font-semibold tracking-[-0.003em] md:text-[80px] md:leading-[1.05] md:tracking-[-0.015em]">
            Read, Mark, Send
          </h1>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[250vh]">
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
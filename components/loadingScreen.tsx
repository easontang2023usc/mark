import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  videoSources?: string[];
  imageSequences?: string[][];
  minimumLoadTime?: number;
}

export default function LoadingScreen({ 
  onLoadComplete, 
  videoSources = [], 
  imageSequences = [],
  minimumLoadTime = 1000
}: LoadingScreenProps): React.ReactElement | null {
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadStartTime] = useState<number>(Date.now());
  
  // Use refs to track actual progress separately from displayed progress
  const actualProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const progressStepTimer = useRef<NodeJS.Timeout | null>(null);

  // Force progress even if assets are loading slowly
  useEffect(() => {
    actualProgressRef.current = 25;
    
    const forceProgressSteps = [
      { progress: 50, delay: 300 },
      { progress: 75, delay: 800 },
      { progress: 90, delay: 1500 },
    ];
    
    const timers: NodeJS.Timeout[] = [];
    
    forceProgressSteps.forEach(({progress, delay}) => {
      const timer = setTimeout(() => {
        if (actualProgressRef.current < progress) {
          actualProgressRef.current = progress;
        }
      }, delay);
      timers.push(timer);
    });
    
    // Cleanup
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Add keyframe animation for logo
  useEffect(() => {
    // Add the keyframe animation to the document if it doesn't exist
    if (!document.getElementById('logo-animations')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'logo-animations';
      styleSheet.innerHTML = `
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0.6; transform: scale(0.98); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);
  useEffect(() => {
    const animateProgress = () => {
      // Create a smooth animation by moving display progress towards actual progress
      setDisplayProgress(prev => {
        // Move display progress 15% of the way towards actual progress each frame
        // Increased from 10% to make progress appear faster
        const newProgress = prev + (actualProgressRef.current - prev) * 0.15;
        
        // Round to one decimal place to avoid tiny increments that aren't visible
        return Math.round(newProgress * 10) / 10;
      });
      
      // Continue animation if still loading
      if (isLoading) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      }
    };
    
    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animateProgress);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading]);

  // Asset loading logic
  useEffect(() => {
    // Flatten image sequences into a single array of images to load
    const allImagePaths = imageSequences.flat();
    const totalAssets = videoSources.length + allImagePaths.length;
    let loadedAssets = 0;

    // Even if no assets to load, we'll show a progressive loading screen
    if (totalAssets === 0) {
      // Wait for minimum time, then jump straight to 100%
      setTimeout(() => {
        // Jump directly to 100%
        actualProgressRef.current = 100;
        setDisplayProgress(100);
        
        // Complete after a short delay to show 100%
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete();
        }, 200);
      }, minimumLoadTime);
      
      return;
    }

    // Function to update progress
    const updateProgress = (): void => {
      loadedAssets++;
      
      // Calculate raw progress percentage, but keep it moving forward
      const rawProgress = Math.floor((loadedAssets / totalAssets) * 100);
      
      // Only update if the new progress is higher than the current progress
      if (rawProgress > actualProgressRef.current) {
        actualProgressRef.current = rawProgress;
      }
      
      // Check if all assets are loaded
      if (loadedAssets === totalAssets) {
        // Calculate how much time has passed since loading started
        const elapsedTime = Date.now() - loadStartTime;
        const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);
        
        // Jump directly to 100% when loading is complete
        setTimeout(() => {
          // Set actual progress to 100% immediately
          actualProgressRef.current = 100;
          // Force display progress to 100% without animation
          setDisplayProgress(100);
          
          // Hide loading screen after a short delay
          setTimeout(() => {
            setIsLoading(false);
            onLoadComplete();
          }, 200); // Very short delay just to show 100% before completing
        }, remainingTime);
      }
    };

    // Removed this check since we already start at 25% now

    // Handle video preloading
    videoSources.forEach(src => {
      try {
        const video = document.createElement('video');
        
        video.addEventListener('canplaythrough', () => {
          updateProgress();
        }, { once: true });
        
        video.addEventListener('error', () => {
          console.error(`Failed to load video: ${src}`);
          updateProgress();
        }, { once: true });
        
        // Add a timeout to make sure we don't get stuck waiting for videos
        setTimeout(() => {
          if (video.readyState < 4) { // Not loaded
            updateProgress(); // Count it as loaded anyway
          }
        }, 5000); // 5 second timeout
        
        video.preload = 'auto';
        video.src = src;
        video.load();
      } catch (error) {
        console.error(`Error setting up video preloading for ${src}:`, error);
        updateProgress();
      }
    });

    // Batch image loading to prevent resource exhaustion
    const batchSize = 10; // Load 10 images at a time
    const loadImageBatch = (startIndex: number) => {
      const endIndex = Math.min(startIndex + batchSize, allImagePaths.length);
      const currentBatch = allImagePaths.slice(startIndex, endIndex);
      
      if (currentBatch.length === 0) return; // All batches processed
      
      // Load this batch of images
      let batchLoaded = 0;
      
      currentBatch.forEach(src => {
        try {
          const img = document.createElement('img') as HTMLImageElement;
          
          img.onload = () => {
            updateProgress();
            batchLoaded++;
            
            // When this batch is complete, load the next batch
            if (batchLoaded === currentBatch.length && endIndex < allImagePaths.length) {
              setTimeout(() => loadImageBatch(endIndex), 50); // Small delay between batches
            }
          };
          
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            updateProgress();
            batchLoaded++;
            
            // When this batch is complete, load the next batch
            if (batchLoaded === currentBatch.length && endIndex < allImagePaths.length) {
              setTimeout(() => loadImageBatch(endIndex), 50);
            }
          };
          
          // Add a timeout to prevent images from blocking progress
          setTimeout(() => {
            if (!img.complete) {
              updateProgress(); // Count it as loaded anyway
            }
          }, 3000); // 3 second timeout
          
          img.src = src;
        } catch (error) {
          console.error(`Error setting up image preloading for ${src}:`, error);
          updateProgress();
          batchLoaded++;
          
          if (batchLoaded === currentBatch.length && endIndex < allImagePaths.length) {
            setTimeout(() => loadImageBatch(endIndex), 50);
          }
        }
      });
    };
    
    // Start loading the first batch of images
    if (allImagePaths.length > 0) {
      loadImageBatch(0);
    }

    // Store the current timer reference
    let currentProgressTimer: NodeJS.Timeout | null = null;

    // Update the timer assignment
    if (progressStepTimer.current) {
      currentProgressTimer = progressStepTimer.current;
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (currentProgressTimer !== null) {
        clearTimeout(currentProgressTimer);
      }
    };
  }, [videoSources, imageSequences, onLoadComplete, minimumLoadTime, loadStartTime]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="mb-8 relative w-48 h-24">
        <Image 
          src="/Mark_Assets/mark_full_logo_white.svg" 
          alt="Mark Logo"
          fill
          style={{
            animation: 'pulse 2s infinite ease-in-out, float 3s infinite ease-in-out',
            objectFit: 'contain'
          }}
          priority
        />
      </div>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
}
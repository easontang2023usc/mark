'use client'

import React, { useRef, useState, useEffect } from 'react';

export default function CameraFeature() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Video in view, playing automatically');
          videoElement
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsVideoEnded(false);
            })
            .catch((error) => console.error('Auto-play failed:', error));
        } else {
          console.log('Video out of view, pausing');
          videoElement.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 } // Video must be at least 50% in view to trigger
    );

    observer.observe(videoElement);

    return () => observer.unobserve(videoElement);
  }, []);

  const handleVideoEnd = () => {
    console.log('Video ended');
    setIsPlaying(false);
    setIsVideoEnded(true);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isVideoEnded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsVideoEnded(false);
    } else if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[40vh]">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left side text */}
        <div className="w-full z-20 md:w-1/2 text-gray-800 space-y-4 text-xl">
          <p>
            Designed to integrate effortlessly into your reading routine, Mark
            enhances your experience without disrupting your flow. 
          </p>
          <p>
            Simply read
            as usual, set your page number when done, and let Mark take care of
            the rest.
            </p>
          {/* <p>
            With its intelligent tracking and intuitive design, Mark ensures you
            never lose your place—bringing a new level of convenience to your
            reading habits.
          </p> */}
        </div>

        {/* Right side: video above, button below */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          {/* Video container */}
          <div className="relative w-full md:w-[600px] aspect-[16/9] rounded-lg overflow-hidden pl-10">
            <video
              ref={videoRef}
              className="relative z-0 w-full h-full object-cover"
              muted
              onEnded={handleVideoEnd}
              playsInline
            >
              <source src="/Mark_Assets/send_to_phone.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="relative z-10 py-2 px-4 rounded-lg text-sm text-blue-500 bg-white 
                       hover:text-blue-600 transition-colors"
            type="button"
          >
            {isVideoEnded ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
}

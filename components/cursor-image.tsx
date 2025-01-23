import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface CursorImageProps {
  imageUrl: string;
  size?: number;
  opacity: number;
}

const CursorImage: React.FC<CursorImageProps> = ({ imageUrl, size = 50, opacity }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - size/2}px`;
        cursorRef.current.style.top = `${e.clientY - size/2}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{ opacity }}
    >
      <Image
        src={imageUrl}
        alt="cursor"
        width={size}
        height={size}
        className="pointer-events-none"
      />
    </div>
  );
};

export default CursorImage;
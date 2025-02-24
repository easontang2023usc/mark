'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function HowItWorksPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const scrollRange = 550
  const initialScale = 1
  const finalScale = 0.9
  const initialPadding = 0
  const finalPadding = 36
  const initialRadius = 0
  const finalRadius = 32

  useEffect(() => {
    const handleScroll = () => {
      if (!imageContainerRef.current) return;

      const rect = imageContainerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const elementTop = rect.top
      const elementHeight = rect.height
      
      const startPoint = windowHeight / 2
      const endPoint = startPoint - scrollRange

      let progress = 0
      if (elementTop <= startPoint && elementTop >= endPoint) {
        progress = (startPoint - elementTop) / scrollRange
      } else if (elementTop < endPoint) {
        progress = 1
      }

      setScrollProgress(Math.max(0, Math.min(progress, 1)))

      
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const radius = initialRadius + (finalRadius - initialRadius) * scrollProgress
  const scale = initialScale + (finalScale - initialScale) * scrollProgress
  const padding = initialPadding + (finalPadding - initialPadding) * scrollProgress

  return (
    <main className="min-h-[200vh] bg-white">
      <div className="container mx-auto px-24 pt-20">
        <div className="max-w-[1000px]">
          <h2 className="text-[21px] text-gray-600 font-medium mb-2">
            How it works
          </h2>
          <h1 className="text-[48px] leading-[1.1] font-semibold tracking-[-0.003em] md:text-[80px] md:leading-[1.05] md:tracking-[-0.015em]">
            Read, Mark, Send
          </h1>
        </div>
      </div>

      <div className="w-full mt-16 relative" style={{ height: '90vh' }}>
        <div
          ref={imageContainerRef}
          className="w-full h-full absolute left-0 right-0"
          style={{
            padding: `${padding}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'padding 50ms ease-out, transform 50ms ease-out',
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              borderRadius: `${radius}px`, // Apply radius here
              overflow: 'hidden', // Clip the image
            }}
          >
            <Image
              src="/Mark_Assets/step1.png"
              alt="Product demonstration"
              fill
              className="object-cover"
              quality={100}
              priority
              style={{ borderRadius: 'inherit' }} // Ensure image follows parent radius
            />
          </div>
        </div>
      </div>
    </main>
  )
}
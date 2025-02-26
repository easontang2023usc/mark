'use client';
import Head from 'next/head';
import WaitlistDialog from '@/components/waitlistForm';
import { useEffect, useRef, useState } from "react";

export default function Manifesto() {
  const markSectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Animation parameters
  const initialWidth = 800; // max-w-4xl (768px)
  const finalWidth = 820;  // max-w-7xl (1280px)
  const initialRadius = 14;
  const finalRadius = 16;
  const initialPadding = 15;
  const finalPadding = 15;

  // Handle scroll and trigger animation
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, // When 40% of the element is visible
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible, start animation
          setIsExpanded(true);
        } else {
          // Element is not visible, reset animation
          setIsExpanded(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    if (markSectionRef.current) {
      observer.observe(markSectionRef.current);
    }

    return () => {
      if (markSectionRef.current) {
        observer.unobserve(markSectionRef.current);
      }
    };
  }, []);

  // Current animation values
  const currentWidth = isExpanded ? finalWidth : initialWidth;
  const currentRadius = isExpanded ? finalRadius : initialRadius;
  const currentPadding = isExpanded ? finalPadding : initialPadding;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-satoshi antialiased mt-12">
      <Head>
        <title>Mark | Unlock Your Intellectual Potential</title>
        <meta name="description" content="Mark - The AI-Enhanced Bookmark for print books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Video Header - Wider than Text Section */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-7xl h-[300px] sm:h-[400px] mt-[] mb-0 overflow-hidden rounded-xl">
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/Mark_Assets/goldendustvid.mp4" type="video/mp4" />
            {/* Your browser does not support the video tag. */}
          </video>
        </div>
      </div>

      {/* Main Content Section - Constrained to max-w-3xl */}
      <main className="mx-auto px-4 py-16 sm:py-24">
        {/* Logo + Tagline */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Manifesto</h1>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12 max-w-3xl mx-auto">
          {/* Initial Storytelling */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">The World's Knowledge at Your Fingertips</h2>
            <p className="text-lg text-gray-700">
              The world holds centuries of brilliance—<strong>Einstein's physics, Nietzsche's philosophy, Jobs' innovation. </strong> 
              Visionaries spend lifetimes refining ideas, making breakthroughs, and distilling their wisdom into books.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              Yet instead of tapping into this gift, most people are <strong>stuck in the endless scroll. </strong> 
              Imagine the innovations that could happen—or worse, the ones that won't—if we continue prioritizing fleeting content over deep knowledge.
            </p>
          </section>

          {/* Current World of Books */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">The State of Reading</h2>
            
            <p className="text-lg text-gray-700">
              Big tech has tried to digitize reading—pushing eBooks and Kindles as the future. 
              But screens fragment focus, and digital reading has never replaced the depth of physical books.
            </p>

            <ul className="list-disc ml-6 space-y-5 text-lg text-gray-700 mt-4">
              <li><strong>65% of Americans still prefer print</strong>—the texture, the weight of a book, the immersive experience.</li>
              <li>In <strong>2023, over 757 million print books</strong> were sold in the U.S.—a testament to the enduring power of physical reading.</li>
            </ul>

            <p className="text-lg text-gray-700 mt-4">
              Yet, while print remains king, it lacks what digital tools offer: <strong>engagement, accessibility, and efficiency.</strong>
            </p>
            <p className="text-lg text-gray-700 mt-4">
                Readers want to get lost in books and absorb knowledge—not just passively consume words.
              </p>
          </section>
        </div>

        {/* Curved Square Section with Animation - Expanding Container */}
        <div className="flex justify-center w-full">
        <div 
  ref={markSectionRef}
  style={{
    width: `${Math.min(currentWidth, window.innerWidth - 32)}px`, 
    borderRadius: `${currentRadius}px`,
    padding: `${currentPadding}px`,
    transition: "width 0.8s ease-out, border-radius 0.8s ease-out, padding 0.8s ease-out, color 0.8s ease-out",
  }}
  className={`bg-gray-100 shadow-lg mt-12 opacity-80" ${
    isExpanded ? "text-lg" : "text-gray-700"
  }`}
>
            {/* Content Container - Fixed Width */}
            <div ref={contentRef} className="max-w-3xl mx-auto p-4">
              <h2 className="text-2xl font-semibold mb-6">Mark</h2>
  
              <p className="text-lg mt-4">
                <strong>Mark is an ecosystem</strong> designed to make reading engaging, seamless, and impactful.
              </p>

              {/* How Mark Works */}
              {/* <h3 className="text-xl font-semibold mt-8">How Mark Works</h3> */}
              <p className="text-lg mt-2">
                With Mark, you read your physical book as usual. When you are done, simply slip Mark into your book, and it instantly syncs to your devices with: 
              </p>

              <ul className="list-disc space-y-4 text-lg mt-6 ml-6">
                <li><strong>Intelligent Summaries</strong>. Instantly generates insights from what you just read, customized to highlight key themes, quotes, and stats.</li>
                <li><strong>A Connected Reading Community</strong>. Discuss ideas and stay motivated, just like Strava—but for books.</li>
                <li><strong>Personalized Data & Tracking</strong>. Monitor reading pace, progress, and trends. Get Mark Wrapped—a yearly recap of everything you've learned.</li>
              </ul>

              <p className="text-lg mt-8">
                Crafted from <strong>Grade 5 titanium</strong> and inspired by Bauhaus design, Mark seamlessly fits into your pages.  
                It's a <strong>statement of elegance, intelligence, and status.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Rest of content */}
        <div className="space-y-12 max-w-3xl mx-auto mt-20">

          {/* Our Mission */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-4xl font-semibold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700">
              To transform the reading experience and revolutionize how people absorb knowledge—making it more engaging, intuitive, and impactful.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              By reshaping the way we read, we unlock intellectual potential and empower individuals to create meaningful change in the world.
            </p>
            <p className="text-xl font-semibold mt-6">
              Learning is the key to a brighter tomorrow.
            </p>
          </section>

          {/* Call to Action */}
          {/* Call to Action */}
          <section className="border-b border-gray-100 pb-12 text-center">
  <h2 className="text-2xl font-semibold mb-8">Join the Movement</h2>
  <p className="text-lg text-gray-700">
    Let's build the future of reading together.
  </p>
  <div className="mt-8">
    <WaitlistDialog />
  </div>
</section>
          

        </div>
      </main>
    </div>
  );
}
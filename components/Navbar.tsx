"use client"

import { useState, useEffect } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import WaitlistDialog from "./waitlistForm";
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import MobileWaitlist from "./mobileWaitlist";
import Image from 'next/image';
import { track } from '@vercel/analytics';

track('manifesto_click');

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile based on screen width
  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {isMobile ? (
        <MobileNavbar menuOpen={menuOpen} toggleMenu={toggleMenu} setMenuOpen={setMenuOpen} />
      ) : (
        <DesktopNavbar />
      )}
    </>
  );
};

// Desktop Navbar Component
const DesktopNavbar: FC = () => {
  return (
    <nav className="fixed top-[2%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[900px] rounded-full bg-[rgba(54,54,54,0.6)] backdrop-blur-md shadow-md z-50">
      <div className="flex items-center justify-between px-8 py-3">
        {/* Logo */}
        <div className="relative h-7 w-28">
          <Link href="/">
            <Image
              src="/Mark_Assets/mark_full_logo_white.svg"
              alt="Mark Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 

          onClick={() => {
            track('manifesto_click');
          }}
          
          href="/manifesto" className="text-white font-light uppercase hover:text-gray-200 transition-colors">
            Manifesto
          </Link>
          <WaitlistDialog />
        </div>
      </div>
    </nav>
  );
};


// Mobile Navbar Component
interface MobileNavbarProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ menuOpen, toggleMenu, setMenuOpen }) => {
  // Define a fixed closed height (adjust based on your header's natural height)
  const closedHeight = '60px'; // Roughly the height of the header (logo + button + padding)

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      <motion.nav 
        className="fixed top-[2%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[900px] rounded-3xl backdrop-blur-md shadow-md z-50 overflow-hidden bg-[rgba(54,54,54,0.6)]"
        initial={{ height: closedHeight }} // Explicit initial state
        animate={{ 
          height: menuOpen ? 'calc(100vh - 4%)' : closedHeight,
          borderRadius: '24px' // No change needed since it’s constant
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <motion.div
            animate={{ 
              scale: menuOpen ? 1.4 : 1,
              x: menuOpen ? 20 : 0,
              transformOrigin: "center"
            }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/">
              <div className="relative h-6 w-24">
                <Image
                  src="/Mark_Assets/mark_full_logo_white.svg"
                  alt="Mark Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          <motion.button 
            onClick={toggleMenu} 
            className="text-white p-2 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ 
                rotate: menuOpen ? -45 : 0,
                scale: menuOpen ? 1.4 : 1,
                transformOrigin: "center"
              }}
              transition={{ duration: 0.3 }}
            >
              <Plus size={24} className="text-white" />
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              className="flex flex-col h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }} // Slightly faster exit to align with nav
            >
              <div className="flex flex-col h-full justify-end pb-16 mb-16">
                <div className="flex flex-col items-center gap-8 px-6">
                  <Link 
                    href="https://x.com/markhardware" 
                    className="text-white text-lg font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="relative h-6 w-6">
                      <Image
                        src="/X_logo.svg"
                        alt="X logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                  <Link 
                    href="/manifesto" 
                    className="text-white text-lg font-light"
                    onClick={() => setMenuOpen(false)}
                  >
                    Manifesto
                  </Link>
                  <div className="w-full px-4">
                    <MobileWaitlist />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
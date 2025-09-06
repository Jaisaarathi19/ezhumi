'use client';

import { useRef } from 'react';
import { useGsapAnimations } from '@/hooks/useGsapAnimations';

interface RightSidebarProps {
  onMenuToggle: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onMenuToggle }) => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { animateMenuButtonHover } = useGsapAnimations();

  const handleMenuHover = (isHovering: boolean) => {
    if (menuButtonRef.current) {
      animateMenuButtonHover(menuButtonRef.current, isHovering);
    }
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="right-sidebar fixed right-8 top-0 h-full flex flex-col justify-between py-8 z-30 opacity-0">
      {/* Hamburger Menu */}
      <button
        onClick={onMenuToggle}
        className="hamburger-menu text-white hover:text-white/70 transition-colors duration-300"
        aria-label="Open menu"
      >
        <div className="flex flex-col space-y-1.5">
          <div className="w-6 h-0.5 bg-current"></div>
          <div className="w-6 h-0.5 bg-current"></div>
          <div className="w-6 h-0.5 bg-current"></div>
        </div>
      </button>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollToAbout}
        className="scroll-indicator flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 group"
        aria-label="Scroll to next section"
      >
        <div className="text-xs font-light mb-4 tracking-wider" style={{ writingMode: 'vertical-rl' }}>
          SCROLL
        </div>
        <div className="w-px h-12 bg-white/30 mb-2"></div>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:translate-y-1 transition-transform duration-300"
        >
          <path 
            d="M8 12L8 4M8 12L4 8M8 12L12 8" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

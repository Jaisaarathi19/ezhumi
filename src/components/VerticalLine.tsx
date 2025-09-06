'use client';

interface VerticalLineProps {
  position: 'left' | 'right';
}

export const VerticalLine: React.FC<VerticalLineProps> = ({ position }) => {
  const positionClass = position === 'left' ? 'left-[10%]' : 'right-[10%]';
  
  return (
    <div 
      className={`fixed top-0 ${positionClass} h-full w-px bg-white/20 z-10 pointer-events-none`}
      aria-hidden="true"
    />
  );
};

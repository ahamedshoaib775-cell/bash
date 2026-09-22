import React, { useRef, useState, useEffect } from 'react';

interface BashLogoProps {
  size?: 'nav' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'footer';
  showWordmark?: boolean;
  className?: string;
  interactive?: boolean;
  mode?: 'loop' | 'once' | 'static';
  includeTagline?: boolean;
}

export const BashLogo: React.FC<BashLogoProps> = ({
  size = 'md',
  className = '',
  interactive = false,
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < 250) {
        const moveX = ((e.clientX - centerX) / 250) * 8;
        const moveY = ((e.clientY - centerY) / 250) * 8;
        setOffset({ x: moveX, y: moveY });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  if (size === 'nav') {
    return (
      <div
        ref={logoRef}
        className={`inline-flex items-center gap-1.5 bg-transparent select-none transition-transform duration-300 ease-out cursor-pointer ${className}`}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <span className="font-display font-extrabold text-[13px] md:text-[14px] tracking-[0.2em] text-[#111111] flex items-center gap-1 leading-none">
          <span>B</span>
          <svg className="w-2.5 h-2.5 stroke-[#111111] stroke-[2.5]" viewBox="0 0 24 24" fill="none">
            <path d="M4 20L12 4L20 20" strokeLinejoin="miter" />
          </svg>
          <span>S</span>
          <span>H</span>
        </span>
      </div>
    );
  }

  const getWordmarkSizeClass = () => {
    switch (size) {
      case 'xs':
        return 'text-lg gap-1 tracking-[0.15em]';
      case 'sm':
        return 'text-xl gap-1.5 tracking-[0.2em]';
      case 'md':
        return 'text-2xl gap-2 tracking-[0.2em]';
      case 'lg':
        return 'text-4xl gap-2.5 tracking-[0.2em]';
      case 'xl':
        return 'text-5xl gap-3 tracking-[0.25em]';
      case 'hero':
        return 'text-5xl sm:text-6xl lg:text-7xl gap-3 tracking-[0.25em]';
      case 'footer':
        return 'text-3xl sm:text-4xl gap-2 tracking-[0.2em]';
      default:
        return 'text-2xl gap-2 tracking-[0.2em]';
    }
  };

  const getLambdaSizeClass = () => {
    switch (size) {
      case 'xs':
        return 'w-3 h-3 stroke-[2.5]';
      case 'sm':
        return 'w-4 h-4 stroke-[2.5]';
      case 'md':
        return 'w-5 h-5 stroke-[2.5]';
      case 'lg':
        return 'w-7 h-7 stroke-[3]';
      case 'xl':
        return 'w-9 h-9 stroke-[3]';
      case 'hero':
        return 'w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 stroke-[3]';
      case 'footer':
        return 'w-6 h-6 sm:w-7 sm:h-7 stroke-[3]';
      default:
        return 'w-5 h-5 stroke-[2.5]';
    }
  };

  return (
    <div
      ref={logoRef}
      className={`inline-flex flex-col items-center justify-center bg-transparent select-none transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
    >
      <div className={`font-display font-extrabold text-[#111111] flex items-center justify-center leading-none uppercase ${getWordmarkSizeClass()}`}>
        <span>B</span>
        <svg className={`stroke-[#111111] ${getLambdaSizeClass()}`} viewBox="0 0 24 24" fill="none">
          <path d="M4 20L12 4L20 20" strokeLinejoin="miter" />
        </svg>
        <span>S</span>
        <span>H</span>
      </div>
    </div>
  );
};

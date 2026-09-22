import React, { useRef, useState, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  cursorMode?: 'button' | 'hover';
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  cursorMode = 'button',
  strength = 0.25,
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    if (!isTouch) setCursor(cursorMode);
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      setPosition({ x: 0, y: 0 });
      resetCursor();
    }
  };

  const style = isTouch
    ? {}
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition:
          position.x === 0 && position.y === 0
            ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            : 'transform 0.1s ease-out',
      };

  const touchActiveClasses = 'active:scale-[0.97] transition-transform duration-150';

  if (href) {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        className={`magnetic-target inline-flex items-center justify-center whitespace-nowrap cursor-pointer ${touchActiveClasses} ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      type="button"
      className={`magnetic-target inline-flex items-center justify-center whitespace-nowrap cursor-pointer ${touchActiveClasses} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

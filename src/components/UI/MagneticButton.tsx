import React, { useRef, useState } from 'react';
import { useCursor } from '../../context/CursorContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  cursorMode?: 'button' | 'hover';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  cursorMode = 'button',
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (scaled down for subtle magnetic feel)
    const distanceX = (e.clientX - centerX) * 0.25;
    const distanceY = (e.clientY - centerY) * 0.25;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    setCursor(cursorMode);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    resetCursor();
  };

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s ease-out',
  };

  if (href) {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        className={`magnetic-target inline-flex items-center justify-center cursor-pointer ${className}`}
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
      className={`magnetic-target inline-flex items-center justify-center cursor-pointer ${className}`}
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

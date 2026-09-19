import React, { useEffect, useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const { cursorMode, cursorText } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', checkTouch);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const getVariants = () => {
    switch (cursorMode) {
      case 'hover':
        return {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          backgroundColor: 'rgba(17, 17, 17, 0.12)',
          border: '1px solid rgba(17, 17, 17, 0.3)',
        };
      case 'button':
        return {
          x: mousePosition.x - 26,
          y: mousePosition.y - 26,
          height: 52,
          width: 52,
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          border: '1px solid #111111',
          color: '#F7F7F5',
        };
      case 'view':
        return {
          x: mousePosition.x - 42,
          y: mousePosition.y - 42,
          height: 84,
          width: 84,
          backgroundColor: '#111111',
          border: '1px solid #111111',
          color: '#F7F7F5',
        };
      default:
        return {
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          height: 10,
          width: 10,
          backgroundColor: '#111111',
          border: 'none',
        };
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center font-display text-[10px] tracking-widest uppercase font-bold text-center select-none shadow-sm"
      animate={getVariants()}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 30,
        mass: 0.15,
      }}
    >
      {cursorMode === 'view' && (
        <span className="px-2 text-white font-mono leading-tight">
          {cursorText || 'VIEW →'}
        </span>
      )}
    </motion.div>
  );
};

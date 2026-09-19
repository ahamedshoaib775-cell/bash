import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BashLogo } from './BashLogo';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Slower, unhurried timeline (~4.2s total display for a luxury cinematic intro)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // 1.0s smooth exit fade out
    }, 4200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#F7F7F5] flex flex-col items-center justify-center pointer-events-none select-none loading-screen"
        >
          <div className="flex flex-col items-center space-y-8 px-4">
            {/* Animated Logo Entry - Slower & Smooth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <BashLogo size="xl" mode="once" includeTagline={false} />
            </motion.div>

            {/* Thin Expanding Line Indicator - Slower 2.8s scale */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-44 h-[1.5px] bg-[#111111] rounded-full origin-center"
            />

            {/* Subtext - Fade in gracefully */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 1.4, ease: 'easeOut' }}
              className="text-[10px] sm:text-[11px] font-mono text-[#6B6B6B] tracking-[0.35em] uppercase"
            >
              DIGITAL CREATIVE STUDIO
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


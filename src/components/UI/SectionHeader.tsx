import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: reducedMotion ? 0 : 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1, // 100ms stagger between lines
      },
    },
  };

  const lineMaskVariants: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { y: '100%' },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.5,
        ease: 'easeOut',
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        delay: reducedMotion ? 0 : 0.2, // Subtitle fades in 200ms after heading
        ease: 'easeOut',
      },
    },
  };

  // Helper to render title lines inside clipping masks
  const renderTitle = () => {
    if (typeof title !== 'string') {
      return (
        <div className="overflow-hidden">
          <motion.div variants={lineMaskVariants}>{title}</motion.div>
        </div>
      );
    }

    // Split title into lines (by newline if provided or by clause)
    const lines = title.includes('\n')
      ? title.split('\n')
      : title.match(/[^.!?]+[.!?]+/g) || [title];

    return lines.map((lineText, idx) => (
      <span key={idx} className="block overflow-hidden pb-1">
        <motion.span className="block" variants={lineMaskVariants}>
          {lineText.trim()}
        </motion.span>
      </span>
    ));
  };

  return (
    <motion.div
      className={`space-y-4 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Eyebrow Label */}
      <motion.div variants={eyebrowVariants} className="inline-block">
        <span className="text-[11px] md:text-[12px] font-semibold tracking-eyebrow text-[#666666] uppercase border-b border-[#DCDCD7] pb-1">
          {eyebrow}
        </span>
      </motion.div>

      {/* Main Heading with Line-by-Line Clipping Mask */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08] font-display">
        {renderTitle()}
      </h2>

      {/* Supporting Subtitle Description */}
      {description && (
        <motion.p
          variants={subtitleVariants}
          className="text-base md:text-lg text-[#666666] font-normal leading-relaxed pt-2 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

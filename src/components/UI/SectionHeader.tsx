import React from 'react';
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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`space-y-4 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      {/* Eyebrow Label */}
      <motion.div variants={lineVariants} className="inline-block">
        <span className="text-[11px] md:text-[12px] font-semibold tracking-eyebrow text-[#666666] uppercase border-b border-[#DCDCD7] pb-1">
          {eyebrow}
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        variants={lineVariants}
        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08] font-display"
      >
        {title}
      </motion.h2>

      {/* Supporting Text */}
      {description && (
        <motion.p
          variants={lineVariants}
          className="text-base md:text-lg text-[#666666] font-normal leading-relaxed pt-2 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

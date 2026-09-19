import React, { useState, useRef } from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

const STATS = [
  { value: '5+', label: 'Projects Completed' },
  { value: '3+', label: 'Happy Clients' },
  { value: '100%', label: 'Client Satisfaction' },
];

export const About: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-40px' });
  const { setCursor, resetCursor } = useCursor();

  // Scroll Parallax Hook
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  // Cursor Hover Movement on image
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    setCursorOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setCursorOffset({ x: 0, y: 0 });
    resetCursor();
  };

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DDDDD8] overflow-x-hidden">
      <SectionHeader
        eyebrow="ABOUT US"
        title="Small Team. Big Vision."
        description="BASH is a modern digital company focused on helping businesses grow through technology, creativity and smart strategy."
      />

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-10 sm:mt-14">
        {/* Story + HQ Location + 3-Column Mobile Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 space-y-8 w-full"
        >
          <div className="space-y-4 text-base md:text-lg text-[#6B6B6B] leading-relaxed">
            <p>
              At <strong className="text-[#111111] font-semibold">BASH</strong>, we engineer high-performance web experiences, custom software tools, intelligent AI workflows, and data-driven marketing engines.
            </p>
            <p>
              We bring Swiss editorial precision, clean geometric architecture, and instant sub-second digital execution to every product we launch.
            </p>
          </div>

          {/* 3-Column Statistics Row */}
          <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-4 py-6 border-y border-[#DDDDD8]">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="text-center sm:text-left space-y-1"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-[#111111] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-[#6B6B6B] uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center gap-3 p-3.5 sm:p-4 rounded-lg bg-[#FAFAF8] border border-[#DDDDD8] w-full sm:w-auto">
              <div className="w-9 h-9 rounded-full bg-[#111111] text-[#FFFFFF] flex items-center justify-center font-bold text-xs shrink-0">
                HQ
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#111111] uppercase tracking-wider">Based in Chennai, India</p>
                <p className="text-[#6B6B6B]">Serving global brands & enterprise clients</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workspace Parallax Image */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 w-full relative overflow-hidden rounded-lg border border-[#DDDDD8] aspect-[4/3] bg-[#FAFAF8] group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated Image with Zoom */}
          <motion.img
            style={{ scale, y, x: cursorOffset.x }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="BASH Studio Workspace"
            loading="lazy"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-200 ease-out"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Image Tag Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white font-mono text-xs">
            <span className="bg-[#111111]/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded border border-white/20 uppercase tracking-widest text-[10px] sm:text-xs">
              BASH STUDIO • CHENNAI
            </span>
            <span className="text-white/80 text-[10px] hidden sm:inline">
              [ 13°04'57.2"N 80°14'47.1"E ]
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

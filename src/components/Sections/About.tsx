import React, { useState, useRef } from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export const About: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Scroll Parallax Hook
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

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
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#DDDDD8]">
      <SectionHeader
        eyebrow="ABOUT US"
        title="Small Team. Big Vision."
        description="BASH is a modern digital company focused on helping businesses grow through technology, creativity and smart strategy."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-14">
        {/* Left Column: Story + HQ Location */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="space-y-4 text-base md:text-lg text-[#6B6B6B] leading-relaxed">
            <p>
              At <strong className="text-[#111111] font-semibold">BASH</strong>, we engineer high-performance web experiences, custom software tools, intelligent AI workflows, and data-driven marketing engines.
            </p>
            <p>
              We bring Swiss editorial precision, clean geometric architecture, and instant sub-second digital execution to every product we launch.
            </p>
          </div>

          <div className="pt-2 border-t border-[#DDDDD8]">
            <div className="inline-flex items-center gap-4 p-4 rounded-lg bg-[#FAFAF8] border border-[#DDDDD8]">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#FFFFFF] flex items-center justify-center font-bold text-xs">
                HQ
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#111111] uppercase tracking-wider">Based in Chennai, India</p>
                <p className="text-[#6B6B6B]">Serving global brands & enterprise clients</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Parallax Zoom Image */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6 relative overflow-hidden rounded-lg border border-[#DDDDD8] aspect-[4/3] bg-[#FAFAF8] group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated Image with Zoom & Parallax */}
          <motion.img
            style={{ scale, y, x: cursorOffset.x }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="BASH Studio Workspace"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-200 ease-out"
          />

          {/* Overlay Grid lines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Image Tag Badge */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-mono text-xs">
            <span className="bg-[#111111]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 uppercase tracking-widest">
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

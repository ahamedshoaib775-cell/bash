import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MagneticButton } from '../UI/MagneticButton';
import { BashLogo } from '../UI/BashLogo';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

const TRUSTED_BRANDS = [
  { name: 'SIP SOCIAL', domain: '@sipsocial__', url: 'https://www.instagram.com/sipsocial__/' },
  { name: 'SOLESCAPE', domain: 'solescape.in', url: 'https://solescape.in' },
  { name: 'CVIAN UAE', domain: 'cvianuae.com', url: 'https://cvianuae.com' },
  { name: 'PHIZEEO', domain: 'phizeeo.com', url: 'https://phizeeo.com' },
  { name: 'BINSENSE', domain: 'binsense.in', url: 'https://binsense.in' },
];

export const Hero: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] md:min-h-screen pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col justify-between overflow-x-hidden"
    >
      {/* Top Main Hero Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={heroContainerVariants}
      >
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 md:space-y-8">
          {/* Eyebrow tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#111111] animate-ping shrink-0" />
            <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-eyebrow text-[#6B6B6B] uppercase font-mono truncate">
              WEB • SOFTWARE • AI • DIGITAL MARKETING
            </span>
          </motion.div>

          {/* Main Hero Headline with Responsive Clamp */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.5rem,10.5vw,5rem)] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#111111] font-display leading-[0.98] uppercase"
          >
            Ideas <span className="inline-block transition-transform duration-300 hover:translate-x-1.5 text-[#6B6B6B] font-normal">→</span>
            <br />
            Solutions <span className="inline-block transition-transform duration-300 hover:translate-x-1.5 text-[#6B6B6B] font-normal">→</span>
            <br />
            <span className="text-[#111111]">Growth.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-xl text-[#6B6B6B] font-normal max-w-xl leading-relaxed"
          >
            We build modern websites, powerful software and smart digital solutions to help your business grow — faster, smarter, and stronger.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <MagneticButton
              href="#contact"
              onClick={() => scrollToSection('#contact')}
              className="bg-[#111111] text-[#FFFFFF] text-sm md:text-base font-semibold px-7 py-3.5 rounded-full hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="#services"
              onClick={() => scrollToSection('#services')}
              cursorMode="hover"
              className="bg-transparent text-[#111111] border border-[#DDDDD8] hover:border-[#111111] text-sm md:text-base font-medium px-7 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 text-[#6B6B6B]" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column BASH Animated SVG Logo Presentation Area */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 relative flex flex-col items-center justify-center p-2 sm:p-4 min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] text-center mt-6 lg:mt-0"
        >
          {/* Exact BASH Animated Interactive Logo SVG */}
          <div className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none flex items-center justify-center py-2 sm:py-4">
            <BashLogo size="hero" mode="loop" includeTagline={false} interactive={true} />
          </div>

          {/* Minimal Tagline under Logo */}
          <div className="pt-4 text-center font-display space-y-0.5">
            <p className="text-xs sm:text-sm font-bold tracking-tight text-[#111111] uppercase">
              We build. We automate. We grow.
            </p>
            <p className="text-[10px] font-mono text-[#6B6B6B] tracking-widest uppercase">
              DIGITAL CREATIVE STUDIO • EST. 2026
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 sm:mt-16 md:mt-24 pt-6 sm:pt-8 border-t border-[#DDDDD8] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
      >
        <p className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-[#6B6B6B]">
          Trusted by businesses <br className="hidden md:block" />
          across industries.
        </p>

        {/* Brand Logos / Domains Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center gap-2.5 sm:gap-6 md:gap-10">
          {TRUSTED_BRANDS.map((brand) => (
            <a
              key={brand.domain}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 group cursor-pointer active:scale-95 transition-transform p-2 sm:p-0 rounded bg-[#FAFAF8] sm:bg-transparent border border-[#DDDDD8] sm:border-none"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              <span className="font-display font-extrabold text-xs sm:text-base md:text-lg text-[#111111]/70 group-hover:text-[#111111] transition-colors tracking-tight uppercase truncate">
                {brand.name}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[#6B6B6B]/70 border border-[#DDDDD8] group-hover:border-[#111111] px-1.5 py-0.5 rounded transition-colors lowercase shrink-0">
                {brand.domain}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

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
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: 'easeOut',
      },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 md:pt-36 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Main Hero Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={heroContainerVariants}
      >
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          {/* Eyebrow tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111111] animate-ping" />
            <span className="text-[11px] md:text-[12px] font-semibold tracking-eyebrow text-[#6B6B6B] uppercase font-mono">
              WEB • SOFTWARE • AI • DIGITAL MARKETING • LEAD GENERATION
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#111111] font-display leading-[0.98] uppercase"
          >
            Ideas <span className="inline-block transition-transform duration-300 hover:translate-x-2 text-[#6B6B6B] font-normal">→</span>
            <br />
            Solutions <span className="inline-block transition-transform duration-300 hover:translate-x-2 text-[#6B6B6B] font-normal">→</span>
            <br />
            <span className="text-[#111111]">Growth.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#6B6B6B] font-normal max-w-xl leading-relaxed"
          >
            We build modern websites, powerful software and smart digital solutions to help your business grow — faster, smarter, and stronger.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              href="#contact"
              onClick={() => scrollToSection('#contact')}
              className="bg-[#111111] text-[#FFFFFF] text-sm md:text-base font-semibold px-7 py-3.5 rounded-full hover:bg-black transition-colors shadow-md flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="#services"
              onClick={() => scrollToSection('#services')}
              cursorMode="hover"
              className="bg-transparent text-[#111111] border border-[#DDDDD8] hover:border-[#111111] text-sm md:text-base font-medium px-7 py-3.5 rounded-full transition-colors flex items-center gap-2 group"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 text-[#6B6B6B]" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column BASH Animated SVG Logo Presentation Area */}
        <motion.div
          variants={{
            hidden: { scale: 0.9, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: { duration: 1.1, ease: 'easeOut' },
            },
          }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center p-4 min-h-[380px] lg:min-h-[460px] text-center"
        >
          {/* Animated Interactive BASH Logo SVG */}
          <div className="w-full flex items-center justify-center py-4">
            <BashLogo size="hero" mode="loop" includeTagline={true} interactive={true} />
          </div>
        </motion.div>
      </motion.div>

      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 md:mt-24 pt-8 border-t border-[#DDDDD8] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <p className="text-xs uppercase font-mono tracking-widest text-[#6B6B6B]">
          Trusted by businesses <br className="hidden md:block" />
          across industries.
        </p>

        {/* Brand Logos / Domains */}
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {TRUSTED_BRANDS.map((brand) => (
            <a
              key={brand.domain}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group cursor-pointer"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              <span className="font-display font-extrabold text-base md:text-lg text-[#111111]/50 group-hover:text-[#111111] transition-colors tracking-tight uppercase">
                {brand.name}
              </span>
              <span className="text-[9px] font-mono text-[#6B6B6B]/70 border border-[#DDDDD8] group-hover:border-[#111111] px-2 py-0.5 rounded transition-colors lowercase">
                {brand.domain}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

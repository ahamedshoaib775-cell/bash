import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion, type Variants } from 'framer-motion';
import { Globe, Code2, Cpu, BarChart3, Target, Sparkles, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

/**
 * ============================================================================
 * CATALOG / SERVICES ANIMATION CONFIGURATION
 * ============================================================================
 * Easily tweak duration, stagger, hover lift, tilt angle, and reduced-motion parameters.
 */
export const CATALOG_ANIMATION_CONFIG = {
  // --- Section Heading Animations ---
  headingStagger: 0.1,        // Stagger between heading lines (seconds) -> 100ms
  headingDuration: 0.75,      // Speed of line reveal slide-up (seconds)
  subtitleDelay: 0.2,         // Delay for subtitle fade-in after heading (seconds) -> 200ms

  // --- Catalog Cards Reveal Animations (Scroll-into-view) ---
  cardDuration: 0.7,          // Card enter animation duration (seconds) -> 700ms
  cardStagger: 0.09,          // Stagger between cards (seconds) -> 90ms
  cardEase: [0.22, 1, 0.36, 1] as const, // Smooth cubic-bezier(0.22, 1, 0.36, 1)
  cardViewportAmount: 0.2,    // Viewport threshold to trigger reveal (0.2 = 20% visible)
  cardInitialY: 40,           // Initial vertical offset for fade-up (px) -> 40px
  cardInitialScale: 0.97,     // Initial scale for enter animation -> 0.97

  // --- Card Internal Elements Stagger (icon -> title -> description -> features -> button) ---
  internalStagger: 0.08,      // Stagger between internal elements (seconds) -> 80ms
  internalInitialZoom: 1.08,  // Soft zoom start state for card icon/image -> 1.08

  // --- Desktop Hover & 3D Tilt (hover: hover and pointer: fine) ---
  hoverLift: 8,               // Height card lifts on hover (px) -> 8px
  maxTiltAngle: 4,            // Maximum 3D tilt rotation angle (degrees) -> max 4 deg
  iconHoverZoom: 1.05,        // Icon container zoom level on card hover -> 1.05
  siblingDimOpacity: 0.7,     // Opacity of non-hovered cards in the grid -> 0.7

  // --- Mobile & Touch Feedback (hover: none) ---
  mobileTapScale: 0.98,       // Tap scale feedback on touch devices -> 0.98

  // --- Accessibility & Reduced Motion ---
  reducedMotionDuration: 0.2, // Simple fade duration when prefers-reduced-motion is active -> 200ms
};

const SERVICES_DATA = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Beautiful websites, e-commerce platforms, landing pages and custom web experiences built for conversion.',
    features: ['Custom Next.js & React', 'High-Speed Performance', 'E-Commerce Solutions', 'Mobile-First Design'],
    icon: Globe,
  },
  {
    number: '02',
    title: 'Software Development',
    description: 'Custom software, interactive dashboards, CRM systems, internal tools and scalable cloud solutions.',
    features: ['SaaS Architectures', 'Admin Dashboards', 'API Integration', 'Cloud Backend'],
    icon: Code2,
  },
  {
    number: '03',
    title: 'AI & Automation',
    description: 'Smart automation, custom AI models, intelligent chatbots, automated workflows and business logic.',
    features: ['Workflow Automation', 'Custom LLM Agents', 'Chatbots & Assistants', 'Process Optimization'],
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Digital Marketing',
    description: 'Social media management, high-converting content, technical SEO, Meta ads and digital growth strategies.',
    features: ['Technical & On-Page SEO', 'Meta & Google Ads', 'Content Strategy', 'Brand Positioning'],
    icon: BarChart3,
  },
  {
    number: '05',
    title: 'Lead Generation',
    description: 'Find, attract and convert high-value customers with data-driven outreach and optimized sales funnels.',
    features: ['Sales Funnel Optimization', 'B2B Lead Pipelines', 'Targeted Campaigns', 'Conversion Analytics'],
    icon: Target,
  },
  {
    number: '06',
    title: 'Custom Solutions',
    description: 'Your vision. Our technology. Real measurable business results engineered to scale rapidly.',
    features: ['Tailored Tech Stack', 'Dedicated Support', 'Scalable Architecture', 'Continuous Optimization'],
    icon: Sparkles,
  },
];

interface ServiceCardProps {
  service: (typeof SERVICES_DATA)[0];
  index: number;
  hoveredCardIndex: number | null;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  isDesktop: boolean;
  reducedMotion: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  hoveredCardIndex,
  onHoverStart,
  onHoverEnd,
  isDesktop,
  reducedMotion,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const isSiblingHovered = isDesktop && hoveredCardIndex !== null && hoveredCardIndex !== index;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Subtle 3D tilt calculations for desktop cursor
    if (isDesktop && !reducedMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -CATALOG_ANIMATION_CONFIG.maxTiltAngle;
      const rotateY = ((x - centerX) / centerX) * CATALOG_ANIMATION_CONFIG.maxTiltAngle;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursor('hover');
    if (isDesktop) {
      onHoverStart(index);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    resetCursor();
    if (isDesktop) {
      onHoverEnd();
    }
  };

  const IconComponent = service.icon;

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Card Outer Variants (staggered entrance on scroll)
  const cardVariants: Variants = {
    hidden: reducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: CATALOG_ANIMATION_CONFIG.cardInitialY,
          scale: CATALOG_ANIMATION_CONFIG.cardInitialScale,
        },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? CATALOG_ANIMATION_CONFIG.reducedMotionDuration : CATALOG_ANIMATION_CONFIG.cardDuration,
        delay: reducedMotion ? 0 : index * CATALOG_ANIMATION_CONFIG.cardStagger,
        ease: CATALOG_ANIMATION_CONFIG.cardEase,
        staggerChildren: reducedMotion ? 0 : CATALOG_ANIMATION_CONFIG.internalStagger,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  // Card Internal Element Variants (icon -> title -> description -> features -> button)
  const internalItemVariants: Variants = {
    hidden: reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? CATALOG_ANIMATION_CONFIG.reducedMotionDuration : 0.5,
        ease: CATALOG_ANIMATION_CONFIG.cardEase,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: CATALOG_ANIMATION_CONFIG.internalInitialZoom },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? CATALOG_ANIMATION_CONFIG.reducedMotionDuration : 0.5,
        ease: CATALOG_ANIMATION_CONFIG.cardEase,
      },
    },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: CATALOG_ANIMATION_CONFIG.cardViewportAmount }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      whileTap={!isDesktop ? { scale: CATALOG_ANIMATION_CONFIG.mobileTapScale } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={scrollToContact}
      style={{
        perspective: isDesktop ? 1000 : undefined,
        willChange: isAnimating || isHovered ? 'transform, opacity' : 'auto',
      }}
      animate={{
        opacity: isSiblingHovered ? CATALOG_ANIMATION_CONFIG.siblingDimOpacity : 1,
        y: isDesktop && isHovered && !reducedMotion ? -CATALOG_ANIMATION_CONFIG.hoverLift : 0,
        rotateX: isDesktop && isHovered && !reducedMotion ? tilt.rotateX : 0,
        rotateY: isDesktop && isHovered && !reducedMotion ? tilt.rotateY : 0,
      }}
      transition={{
        opacity: { duration: 0.3, ease: 'easeOut' },
        y: { duration: 0.25, ease: 'easeOut' },
        rotateX: { duration: 0.15, ease: 'easeOut' },
        rotateY: { duration: 0.15, ease: 'easeOut' },
      }}
      className={`relative bg-[#FAFAF8] border border-[#DCDCD7] hover:border-[#111111] p-3.5 sm:p-6 rounded-lg transition-colors duration-300 group overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[160px] cursor-pointer ${
        isDesktop && isHovered ? 'shadow-xl' : 'hover:shadow-md'
      }`}
    >
      {/* Subtle cursor-following radial highlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(17, 17, 17, 0.04), transparent 80%)`,
        }}
      />

      {/* Top Header Row */}
      <div className="space-y-2 sm:space-y-4">
        {/* Number & Animated Icon Container */}
        <motion.div variants={internalItemVariants} className="flex items-center justify-between border-b border-[#DCDCD7] pb-2 sm:pb-3">
          <span className="font-mono text-[10px] sm:text-xs text-[#666666] tracking-widest font-semibold">
            {service.number}
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-[#F5F5F2] border border-[#DCDCD7] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#F5F5F2] transition-colors duration-300 shrink-0 overflow-hidden">
            <motion.div
              variants={iconVariants}
              animate={{
                scale: isHovered && isDesktop && !reducedMotion ? CATALOG_ANIMATION_CONFIG.iconHoverZoom : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-12" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h3
          variants={internalItemVariants}
          className="text-sm sm:text-lg md:text-2xl font-bold font-display text-[#111111] leading-tight group-hover:text-black"
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          variants={internalItemVariants}
          className="text-[11px] sm:text-xs text-[#666666] leading-relaxed line-clamp-2 sm:line-clamp-none"
        >
          {service.description}
        </motion.p>

        {/* Features Checklist */}
        <motion.ul variants={internalItemVariants} className="space-y-1 pt-1 hidden sm:block">
          {service.features.map((feat) => (
            <li key={feat} className="text-xs text-[#666666] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Bottom CTA Arrow Row */}
      <motion.div variants={internalItemVariants} className="pt-3 sm:pt-6 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#111111] opacity-90">
          Explore →
        </span>
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#DCDCD7] group-hover:border-[#111111] flex items-center justify-center transition-all duration-300 group-hover:bg-[#111111] group-hover:text-white overflow-hidden">
          <motion.div
            animate={{
              x: isHovered && isDesktop && !reducedMotion ? [-4, 0] : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const desktopMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(desktopMedia.matches);
    const desktopListener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    desktopMedia.addEventListener('change', desktopListener);

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionMedia.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionMedia.addEventListener('change', motionListener);

    return () => {
      desktopMedia.removeEventListener('change', desktopListener);
      motionMedia.removeEventListener('change', motionListener);
    };
  }, []);

  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DCDCD7]/80 overflow-x-hidden">
      <SectionHeader
        eyebrow="OUR SERVICES"
        title={"Everything You Need\nUnder One Roof."}
        description="We offer a complete range of digital solutions to help your business build, automate and grow."
      />

      {/* Responsive Grid for Services (1-col on <360px, 2-col on 360px+, 3-col on desktop) */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 mt-8 sm:mt-14">
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard
            key={service.number}
            service={service}
            index={index}
            hoveredCardIndex={hoveredCardIndex}
            onHoverStart={(idx) => setHoveredCardIndex(idx)}
            onHoverEnd={() => setHoveredCardIndex(null)}
            isDesktop={isDesktop}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

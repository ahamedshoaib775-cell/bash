import React, { useState } from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, ExternalLink, Lock, Globe } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CATEGORIES = ['All', 'Websites', 'Marketing', 'Automation'] as const;

const PROJECTS_DATA: Project[] = [
  // --- Social Media Marketing Projects ---
  {
    id: '1',
    title: 'Sip Social',
    category: 'Marketing',
    subtitle: 'Instagram Profile & Social Strategy',
    description: 'Complete Instagram social media management, brand strategy, content creation, and community engagement for @sipsocial__.',
    tags: ['Social Media Marketing', 'Brand Strategy', 'Instagram Management', 'Content'],
    metric: '@sipsocial__',
    link: 'https://www.instagram.com/sipsocial__/',
    image: 'instagram-profile-sipsocial',
  },
  {
    id: '2',
    title: 'The Kaftan Shop',
    category: 'Marketing',
    subtitle: 'Fashion Instagram Profile & Reels',
    description: 'High-converting resort wear content strategy, Instagram Reel production, and targeted social growth for @the.kaftanshop.',
    tags: ['Reels Production', 'E-Commerce Growth', 'Fashion Content', 'Social Ads'],
    metric: '@the.kaftanshop',
    link: 'https://www.instagram.com/the.kaftanshop/',
    image: 'instagram-profile-kaftan',
  },
  {
    id: '3',
    title: 'The Cookiery Lab',
    category: 'Marketing',
    subtitle: 'Gourmet Bakery Instagram Profile',
    description: 'Aesthetic food styling, Instagram visual growth strategy, and local customer engagement marketing for @the.cookierylab.',
    tags: ['Food Marketing', 'Instagram Strategy', 'Visual Styling', 'Local Growth'],
    metric: '@the.cookierylab',
    link: 'https://www.instagram.com/the.cookierylab/',
    image: 'instagram-profile-cookiery',
  },

  // --- Websites Projects (With Official Live Homepage Screenshots) ---
  {
    id: '4',
    title: 'BinSense',
    category: 'Websites',
    subtitle: 'IoT Smart Waste Management Platform',
    description: 'Designed and developed the website for BinSense, an IoT-powered smart bin system monitoring garbage levels in real time using ultrasonic sensors and automated overflow alerts.',
    tags: ['Next.js', 'React', 'IoT Dashboard', 'Tailwind CSS'],
    metric: 'binsense.in',
    link: 'https://binsense.in',
    image: '/binsense-home.png',
  },
  {
    id: '5',
    title: 'CVian UAE',
    category: 'Websites',
    subtitle: 'Career Services & Healthcare Licensing Website',
    description: 'Conversion-focused website for a UAE consultancy serving UAE, India, and UK. Features 3D service cards, dynamic testimonials, WhatsApp chat, and region-routed lead capture.',
    tags: ['Next.js', 'React', 'Firebase', 'Tailwind CSS'],
    metric: 'cvianuae.com',
    link: 'https://cvianuae.com',
    image: '/cvianuae-home.png',
  },
  {
    id: '6',
    title: 'SoleScape',
    category: 'Websites',
    subtitle: 'Real Estate & Home Services Platform',
    description: 'Pune property portal covering rent, buy, commercial, PG & plots with free owner posting flows, home-services marketplace, price-trend insights, and Razorpay payments.',
    tags: ['React', 'Node.js', 'Razorpay', 'Tailwind CSS'],
    metric: 'solescape.in',
    link: 'https://solescape.in',
    image: '/solescape-home.png',
  },
  {
    id: '7',
    title: 'PhiZeeo',
    category: 'Websites',
    subtitle: 'Home Physiotherapy Practice Website',
    description: 'Trust-focused website for Chennai home-visit physiotherapy practice presenting specialists, treatment workflows, Google patient reviews, and one-tap WhatsApp booking.',
    tags: ['HTML/CSS/JS', 'Google Reviews', 'WhatsApp API', 'SEO'],
    metric: 'phizeeo.com',
    link: 'https://phizeeo.com',
    image: '/phizeeo-home.png',
  },

  // --- Automation Projects ---
  {
    id: '8',
    title: 'OmniFlow Intelligent CRM',
    category: 'Automation',
    subtitle: 'AI Workflow & B2B Web Portal',
    description: 'Automated B2B lead enrichment pipeline saving operations teams over 40 hours of manual data processing weekly.',
    tags: ['Python', 'Node.js', 'OpenAI API', 'Tailwind'],
    metric: '40 Hrs Saved Weekly',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
];

// Custom Browser Frame around Live Homepage Screenshots
const WebsiteBrowserFrame: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden flex flex-col justify-between border-b border-[#DDDDD8] group">
      {/* Top macOS / Browser Address Bar */}
      <div className="bg-[#1a1a1a] px-3 py-2 flex items-center justify-between border-b border-white/10 z-20 shrink-0">
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-xs mx-3 bg-[#111111] border border-white/10 rounded-full px-3 py-0.5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-300">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">https://{project.metric}</span>
        </div>

        {/* Globe Link Icon */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
          title={`Visit ${project.metric}`}
        >
          <Globe className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Official Homepage Screenshot Viewport */}
      <div className="relative flex-1 overflow-hidden bg-black">
        <img
          src={project.image}
          alt={`${project.title} Official Homepage`}
          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Hover Dark Overlay with Visit Action */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#111111] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <span>Visit {project.metric}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { setCursor, resetCursor } = useCursor();
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches);

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  return (
    <section id="work" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DDDDD8] overflow-x-hidden">
      <SectionHeader
        eyebrow="OUR WORK"
        title="Some of Our Recent Work."
        description="A few client projects we've built & scaled. Each crafted with a clear goal — more traffic, higher engagement, and measurable revenue growth."
      />

      {/* Horizontally Scrollable Category Filter Pills */}
      <div className="flex items-center gap-2.5 mt-8 sm:mt-10 overflow-x-auto scrollbar-none py-2 -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap shrink-0 snap-x">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`text-xs font-semibold uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer border whitespace-nowrap shrink-0 snap-start active:scale-95 ${
                isActive
                  ? 'bg-[#111111] text-[#F7F7F5] border-[#111111] shadow-sm'
                  : 'bg-[#FAFAF8] text-[#6B6B6B] border-[#DDDDD8] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filterable Portfolio Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isInstagramProfile = project.category === 'Marketing';
            const isWebsiteHomepage = project.category === 'Websites' && project.image.startsWith('/');

            return (
              <motion.div
                key={project.id}
                layout={!isMobile}
                initial={isMobile ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-[#FAFAF8] border border-[#DDDDD8] rounded-lg overflow-hidden group flex flex-col justify-between hover:border-[#111111] transition-all duration-300"
                onMouseEnter={() => setCursor('view', 'VIEW →')}
                onMouseLeave={resetCursor}
              >
                {/* Header Container: Instagram Profile Banner, Website Screenshot Frame, or Image */}
                {isInstagramProfile ? (
                  /* Dedicated Instagram Profile Header Card */
                  <div className="relative p-4 sm:p-6 bg-[#111111] text-[#F7F7F5] flex flex-col justify-between aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#000000] opacity-90" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                          <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider text-white truncate max-w-[120px] sm:max-w-none">
                          {project.metric}
                        </span>
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-mono bg-white/20 text-white px-1.5 py-0.5 rounded uppercase tracking-widest border border-white/20">
                        INSTAGRAM
                      </span>
                    </div>

                    <div className="relative z-10 py-1 sm:py-2 space-y-0.5">
                      <h4 className="text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
                        {project.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 font-mono truncate">
                        instagram.com/{project.metric?.replace('@', '')}
                      </p>
                    </div>

                    <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[11px] font-mono text-gray-300 uppercase tracking-wider">
                        Official Profile
                      </span>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-white text-[#111111] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : isWebsiteHomepage ? (
                  /* Official Website Homepage Screenshot inside Browser Frame */
                  <WebsiteBrowserFrame project={project} />
                ) : (
                  /* Standard Image Container */
                  <div className="relative overflow-hidden aspect-[16/10] bg-[#111111]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                    
                    {project.metric && (
                      <div className="absolute top-3 left-3 bg-[#111111]/90 backdrop-blur-md text-white font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1 rounded border border-white/20 tracking-wider flex items-center gap-1">
                        <span>{project.metric}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                )}

                {/* Card Body */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#6B6B6B]">
                      <span className="truncate pr-2">{project.subtitle}</span>
                      <span className="uppercase tracking-widest font-semibold shrink-0">{project.category}</span>
                    </div>

                    <a
                      href={project.link || '#work'}
                      target={project.link ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="block group/link"
                    >
                      <h3 className="text-base sm:text-xl font-bold font-display text-[#111111] group-hover/link:text-black transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h3>
                    </a>

                    <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech / Service Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#DDDDD8]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] font-mono text-[#6B6B6B] bg-[#F7F7F5] border border-[#DDDDD8] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

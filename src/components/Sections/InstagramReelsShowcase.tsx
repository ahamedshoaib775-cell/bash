import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Heart, Eye } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { SectionHeader } from '../UI/SectionHeader';

// Custom Crisp Instagram SVG Icon
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
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

const REELS_DATA = [
  {
    id: '1',
    title: 'Featured Kaftan Reel Edit',
    views: '385K',
    likes: '31.2K',
    comments: '1.8K',
    tag: 'FEATURED REEL',
    caption: 'Official Kaftan Shop reel showcase. Click to watch live on Instagram.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    url: 'https://www.instagram.com/reel/DJRHGdDyytJ/',
  },
  {
    id: '2',
    title: 'Styling 5 Ways — Resort Wear Trend',
    views: '245K',
    likes: '19.8K',
    comments: '850',
    tag: 'REEL STRATEGY',
    caption: 'Short-form educational fashion reel demonstrating versatile styling options for resort & holiday getaways.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    url: 'https://www.instagram.com/the.kaftanshop/',
  },
  {
    id: '3',
    title: 'Handcrafted Details & Artisanal Weave',
    views: '180K',
    likes: '14.2K',
    comments: '620',
    tag: 'BRAND STORY',
    caption: 'Behind-the-scenes aesthetic breakdown highlighting craft quality, fabric texture, and artisan dedication.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    url: 'https://www.instagram.com/the.kaftanshop/',
  },
  {
    id: '4',
    title: 'Customer Unboxing & Festive Drop',
    views: '125K',
    likes: '11.6K',
    comments: '490',
    tag: 'CONVERSION EDIT',
    caption: 'User-generated style highlights and festive gift packaging reveal with direct Instagram Shop tagging.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
    url: 'https://www.instagram.com/the.kaftanshop/',
  },
];

export const InstagramReelsShowcase: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#DDDDD8]">
      {/* Section Header */}
      <SectionHeader
        eyebrow="DIGITAL MARKETING & REELS CAMPAIGN"
        title={
          <>
            Social Media & Content Strategy for <br className="hidden md:block" />
            <span className="text-[#111111] font-bold">@the.kaftanshop</span>
          </>
        }
        description="Case study highlighting how BASH designs, executes, and scales viral Instagram Reels campaigns driving reach, engagement, and direct revenue for fashion & e-commerce brands."
      />

      {/* Account Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 p-6 md:p-8 rounded-xl bg-[#FAFAF8] border border-[#DDDDD8] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#111111] text-[#F7F7F5] flex items-center justify-center shrink-0 shadow-md">
            <InstagramIcon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold font-display text-[#111111]">@the.kaftanshop</h3>
              <span className="text-[10px] font-mono bg-[#111111] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                FEATURED CLIENT
              </span>
            </div>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Instagram Marketing • Fashion & Resort Wear Content Strategy
            </p>
          </div>
        </div>

        {/* Campaign Highlights */}
        <div className="flex items-center gap-6 md:gap-10 border-t md:border-t-0 md:border-l border-[#DDDDD8] pt-4 md:pt-0 md:pl-8">
          <div>
            <p className="font-display font-bold text-2xl text-[#111111]">860K+</p>
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase">Total Reel Views</p>
          </div>
          <div>
            <p className="font-display font-bold text-2xl text-[#111111]">70K+</p>
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase">Reel Engagement</p>
          </div>
          <div>
            <p className="font-display font-bold text-2xl text-[#111111]">+310%</p>
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase">Sales Growth</p>
          </div>
        </div>

        {/* Follow Link */}
        <a
          href="https://www.instagram.com/reel/DJRHGdDyytJ/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#111111] text-[#FFFFFF] text-xs font-semibold px-6 py-3 rounded-full hover:bg-black transition-colors flex items-center gap-2 group shrink-0"
          onMouseEnter={() => setCursor('button')}
          onMouseLeave={resetCursor}
        >
          <span>Watch Featured Reel ↗</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {/* Embedded Live Player / Interactive Card Grid */}
      <div className="mt-12 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS_DATA.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="group relative bg-[#111111] rounded-xl overflow-hidden aspect-[9/16] flex flex-col justify-between p-5 border border-[#DDDDD8] shadow-md cursor-pointer"
              onClick={() => window.open(reel.url, '_blank')}
            >
              {/* Background Reel Image */}
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-105 group-hover:opacity-95 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />

              {/* Top Tag & Soundwave Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#111111]/80 backdrop-blur-md text-white font-mono text-[9px] px-2.5 py-1 rounded uppercase tracking-widest border border-white/20">
                  {reel.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                  <InstagramIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Caption & Engagement Metrics */}
              <div className="relative z-10 space-y-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent -mx-5 -mb-5 p-5 pt-10">
                <h4 className="text-white font-display font-bold text-base leading-snug group-hover:text-amber-200 transition-colors">
                  {reel.title}
                </h4>
                <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>

                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-white font-mono text-xs">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    {reel.views} Views
                  </span>
                  <span className="flex items-center gap-1 text-gray-300">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    {reel.likes}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Direct Reel Link */}
      <div className="mt-10 text-center">
        <a
          href="https://www.instagram.com/reel/DJRHGdDyytJ/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] hover:underline font-bold"
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
        >
          <span>Watch Reel (https://www.instagram.com/reel/DJRHGdDyytJ/) live on Instagram ↗</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};

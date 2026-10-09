import React from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="work" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DDDDD8] overflow-x-hidden">
      <SectionHeader
        eyebrow="OUR WORK"
        title="Our Work & Project Catalog."
        description="Browse our complete collection of custom web applications, AI automation tools, and digital growth campaigns."
      />

      {/* Interactive Catalog Redirect CTA Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-10 sm:mt-14 flex flex-col items-center justify-center p-8 sm:p-14 bg-[#FAFAF8] border border-[#DDDDD8] rounded-2xl text-center space-y-6 shadow-sm"
      >
        <div className="max-w-xl space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#111111]">
            Explore The Full Catalog
          </h3>
          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
            View all client projects, live website previews, technical architecture breakdowns, and measured business outcomes in our interactive catalog.
          </p>
        </div>

        <a
          href="/catalog.html"
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="inline-flex items-center justify-center gap-2.5 bg-[#111111] text-[#F7F7F5] px-8 py-4 rounded-full font-display text-sm sm:text-base font-bold tracking-tight hover:bg-black transition-all hover:scale-[1.02] shadow-md group active:scale-[0.98] min-h-[48px]"
        >
          <span>View Catalog</span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

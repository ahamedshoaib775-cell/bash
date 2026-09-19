import React, { useEffect, useState } from 'react';
import { MagneticButton } from '../UI/MagneticButton';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky Top Header Wrapper */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'pt-2 md:pt-3' : 'pt-4 md:pt-6'
        }`}
      >
        <nav
          className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between ${
            isScrolled
              ? 'w-auto max-w-2xl md:max-w-3xl h-10 md:h-11 bg-[#F7F7F5]/95 backdrop-blur-md border border-[#DDDDD8] px-4 md:px-6 rounded-full shadow-sm gap-6 md:gap-8'
              : 'w-full max-w-7xl bg-transparent py-2.5 px-4 md:px-8'
          }`}
        >
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-[11px] uppercase font-semibold tracking-wider text-[#6B6B6B] hover:text-[#111111] transition-colors relative py-0.5 group"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#111111] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:block">
            <MagneticButton
              href="#contact"
              onClick={() => handleLinkClick('#contact')}
              className="bg-[#111111] text-[#FFFFFF] text-[11px] font-semibold px-4 py-1.5 rounded-full hover:bg-black transition-colors shadow-sm flex items-center gap-1 group"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#111111] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F7F5] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="space-y-6">
              <span className="text-[10px] tracking-eyebrow text-[#6B6B6B] uppercase font-mono">
                NAVIGATION
              </span>

              <div className="flex flex-col space-y-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-3xl font-display font-bold text-[#111111] hover:text-[#6B6B6B] transition-colors flex items-center justify-between border-b border-[#DDDDD8] pb-3"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-[#6B6B6B]">0{idx + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="space-y-4 pt-6 border-t border-[#DDDDD8]">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="w-full bg-[#111111] text-[#FFFFFF] text-sm font-semibold py-3.5 rounded-full flex items-center justify-center gap-2"
              >
                <span>Get Started →</span>
              </a>
              <div className="text-center text-[11px] text-[#6B6B6B] font-mono">
                hello@bash.com • Chennai, IN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

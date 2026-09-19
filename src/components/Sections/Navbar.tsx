import React, { useEffect, useState } from 'react';
import { BashLogo } from '../UI/BashLogo';
import { MagneticButton } from '../UI/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
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
      if (window.scrollY > 30) {
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
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'pt-2' : 'pt-3 md:pt-5'
        }`}
      >
        <nav
          className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between w-full ${
            isScrolled
              ? 'max-w-md md:max-w-3xl h-11 bg-[#F7F7F5]/95 backdrop-blur-md border border-[#DDDDD8] px-4 md:px-6 rounded-full shadow-sm'
              : 'max-w-7xl bg-transparent py-2.5 px-4 md:px-8'
          }`}
        >
          {/* Mobile & Desktop Official BASH Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="flex items-center cursor-pointer group h-6 overflow-hidden"
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
          >
            <BashLogo size="nav" showWordmark={true} />
          </a>

          {/* Desktop Navigation Links */}
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

          {/* Mobile Menu Icon: 3 thin horizontal lines [☰] -> X */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#111111] focus:outline-none cursor-pointer flex items-center justify-center rounded-full active:bg-[#DDDDD8]/40 transition-colors"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#F7F7F5] flex flex-col justify-between p-6 sm:p-8 pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] md:hidden overflow-y-auto"
          >
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span className="text-[10px] tracking-eyebrow text-[#6B6B6B] uppercase font-mono block">
                NAVIGATION
              </span>

              <div className="flex flex-col space-y-3">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: 0.08 + idx * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-3xl font-display font-bold text-[#111111] hover:text-[#6B6B6B] active:translate-x-1 transition-all flex items-center justify-between border-b border-[#DDDDD8] pb-3"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-[#6B6B6B]">0{idx + 1}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Mobile Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="space-y-4 pt-6 border-t border-[#DDDDD8] mt-8"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="w-full bg-[#111111] text-[#FFFFFF] text-sm font-semibold py-4 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md"
              >
                <span>Get Started →</span>
              </a>
              <div className="text-center text-[11px] text-[#6B6B6B] font-mono">
                hello@bash.com • Chennai, IN
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

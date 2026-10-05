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
  { name: 'Catalog', href: '/catalog.html' },
  { name: 'About', href: '#about' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      // 1. Toggle scrolled pill state
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section ScrollSpy
      const sections = NAV_LINKS.filter(l => l.href.startsWith('#')).map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          const height = sectionEl.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // 4. Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Sticky Top Header Wrapper */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-300 pointer-events-none pt-safe ${
          isScrolled ? 'pt-2 md:pt-3.5' : 'pt-3 md:pt-6'
        }`}
      >
        <nav
          className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between w-full ${
            isScrolled
              ? 'max-w-xs sm:max-w-md md:max-w-5xl h-12 bg-[#F7F7F5]/95 backdrop-blur-md border border-[#DDDDD8] pl-5 pr-5 md:pl-7 md:pr-5 rounded-full shadow-md shadow-black/[0.04]'
              : 'max-w-7xl h-14 bg-transparent px-4 md:px-8 border border-transparent'
          }`}
        >
          {/* Mobile & Desktop Official BASH Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="flex items-center cursor-pointer group h-6 overflow-hidden mr-4 lg:mr-8 shrink-0 min-h-[44px]"
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
          >
            <BashLogo size="nav" showWordmark={true} />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-[11px] uppercase font-semibold tracking-wider transition-colors relative py-0.5 group whitespace-nowrap ${
                    isActive ? 'text-[#111111]' : 'text-[#6B6B6B] hover:text-[#111111]'
                  }`}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#111111] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center shrink-0 ml-4 lg:ml-8">
            <MagneticButton
              href="#contact"
              onClick={() => handleLinkClick('#contact')}
              cursorMode="hover"
              strength={0.08}
              className="bg-[#111111] text-[#FFFFFF] text-[11px] font-semibold px-4 py-1.5 rounded-full hover:bg-black transition-colors shadow-sm flex flex-row items-center justify-center gap-1.5 group whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap leading-none">Get Started</span>
              <ArrowUpRight className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Icon: 44x44px minimum tap target */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="md:hidden w-11 h-11 text-[#111111] focus:outline-none cursor-pointer flex items-center justify-center rounded-full active:bg-[#DDDDD8]/40 transition-colors shrink-0"
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
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
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
                    className="text-3xl font-display font-bold text-[#111111] hover:text-[#6B6B6B] active:translate-x-1 transition-all flex items-center justify-between border-b border-[#DDDDD8] pb-3 min-h-[44px]"
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
                className="w-full bg-[#111111] text-[#FFFFFF] text-sm font-semibold py-4 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md min-h-[44px]"
              >
                <span>Get Started →</span>
              </a>
              <div className="text-center text-[11px] text-[#6B6B6B] font-mono">
                thebash.build@gmail.com • Chennai, IN
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

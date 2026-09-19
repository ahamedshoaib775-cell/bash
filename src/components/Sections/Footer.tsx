import React, { useEffect, useState } from 'react';
import { BashLogo } from '../UI/BashLogo';
import { ArrowUp } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#F7F7F5] pt-16 sm:pt-20 pb-[calc(env(safe-area-inset-bottom,0px)+3rem)] px-4 sm:px-6 md:px-8 border-t border-[#111111] overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Top Minimalist Closing Statement & BASH Logo Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 sm:pb-12 border-b border-gray-800">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-eyebrow text-gray-400 uppercase">
              BASH DIGITAL AGENCY
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold font-display tracking-tight leading-none uppercase">
              We build.<br />
              We automate.<br />
              <span className="text-gray-400">We grow.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-5 sm:gap-6">
            <div className="bg-[#F7F7F5] p-3.5 sm:p-4 rounded-xl">
              <BashLogo size="footer" showWordmark={true} />
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#F7F7F5] text-[#111111] font-semibold text-sm md:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-white active:scale-95 transition-all shadow-md group"
              onMouseEnter={() => setCursor('button')}
              onMouseLeave={resetCursor}
            >
              <span>Start Your Project</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Middle Navigation & Info Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
            <div className="text-lg sm:text-xl font-bold font-display tracking-widest text-[#F7F7F5]">
              BASH™
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Modern digital company engineering web experiences, software products, AI tools, and growth systems.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs">
              {['Home', 'Services', 'Work', 'About', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors py-0.5 inline-block"
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
              SERVICES
            </span>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Web Development</li>
              <li>Software Development</li>
              <li>AI & Automation</li>
              <li>Digital Marketing</li>
              <li>Lead Generation</li>
              <li>Custom Solutions</li>
            </ul>
          </div>

          {/* Col 4: Contact & Live Clock */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
              CONTACT & HQ
            </span>
            <div className="text-xs text-gray-300 space-y-2 font-mono">
              <p className="text-white font-bold">hello@bash.com</p>
              <p>CHENNAI, INDIA</p>
              <div className="pt-2 flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 md:animate-pulse" />
                <span>{currentTime ? `${currentTime} IST` : 'LIVE TIME'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Scroll To Top */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
          <p>© {new Date().getFullYear()} BASH AGENCY. ALL RIGHTS RESERVED.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group active:scale-95"
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

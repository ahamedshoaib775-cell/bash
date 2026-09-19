import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed right-3 top-1/4 bottom-1/4 w-[2px] bg-[#DCDCD7] z-50 hidden md:block rounded-full pointer-events-none opacity-60 hover:opacity-100 transition-opacity"
      aria-hidden="true"
    >
      <div 
        className="w-full bg-[#111111] transition-all duration-75 ease-out rounded-full"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
};

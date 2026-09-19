import React, { useRef, useState, useEffect } from 'react';

interface BashLogoProps {
  size?: 'nav' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'footer';
  showWordmark?: boolean;
  className?: string;
  interactive?: boolean;
  mode?: 'loop' | 'once' | 'static';
  includeTagline?: boolean;
}

export const BashLogo: React.FC<BashLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  interactive = false,
  mode = 'loop',
  includeTagline = false,
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      // Proximity threshold: 250px (subtle 5-8px shift)
      if (dist < 250) {
        const moveX = ((e.clientX - centerX) / 250) * 8;
        const moveY = ((e.clientY - centerY) / 250) * 8;
        setOffset({ x: moveX, y: moveY });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const handleLogoClick = () => {
    setReplayKey((prev) => prev + 1);
  };

  const modeClass = mode === 'static' ? '' : mode;

  // Horizontal inline layout specifically for slim header navigation bars
  if (size === 'nav') {
    return (
      <div
        ref={logoRef}
        className={`inline-flex items-center gap-1.5 bg-transparent select-none transition-transform duration-300 ease-out cursor-pointer ${className}`}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
        onClick={handleLogoClick}
      >
        <div className="h-5 w-auto flex items-center overflow-hidden">
          <svg
            key={replayKey}
            className={`bash-logo-svg ${modeClass} h-5 w-[14px] shrink-0`}
            viewBox="210 10 170 270"
            role="img"
            aria-label="BASH logo mark"
          >
            <g fill="none" stroke="#141414" strokeWidth="24" strokeLinecap="butt" strokeLinejoin="miter">
              <path
                className="piece"
                pathLength="1"
                d="M228 40V132"
                style={{ '--x': '-20px', '--y': '15px', '--r': '-10deg', '--d': '0s' } as React.CSSProperties}
              />
              <path
                className="piece"
                pathLength="1"
                d="M236 48H271A38.5 38.5 0 0 1 271 125H236"
                style={{ '--x': '20px', '--y': '-20px', '--r': '8deg', '--d': '.15s' } as React.CSSProperties}
              />
              <path
                className="piece"
                pathLength="1"
                d="M224 203L289 121"
                style={{ '--x': '-15px', '--y': '20px', '--r': '-16deg', '--d': '.3s' } as React.CSSProperties}
              />
              <path
                className="piece"
                pathLength="1"
                d="M246 224H276.5A49.5 49.5 0 0 0 276.5 125"
                style={{ '--x': '25px', '--y': '15px', '--r': '10deg', '--d': '.45s' } as React.CSSProperties}
              />
            </g>
            <circle className="dot" cx="364" cy="18" r="10" fill="#141414" style={{ '--d': '.75s' } as React.CSSProperties} />
          </svg>
        </div>
        {showWordmark && (
          <span className="font-display font-extrabold text-[12px] md:text-[13px] tracking-[0.2em] text-[#111111] flex items-center gap-1 leading-none">
            <span>B</span>
            <svg className="w-2.5 h-2.5 stroke-[#111111] stroke-[2.5]" viewBox="0 0 24 24" fill="none">
              <path d="M4 20L12 4L20 20" strokeLinejoin="miter" />
            </svg>
            <span>S</span>
            <span>H</span>
          </span>
        )}
      </div>
    );
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-10 md:w-12 h-auto';
      case 'sm':
        return 'w-16 md:w-20 h-auto';
      case 'md':
        return 'w-24 md:w-28 h-auto';
      case 'lg':
        return 'w-44 md:w-52 h-auto';
      case 'xl':
        return 'w-60 md:w-72 h-auto';
      case 'hero':
        return 'w-[85vw] max-w-[540px] h-auto';
      case 'footer':
        return 'w-64 md:w-80 h-auto';
      default:
        return 'w-28 md:w-32 h-auto';
    }
  };

  return (
    <div
      ref={logoRef}
      className={`inline-flex flex-col items-center justify-center bg-transparent select-none transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
      onClick={handleLogoClick}
    >
      <svg
        key={replayKey}
        className={`bash-logo-svg ${modeClass} ${getSizeClasses()}`}
        viewBox={includeTagline ? "0 0 550 512" : "0 0 550 360"}
        role="img"
        tabIndex={0}
        aria-label="BASH. We build. We automate. We grow. Digital creative studio, established 2026."
      >
        {/* The B mark: four strokes that fly in and draw themselves */}
        <g fill="none" stroke="#141414" strokeWidth="16" strokeLinecap="butt" strokeLinejoin="miter">
          {/* stem */}
          <path
            className="piece"
            pathLength="1"
            d="M228 40V132"
            style={{ '--x': '-80px', '--y': '50px', '--r': '-10deg', '--d': '0s' } as React.CSSProperties}
          />
          {/* upper bowl + middle bar */}
          <path
            className="piece"
            pathLength="1"
            d="M236 48H271A38.5 38.5 0 0 1 271 125H236"
            style={{ '--x': '60px', '--y': '-80px', '--r': '8deg', '--d': '.15s' } as React.CSSProperties}
          />
          {/* diagonal slash */}
          <path
            className="piece"
            pathLength="1"
            d="M224 203L289 121"
            style={{ '--x': '-60px', '--y': '90px', '--r': '-16deg', '--d': '.3s' } as React.CSSProperties}
          />
          {/* lower bowl */}
          <path
            className="piece"
            pathLength="1"
            d="M246 224H276.5A49.5 49.5 0 0 0 276.5 125"
            style={{ '--x': '90px', '--y': '60px', '--r': '10deg', '--d': '.45s' } as React.CSSProperties}
          />
        </g>

        {/* The dot drops in last and bounces */}
        <circle className="dot" cx="364" cy="18" r="7" fill="#141414" style={{ '--d': '.75s' } as React.CSSProperties} />

        {/* B  Λ  S  H */}
        {showWordmark && (
          <g className="word" fontSize="40" textAnchor="middle" fill="#141414">
            <text className="rise" x="146" y="328" style={{ '--d': '.95s' } as React.CSSProperties}>
              B
            </text>
            <path
              className="rise"
              d="M222.5 328L234.5 300L246.5 328"
              fill="none"
              stroke="#141414"
              strokeWidth="1.6"
              strokeLinejoin="miter"
              style={{ '--d': '1.05s' } as React.CSSProperties}
            />
            <text className="rise" x="321" y="328" style={{ '--d': '1.15s' } as React.CSSProperties}>
              S
            </text>
            <text className="rise" x="408" y="328" style={{ '--d': '1.25s' } as React.CSSProperties}>
              H
            </text>
          </g>
        )}

        {/* Optional Tagline & Rule */}
        {includeTagline && (
          <>
            {/* hairline */}
            <line
              className="rule"
              x1="77"
              y1="370.5"
              x2="477"
              y2="370.5"
              stroke="#141414"
              strokeOpacity=".16"
              strokeWidth="1"
              style={{ '--d': '1.35s' } as React.CSSProperties}
            />

            {/* tagline */}
            <text
              className="tagline rise"
              x="277"
              y="426"
              fontSize="21"
              textAnchor="middle"
              fill="#141414"
              letterSpacing="-.2"
              style={{ '--d': '1.5s' } as React.CSSProperties}
            >
              We build. We automate. We grow.
            </text>

            <text
              className="sub rise"
              x="277"
              y="454"
              fontSize="11"
              textAnchor="middle"
              fill="#6b6b66"
              letterSpacing="1.7"
              style={{ '--d': '1.65s' } as React.CSSProperties}
            >
              DIGITAL CREATIVE STUDIO • EST. 2026
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

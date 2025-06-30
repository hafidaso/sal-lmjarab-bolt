import React from 'react';

interface StarBorderProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: string;
  speed?: string;
  children: React.ReactNode;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as = 'div',
  className = '',
  color = 'cyan',
  speed = '5s',
  children,
}) => {
  const Tag = as as any;

  // Inline style for animation speed and color
  const borderStyle: React.CSSProperties = {
    '--star-color': color,
    '--star-speed': speed,
  } as React.CSSProperties;

  return (
    <Tag
      className={`relative star-border-animated ${className}`}
      style={borderStyle}
    >
      <span className="absolute inset-0 pointer-events-none z-10 star-border-svg-wrapper">
        <svg
          className="w-full h-full animate-star-border"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="50,5 61,39 98,39 67,59 78,93 50,72 22,93 33,59 2,39 39,39"
            stroke="var(--star-color, cyan)"
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="var(--star-color, cyan)" floodOpacity="0.7" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="var(--star-color, cyan)" floodOpacity="0.4" />
            </filter>
          </defs>
        </svg>
      </span>
      <span className="relative z-20 block">{children}</span>
      <style>{`
        .star-border-animated .star-border-svg-wrapper svg {
          pointer-events: none;
        }
        .animate-star-border {
          animation: star-border-glow var(--star-speed, 5s) linear infinite;
        }
        @keyframes star-border-glow {
          0% { filter: drop-shadow(0 0 4px var(--star-color, cyan)); opacity: 1; }
          50% { filter: drop-shadow(0 0 16px var(--star-color, cyan)); opacity: 0.7; }
          100% { filter: drop-shadow(0 0 4px var(--star-color, cyan)); opacity: 1; }
        }
      `}</style>
    </Tag>
  );
};

export default StarBorder; 
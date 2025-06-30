import React, { useRef } from 'react';

interface SpotlightCardProps {
  className?: string;
  spotlightColor?: string;
  children: React.ReactNode;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  className = '',
  spotlightColor = 'rgba(0, 229, 255, 0.2)',
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--spotlight-x', `-9999px`);
    card.style.setProperty('--spotlight-y', `-9999px`);
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 ${className}`}
      style={{
        background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 80%)`,
        transition: 'background 0.2s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
      <style>{`
        .custom-spotlight-card {
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,229,255,0.10);
        }
      `}</style>
    </div>
  );
};

export default SpotlightCard; 
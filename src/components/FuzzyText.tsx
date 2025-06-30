import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface FuzzyTextProps {
  baseIntensity?: number; // 0 to 1
  hoverIntensity?: number; // 0 to 1
  enableHover?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  baseIntensity = 0.2,
  hoverIntensity = 0.5,
  enableHover = true,
  children,
  className = '',
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const node = textRef.current;
    if (!node) return;

    let animId: number;
    let running = true;

    const animate = () => {
      if (!running) return;
      const intensity = isHovered && enableHover ? hoverIntensity : baseIntensity;
      const blur = Math.random() * intensity * 6;
      const x = (Math.random() - 0.5) * intensity * 8;
      const y = (Math.random() - 0.5) * intensity * 8;
      gsap.set(node, {
        filter: `blur(${blur}px)`,
        x,
        y,
        color: `hsl(${Math.random() * 20 + 340}, 80%, 60%)`,
        textShadow: `0 0 ${2 + blur * 2}px #fff, 0 0 ${4 + blur * 2}px #f0f, 0 0 ${6 + blur * 2}px #0ff`,
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
      cancelAnimationFrame(animId);
      gsap.set(node, { filter: 'none', x: 0, y: 0, color: '', textShadow: 'none' });
    };
  }, [isHovered, baseIntensity, hoverIntensity, enableHover]);

  return (
    <span
      ref={textRef}
      className={className}
      style={{ display: 'inline-block', cursor: enableHover ? 'pointer' : 'default', transition: 'color 0.2s' }}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
    >
      {children}
    </span>
  );
};

export default FuzzyText; 
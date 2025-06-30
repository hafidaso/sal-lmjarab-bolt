import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const elements = Array.from(node.querySelectorAll('.split-text-char'));
    let observer: IntersectionObserver | null = null;
    let hasAnimated = false;

    const animate = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      gsap.set(elements, from);
      gsap.to(elements, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: onLetterAnimationComplete,
      });
    };

    observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer && observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    observer.observe(node);

    return () => {
      observer && observer.disconnect();
    };
    // eslint-disable-next-line
  }, [text]);

  const renderSplit = () => {
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block whitespace-pre">
          {word.split('').map((char, j) => (
            <span key={j} className="split-text-char inline-block">{char}</span>
          ))}
          {' '}
        </span>
      ));
    }
    // Default: split by chars
    return text.split('').map((char, i) => {
      if (char === '\n') {
        return <br key={i} />;
      }
      return (
        <span key={i} className="split-text-char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: 'inline-block', textAlign: textAlign as any }}
    >
      {renderSplit()}
    </span>
  );
};

export default SplitText; 
'use client';

import React, { useState, useEffect } from 'react';

interface CursorGradientProps {
  size?: number | string;
  color?: string;
  opacity?: number | string;
  blur?: number | string;
}

const CursorGradient: React.FC<CursorGradientProps> = ({
  size = 'var(--cursor-gradient-size, 300)',
  color = 'var(--accent-color, #9a8cff)',
  opacity = 'var(--cursor-gradient-opacity, 0.4)',
  blur = 'var(--cursor-gradient-blur, 100)'
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [computedSize, setComputedSize] = useState(300);

  useEffect(() => {
    if (typeof size === 'number') {
      setComputedSize(size);
      return;
    }

    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    if (size.includes('var(--cursor-gradient-size')) {
      const cssVarSize = parseInt(computedStyle.getPropertyValue('--cursor-gradient-size'));
      setComputedSize(isNaN(cssVarSize) ? 300 : cssVarSize);
    } else { // default fallback
      setComputedSize(300);
    }
  }, [size]);

  useEffect(() => {  // update cursor position
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {  // handle mouse leaving window
      setIsVisible(false);
    };

    const handleMouseEnter = () => {  // handle mouse enters window
      setIsVisible(true);
    };

    // add event listeners
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // clean up event listeners
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="cursor-gradient"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
          background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
          transform: `translate(${position.x - computedSize / 2}px, ${position.y - computedSize / 2}px)`,
          opacity: isVisible ? opacity : 0,
          filter: typeof blur === 'number' ? `blur(${blur}px)` : `blur(${blur})`,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default CursorGradient;

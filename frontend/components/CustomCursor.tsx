'use client';
import React, { useEffect, useState, useRef } from 'react';

interface MousePos {
  x: number;
  y: number;
}

interface Dot {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePos>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'link' | 'text' | 'hover'>('default');
  const trailingDots = useRef<Dot[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      trailingDots.current.unshift({ x: e.clientX, y: e.clientY });
      if (trailingDots.current.length > 8) {
        trailingDots.current.pop();
      }
    };

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
      const element = e.target as HTMLElement;

      if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
        setCursorType('button');
      } else if (element.tagName === 'A') {
        setCursorType('link');
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        setCursorType('text');
      } else {
        setCursorType('hover');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterWindow = () => setIsVisible(true);
    const handleMouseLeaveWindow = () => setIsVisible(false);

    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  const getCursorSize = () => {
    if (isClicking) return 'w-3 h-3';
    if (cursorType === 'button') return 'w-8 h-8';
    if (cursorType === 'link') return 'w-6 h-6';
    if (cursorType === 'text') return 'w-1 h-6';
    if (isHovering) return 'w-6 h-6';
    return 'w-4 h-4';
  };

  const getCursorColor = () => {
    if (cursorType === 'button') return 'bg-gradient-to-r from-purple-500 to-pink-500';
    if (cursorType === 'link') return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (cursorType === 'text') return 'bg-gradient-to-r from-green-500 to-emerald-500';
    return 'bg-gradient-to-r from-indigo-500 to-purple-500';
  };

  const getRingSize = () => {
    if (isClicking) return 'w-8 h-8 border-4';
    if (isHovering) return 'w-16 h-16 border-2';
    return 'w-12 h-12 border-2';
  };

  return (
    <>
      {/* Trailing dots */}
      {trailingDots.current.map((dot, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-40"
          style={{
            transform: `translate(${dot.x - 2}px, ${dot.y - 2}px)`,
            opacity: ((8 - index) / 8) * 0.3,
            transition: 'opacity 0.1s ease-out',
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full mix-blend-difference" />
        </div>
      ))}

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          transform: `translate(${mousePosition.x - (cursorType === 'text' ? 2 : 16)}px, ${
            mousePosition.y - (cursorType === 'text' ? 12 : 16)
          }px)`,
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div
          className={`
            ${getCursorSize()} 
            ${getCursorColor()} 
            ${cursorType === 'text' ? '' : 'rounded-full'}
            transition-all duration-200 ease-out
            ${isClicking ? 'scale-75' : 'scale-100'}
            shadow-lg
            ${cursorType === 'button' ? 'animate-pulse' : ''}
          `}
          style={{
            boxShadow:
              cursorType === 'button'
                ? '0 0 20px rgba(168, 85, 247, 0.4)'
                : cursorType === 'link'
                ? '0 0 15px rgba(59, 130, 246, 0.4)'
                : '0 0 10px rgba(99, 102, 241, 0.3)',
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          transform: `translate(${mousePosition.x - 32}px, ${mousePosition.y - 32}px)`,
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          className={`
            ${getRingSize()}
            border-white/30 
            rounded-full 
            transition-all duration-300 ease-out
            ${isHovering ? 'scale-110' : 'scale-100'}
            ${cursorType === 'button' ? 'border-purple-400/50' : ''}
            ${cursorType === 'link' ? 'border-blue-400/50' : ''}
          `}
          style={{
            backdropFilter: 'blur(1px)',
          }}
        />
      </div>

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-45"
          style={{
            transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
          }}
        >
          <div className="w-10 h-10 border-2 border-white/50 rounded-full animate-ping" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;

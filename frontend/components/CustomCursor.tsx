'use client'
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add mouse move listener
    window.addEventListener('mousemove', updateMousePosition);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      // Cleanup
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          transition: 'transform 0.1s ease-out, width 0.2s ease, height 0.2s ease',
        }}
      >
        <div
          className={`bg-white rounded-full transition-all duration-200 ${
            isHovering ? 'w-6 h-6' : 'w-4 h-4'
          }`}
        />
      </div>

      {/* Trailing cursor ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.2s ease, height 0.2s ease',
        }}
      >
        <div
          className={`border-2 border-white rounded-full mix-blend-difference transition-all duration-200 ${
            isHovering ? 'w-12 h-12' : 'w-10 h-10'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
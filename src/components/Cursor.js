'use client';

import React, { useEffect, useRef, useState } from 'react';

const ModernCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [particles, setParticles] = useState([]);

  // Particle system for cursor trail
  class CursorParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1;
      this.size = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.opacity = 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.02;
      this.opacity = this.life;
      this.size *= 0.98;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#379a61';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Add particles on movement
      if (Math.random() > 0.8) {
        setParticles(prev => [...prev.slice(-10), new CursorParticle(e.clientX, e.clientY)]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check for different cursor types
      if (target.matches('a, button, [role="button"], input[type="submit"], .clickable')) {
        setIsHovering(true);
        setCursorType('pointer');
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setIsHovering(true);
        setCursorType('text');
      } else if (target.matches('h1, h2, h3, h4, h5, h6')) {
        setIsHovering(true);
        setCursorType('heading');
      } else {
        setIsHovering(false);
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('default');
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Apply comprehensive cursor hiding
    const applyCustomCursor = () => {
      // Hide default cursor on all elements
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
        
        /* Specifically target interactive elements */
        a, button, input, textarea, select, 
        [role="button"], [role="link"], [role="menuitem"],
        .clickable, .hoverable {
          cursor: none !important;
        }
        
        /* Target elements that might have pointer cursor */
        [onclick], [onmousedown], [onmouseup] {
          cursor: none !important;
        }
      `;
      style.id = 'custom-cursor-styles';
      document.head.appendChild(style);
    };

    applyCustomCursor();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      
      // Clean up styles
      const customStyles = document.getElementById('custom-cursor-styles');
      if (customStyles) {
        customStyles.remove();
      }
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = document.getElementById('cursor-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prev => {
        const updated = prev.map(particle => {
          particle.update();
          particle.draw(ctx);
          return particle;
        }).filter(particle => particle.life > 0);
        
        return updated;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        id="cursor-particles"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen'
        }}
      />

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: cursorPos.y,
          left: cursorPos.x,
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'none'
        }}
      >
        {/* Outer Ring */}
        <div
          className={`cursor-ring ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${cursorType}`}
        />
        
        {/* Inner Dot */}
        <div
          ref={cursorDotRef}
          className={`cursor-dot ${isClicking ? 'click' : ''}`}
        />

        {/* Tech Elements for Hover States */}
        {cursorType === 'pointer' && (
          <div className="cursor-tech-element pointer-tech">
            <div className="tech-corner top-left"></div>
            <div className="tech-corner top-right"></div>
            <div className="tech-corner bottom-left"></div>
            <div className="tech-corner bottom-right"></div>
          </div>
        )}

        {cursorType === 'text' && (
          <div className="cursor-tech-element text-tech">
            <div className="text-cursor-line"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cursor-ring {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(55, 154, 97, 0.5);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          backdrop-filter: blur(2px);
        }

        .cursor-ring.hover {
          width: 60px;
          height: 60px;
          border-color: rgba(55, 154, 97, 0.8);
          box-shadow: 
            0 0 20px rgba(55, 154, 97, 0.3),
            inset 0 0 10px rgba(55, 154, 97, 0.1);
        }

        .cursor-ring.click {
          width: 35px;
          height: 35px;
          border-width: 3px;
          border-color: rgba(55, 154, 97, 1);
          box-shadow: 
            0 0 30px rgba(55, 154, 97, 0.6),
            inset 0 0 15px rgba(55, 154, 97, 0.2);
        }

        .cursor-ring.pointer {
          border-color: rgba(55, 154, 97, 0.9);
          animation: pulse 1.5s infinite;
        }

        .cursor-ring.text {
          border-radius: 20%;
          transform: translate(-50%, -50%) rotate(45deg);
          border-color: rgba(55, 154, 97, 0.7);
        }

        .cursor-ring.heading {
          width: 80px;
          height: 80px;
          border-color: rgba(55, 154, 97, 0.6);
          border-style: dashed;
          animation: rotate 3s linear infinite;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #379a61, #2c7a4e);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.2s ease;
          box-shadow: 0 0 10px rgba(55, 154, 97, 0.5);
        }

        .cursor-dot.click {
          width: 12px;
          height: 12px;
          box-shadow: 0 0 20px rgba(55, 154, 97, 0.8);
        }

        .cursor-tech-element {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .pointer-tech {
          width: 80px;
          height: 80px;
        }

        .tech-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(55, 154, 97, 0.6);
          opacity: 0;
          animation: techCornerAppear 0.3s ease forwards;
        }

        .tech-corner.top-left {
          top: 0;
          left: 0;
          border-bottom: none;
          border-right: none;
          animation-delay: 0.1s;
        }

        .tech-corner.top-right {
          top: 0;
          right: 0;
          border-bottom: none;
          border-left: none;
          animation-delay: 0.2s;
        }

        .tech-corner.bottom-left {
          bottom: 0;
          left: 0;
          border-top: none;
          border-right: none;
          animation-delay: 0.3s;
        }

        .tech-corner.bottom-right {
          bottom: 0;
          right: 0;
          border-top: none;
          border-left: none;
          animation-delay: 0.4s;
        }

        .text-tech {
          width: 2px;
          height: 30px;
        }

        .text-cursor-line {
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #379a61, transparent);
          animation: textBlink 1s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes techCornerAppear {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes textBlink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        /* Hide cursor on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .custom-cursor {
            display: none !important;
          }
        }

        /* Ensure cursor is always visible above everything */
        .custom-cursor * {
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default ModernCursor;
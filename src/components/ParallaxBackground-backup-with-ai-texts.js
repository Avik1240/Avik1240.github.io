'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);
  const [connections, setConnections] = useState([]);

  // Neural network node class
  class NeuralNode {
    constructor(x, y, layer) {
      this.x = x;
      this.y = y;
      this.originalX = x;
      this.originalY = y;
      this.layer = layer;
      this.activation = Math.random();
      this.targetActivation = Math.random();
      this.size = 4 + Math.random() * 6;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(mouseX, mouseY, time) {
      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        this.x += dx * force * 0.02;
        this.y += dy * force * 0.02;
      } else {
        // Return to original position
        this.x += (this.originalX - this.x) * 0.05;
        this.y += (this.originalY - this.y) * 0.05;
      }

      // Animate activation
      this.activation += (this.targetActivation - this.activation) * 0.02;
      if (Math.random() < 0.01) {
        this.targetActivation = Math.random();
      }

      // Pulse effect
      this.pulsePhase += 0.05;
    }

    draw(ctx, time) {
      const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
      const alpha = this.activation * pulse;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      gradient.addColorStop(0, `rgba(55, 154, 97, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(55, 154, 97, ${alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(55, 154, 97, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core node
      ctx.fillStyle = `rgba(55, 154, 97, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Data particle class for flowing information
  class DataParticle {
    constructor() {
      this.reset();
      this.trail = [];
    }

    reset() {
      this.x = -20;
      this.y = Math.random() * window.innerHeight;
      this.vx = 1 + Math.random() * 2;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.life = 1;
      this.maxLife = 1;
      this.size = 2 + Math.random() * 3;
      this.hue = 120 + Math.random() * 60; // Green to cyan range
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.005;

      // Add to trail
      this.trail.push({ x: this.x, y: this.y, life: this.life });
      if (this.trail.length > 20) this.trail.shift();

      // Reset if off screen or life ended
      if (this.x > window.innerWidth + 20 || this.life <= 0) {
        this.reset();
        this.trail = [];
      }
    }

    draw(ctx) {
      // Draw trail
      for (let i = 0; i < this.trail.length; i++) {
        const point = this.trail[i];
        const alpha = (i / this.trail.length) * point.life * 0.5;
        const size = this.size * (i / this.trail.length) * 0.5;
        
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw main particle
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize neural network and particles
  useEffect(() => {
    const initializeElements = () => {
      const newNodes = [];
      const newConnections = [];
      const newParticles = [];

      // Create neural network layers
      const layers = [6, 8, 6, 4];
      const layerSpacing = window.innerWidth / (layers.length + 1);
      
      layers.forEach((nodeCount, layerIndex) => {
        const x = layerSpacing * (layerIndex + 1);
        const nodeSpacing = window.innerHeight / (nodeCount + 1);
        
        for (let i = 0; i < nodeCount; i++) {
          const y = nodeSpacing * (i + 1);
          newNodes.push(new NeuralNode(x, y, layerIndex));
        }
      });

      // Create connections between layers
      layers.forEach((_, layerIndex) => {
        if (layerIndex < layers.length - 1) {
          const currentLayer = newNodes.filter(node => node.layer === layerIndex);
          const nextLayer = newNodes.filter(node => node.layer === layerIndex + 1);
          
          currentLayer.forEach(node1 => {
            nextLayer.forEach(node2 => {
              if (Math.random() > 0.3) { // Not all connections
                newConnections.push({ from: node1, to: node2, strength: Math.random() });
              }
            });
          });
        }
      });

      // Create data particles
      for (let i = 0; i < 15; i++) {
        newParticles.push(new DataParticle());
      }

      return { nodes: newNodes, connections: newConnections, particles: newParticles };
    };

    const { nodes, connections, particles } = initializeElements();
    setParticles({ nodes, connections, dataFlow: particles });
    setIsMounted(true);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Canvas animation loop
  useEffect(() => {
    if (!isMounted || !particles.nodes) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Update and draw neural network
      particles.nodes.forEach(node => {
        node.update(mousePosition.x, mousePosition.y, time);
      });

      // Draw connections
      particles.connections.forEach(connection => {
        const alpha = (connection.from.activation + connection.to.activation) * 0.5 * connection.strength;
        ctx.strokeStyle = `rgba(55, 154, 97, ${alpha * 0.3})`;
        ctx.lineWidth = connection.strength * 2;
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.stroke();
      });

      // Draw nodes
      particles.nodes.forEach(node => {
        node.draw(ctx, time);
      });

      // Update and draw data particles
      particles.dataFlow.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, particles, mousePosition]);

  if (!isMounted) return null;

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          zIndex: -1,
          overflow: 'hidden',
          background: 'var(--background)',
        }}
      >
        {/* Neural network canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* Floating AI/Tech Keywords */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.1,
          }}
        >
          {['Neural Networks', 'Deep Learning', 'React.js', 'Node.js', 'TensorFlow', 'API Design', 'Machine Learning', 'Full Stack', 'Research', 'Innovation'].map((keyword, index) => (
            <div
              key={keyword}
              style={{
                position: 'absolute',
                left: `${10 + (index * 18) % 80}%`,
                top: `${20 + (index * 25) % 60}%`,
                fontSize: `${12 + index % 8}px`,
                color: 'var(--primary)',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                animation: `float ${15 + index * 2}s infinite ease-in-out`,
                animationDelay: `${index * 2}s`,
                transform: `rotate(${index * 15}deg)`,
              }}
            >
              {keyword}
            </div>
          ))}
        </div>

        {/* Binary rain effect */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `
              linear-gradient(90deg, transparent 0%, rgba(55, 154, 97, 0.02) 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, rgba(55, 154, 97, 0.02) 50%, transparent 100%)
            `,
            backgroundSize: '100px 100px',
            animation: 'matrixFlow 20s linear infinite',
            opacity: 0.3,
          }}
        />

        {/* Gradient overlays for depth */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 80% 20%, rgba(55, 154, 97, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(55, 154, 97, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, rgba(55, 154, 97, 0.02) 0%, transparent 50%, rgba(55, 154, 97, 0.02) 100%)
            `,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-30px) rotate(90deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.15;
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
            opacity: 0.25;
          }
        }

        @keyframes matrixFlow {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        @media (max-width: 768px) {
          div[style*="fontSize"] {
            font-size: 8px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="fontSize"] {
            font-size: 6px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ParallaxBackground;
// ************MAIN PARALLAX*************
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const ModernParallaxBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  // Enhanced Neural Node with better visibility
  class VisibleNeuralNode {
    constructor(x, y, layer) {
      this.x = x;
      this.y = y;
      this.originalX = x;
      this.originalY = y;
      this.layer = layer;
      this.activation = Math.random();
      this.targetActivation = Math.random();
      this.size = 4 + Math.random() * 6; // Back to original size
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(mouseX, mouseY, time, scrollProgress) {
      // Enhanced mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        this.x += dx * force * 0.02;
        this.y += dy * force * 0.02;
      } else {
        this.x += (this.originalX - this.x) * 0.05;
        this.y += (this.originalY - this.y) * 0.05;
      }

      // More visible activation changes
      this.activation += (this.targetActivation - this.activation) * 0.02;
      if (Math.random() < 0.01) {
        this.targetActivation = Math.random();
      }

      this.pulsePhase += 0.05;
    }

    draw(ctx, time, scrollProgress) {
      const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
      const alpha = this.activation * pulse;

      // More visible glow effect - exact from original
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size * 2
      );
      gradient.addColorStop(0, `rgba(55, 154, 97, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(55, 154, 97, ${alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(55, 154, 97, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Brighter core node
      ctx.fillStyle = `rgba(55, 154, 97, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Enhanced geometric overlay at scroll
      if (scrollProgress > 0.3) {
        const geomAlpha = (scrollProgress - 0.3) * alpha;
        ctx.strokeStyle = `rgba(55, 154, 97, ${geomAlpha * 0.6})`;
        ctx.lineWidth = 2;

        // Hexagon from original code
        ctx.beginPath();
        const hexSize = this.size * 1.5;
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 + this.pulsePhase;
          const x = this.x + Math.cos(angle) * hexSize;
          const y = this.y + Math.sin(angle) * hexSize;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  // Enhanced Data Particle with original trail system
  class VisibleDataParticle {
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
      this.size = 2 + Math.random() * 3;
      this.hue = 120 + Math.random() * 60; // Green to cyan range like original
    }

    update(scrollProgress) {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.005;

      // Full trail system like original
      this.trail.push({ x: this.x, y: this.y, life: this.life });
      if (this.trail.length > 20) this.trail.shift();

      if (this.x > window.innerWidth + 20 || this.life <= 0) {
        this.reset();
        this.trail = [];
      }
    }

    draw(ctx, scrollProgress) {
      // Full trail rendering like original
      for (let i = 0; i < this.trail.length; i++) {
        const point = this.trail[i];
        const alpha = (i / this.trail.length) * point.life * 0.5;
        const size = this.size * (i / this.trail.length) * 0.5;

        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Brighter main particle
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Original neural network complexity
  useEffect(() => {
    const initializeElements = () => {
      const newNodes = [];
      const newConnections = [];
      const newParticles = [];

      // Original layer structure
      const layers = [6, 8, 6, 4];
      const layerSpacing = window.innerWidth / (layers.length + 1);

      layers.forEach((nodeCount, layerIndex) => {
        const x = layerSpacing * (layerIndex + 1);
        const nodeSpacing = window.innerHeight / (nodeCount + 1);

        for (let i = 0; i < nodeCount; i++) {
          const y = nodeSpacing * (i + 1);
          newNodes.push(new VisibleNeuralNode(x, y, layerIndex));
        }
      });

      // Original connection density
      layers.forEach((_, layerIndex) => {
        if (layerIndex < layers.length - 1) {
          const currentLayer = newNodes.filter(
            (node) => node.layer === layerIndex
          );
          const nextLayer = newNodes.filter(
            (node) => node.layer === layerIndex + 1
          );

          currentLayer.forEach((node1) => {
            nextLayer.forEach((node2) => {
              if (Math.random() > 0.3) {
                // Original connection probability
                newConnections.push({
                  from: node1,
                  to: node2,
                  strength: Math.random(),
                });
              }
            });
          });
        }
      });

      // Original particle count
      for (let i = 0; i < 15; i++) {
        newParticles.push(new VisibleDataParticle());
      }

      return {
        nodes: newNodes,
        connections: newConnections,
        particles: newParticles,
      };
    };

    const { nodes, connections, particles } = initializeElements();
    setParticles({ nodes, connections, dataFlow: particles });
    setIsMounted(true);
  }, []);

  // Original mouse tracking
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = Math.min(scrollPosition / maxScroll, 1);

      setScrollY(scrollPosition);

      if (canvasRef.current) {
        const parallaxOffset = scrollPosition * 0.5; // Original parallax intensity
        canvasRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Full animation loop
  useEffect(() => {
    if (!isMounted || !particles.nodes) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const maxScroll = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Update neural network
      particles.nodes.forEach((node) => {
        node.update(mousePosition.x, mousePosition.y, time, scrollProgress);
      });

      // Enhanced connection rendering
      particles.connections.forEach((connection) => {
        const alpha =
          (connection.from.activation + connection.to.activation) *
          0.5 *
          connection.strength;
        ctx.strokeStyle = `rgba(55, 154, 97, ${alpha * 0.3})`;
        ctx.lineWidth = connection.strength * 2;
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.stroke();
      });

      // Draw nodes
      particles.nodes.forEach((node) => {
        node.draw(ctx, time, scrollProgress);
      });

      // Update and draw particles
      particles.dataFlow.forEach((particle) => {
        particle.update(scrollProgress);
        particle.draw(ctx, scrollProgress);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, particles, mousePosition, scrollY]);

  if (!isMounted) return null;

  const maxScroll = Math.max(
    document.body.scrollHeight - window.innerHeight,
    1
  );
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "120vh",
          zIndex: -1,
          overflow: "hidden",
          background: "var(--background)",
        }}
      >
        {/* Neural network canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Enhanced Floating AI/Tech Keywords - More Visible */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.15, // Increased from 0.1
          }}
        >
          {[
            "C++",
            "Prompt Engineering",
            "React.js",
            "Node.js",
            "Next.js",
            "API Design",
            "AI Research",
            "Full Stack",
            "Research",
            "Innovation",
            "Web Accessibility",
            "Git & GitLab",
            "VS Code",
            "Play with AI",
          ].map((keyword, index) => (
            <div
              key={keyword}
              style={{
                position: "absolute",
                left: `${10 + ((index * 18) % 80)}%`,
                top: `${20 + ((index * 25) % 60)}%`,
                fontSize: `${12 + (index % 8)}px`,
                color: "var(--primary)",
                fontFamily: "monospace",
                fontWeight: "bold",
                animation: `visibleFloat ${
                  15 + index * 2
                }s infinite ease-in-out`,
                animationDelay: `${index * 2}s`,
                transform: `rotate(${index * 15}deg)`,
              }}
            >
              {keyword}
            </div>
          ))}
        </div>

        {/* Enhanced Geometric Shapes - More Visible */}
        {scrollProgress > 0.2 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: (scrollProgress - 0.2) * 0.6, // More visible
            }}
          >
            {/* Hexagons */}
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={`hex-${index}`}
                style={{
                  position: "absolute",
                  left: `${15 + ((index * 22) % 70)}%`,
                  top: `${10 + ((index * 30) % 80)}%`,
                  width: `${20 + index * 3}px`,
                  height: `${20 + index * 3}px`,
                  border: `2px solid rgba(55, 154, 97, 0.6)`, // Brighter
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  animation: `hexFloat ${12 + index * 3}s infinite ease-in-out`,
                  animationDelay: `${index * 1.5}s`,
                }}
              />
            ))}

            {/* Circles */}
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={`circle-${index}`}
                style={{
                  position: "absolute",
                  left: `${8 + ((index * 19) % 85)}%`,
                  top: `${5 + ((index * 28) % 90)}%`,
                  width: `${12 + index * 2}px`,
                  height: `${12 + index * 2}px`,
                  border: `2px solid rgba(55, 154, 97, 0.5)`, // Brighter
                  borderRadius: "50%",
                  animation: `circleFloat ${
                    8 + index * 1.5
                  }s infinite ease-in-out`,
                  animationDelay: `${index * 1}s`,
                }}
              />
            ))}

            {/* Diamonds */}
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={`diamond-${index}`}
                style={{
                  position: "absolute",
                  left: `${30 + ((index * 20) % 40)}%`,
                  top: `${15 + ((index * 40) % 70)}%`,
                  width: `${18 + index * 2}px`,
                  height: `${18 + index * 2}px`,
                  border: `2px solid rgba(55, 154, 97, 0.4)`,
                  transform: "rotate(45deg)",
                  animation: `diamondFloat ${
                    14 + index * 2
                  }s infinite ease-in-out`,
                  animationDelay: `${index * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Enhanced Grid Patterns with Spotlight */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
              linear-gradient(90deg, rgba(55, 154, 97, 0.08) 1px, transparent 1px),
              linear-gradient(0deg, rgba(55, 154, 97, 0.08) 1px, transparent 1px),
              linear-gradient(45deg, rgba(55, 154, 97, 0.04) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(55, 154, 97, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 50px 50px, 35px 35px, 35px 35px",
            opacity: 0.6,
          }}
        />

        {/* Enhanced Gradient overlays with Spotlight Effects */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(circle at 80% 20%, rgba(55, 154, 97, 0.01) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(55, 154, 97, 0.01) 0%, transparent 50%),
              radial-gradient(circle at ${
                50 + Math.sin(Date.now() * 0.001) * 30
              }% ${
              50 + Math.cos(Date.now() * 0.0015) * 30
            }%, rgba(55, 154, 97, 0.04) 0%, transparent 70%),
              linear-gradient(135deg, rgba(55, 154, 97, 0.02) 0%, transparent 50%, rgba(55, 154, 97, 0.02) 100%)
            `,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes visibleFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translateY(-30px) rotate(90deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
            opacity: 0.35;
          }
        }

        @keyframes hexFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-25px) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
            opacity: 0.9;
          }
        }

        @keyframes circleFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) scale(1.3);
            opacity: 0.8;
          }
        }

        @keyframes diamondFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-35px) rotate(225deg) scale(1.1);
            opacity: 0.7;
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

        @keyframes patternFlow {
          0% {
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          }
          100% {
            background-position: 50px 50px, 50px 50px, 35px 35px, 35px 35px;
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

export default ModernParallaxBackground;

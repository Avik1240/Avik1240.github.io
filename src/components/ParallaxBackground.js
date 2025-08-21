// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';

// const ParallaxBackground = () => {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isMounted, setIsMounted] = useState(false);
//   const [particles, setParticles] = useState([]);
//   const [connections, setConnections] = useState([]);

//   // Neural network node class
//   class NeuralNode {
//     constructor(x, y, layer) {
//       this.x = x;
//       this.y = y;
//       this.originalX = x;
//       this.originalY = y;
//       this.layer = layer;
//       this.activation = Math.random();
//       this.targetActivation = Math.random();
//       this.size = 4 + Math.random() * 6;
//       this.pulsePhase = Math.random() * Math.PI * 2;
//     }

//     update(mouseX, mouseY, time) {
//       // Mouse interaction
//       const dx = mouseX - this.x;
//       const dy = mouseY - this.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);
      
//       if (distance < 150) {
//         const force = (150 - distance) / 150;
//         this.x += dx * force * 0.02;
//         this.y += dy * force * 0.02;
//       } else {
//         // Return to original position
//         this.x += (this.originalX - this.x) * 0.05;
//         this.y += (this.originalY - this.y) * 0.05;
//       }

//       // Animate activation
//       this.activation += (this.targetActivation - this.activation) * 0.02;
//       if (Math.random() < 0.01) {
//         this.targetActivation = Math.random();
//       }

//       // Pulse effect
//       this.pulsePhase += 0.05;
//     }

//     draw(ctx, time) {
//       const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
//       const alpha = this.activation * pulse;
      
//       // Glow effect with dark theme
//       const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
//       gradient.addColorStop(0, `rgba(10, 10, 10, ${alpha * 0.9})`);
//       gradient.addColorStop(0.3, `rgba(55, 154, 97, ${alpha * 0.6})`);
//       gradient.addColorStop(0.7, `rgba(10, 10, 10, ${alpha * 0.3})`);
//       gradient.addColorStop(1, `rgba(10, 10, 10, 0)`);
      
//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
//       ctx.fill();

//       // Core node with dark accent
//       ctx.fillStyle = `rgba(10, 10, 10, ${alpha * 0.8})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
//       ctx.fill();
      
//       ctx.fillStyle = `rgba(55, 154, 97, ${alpha})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   // Data particle class for flowing information
//   class DataParticle {
//     constructor() {
//       this.reset();
//       this.trail = [];
//     }

//     reset() {
//       this.x = -20;
//       this.y = Math.random() * window.innerHeight;
//       this.vx = 1 + Math.random() * 2;
//       this.vy = (Math.random() - 0.5) * 0.5;
//       this.life = 1;
//       this.maxLife = 1;
//       this.size = 2 + Math.random() * 3;
//       this.hue = Math.random() > 0.5 ? 120 : 0; // Green or dark theme
//       this.darkAccent = Math.random() > 0.3;
//     }

//     update() {
//       this.x += this.vx;
//       this.y += this.vy;
//       this.life -= 0.005;

//       // Add to trail
//       this.trail.push({ x: this.x, y: this.y, life: this.life });
//       if (this.trail.length > 20) this.trail.shift();

//       // Reset if off screen or life ended
//       if (this.x > window.innerWidth + 20 || this.life <= 0) {
//         this.reset();
//         this.trail = [];
//       }
//     }

//     draw(ctx) {
//       // Draw trail with dark theme
//       for (let i = 0; i < this.trail.length; i++) {
//         const point = this.trail[i];
//         const alpha = (i / this.trail.length) * point.life * 0.6;
//         const size = this.size * (i / this.trail.length) * 0.5;
        
//         if (this.darkAccent) {
//           ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
//         } else {
//           ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
//         }
//         ctx.beginPath();
//         ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Draw main particle with dark accent
//       if (this.darkAccent) {
//         ctx.fillStyle = `rgba(10, 10, 10, ${this.life * 0.8})`;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
//         ctx.fill();
        
//         ctx.fillStyle = `rgba(55, 154, 97, ${this.life})`;
//       } else {
//         ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
//       }
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   // Initialize neural network and particles
//   useEffect(() => {
//     const initializeElements = () => {
//       const newNodes = [];
//       const newConnections = [];
//       const newParticles = [];

//       // Create neural network layers
//       const layers = [6, 8, 6, 4];
//       const layerSpacing = window.innerWidth / (layers.length + 1);
      
//       layers.forEach((nodeCount, layerIndex) => {
//         const x = layerSpacing * (layerIndex + 1);
//         const nodeSpacing = window.innerHeight / (nodeCount + 1);
        
//         for (let i = 0; i < nodeCount; i++) {
//           const y = nodeSpacing * (i + 1);
//           newNodes.push(new NeuralNode(x, y, layerIndex));
//         }
//       });

//       // Create connections between layers
//       layers.forEach((_, layerIndex) => {
//         if (layerIndex < layers.length - 1) {
//           const currentLayer = newNodes.filter(node => node.layer === layerIndex);
//           const nextLayer = newNodes.filter(node => node.layer === layerIndex + 1);
          
//           currentLayer.forEach(node1 => {
//             nextLayer.forEach(node2 => {
//               if (Math.random() > 0.3) { // Not all connections
//                 newConnections.push({ from: node1, to: node2, strength: Math.random() });
//               }
//             });
//           });
//         }
//       });

//       // Create data particles
//       for (let i = 0; i < 15; i++) {
//         newParticles.push(new DataParticle());
//       }

//       return { nodes: newNodes, connections: newConnections, particles: newParticles };
//     };

//     const { nodes, connections, particles } = initializeElements();
//     setParticles({ nodes, connections, dataFlow: particles });
//     setIsMounted(true);
//   }, []);

//   // Mouse tracking
//   const handleMouseMove = useCallback((e) => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (rect) {
//       setMousePosition({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//     }
//   }, []);

//   // Parallax scroll effect
//   useEffect(() => {
//     if (!isMounted) return;

//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const canvas = canvasRef.current;
//       if (canvas) {
//         canvas.style.transform = `translateY(${scrollY * 0.5}px)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isMounted]);

//   // Canvas animation loop
//   useEffect(() => {
//     if (!isMounted || !particles.nodes) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let time = 0;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       time += 0.016;

//       // Update and draw neural network
//       particles.nodes.forEach(node => {
//         node.update(mousePosition.x, mousePosition.y, time);
//       });

//       // Draw connections with dark theme
//       particles.connections.forEach(connection => {
//         const alpha = (connection.from.activation + connection.to.activation) * 0.5 * connection.strength;
        
//         // Create gradient connection
//         const gradient = ctx.createLinearGradient(
//           connection.from.x, connection.from.y,
//           connection.to.x, connection.to.y
//         );
//         gradient.addColorStop(0, `rgba(10, 10, 10, ${alpha * 0.6})`);
//         gradient.addColorStop(0.5, `rgba(55, 154, 97, ${alpha * 0.4})`);
//         gradient.addColorStop(1, `rgba(10, 10, 10, ${alpha * 0.6})`);
        
//         ctx.strokeStyle = gradient;
//         ctx.lineWidth = connection.strength * 2.5;
//         ctx.beginPath();
//         ctx.moveTo(connection.from.x, connection.from.y);
//         ctx.lineTo(connection.to.x, connection.to.y);
//         ctx.stroke();
//       });

//       // Draw nodes
//       particles.nodes.forEach(node => {
//         node.draw(ctx, time);
//       });

//       // Update and draw data particles
//       particles.dataFlow.forEach(particle => {
//         particle.update();
//         particle.draw(ctx);
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     resize();
//     animate();

//     window.addEventListener('resize', resize);
//     return () => {
//       window.removeEventListener('resize', resize);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isMounted, particles, mousePosition]);

//   if (!isMounted) return null;

//   return (
//     <>
//       <div
//         ref={containerRef}
//         onMouseMove={handleMouseMove}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '120vh',
//           zIndex: -1,
//           overflow: 'hidden',
//           background: 'linear-gradient(135deg, #0a0a0a 0%, var(--background) 50%, #0a0a0a 100%)',
//         }}
//       >
//         {/* Neural network canvas */}
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//           }}
//         />

//         {/* Coding-inspired Shapes */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//           }}
//         >
//           {/* Bracket Shapes */}
//           {Array.from({ length: 12 }, (_, index) => (
//             <div
//               key={`bracket-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${10 + (index * 15) % 80}%`,
//                 top: `${5 + (index * 25) % 90}%`,
//                 width: `${25 + index * 2}px`,
//                 height: `${30 + index * 2}px`,
//                 border: `2px solid ${index % 2 === 0 ? '#0a0a0a' : 'var(--primary)'}`,
//                 borderRight: 'none',
//                 borderRadius: '8px 0 0 8px',
//                 opacity: 0.6,
//                 animation: `bracketFloat ${10 + index * 1.5}s infinite ease-in-out`,
//                 animationDelay: `${index * 0.8}s`,
//               }}
//             />
//           ))}

//           {/* Function Parentheses */}
//           {Array.from({ length: 8 }, (_, index) => (
//             <div
//               key={`paren-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${20 + (index * 18) % 60}%`,
//                 top: `${15 + (index * 30) % 70}%`,
//                 width: `${20 + index}px`,
//                 height: `${35 + index * 2}px`,
//                 border: `2.5px solid ${index % 3 === 0 ? '#0a0a0a' : 'var(--primary)'}`,
//                 borderRight: 'none',
//                 borderLeft: 'none',
//                 borderRadius: '50%',
//                 opacity: 0.5,
//                 transform: index % 2 === 0 ? 'scaleX(-1)' : 'scaleX(1)',
//                 animation: `parenFloat ${12 + index * 2}s infinite ease-in-out`,
//                 animationDelay: `${index * 1.2}s`,
//               }}
//             />
//           ))}

//           {/* Code Block Squares */}
//           {Array.from({ length: 15 }, (_, index) => (
//             <div
//               key={`block-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${5 + (index * 12) % 90}%`,
//                 top: `${8 + (index * 22) % 85}%`,
//                 width: `${15 + index}px`,
//                 height: `${15 + index}px`,
//                 backgroundColor: index % 4 === 0 ? '#0a0a0a' : 'transparent',
//                 border: `2px solid ${index % 3 === 0 ? '#0a0a0a' : 'var(--primary)'}`,
//                 borderRadius: '3px',
//                 opacity: 0.7,
//                 animation: `blockFloat ${8 + index}s infinite ease-in-out`,
//                 animationDelay: `${index * 0.5}s`,
//               }}
//             />
//           ))}

//           {/* Terminal Cursors */}
//           {Array.from({ length: 6 }, (_, index) => (
//             <div
//               key={`cursor-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${25 + (index * 20) % 50}%`,
//                 top: `${20 + (index * 35) % 60}%`,
//                 width: '3px',
//                 height: `${20 + index * 3}px`,
//                 backgroundColor: index % 2 === 0 ? '#0a0a0a' : 'var(--primary)',
//                 opacity: 0.8,
//                 animation: `cursorBlink ${1 + index * 0.3}s infinite ease-in-out`,
//                 animationDelay: `${index * 0.7}s`,
//               }}
//             />
//           ))}

//           {/* Angle Brackets < > */}
//           {Array.from({ length: 10 }, (_, index) => (
//             <div
//               key={`angle-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${15 + (index * 16) % 70}%`,
//                 top: `${12 + (index * 28) % 75}%`,
//                 width: `${18 + index}px`,
//                 height: `${18 + index}px`,
//                 border: `2px solid ${index % 2 === 0 ? '#0a0a0a' : 'var(--primary)'}`,
//                 borderRight: 'none',
//                 borderBottom: 'none',
//                 transform: index % 2 === 0 ? 'rotate(-45deg)' : 'rotate(135deg)',
//                 opacity: 0.6,
//                 animation: `angleFloat ${9 + index * 1.8}s infinite ease-in-out`,
//                 animationDelay: `${index * 1}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* Enhanced grid patterns with dark theme */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: `
//               linear-gradient(90deg, rgba(10, 10, 10, 0.4) 1px, transparent 1px),
//               linear-gradient(0deg, rgba(10, 10, 10, 0.4) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(55, 154, 97, 0.1) 1px, transparent 1px),
//               linear-gradient(0deg, rgba(55, 154, 97, 0.1) 1px, transparent 1px),
//               radial-gradient(circle, rgba(10, 10, 10, 0.2) 1px, transparent 1px)
//             `,
//             backgroundSize: '30px 30px, 30px 30px, 60px 60px, 60px 60px, 15px 15px',
//             animation: 'darkPatternFlow 30s linear infinite',
//             opacity: 0.8,
//           }}
//         />

//         {/* Dark gradient overlays */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: `
//               radial-gradient(circle at 80% 20%, rgba(10, 10, 10, 0.6) 0%, transparent 40%),
//               radial-gradient(circle at 20% 80%, rgba(10, 10, 10, 0.4) 0%, transparent 40%),
//               radial-gradient(circle at 60% 60%, rgba(55, 154, 97, 0.08) 0%, transparent 30%),
//               linear-gradient(135deg, rgba(10, 10, 10, 0.3) 0%, transparent 30%, rgba(10, 10, 10, 0.3) 70%, transparent 100%)
//             `,
//           }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes bracketFloat {
//           0%, 100% {
//             transform: translateY(0px) rotateY(0deg);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(-30px) rotateY(180deg);
//             opacity: 0.8;
//           }
//         }

//         @keyframes parenFloat {
//           0%, 100% {
//             transform: translateY(0px) scaleY(1);
//             opacity: 0.5;
//           }
//           33% {
//             transform: translateY(-20px) scaleY(1.3);
//             opacity: 0.7;
//           }
//           66% {
//             transform: translateY(-10px) scaleY(0.8);
//             opacity: 0.6;
//           }
//         }

//         @keyframes blockFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg) scale(1);
//             opacity: 0.7;
//           }
//           25% {
//             transform: translateY(-15px) rotate(90deg) scale(1.1);
//             opacity: 0.9;
//           }
//           75% {
//             transform: translateY(-25px) rotate(270deg) scale(0.9);
//             opacity: 0.5;
//           }
//         }

//         @keyframes cursorBlink {
//           0%, 50% {
//             opacity: 0.8;
//             transform: scaleY(1);
//           }
//           51%, 100% {
//             opacity: 0.2;
//             transform: scaleY(1.2);
//           }
//         }

//         @keyframes angleFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(-45deg) scale(1);
//             opacity: 0.6;
//           }
//           33% {
//             transform: translateY(-25px) rotate(45deg) scale(1.2);
//             opacity: 0.8;
//           }
//           66% {
//             transform: translateY(15px) rotate(135deg) scale(0.9);
//             opacity: 0.4;
//           }
//         }

//         @keyframes darkPatternFlow {
//           0% {
//             background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
//           }
//           100% {
//             background-position: 30px 30px, 30px 30px, 60px 60px, 60px 60px, 15px 15px;
//           }
//         }

//         @media (max-width: 768px) {
//           div[style*="fontSize"] {
//             font-size: 8px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           div[style*="fontSize"] {
//             font-size: 6px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ParallaxBackground;


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

        {/* Floating Geometric Shapes */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Hexagons */}
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={`hex-${index}`}
              style={{
                position: 'absolute',
                left: `${15 + (index * 22) % 70}%`,
                top: `${10 + (index * 30) % 80}%`,
                width: `${20 + index * 3}px`,
                height: `${20 + index * 3}px`,
                border: `2px solid var(--primary)`,
                opacity: 0.4,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                animation: `rotateFloat ${12 + index * 3}s infinite ease-in-out`,
                animationDelay: `${index * 1.5}s`,
              }}
            />
          ))}
          
          {/* Triangles */}
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={`triangle-${index}`}
              style={{
                position: 'absolute',
                left: `${20 + (index * 25) % 60}%`,
                top: `${25 + (index * 35) % 50}%`,
                width: 0,
                height: 0,
                borderLeft: `${15 + index * 2}px solid transparent`,
                borderRight: `${15 + index * 2}px solid transparent`,
                borderBottom: `${20 + index * 3}px solid var(--primary)`,
                opacity: 0.3,
                animation: `triangleFloat ${10 + index * 2}s infinite ease-in-out`,
                animationDelay: `${index * 2}s`,
              }}
            />
          ))}

          {/* Circles */}
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={`circle-${index}`}
              style={{
                position: 'absolute',
                left: `${8 + (index * 19) % 85}%`,
                top: `${5 + (index * 28) % 90}%`,
                width: `${12 + index * 2}px`,
                height: `${12 + index * 2}px`,
                border: `1.5px solid var(--primary)`,
                borderRadius: '50%',
                opacity: 0.35,
                animation: `pulseFloat ${8 + index * 1.5}s infinite ease-in-out`,
                animationDelay: `${index * 1}s`,
              }}
            />
          ))}

          {/* Diamonds */}
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={`diamond-${index}`}
              style={{
                position: 'absolute',
                left: `${30 + (index * 20) % 40}%`,
                top: `${15 + (index * 40) % 70}%`,
                width: `${18 + index * 2}px`,
                height: `${18 + index * 2}px`,
                border: `2px solid var(--primary)`,
                opacity: 0.4,
                transform: 'rotate(45deg)',
                animation: `diamondFloat ${14 + index * 2}s infinite ease-in-out`,
                animationDelay: `${index * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced grid patterns */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `
              linear-gradient(90deg, rgba(55, 154, 97, 0.08) 1px, transparent 1px),
              linear-gradient(0deg, rgba(55, 154, 97, 0.08) 1px, transparent 1px),
              linear-gradient(45deg, rgba(55, 154, 97, 0.04) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(55, 154, 97, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 35px 35px, 35px 35px',
            animation: 'patternFlow 25s linear infinite',
            opacity: 0.6,
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
        @keyframes rotateFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-25px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
            opacity: 0.7;
          }
        }

        @keyframes triangleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-30px) rotate(120deg) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translateY(20px) rotate(240deg) scale(0.8);
            opacity: 0.4;
          }
        }

        @keyframes pulseFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-20px) scale(1.3);
            opacity: 0.6;
          }
        }

        @keyframes diamondFloat {
          0%, 100% {
            transform: translateY(0px) rotate(45deg) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-35px) rotate(225deg) scale(1.1);
            opacity: 0.6;
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

export default ParallaxBackground;
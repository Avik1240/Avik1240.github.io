// **********PARALLAX EXAMPLE 1 ********* */
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

//       // Glow effect
//       const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
//       gradient.addColorStop(0, `rgba(55, 154, 97, ${alpha * 0.8})`);
//       gradient.addColorStop(0.5, `rgba(55, 154, 97, ${alpha * 0.4})`);
//       gradient.addColorStop(1, `rgba(55, 154, 97, 0)`);

//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
//       ctx.fill();

//       // Core node
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
//       this.hue = 120 + Math.random() * 60; // Green to cyan range
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
//       // Draw trail
//       for (let i = 0; i < this.trail.length; i++) {
//         const point = this.trail[i];
//         const alpha = (i / this.trail.length) * point.life * 0.5;
//         const size = this.size * (i / this.trail.length) * 0.5;

//         ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
//         ctx.beginPath();
//         ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Draw main particle
//       ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
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

//       // Draw connections
//       particles.connections.forEach(connection => {
//         const alpha = (connection.from.activation + connection.to.activation) * 0.5 * connection.strength;
//         ctx.strokeStyle = `rgba(55, 154, 97, ${alpha * 0.3})`;
//         ctx.lineWidth = connection.strength * 2;
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
//           background: 'var(--background)',
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

//         {/* Floating Geometric Shapes */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//           }}
//         >
//           {/* Hexagons */}
//           {Array.from({ length: 8 }, (_, index) => (
//             <div
//               key={`hex-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${15 + (index * 22) % 70}%`,
//                 top: `${10 + (index * 30) % 80}%`,
//                 width: `${20 + index * 3}px`,
//                 height: `${20 + index * 3}px`,
//                 border: `2px solid var(--primary)`,
//                 opacity: 0.4,
//                 clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
//                 animation: `rotateFloat ${12 + index * 3}s infinite ease-in-out`,
//                 animationDelay: `${index * 1.5}s`,
//               }}
//             />
//           ))}

//           {/* Triangles */}
//           {Array.from({ length: 6 }, (_, index) => (
//             <div
//               key={`triangle-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${20 + (index * 25) % 60}%`,
//                 top: `${25 + (index * 35) % 50}%`,
//                 width: 0,
//                 height: 0,
//                 borderLeft: `${15 + index * 2}px solid transparent`,
//                 borderRight: `${15 + index * 2}px solid transparent`,
//                 borderBottom: `${20 + index * 3}px solid var(--primary)`,
//                 opacity: 0.3,
//                 animation: `triangleFloat ${10 + index * 2}s infinite ease-in-out`,
//                 animationDelay: `${index * 2}s`,
//               }}
//             />
//           ))}

//           {/* Circles */}
//           {Array.from({ length: 10 }, (_, index) => (
//             <div
//               key={`circle-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${8 + (index * 19) % 85}%`,
//                 top: `${5 + (index * 28) % 90}%`,
//                 width: `${12 + index * 2}px`,
//                 height: `${12 + index * 2}px`,
//                 border: `1.5px solid var(--primary)`,
//                 borderRadius: '50%',
//                 opacity: 0.35,
//                 animation: `pulseFloat ${8 + index * 1.5}s infinite ease-in-out`,
//                 animationDelay: `${index * 1}s`,
//               }}
//             />
//           ))}

//           {/* Diamonds */}
//           {Array.from({ length: 5 }, (_, index) => (
//             <div
//               key={`diamond-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${30 + (index * 20) % 40}%`,
//                 top: `${15 + (index * 40) % 70}%`,
//                 width: `${18 + index * 2}px`,
//                 height: `${18 + index * 2}px`,
//                 border: `2px solid var(--primary)`,
//                 opacity: 0.4,
//                 transform: 'rotate(45deg)',
//                 animation: `diamondFloat ${14 + index * 2}s infinite ease-in-out`,
//                 animationDelay: `${index * 3}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* Enhanced grid patterns */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: `
//               linear-gradient(90deg, rgba(55, 154, 97, 0.08) 1px, transparent 1px),
//               linear-gradient(0deg, rgba(55, 154, 97, 0.08) 1px, transparent 1px),
//               linear-gradient(45deg, rgba(55, 154, 97, 0.04) 1px, transparent 1px),
//               linear-gradient(-45deg, rgba(55, 154, 97, 0.04) 1px, transparent 1px)
//             `,
//             backgroundSize: '50px 50px, 50px 50px, 35px 35px, 35px 35px',
//             animation: 'patternFlow 25s linear infinite',
//             opacity: 0.6,
//           }}
//         />

//         {/* Gradient overlays for depth */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: `
//               radial-gradient(circle at 80% 20%, rgba(55, 154, 97, 0.08) 0%, transparent 50%),
//               radial-gradient(circle at 20% 80%, rgba(55, 154, 97, 0.06) 0%, transparent 50%),
//               linear-gradient(135deg, rgba(55, 154, 97, 0.02) 0%, transparent 50%, rgba(55, 154, 97, 0.02) 100%)
//             `,
//           }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes rotateFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.4;
//           }
//           25% {
//             transform: translateY(-25px) rotate(90deg);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(-40px) rotate(180deg);
//             opacity: 0.5;
//           }
//           75% {
//             transform: translateY(-15px) rotate(270deg);
//             opacity: 0.7;
//           }
//         }

//         @keyframes triangleFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg) scale(1);
//             opacity: 0.3;
//           }
//           33% {
//             transform: translateY(-30px) rotate(120deg) scale(1.2);
//             opacity: 0.5;
//           }
//           66% {
//             transform: translateY(20px) rotate(240deg) scale(0.8);
//             opacity: 0.4;
//           }
//         }

//         @keyframes pulseFloat {
//           0%, 100% {
//             transform: translateY(0px) scale(1);
//             opacity: 0.35;
//           }
//           50% {
//             transform: translateY(-20px) scale(1.3);
//             opacity: 0.6;
//           }
//         }

//         @keyframes diamondFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(45deg) scale(1);
//             opacity: 0.4;
//           }
//           50% {
//             transform: translateY(-35px) rotate(225deg) scale(1.1);
//             opacity: 0.6;
//           }
//         }

//         @keyframes patternFlow {
//           0% {
//             background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%;
//           }
//           100% {
//             background-position: 50px 50px, 50px 50px, 35px 35px, 35px 35px;
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

// **********PARALLAX EXAMPLE 2 ********* */
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

//       // Glow effect
//       const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
//       gradient.addColorStop(0, `rgba(55, 154, 97, ${alpha * 0.8})`);
//       gradient.addColorStop(0.5, `rgba(55, 154, 97, ${alpha * 0.4})`);
//       gradient.addColorStop(1, `rgba(55, 154, 97, 0)`);

//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
//       ctx.fill();

//       // Core node
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
//       this.hue = 120 + Math.random() * 60; // Green to cyan range
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
//       // Draw trail
//       for (let i = 0; i < this.trail.length; i++) {
//         const point = this.trail[i];
//         const alpha = (i / this.trail.length) * point.life * 0.5;
//         const size = this.size * (i / this.trail.length) * 0.5;

//         ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
//         ctx.beginPath();
//         ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Draw main particle
//       ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
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

//       // Draw connections
//       particles.connections.forEach(connection => {
//         const alpha = (connection.from.activation + connection.to.activation) * 0.5 * connection.strength;
//         ctx.strokeStyle = `rgba(55, 154, 97, ${alpha * 0.3})`;
//         ctx.lineWidth = connection.strength * 2;
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
//           background: 'var(--background)',
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

//         {/* Floating AI/Tech Keywords */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             opacity: 0.1,
//           }}
//         >
//           {['C++', 'Prompt Engineering', 'React.js', 'Node.js', 'Next.js', 'API Design', 'AI Research', 'Full Stack', 'Research', 'Innovation','Web Accessibility','Git & GitLab','VS Code','Play with AI'].map((keyword, index) => (
//             <div
//               key={keyword}
//               style={{
//                 position: 'absolute',
//                 left: `${10 + (index * 18) % 80}%`,
//                 top: `${20 + (index * 25) % 60}%`,
//                 fontSize: `${12 + index % 8}px`,
//                 color: 'var(--primary)',
//                 fontFamily: 'monospace',
//                 fontWeight: 'bold',
//                 animation: `float ${15 + index * 2}s infinite ease-in-out`,
//                 animationDelay: `${index * 2}s`,
//                 transform: `rotate(${index * 15}deg)`,
//               }}
//             >
//               {keyword}
//             </div>
//           ))}
//         </div>

//         {/* Binary rain effect */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: `
//               linear-gradient(90deg, transparent 0%, rgba(55, 154, 97, 0.02) 50%, transparent 100%),
//               linear-gradient(0deg, transparent 0%, rgba(55, 154, 97, 0.02) 50%, transparent 100%)
//             `,
//             backgroundSize: '100px 100px',
//             animation: 'matrixFlow 20s linear infinite',
//             opacity: 0.3,
//           }}
//         />

//         {/* Gradient overlays for depth */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: `
//               radial-gradient(circle at 80% 20%, rgba(55, 154, 97, 0.08) 0%, transparent 50%),
//               radial-gradient(circle at 20% 80%, rgba(55, 154, 97, 0.06) 0%, transparent 50%),
//               linear-gradient(135deg, rgba(55, 154, 97, 0.02) 0%, transparent 50%, rgba(55, 154, 97, 0.02) 100%)
//             `,
//           }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.1;
//           }
//           25% {
//             transform: translateY(-30px) rotate(90deg);
//             opacity: 0.2;
//           }
//           50% {
//             transform: translateY(-10px) rotate(180deg);
//             opacity: 0.15;
//           }
//           75% {
//             transform: translateY(-20px) rotate(270deg);
//             opacity: 0.25;
//           }
//         }

//         @keyframes matrixFlow {
//           0% {
//             background-position: 0% 0%;
//           }
//           100% {
//             background-position: 100% 100%;
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

// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';

// const ModernParallaxBackground = () => {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);
//   const [particles, setParticles] = useState([]);

//   // Enhanced Neural Node with phase transitions
//   class EnhancedNeuralNode {
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
//       this.morphPhase = Math.random() * Math.PI * 2;
//     }

//     update(mouseX, mouseY, time, scrollProgress) {
//       // Mouse interaction with scroll influence
//       const dx = mouseX - this.x;
//       const dy = mouseY - this.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       const interactionRadius = 150 + scrollProgress * 50;
//       if (distance < interactionRadius) {
//         const force = (interactionRadius - distance) / interactionRadius;
//         this.x += dx * force * 0.02 * (1 + scrollProgress);
//         this.y += dy * force * 0.02 * (1 + scrollProgress);
//       } else {
//         this.x += (this.originalX - this.x) * 0.05;
//         this.y += (this.originalY - this.y) * 0.05;
//       }

//       // Enhanced activation with scroll influence
//       this.activation += (this.targetActivation - this.activation) * (0.02 + scrollProgress * 0.03);
//       if (Math.random() < 0.01 + scrollProgress * 0.02) {
//         this.targetActivation = Math.random();
//       }

//       this.pulsePhase += 0.05 + scrollProgress * 0.03;
//       this.morphPhase += 0.02;
//     }

//     draw(ctx, time, scrollProgress) {
//       const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
//       const morph = Math.sin(this.morphPhase) * 0.5 + 1;
//       const alpha = this.activation * pulse * (0.8 + scrollProgress * 0.4);

//       // Dynamic color transition based on scroll
//       const r = Math.floor(55 + scrollProgress * 100);
//       const g = Math.floor(154 + scrollProgress * 50);
//       const b = Math.floor(97 + scrollProgress * 158);

//       // Enhanced glow with morphing
//       const glowSize = this.size * (2 + morph * scrollProgress);
//       const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
//       gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`);
//       gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
//       gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
//       ctx.fill();

//       // Core node with morphing
//       ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size * morph, 0, Math.PI * 2);
//       ctx.fill();

//       // Geometric overlay at higher scroll values
//       if (scrollProgress > 0.3) {
//         const geomAlpha = (scrollProgress - 0.3) * alpha;
//         ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${geomAlpha * 0.6})`;
//         ctx.lineWidth = 2;

//         // Hexagon overlay
//         ctx.beginPath();
//         const hexSize = this.size * 1.5 * morph;
//         for (let i = 0; i < 6; i++) {
//           const angle = (i * Math.PI) / 3 + this.morphPhase;
//           const x = this.x + Math.cos(angle) * hexSize;
//           const y = this.y + Math.sin(angle) * hexSize;
//           if (i === 0) ctx.moveTo(x, y);
//           else ctx.lineTo(x, y);
//         }
//         ctx.closePath();
//         ctx.stroke();
//       }
//     }
//   }

//   // Enhanced Data Particle with geometric transformations
//   class EnhancedDataParticle {
//     constructor() {
//       this.reset();
//       this.trail = [];
//       this.shape = Math.floor(Math.random() * 4); // 0: circle, 1: triangle, 2: square, 3: diamond
//       this.rotationSpeed = (Math.random() - 0.5) * 0.1;
//       this.rotation = 0;
//     }

//     reset() {
//       this.x = -30;
//       this.y = Math.random() * window.innerHeight;
//       this.vx = 1 + Math.random() * 2;
//       this.vy = (Math.random() - 0.5) * 0.5;
//       this.life = 1;
//       this.size = 2 + Math.random() * 4;
//       this.hue = 120 + Math.random() * 120; // Wider color range
//       this.rotation = 0;
//     }

//     update(scrollProgress) {
//       this.x += this.vx * (1 + scrollProgress * 0.5);
//       this.y += this.vy;
//       this.life -= 0.005 + scrollProgress * 0.002;
//       this.rotation += this.rotationSpeed;

//       // Add to trail
//       this.trail.push({
//         x: this.x,
//         y: this.y,
//         life: this.life,
//         rotation: this.rotation,
//         shape: this.shape
//       });
//       if (this.trail.length > 25) this.trail.shift();

//       if (this.x > window.innerWidth + 30 || this.life <= 0) {
//         this.reset();
//         this.trail = [];
//       }
//     }

//     drawShape(ctx, x, y, size, alpha, rotation, shape) {
//       ctx.save();
//       ctx.translate(x, y);
//       ctx.rotate(rotation);

//       switch (shape) {
//         case 0: // Circle
//           ctx.beginPath();
//           ctx.arc(0, 0, size, 0, Math.PI * 2);
//           ctx.fill();
//           break;
//         case 1: // Triangle
//           ctx.beginPath();
//           ctx.moveTo(0, -size);
//           ctx.lineTo(-size * 0.866, size * 0.5);
//           ctx.lineTo(size * 0.866, size * 0.5);
//           ctx.closePath();
//           ctx.fill();
//           break;
//         case 2: // Square
//           ctx.fillRect(-size * 0.7, -size * 0.7, size * 1.4, size * 1.4);
//           break;
//         case 3: // Diamond
//           ctx.beginPath();
//           ctx.moveTo(0, -size);
//           ctx.lineTo(size, 0);
//           ctx.lineTo(0, size);
//           ctx.lineTo(-size, 0);
//           ctx.closePath();
//           ctx.fill();
//           break;
//       }
//       ctx.restore();
//     }

//     draw(ctx, scrollProgress) {
//       // Draw trail
//       for (let i = 0; i < this.trail.length; i++) {
//         const point = this.trail[i];
//         const alpha = (i / this.trail.length) * point.life * 0.5;
//         const size = this.size * (i / this.trail.length) * 0.6;

//         ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
//         this.drawShape(ctx, point.x, point.y, size, alpha, point.rotation, point.shape);
//       }

//       // Draw main particle
//       ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
//       this.drawShape(ctx, this.x, this.y, this.size, this.life, this.rotation, this.shape);
//     }
//   }

//   // Initialize enhanced elements
//   useEffect(() => {
//     const initializeElements = () => {
//       const newNodes = [];
//       const newConnections = [];
//       const newParticles = [];

//       // Create adaptive neural network
//       const layers = [8, 12, 10, 6, 4];
//       const layerSpacing = window.innerWidth / (layers.length + 1);

//       layers.forEach((nodeCount, layerIndex) => {
//         const x = layerSpacing * (layerIndex + 1);
//         const nodeSpacing = window.innerHeight / (nodeCount + 1);

//         for (let i = 0; i < nodeCount; i++) {
//           const y = nodeSpacing * (i + 1);
//           newNodes.push(new EnhancedNeuralNode(x, y, layerIndex));
//         }
//       });

//       // Create dynamic connections
//       layers.forEach((_, layerIndex) => {
//         if (layerIndex < layers.length - 1) {
//           const currentLayer = newNodes.filter(node => node.layer === layerIndex);
//           const nextLayer = newNodes.filter(node => node.layer === layerIndex + 1);

//           currentLayer.forEach(node1 => {
//             nextLayer.forEach(node2 => {
//               if (Math.random() > 0.2) {
//                 newConnections.push({
//                   from: node1,
//                   to: node2,
//                   strength: Math.random(),
//                   phase: Math.random() * Math.PI * 2
//                 });
//               }
//             });
//           });
//         }
//       });

//       // Create enhanced particles
//       for (let i = 0; i < 25; i++) {
//         newParticles.push(new EnhancedDataParticle());
//       }

//       return { nodes: newNodes, connections: newConnections, particles: newParticles };
//     };

//     const { nodes, connections, particles } = initializeElements();
//     setParticles({ nodes, connections, dataFlow: particles });
//     setIsMounted(true);
//   }, []);

//   // Mouse tracking with enhanced sensitivity
//   const handleMouseMove = useCallback((e) => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (rect) {
//       setMousePosition({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//     }
//   }, []);

//   // Enhanced scroll tracking
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//       const scrollProgress = Math.min(scrollPosition / maxScroll, 1);

//       setScrollY(scrollPosition);

//       if (canvasRef.current) {
//         const parallaxOffset = scrollPosition * 0.3;
//         canvasRef.current.style.transform = `translateY(${parallaxOffset}px) scale(${1 + scrollProgress * 0.1})`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Enhanced animation loop
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

//       const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//       const scrollProgress = Math.min(scrollY / maxScroll, 1);

//       // Update neural network
//       particles.nodes.forEach(node => {
//         node.update(mousePosition.x, mousePosition.y, time, scrollProgress);
//       });

//       // Draw enhanced connections
//       particles.connections.forEach(connection => {
//         connection.phase += 0.02;
//         const pulseAlpha = (Math.sin(connection.phase) * 0.5 + 0.5) * scrollProgress;
//         const baseAlpha = (connection.from.activation + connection.to.activation) * 0.5 * connection.strength;
//         const totalAlpha = baseAlpha * (0.3 + pulseAlpha * 0.4);

//         // Dynamic color based on scroll
//         const r = Math.floor(55 + scrollProgress * 100);
//         const g = Math.floor(154 + scrollProgress * 50);
//         const b = Math.floor(97 + scrollProgress * 158);

//         ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${totalAlpha})`;
//         ctx.lineWidth = connection.strength * (2 + scrollProgress * 2);

//         // Add glow to connections at higher scroll
//         if (scrollProgress > 0.2) {
//           ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${totalAlpha * 0.8})`;
//           ctx.shadowBlur = 10 * scrollProgress;
//         }

//         ctx.beginPath();
//         ctx.moveTo(connection.from.x, connection.from.y);
//         ctx.lineTo(connection.to.x, connection.to.y);
//         ctx.stroke();

//         ctx.shadowBlur = 0;
//       });

//       // Draw nodes
//       particles.nodes.forEach(node => {
//         node.draw(ctx, time, scrollProgress);
//       });

//       // Update and draw enhanced particles
//       particles.dataFlow.forEach(particle => {
//         particle.update(scrollProgress);
//         particle.draw(ctx, scrollProgress);
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
//   }, [isMounted, particles, mousePosition, scrollY]);

//   if (!isMounted) return null;

//   const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//   const scrollProgress = Math.min(scrollY / maxScroll, 1);

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
//           background: `linear-gradient(135deg,
//             var(--background) 0%,
//             rgba(55, 154, 97, ${0.02 + scrollProgress * 0.05}) 50%,
//             var(--background) 100%)`
//         }}
//       >
//         {/* Enhanced neural network canvas */}
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             filter: `blur(${scrollProgress * 0.5}px) brightness(${1 + scrollProgress * 0.3})`
//           }}
//         />

//         {/* Dynamic floating elements */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             opacity: 0.6 + scrollProgress * 0.4,
//             transform: `translateY(${scrollY * -0.2}px) scale(${1 + scrollProgress * 0.2})`
//           }}
//         >
//           {/* AI/Tech Keywords with enhanced animations */}
//           {['TypeScript', 'Python', 'Machine Learning', 'React.js', 'Node.js', 'Next.js', 'API Design', 'Neural Networks', 'Full Stack', 'Innovation', 'Web3', 'Cloud Computing', 'DevOps', 'Microservices'].map((keyword, index) => (
//             <div
//               key={keyword}
//               style={{
//                 position: 'absolute',
//                 left: `${10 + (index * 15) % 80}%`,
//                 top: `${15 + (index * 20) % 70}%`,
//                 fontSize: `${10 + index % 6 + scrollProgress * 4}px`,
//                 color: `hsl(${120 + scrollProgress * 60}, 70%, ${50 + scrollProgress * 30}%)`,
//                 fontFamily: 'monospace',
//                 fontWeight: 'bold',
//                 animation: `enhancedFloat ${12 + index * 1.5}s infinite ease-in-out`,
//                 animationDelay: `${index * 1.2}s`,
//                 transform: `rotate(${index * 12 + scrollProgress * 180}deg)`,
//                 opacity: 0.4 + scrollProgress * 0.4
//               }}
//             >
//               {keyword}
//             </div>
//           ))}

//           {/* Enhanced geometric shapes */}
//           {Array.from({ length: 12 }, (_, index) => (
//             <div
//               key={`enhanced-shape-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: `${5 + (index * 18) % 90}%`,
//                 top: `${8 + (index * 25) % 85}%`,
//                 width: `${15 + index * 2 + scrollProgress * 10}px`,
//                 height: `${15 + index * 2 + scrollProgress * 10}px`,
//                 border: `${1 + scrollProgress}px solid hsl(${120 + scrollProgress * 60}, 60%, ${40 + scrollProgress * 40}%)`,
//                 borderRadius: index % 4 === 0 ? '50%' : index % 3 === 0 ? '0' : '25%',
//                 opacity: 0.3 + scrollProgress * 0.5,
//                 clipPath: index % 5 === 0 ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : 'none',
//                 animation: `morphFloat ${8 + index * 2}s infinite ease-in-out`,
//                 animationDelay: `${index * 0.8}s`,
//                 transform: `rotate(${index * 30 + scrollProgress * 360}deg) scale(${1 + scrollProgress * 0.5})`
//               }}
//             />
//           ))}
//         </div>

//         {/* Dynamic grid patterns */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: `
//               linear-gradient(90deg, rgba(55, 154, 97, ${0.06 + scrollProgress * 0.06}) 1px, transparent 1px),
//               linear-gradient(0deg, rgba(55, 154, 97, ${0.06 + scrollProgress * 0.06}) 1px, transparent 1px),
//               linear-gradient(45deg, rgba(55, 154, 97, ${0.03 + scrollProgress * 0.05}) 1px, transparent 1px)
//             `,
//             backgroundSize: `${40 + scrollProgress * 20}px ${40 + scrollProgress * 20}px, ${40 + scrollProgress * 20}px ${40 + scrollProgress * 20}px, ${30 + scrollProgress * 15}px ${30 + scrollProgress * 15}px`,
//             animation: `gridFlow ${20 - scrollProgress * 5}s linear infinite`,
//             opacity: 0.4 + scrollProgress * 0.4,
//             transform: `rotate(${scrollProgress * 5}deg)`
//           }}
//         />

//         {/* Enhanced gradient overlays */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: `
//               radial-gradient(circle at ${80 - scrollProgress * 30}% ${20 + scrollProgress * 30}%,
//                 rgba(55, 154, 97, ${0.08 + scrollProgress * 0.1}) 0%, transparent 50%),
//               radial-gradient(circle at ${20 + scrollProgress * 30}% ${80 - scrollProgress * 30}%,
//                 rgba(55, 154, 97, ${0.06 + scrollProgress * 0.08}) 0%, transparent 50%),
//               linear-gradient(${135 + scrollProgress * 45}deg,
//                 rgba(55, 154, 97, ${0.02 + scrollProgress * 0.04}) 0%,
//                 transparent 50%,
//                 rgba(55, 154, 97, ${0.02 + scrollProgress * 0.04}) 100%)
//             `
//           }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes enhancedFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg) scale(1);
//             opacity: 0.4;
//           }
//           25% {
//             transform: translateY(-40px) rotate(90deg) scale(1.1);
//             opacity: 0.7;
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg) scale(1.2);
//             opacity: 0.5;
//           }
//           75% {
//             transform: translateY(-30px) rotate(270deg) scale(0.9);
//             opacity: 0.8;
//           }
//         }

//         @keyframes morphFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg) scale(1);
//             border-radius: 50%;
//           }
//           25% {
//             transform: translateY(-35px) rotate(90deg) scale(1.3);
//             border-radius: 25%;
//           }
//           50% {
//             transform: translateY(-50px) rotate(180deg) scale(0.8);
//             border-radius: 0%;
//           }
//           75% {
//             transform: translateY(-20px) rotate(270deg) scale(1.1);
//             border-radius: 75%;
//           }
//         }

//         @keyframes gridFlow {
//           0% {
//             background-position: 0% 0%, 0% 0%, 0% 0%;
//           }
//           100% {
//             background-position: 100px 100px, 100px 100px, 50px 50px;
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

// export default ModernParallaxBackground;

// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';

// const ModernParallaxBackground = () => {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);
//   const [particles, setParticles] = useState([]);

//   // Optimized Neural Node - reduced calculations
//   class OptimizedNeuralNode {
//     constructor(x, y, layer) {
//       this.x = x;
//       this.y = y;
//       this.originalX = x;
//       this.originalY = y;
//       this.layer = layer;
//       this.activation = Math.random();
//       this.targetActivation = Math.random();
//       this.size = 3 + Math.random() * 4; // Reduced size range
//       this.pulsePhase = Math.random() * Math.PI * 2;
//     }

//     update(mouseX, mouseY, time, scrollProgress) {
//       // Simplified mouse interaction
//       const dx = mouseX - this.x;
//       const dy = mouseY - this.y;
//       const distance = dx * dx + dy * dy; // Skip sqrt for performance

//       if (distance < 22500) { // 150^2
//         const force = 0.01;
//         this.x += dx * force;
//         this.y += dy * force;
//       } else {
//         // Simplified return to position
//         this.x += (this.originalX - this.x) * 0.03;
//         this.y += (this.originalY - this.y) * 0.03;
//       }

//       // Simplified activation
//       this.activation += (this.targetActivation - this.activation) * 0.01;
//       if (Math.random() < 0.005) {
//         this.targetActivation = Math.random();
//       }

//       this.pulsePhase += 0.03;
//     }

//     draw(ctx, time, scrollProgress) {
//       const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
//       const alpha = this.activation * pulse * 0.6;

//       // Simple glow - no complex gradients
//       ctx.fillStyle = `rgba(55, 154, 97, ${alpha * 0.3})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
//       ctx.fill();

//       // Core node
//       ctx.fillStyle = `rgba(55, 154, 97, ${alpha})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();

//       // Simple geometric overlay only at high scroll
//       if (scrollProgress > 0.6) {
//         const geomAlpha = (scrollProgress - 0.6) * alpha * 0.5;
//         ctx.strokeStyle = `rgba(55, 154, 97, ${geomAlpha})`;
//         ctx.lineWidth = 1;

//         // Simple square instead of complex hexagon
//         const squareSize = this.size * 2;
//         ctx.strokeRect(this.x - squareSize/2, this.y - squareSize/2, squareSize, squareSize);
//       }
//     }
//   }

//   // Simplified Data Particle
//   class OptimizedDataParticle {
//     constructor() {
//       this.reset();
//       this.trail = [];
//     }

//     reset() {
//       this.x = -20;
//       this.y = Math.random() * window.innerHeight;
//       this.vx = 1 + Math.random();
//       this.vy = (Math.random() - 0.5) * 0.3;
//       this.life = 1;
//       this.size = 2 + Math.random() * 2;
//       this.hue = 120 + Math.random() * 30; // Keep green range
//     }

//     update(scrollProgress) {
//       this.x += this.vx;
//       this.y += this.vy;
//       this.life -= 0.004;

//       // Reduced trail length
//       this.trail.push({ x: this.x, y: this.y, life: this.life });
//       if (this.trail.length > 10) this.trail.shift();

//       if (this.x > window.innerWidth + 20 || this.life <= 0) {
//         this.reset();
//         this.trail = [];
//       }
//     }

//     draw(ctx, scrollProgress) {
//       // Simplified trail
//       for (let i = 0; i < this.trail.length; i += 2) { // Skip every other point
//         const point = this.trail[i];
//         const alpha = (i / this.trail.length) * point.life * 0.4;
//         const size = this.size * (i / this.trail.length) * 0.5;

//         ctx.fillStyle = `hsla(${this.hue}, 60%, 50%, ${alpha})`;
//         ctx.beginPath();
//         ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Main particle
//       ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.life})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   // Simplified initialization
//   useEffect(() => {
//     const initializeElements = () => {
//       const newNodes = [];
//       const newConnections = [];
//       const newParticles = [];

//       // Reduced neural network complexity
//       const layers = [5, 7, 5, 3];
//       const layerSpacing = window.innerWidth / (layers.length + 1);

//       layers.forEach((nodeCount, layerIndex) => {
//         const x = layerSpacing * (layerIndex + 1);
//         const nodeSpacing = window.innerHeight / (nodeCount + 1);

//         for (let i = 0; i < nodeCount; i++) {
//           const y = nodeSpacing * (i + 1);
//           newNodes.push(new OptimizedNeuralNode(x, y, layerIndex));
//         }
//       });

//       // Fewer connections
//       layers.forEach((_, layerIndex) => {
//         if (layerIndex < layers.length - 1) {
//           const currentLayer = newNodes.filter(node => node.layer === layerIndex);
//           const nextLayer = newNodes.filter(node => node.layer === layerIndex + 1);

//           currentLayer.forEach(node1 => {
//             nextLayer.forEach(node2 => {
//               if (Math.random() > 0.5) { // Fewer connections
//                 newConnections.push({
//                   from: node1,
//                   to: node2,
//                   strength: Math.random()
//                 });
//               }
//             });
//           });
//         }
//       });

//       // Fewer particles
//       for (let i = 0; i < 12; i++) {
//         newParticles.push(new OptimizedDataParticle());
//       }

//       return { nodes: newNodes, connections: newConnections, particles: newParticles };
//     };

//     const { nodes, connections, particles } = initializeElements();
//     setParticles({ nodes, connections, dataFlow: particles });
//     setIsMounted(true);
//   }, []);

//   // Throttled mouse tracking
//   const handleMouseMove = useCallback((e) => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (rect) {
//       setMousePosition({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//     }
//   }, []);

//   // Optimized scroll tracking
//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           const scrollPosition = window.scrollY;
//           const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//           const scrollProgress = Math.min(scrollPosition / maxScroll, 1);

//           setScrollY(scrollPosition);

//           if (canvasRef.current) {
//             const parallaxOffset = scrollPosition * 0.2; // Reduced parallax effect
//             canvasRef.current.style.transform = `translateY(${parallaxOffset}px)`;
//           }

//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Optimized animation loop
//   useEffect(() => {
//     if (!isMounted || !particles.nodes) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let time = 0;
//     let frameCount = 0;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     const animate = () => {
//       frameCount++;

//       // Reduce update frequency for some elements
//       if (frameCount % 2 === 0) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         time += 0.032; // Double the time increment since we're running at half framerate

//         const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//         const scrollProgress = Math.min(scrollY / maxScroll, 1);

//         // Update neural network (every other frame)
//         particles.nodes.forEach(node => {
//           node.update(mousePosition.x, mousePosition.y, time, scrollProgress);
//         });

//         // Draw connections with reduced complexity
//         particles.connections.forEach(connection => {
//           const baseAlpha = (connection.from.activation + connection.to.activation) * 0.25 * connection.strength;

//           ctx.strokeStyle = `rgba(55, 154, 97, ${baseAlpha})`;
//           ctx.lineWidth = connection.strength;
//           ctx.beginPath();
//           ctx.moveTo(connection.from.x, connection.from.y);
//           ctx.lineTo(connection.to.x, connection.to.y);
//           ctx.stroke();
//         });

//         // Draw nodes
//         particles.nodes.forEach(node => {
//           node.draw(ctx, time, scrollProgress);
//         });

//         // Update particles (every frame for smooth motion)
//         particles.dataFlow.forEach(particle => {
//           particle.update(scrollProgress);
//           particle.draw(ctx, scrollProgress);
//         });
//       }

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
//   }, [isMounted, particles, mousePosition, scrollY]);

//   if (!isMounted) return null;

//   const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//   const scrollProgress = Math.min(scrollY / maxScroll, 1);

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
//           background: 'var(--background)'
//         }}
//       >
//         {/* Optimized canvas */}
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%'
//           }}
//         />

//         {/* Simplified floating keywords - fewer elements */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             opacity: 0.1,
//             transform: `translateY(${scrollY * -0.1}px)`
//           }}
//         >
//           {['C++', 'React.js', 'Node.js', 'Next.js', 'AI Research', 'Full Stack', 'Innovation', 'Web Dev'].map((keyword, index) => (
//             <div
//               key={keyword}
//               style={{
//                 position: 'absolute',
//                 left: `${15 + (index * 20) % 70}%`,
//                 top: `${20 + (index * 25) % 60}%`,
//                 fontSize: `${12 + index % 4}px`,
//                 color: 'var(--primary)',
//                 fontFamily: 'monospace',
//                 fontWeight: 'bold',
//                 animation: `simpleFloat ${15 + index * 3}s infinite ease-in-out`,
//                 animationDelay: `${index * 2}s`,
//                 willChange: 'transform'
//               }}
//             >
//               {keyword}
//             </div>
//           ))}
//         </div>

//         {/* Simplified geometric shapes - only show after scroll */}
//         {scrollProgress > 0.4 && (
//           <div
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               pointerEvents: 'none',
//               opacity: (scrollProgress - 0.4) * 0.3,
//               transform: `translateY(${scrollY * -0.15}px)`
//             }}
//           >
//             {Array.from({ length: 6 }, (_, index) => (
//               <div
//                 key={`shape-${index}`}
//                 style={{
//                   position: 'absolute',
//                   left: `${10 + (index * 25) % 80}%`,
//                   top: `${15 + (index * 30) % 70}%`,
//                   width: `${20 + index * 3}px`,
//                   height: `${20 + index * 3}px`,
//                   border: `1px solid rgba(55, 154, 97, 0.3)`,
//                   borderRadius: index % 2 === 0 ? '50%' : '0',
//                   animation: `geometricFloat ${10 + index * 2}s infinite ease-in-out`,
//                   animationDelay: `${index * 1.5}s`,
//                   willChange: 'transform'
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Simple grid overlay */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: `
//               linear-gradient(90deg, rgba(55, 154, 97, 0.03) 1px, transparent 1px),
//               linear-gradient(0deg, rgba(55, 154, 97, 0.03) 1px, transparent 1px)
//             `,
//             backgroundSize: '50px 50px',
//             opacity: 0.4,
//             transform: `translateY(${scrollY * -0.05}px)`
//           }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes simpleFloat {
//           0%, 100% {
//             transform: translateY(0px);
//             opacity: 0.1;
//           }
//           50% {
//             transform: translateY(-20px);
//             opacity: 0.2;
//           }
//         }

//         @keyframes geometricFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-30px) rotate(180deg);
//             opacity: 0.5;
//           }
//         }

//         @media (max-width: 768px) {
//           div[style*="fontSize"] {
//             font-size: 10px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           div[style*="fontSize"] {
//             font-size: 8px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ModernParallaxBackground;

// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';

// const ModernParallaxBackground = () => {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);
//   const [particles, setParticles] = useState([]);

//   // Enhanced Neural Node with better visibility
//   class VisibleNeuralNode {
//     constructor(x, y, layer) {
//       this.x = x;
//       this.y = y;
//       this.originalX = x;
//       this.originalY = y;
//       this.layer = layer;
//       this.activation = Math.random();
//       this.targetActivation = Math.random();
//       this.size = 4 + Math.random() * 6; // Back to original size
//       this.pulsePhase = Math.random() * Math.PI * 2;
//     }

//     update(mouseX, mouseY, time, scrollProgress) {
//       // Enhanced mouse interaction
//       const dx = mouseX - this.x;
//       const dy = mouseY - this.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < 150) {
//         const force = (150 - distance) / 150;
//         this.x += dx * force * 0.02;
//         this.y += dy * force * 0.02;
//       } else {
//         this.x += (this.originalX - this.x) * 0.05;
//         this.y += (this.originalY - this.y) * 0.05;
//       }

//       // More visible activation changes
//       this.activation += (this.targetActivation - this.activation) * 0.02;
//       if (Math.random() < 0.01) {
//         this.targetActivation = Math.random();
//       }

//       this.pulsePhase += 0.05;
//     }

//     draw(ctx, time, scrollProgress) {
//       const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
//       const alpha = this.activation * pulse;

//       // More visible glow effect - exact from original
//       const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
//       gradient.addColorStop(0, `rgba(55, 154, 97, ${alpha * 0.8})`);
//       gradient.addColorStop(0.5, `rgba(55, 154, 97, ${alpha * 0.4})`);
//       gradient.addColorStop(1, `rgba(55, 154, 97, 0)`);

//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
//       ctx.fill();

//       // Brighter core node
//       ctx.fillStyle = `rgba(55, 154, 97, ${alpha})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();

//       // Enhanced geometric overlay at scroll
//       if (scrollProgress > 0.3) {
//         const geomAlpha = (scrollProgress - 0.3) * alpha;
//         ctx.strokeStyle = `rgba(55, 154, 97, ${geomAlpha * 0.6})`;
//         ctx.lineWidth = 2;

//         // Hexagon from original code
//         ctx.beginPath();
//         const hexSize = this.size * 1.5;
//         for (let i = 0; i < 6; i++) {
//           const angle = (i * Math.PI) / 3 + this.pulsePhase;
//           const x = this.x + Math.cos(angle) * hexSize;
//           const y = this.y + Math.sin(angle) * hexSize;
//           if (i === 0) ctx.moveTo(x, y);
//           else ctx.lineTo(x, y);
//         }
//         ctx.closePath();
//         ctx.stroke();
//       }
//     }
//   }

//   // Enhanced Data Particle with original trail system
//   class VisibleDataParticle {
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
//       this.size = 2 + Math.random() * 3;
//       this.hue = 120 + Math.random() * 60; // Green to cyan range like original
//     }

//     update(scrollProgress) {
//       this.x += this.vx;
//       this.y += this.vy;
//       this.life -= 0.005;

//       // Full trail system like original
//       this.trail.push({ x: this.x, y: this.y, life: this.life });
//       if (this.trail.length > 20) this.trail.shift();

//       if (this.x > window.innerWidth + 20 || this.life <= 0) {
//         this.reset();
//         this.trail = [];
//       }
//     }

//     draw(ctx, scrollProgress) {
//       // Full trail rendering like original
//       for (let i = 0; i < this.trail.length; i++) {
//         const point = this.trail[i];
//         const alpha = (i / this.trail.length) * point.life * 0.5;
//         const size = this.size * (i / this.trail.length) * 0.5;

//         ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
//         ctx.beginPath();
//         ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Brighter main particle
//       ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.life})`;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   // Original neural network complexity
//   useEffect(() => {
//     const initializeElements = () => {
//       const newNodes = [];
//       const newConnections = [];
//       const newParticles = [];

//       // Original layer structure
//       const layers = [6, 8, 6, 4];
//       const layerSpacing = window.innerWidth / (layers.length + 1);

//       layers.forEach((nodeCount, layerIndex) => {
//         const x = layerSpacing * (layerIndex + 1);
//         const nodeSpacing = window.innerHeight / (nodeCount + 1);

//         for (let i = 0; i < nodeCount; i++) {
//           const y = nodeSpacing * (i + 1);
//           newNodes.push(new VisibleNeuralNode(x, y, layerIndex));
//         }
//       });

//       // Original connection density
//       layers.forEach((_, layerIndex) => {
//         if (layerIndex < layers.length - 1) {
//           const currentLayer = newNodes.filter(node => node.layer === layerIndex);
//           const nextLayer = newNodes.filter(node => node.layer === layerIndex + 1);

//           currentLayer.forEach(node1 => {
//             nextLayer.forEach(node2 => {
//               if (Math.random() > 0.3) { // Original connection probability
//                 newConnections.push({
//                   from: node1,
//                   to: node2,
//                   strength: Math.random()
//                 });
//               }
//             });
//           });
//         }
//       });

//       // Original particle count
//       for (let i = 0; i < 15; i++) {
//         newParticles.push(new VisibleDataParticle());
//       }

//       return { nodes: newNodes, connections: newConnections, particles: newParticles };
//     };

//     const { nodes, connections, particles } = initializeElements();
//     setParticles({ nodes, connections, dataFlow: particles });
//     setIsMounted(true);
//   }, []);

//   // Original mouse tracking
//   const handleMouseMove = useCallback((e) => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (rect) {
//       setMousePosition({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//     }
//   }, []);

//   // Enhanced scroll tracking
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//       const scrollProgress = Math.min(scrollPosition / maxScroll, 1);

//       setScrollY(scrollPosition);

//       if (canvasRef.current) {
//         const parallaxOffset = scrollPosition * 0.5; // Original parallax intensity
//         canvasRef.current.style.transform = `translateY(${parallaxOffset}px)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Full animation loop
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

//       const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//       const scrollProgress = Math.min(scrollY / maxScroll, 1);

//       // Update neural network
//       particles.nodes.forEach(node => {
//         node.update(mousePosition.x, mousePosition.y, time, scrollProgress);
//       });

//       // Enhanced connection rendering
//       particles.connections.forEach(connection => {
//         const alpha = (connection.from.activation + connection.to.activation) * 0.5 * connection.strength;
//         ctx.strokeStyle = `rgba(55, 154, 97, ${alpha * 0.3})`;
//         ctx.lineWidth = connection.strength * 2;
//         ctx.beginPath();
//         ctx.moveTo(connection.from.x, connection.from.y);
//         ctx.lineTo(connection.to.x, connection.to.y);
//         ctx.stroke();
//       });

//       // Draw nodes
//       particles.nodes.forEach(node => {
//         node.draw(ctx, time, scrollProgress);
//       });

//       // Update and draw particles
//       particles.dataFlow.forEach(particle => {
//         particle.update(scrollProgress);
//         particle.draw(ctx, scrollProgress);
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
//   }, [isMounted, particles, mousePosition, scrollY]);

//   if (!isMounted) return null;

//   const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
//   const scrollProgress = Math.min(scrollY / maxScroll, 1);

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
//           background: 'var(--background)',
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

//         {/* Enhanced Floating AI/Tech Keywords - More Visible */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             opacity: 0.15, // Increased from 0.1
//           }}
//         >
//           {['C++', 'Prompt Engineering', 'React.js', 'Node.js', 'Next.js', 'API Design', 'AI Research', 'Full Stack', 'Research', 'Innovation','Web Accessibility','Git & GitLab','VS Code','Play with AI'].map((keyword, index) => (
//             <div
//               key={keyword}
//               style={{
//                 position: 'absolute',
//                 left: `${10 + (index * 18) % 80}%`,
//                 top: `${20 + (index * 25) % 60}%`,
//                 fontSize: `${12 + index % 8}px`,
//                 color: 'var(--primary)',
//                 fontFamily: 'monospace',
//                 fontWeight: 'bold',
//                 animation: `visibleFloat ${15 + index * 2}s infinite ease-in-out`,
//                 animationDelay: `${index * 2}s`,
//                 transform: `rotate(${index * 15}deg)`,
//               }}
//             >
//               {keyword}
//             </div>
//           ))}
//         </div>

//         {/* Enhanced Geometric Shapes - More Visible */}
//         {scrollProgress > 0.2 && (
//           <div
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               pointerEvents: 'none',
//               opacity: (scrollProgress - 0.2) * 0.6, // More visible
//             }}
//           >
//             {/* Hexagons */}
//             {Array.from({ length: 8 }, (_, index) => (
//               <div
//                 key={`hex-${index}`}
//                 style={{
//                   position: 'absolute',
//                   left: `${15 + (index * 22) % 70}%`,
//                   top: `${10 + (index * 30) % 80}%`,
//                   width: `${20 + index * 3}px`,
//                   height: `${20 + index * 3}px`,
//                   border: `2px solid rgba(55, 154, 97, 0.6)`, // Brighter
//                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
//                   animation: `hexFloat ${12 + index * 3}s infinite ease-in-out`,
//                   animationDelay: `${index * 1.5}s`,
//                 }}
//               />
//             ))}

//             {/* Circles */}
//             {Array.from({ length: 10 }, (_, index) => (
//               <div
//                 key={`circle-${index}`}
//                 style={{
//                   position: 'absolute',
//                   left: `${8 + (index * 19) % 85}%`,
//                   top: `${5 + (index * 28) % 90}%`,
//                   width: `${12 + index * 2}px`,
//                   height: `${12 + index * 2}px`,
//                   border: `2px solid rgba(55, 154, 97, 0.5)`, // Brighter
//                   borderRadius: '50%',
//                   animation: `circleFloat ${8 + index * 1.5}s infinite ease-in-out`,
//                   animationDelay: `${index * 1}s`,
//                 }}
//               />
//             ))}

//             {/* Diamonds */}
//             {Array.from({ length: 5 }, (_, index) => (
//               <div
//                 key={`diamond-${index}`}
//                 style={{
//                   position: 'absolute',
//                   left: `${30 + (index * 20) % 40}%`,
//                   top: `${15 + (index * 40) % 70}%`,
//                   width: `${18 + index * 2}px`,
//                   height: `${18 + index * 2}px`,
//                   border: `2px solid rgba(55, 154, 97, 0.4)`,
//                   transform: 'rotate(45deg)',
//                   animation: `diamondFloat ${14 + index * 2}s infinite ease-in-out`,
//                   animationDelay: `${index * 3}s`,
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Enhanced Matrix Rain Effect - More Visible */}
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: `
//               linear-gradient(90deg, transparent 0%, rgba(55, 154, 97, 0.08) 50%, transparent 100%),
//               linear-gradient(0deg, transparent 0%, rgba(55, 154, 97, 0.06) 50%, transparent 100%)
//             `,
//             backgroundSize: '100px 100px',
//             animation: 'matrixFlow 20s linear infinite',
//             opacity: 0.5, // More visible
//           }}
//         />

//         {/* Enhanced Gradient overlays */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: `
//               radial-gradient(circle at 80% 20%, rgba(55, 154, 97, 0.12) 0%, transparent 50%),
//               radial-gradient(circle at 20% 80%, rgba(55, 154, 97, 0.08) 0%, transparent 50%),
//               linear-gradient(135deg, rgba(55, 154, 97, 0.04) 0%, transparent 50%, rgba(55, 154, 97, 0.04) 100%)
//             `,
//           }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes visibleFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.15;
//           }
//           25% {
//             transform: translateY(-30px) rotate(90deg);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-10px) rotate(180deg);
//             opacity: 0.2;
//           }
//           75% {
//             transform: translateY(-20px) rotate(270deg);
//             opacity: 0.35;
//           }
//         }

//         @keyframes hexFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.6;
//           }
//           25% {
//             transform: translateY(-25px) rotate(90deg);
//             opacity: 0.8;
//           }
//           50% {
//             transform: translateY(-40px) rotate(180deg);
//             opacity: 0.7;
//           }
//           75% {
//             transform: translateY(-15px) rotate(270deg);
//             opacity: 0.9;
//           }
//         }

//         @keyframes circleFloat {
//           0%, 100% {
//             transform: translateY(0px) scale(1);
//             opacity: 0.5;
//           }
//           50% {
//             transform: translateY(-20px) scale(1.3);
//             opacity: 0.8;
//           }
//         }

//         @keyframes diamondFloat {
//           0%, 100% {
//             transform: translateY(0px) rotate(45deg) scale(1);
//             opacity: 0.4;
//           }
//           50% {
//             transform: translateY(-35px) rotate(225deg) scale(1.1);
//             opacity: 0.7;
//           }
//         }

//         @keyframes matrixFlow {
//           0% {
//             background-position: 0% 0%;
//           }
//           100% {
//             background-position: 100% 100%;
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

// export default ModernParallaxBackground;
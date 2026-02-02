import { useRef, useEffect, useCallback } from 'react';

const PARTICLE_COUNT = 50;
const DURATION_MS = 2000;
const GRAVITY = 0.15;
const FRICTION = 0.98;

// Princess color palette
const COLORS = [
  '#FFB6C1', // princess-pink
  '#FFD700', // princess-gold
  '#E6E6FA', // princess-lavender
  '#FFDAB9', // princess-peach
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface FireworksProps {
  show: boolean;
  onComplete?: () => void;
}

/**
 * Canvas-based fireworks particle effect.
 *
 * Constraints:
 * - Max 50 particles for mobile performance
 * - 2 second duration
 * - GPU-accelerated via canvas
 *
 * Physics:
 * - Particles burst from center with random velocities
 * - Gravity pulls particles down
 * - Friction slows horizontal movement
 * - Life decreases over time (controls alpha fade)
 */
export function Fireworks({ show, onComplete }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Initialize particles with burst velocities
  const initParticles = useCallback((width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random angle and speed for burst effect
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3, // Slight upward bias
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
        life: 1,
      });
    }

    return particles;
  }, []);

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION_MS, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      let hasActiveParticles = false;

      for (const particle of particlesRef.current) {
        if (particle.life <= 0) continue;

        // Physics update
        particle.vy += GRAVITY;
        particle.vx *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Life decreases over time (faster near end)
        particle.life = Math.max(0, 1 - progress * 1.2);

        if (particle.life > 0) {
          hasActiveParticles = true;

          // Draw particle with alpha based on life
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // Continue animation or complete
      if (hasActiveParticles && progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }
    },
    [onComplete]
  );

  // Start/stop effect based on show prop
  useEffect(() => {
    if (!show) {
      // Cleanup any running animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match viewport
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Initialize particles and start animation
    particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
    startTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [show, initParticles, animate]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}

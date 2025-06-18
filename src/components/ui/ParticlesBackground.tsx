'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const NUM_PARTICLES = 40;
const NUM_SHAPES = 3; // You can have 0 if you only want particles, or more

interface ElementBase {
  id: string;
  initialX: string;
  initialY: string;
  duration: number;
  delay?: number;
}

interface Particle extends ElementBase {
  type: 'particle';
  targetOffsetX: string;
  targetOffsetY: string;
  size: number;
  opacityValues: number[];
  // colorClass is now implicitly primary
}

interface Shape extends ElementBase {
  type: 'shape';
  sizeClass: string;
  blurClass: string;
  roundedClass: string;
  animateX: (string | number)[];
  animateY: (string | number)[];
  animateRotate?: (string | number)[];
  animateScale?: (string | number)[];
  opacity: number; // Opacity for the shape itself
  // bgColorClass will use primary with varying opacity
}

export default function ParticlesBackground() {
  const elements = useMemo<(Particle | Shape)[]>(() => {
    const generatedParticles: Particle[] = Array.from({ length: NUM_PARTICLES }).map((_, i) => {
      const size = Math.random() * 2.2 + 0.8; // Particle size 0.8px to 3px
      const duration = Math.random() * 20 + 15; // Duration 15s to 35s
      const delay = Math.random() * duration;

      return {
        id: `particle-${i}`,
        type: 'particle',
        initialX: `${Math.random() * 100}%`,
        initialY: `${Math.random() * 100}%`,
        targetOffsetX: `${Math.random() * 70 - 35}%`, // Moves +/- 35%
        targetOffsetY: `${Math.random() * 70 - 35}%`,
        size,
        duration,
        delay,
        // Opacity for particles - making them more consistently visible
        opacityValues: [0, Math.random() * 0.4 + 0.3, 0], // Max opacity around 0.7
      };
    });

    const generatedShapes: Shape[] = [
      {
        id: 'shape-1',
        type: 'shape',
        initialX: '15%',
        initialY: '25%',
        sizeClass: 'w-32 h-32 md:w-52 md:h-52', // Slightly smaller for more subtlety
        blurClass: 'blur-3xl', // Strong blur
        roundedClass: 'rounded-full',
        animateX: ['0%', '25%', '-15%', '0%'],
        animateY: ['0%', '-20%', '15%', '0%'],
        animateRotate: [0, 50, -35, 0],
        duration: 40,
        delay: 0,
        opacity: 0.07, // Opacity for bg-primary e.g. primary/7
      },
      {
        id: 'shape-2',
        type: 'shape',
        initialX: '75%',
        initialY: '65%',
        sizeClass: 'w-28 h-28 md:w-44 md:h-44',
        blurClass: 'blur-2xl', // Medium blur
        roundedClass: 'rounded-xl',
        animateX: ['0%', '-20%', '10%', '0%'],
        animateY: ['0%', '15%', '-25%', '0%'],
        animateScale: [1, 1.2, 0.8, 1],
        duration: 45,
        delay: 3,
        opacity: 0.1, // Opacity for bg-primary e.g. primary/10
      },
      {
        id: 'shape-3',
        type: 'shape',
        initialX: '40%',
        initialY: '50%',
        sizeClass: 'w-36 h-36 md:w-56 md:h-56',
        blurClass: 'blur-3xl',
        roundedClass: 'rounded-lg',
        animateX: ['0%', '15%', '-10%', '0%'],
        animateY: ['0%', '-15%', '20%', '0%'],
        animateRotate: [0, -35, 25, 0],
        duration: 35,
        delay: 1.5,
        opacity: 0.05, // Opacity for bg-primary e.g. primary/5
      },
    ];

    // Filter to NUM_SHAPES if you want to control the exact number of shapes displayed
    return [...generatedParticles, ...generatedShapes.slice(0, NUM_SHAPES)];
  }, []);

  return (
    // Ensure this z-index works with your RootLayout setup
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      {elements.map((el) => {
        if (el.type === 'particle') {
          const p = el;
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-primary" // Particles use solid primary color
              style={{
                width: p.size,
                height: p.size,
                left: p.initialX,
                top: p.initialY,
                // Opacity will be animated via 'animate' prop
              }}
              animate={{
                translateX: ["0%", p.targetOffsetX, "0%"],
                translateY: ["0%", p.targetOffsetY, "0%"],
                opacity: p.opacityValues, // Animate opacity here
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: Math.random() * 7 + 3,
              }}
            />
          );
        } else if (el.type === 'shape') {
          const s = el;
          // Construct Tailwind class for background with dynamic opacity
          // Note: Tailwind JIT needs to see full class names.
          // For truly dynamic opacity not covered by bg-primary/X, inline style is better.
          // Here, we set opacity via style prop for the motion.div itself.
          return (
            <motion.div
              key={s.id}
              className={`absolute ${s.sizeClass} bg-primary ${s.blurClass} ${s.roundedClass}`}
              style={{
                left: s.initialX,
                top: s.initialY,
                opacity: s.opacity, // Apply the shape's base opacity
              }}
              animate={{
                translateX: s.animateX,
                translateY: s.animateY,
                ...(s.animateRotate && { rotate: s.animateRotate }),
                ...(s.animateScale && { scale: s.animateScale }),
              }}
              transition={{
                duration: s.duration,
                delay: s.delay || 0,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
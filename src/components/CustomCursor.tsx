'use client'; // This component needs to run on the client

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

// Cursor variants for different states
const cursorVariants = {
  default: {
    width: 24, // Main visible dot size
    height: 24,
    backgroundColor: 'rgba(0, 240, 255, 0.7)', // primary color with some transparency
    borderColor: 'rgba(0, 240, 255, 1)', // primary color border
    borderWidth: 2,
    x: -12, // Offset to center the cursor
    y: -12,
    transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 },
  },
  linkHover: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 0, 230, 0.3)', // accent color with transparency
    borderColor: 'rgba(255, 0, 230, 1)', // accent color border
    borderWidth: 2,
    x: -20, // Offset to center the larger cursor
    y: -20,
    transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.3 },
  },
  textHover: { // Example for text input, etc.
    width: 32,
    height: 8,
    borderRadius: '2px',
    backgroundColor: 'rgba(224, 224, 224, 0.8)', // text color
    borderColor: 'rgba(224, 224, 224, 1)',
    borderWidth: 1,
    x: -16,
    y: -4,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  hidden: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.2 }
  }
};

export default function CustomCursor() {
  // Using useSpring for smoother, physics-based movement
  const springConfig = { stiffness: 700, damping: 40, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check what the cursor is hovering over
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input[type="submit"], [data-cursor-hover="link"]')) {
        setCursorVariant('linkHover');
      } else if (target.closest('input[type="text"], textarea, [data-cursor-hover="text"]')) {
        setCursorVariant('textHover');
      } else {
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorVariant('hidden'); // Hide when mouse leaves window
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      setCursorVariant('default'); // Show when mouse enters window
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Hide the default system cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto'; // Restore default cursor on unmount
    };
  }, [mouseX, mouseY, isVisible]); // Add isVisible to dependencies

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      style={{
        translateX: mouseX,
        translateY: mouseY,
      }}
      variants={cursorVariants}
      animate={isVisible ? cursorVariant : 'hidden'} // Animate to hidden if not visible
    />
  );
}
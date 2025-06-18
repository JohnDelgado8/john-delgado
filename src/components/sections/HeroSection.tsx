'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, Zap } from 'lucide-react'; // **** IMPORTED Zap for an example figure ****
import { useState, useEffect } from 'react';

const roles = [
  "Full-Stack Developer",
  "Technical On-page SEO",
  "WordPress & Shopify Expert",
];

const rotatingTextVariants = {
  enter: { x: 60, opacity: 0 },
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: { zIndex: 0, x: -60, opacity: 0 },
};

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    // Make sure 'visible' and its 'transition' are correctly defined for delay calculation
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Calculate delay for arrow AND for new animated figures
  // This assumes H1 is one of the direct children animated by containerVariants
  const mainTextAnimationFinishTime =
    (containerVariants.visible.transition?.delayChildren || 0) + // Delay before first item (H1) starts
    (itemVariants.visible.transition?.duration || 0); // Duration of H1's own animation

  // Arrow delay can be slightly after main text animation finishes
  const arrowDelay = mainTextAnimationFinishTime + 0.5;


  const numParticles = 30; // Your existing particle count

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Existing Background Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl opacity-70"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full filter blur-2xl opacity-60"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
        {Array.from({ length: numParticles }).map((_, i) => {
          const size = Math.random() * 2 + 0.5; const duration = Math.random() * 8 + 7; const delay = Math.random() * 5; const initialX = `${Math.random() * 100}%`; const initialY = `${Math.random() * 100}%`; const targetX = `${Math.random() * 60 - 30}%`; const targetY = `${Math.random() * 60 - 30}%`;
          return ( <motion.div key={`particle-${i}`} className="absolute rounded-full bg-text/20" style={{ width: size, height: size, left: initialX, top: initialY }} animate={{ translateX: [0, targetX, 0], translateY: [0, targetY, 0], opacity: [0, Math.random() * 0.5 + 0.1, 0] }} transition={{ duration, delay, repeat: Infinity, ease: "linear", repeatDelay: Math.random() * 3 }} /> );
        })}
      </div>

      {/* Main content area - wrapped in a div for relative positioning context of H1 figures */}
      <div className="relative">
        <motion.div
          className="text-center p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 relative" // **** ADDED relative ****
          >
            Hi, I'm <span className="text-gradient animate-text-gradient">John Rodolfo Delgado</span>

            {/* --- START: Animated Figures around H1 Text --- */}
            <motion.div // Figure 1: Orbiting dot
              className="absolute -top-2 -left-3 sm:-top-3 sm:-left-5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-primary rounded-full shadow-glow-primary"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0.8, 0], scale: [0, 1, 1, 0], x: [0, 8, 16, 8, 0], y: [0, -4, 0, 4, 0] }}
              transition={{ delay: mainTextAnimationFinishTime + 0.3, duration: 2.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
            <motion.div // Figure 2: Zap icon
              className="absolute top-1/2 -translate-y-1/2 right-0 -mr-6 sm:-mr-10 text-accent"
              initial={{ opacity: 0, scale: 0.3, rotate: -60 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.1, 0.3], rotate: [-60, 0, 60] }}
              transition={{ delay: mainTextAnimationFinishTime + 0.4, duration: 1.0, repeat: Infinity, repeatDelay: 2, ease: "backOut" }}
            >
              <Zap size={22} className="sm:w-7 sm:h-7" />
            </motion.div>
            <motion.div // Figure 3: Dynamic underscore
              className="absolute bottom-0 left-1/2 h-[3px] bg-secondary" // Use h-[3px] for specific thickness
              style={{ x: "-50%" }} // Center it
              initial={{ width: "0%", opacity: 0 }}
              animate={{ width: ["0%", "25%", "0%"], opacity: [0, 0.9, 0] }}
              transition={{ delay: mainTextAnimationFinishTime + 0.5, duration: 1.8, repeat: Infinity, repeatDelay: 2.8, ease: "circOut" }}
            />
            {/* --- END: Animated Figures around H1 Text --- */}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl text-text-dark mb-10 max-w-3xl mx-auto">
            <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2">
              <span>A Passionate</span>
              <span className="inline-block relative overflow-hidden h-8 sm:h-10 md:h-12 align-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentRoleIndex}
                    variants={rotatingTextVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30, duration: 0.4 }, opacity: { duration: 0.25 }}}
                    className="font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text whitespace-nowrap custom-gradient-text" // Keep your gradient
                    style={{ backgroundImage: 'linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)' }}
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>Crafting Modern & Futuristic Web Experiences.</span>
            </span>
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="#projects" className="inline-block bg-primary text-background font-semibold px-8 py-4 rounded-lg text-lg hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-glow-accent transform hover:scale-105">
              View My Work
            </Link>
          </motion.div>
        </motion.div>
      </div> {/* End of the new relative wrapper */}


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: arrowDelay, duration: 0.8 }} // Using the updated arrowDelay
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown className="text-text-dark w-8 h-8 animate-bounce hover:text-primary" />
        </a>
      </motion.div>
    </section>
  );
}
'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
  delay?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function AnimatedSection({
  children,
  className = '',
  id,
  variants = defaultVariants,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-16 sm:py-20 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the section is visible
      variants={{
        ...variants,
        visible: {
          ...variants.visible as object, // Cast to object to avoid type error with transition
          transition: {
            ...(variants.visible as { transition?: object })?.transition,
            delay: delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
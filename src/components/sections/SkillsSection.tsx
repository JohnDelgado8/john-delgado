'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
// You can use lucide-react icons for specific technologies or import SVGs
import { Code, Database, Server, Palette, Brain, Search } from 'lucide-react';

const skillsData = [
  { name: 'PHP', icon: Code, color: 'text-purple-400' },
  { name: 'JavaScript', icon: Code, color: 'text-yellow-400' },
  { name: 'TypeScript', icon: Code, color: 'text-blue-500' },
  { name: 'React', icon: Code, color: 'text-sky-400' },
  { name: 'Next.js', icon: Code, color: 'text-neutral-300' },
  { name: 'Node.js', icon: Server,  color: 'text-green-500' },
  { name: 'Tailwind CSS', icon: Palette,  color: 'text-teal-400' },
  { name: 'Framer Motion', icon: Palette, color: 'text-purple-500' },
  { name: 'SQL (PostgreSQL)', icon: Database, color: 'text-indigo-400' },
  { name: 'MYSQL', icon: Database, color: 'text-blue-400' },
  { name: 'MongoDB', icon: Database, color: 'text-emerald-500' },
  { name: 'Git & GitHub', icon: Code, color: 'text-orange-500' },
  { name: 'REST APIs', icon: Server, color: 'text-rose-500' },
  { name: 'AAPanel Server', icon: Brain, color: 'text-pink-500' },

  // Added Skills
  { name: 'Hosting', icon: Server, color: 'text-cyan-500' },
  { name: 'SEMRUSH', icon: Search, color: 'text-amber-400' },
  { name: 'Ahrefs', icon: Search, color: 'text-blue-400' },
  { name: 'Screaming Frog', icon: Search, color: 'text-lime-500' },
  { name: 'Google Search Console', icon: Search, color: 'text-red-400' },
  { name: 'Pagespeed Optimization', icon: Code, color: 'text-green-400' },
  { name: 'SEO (Whitehat)', icon: Brain, color: 'text-white' },
  { name: 'SEO (Grayhat)', icon: Brain, color: 'text-gray-400' },
  { name: 'SEO (Blackhat)', icon: Brain, color: 'text-black' },
];

const skillItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

export default function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="bg-card/30">
      <h2 className="text-4xl font-bold text-center mb-16">
        Tech <span className="text-primary">Arsenal</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-card p-6 rounded-lg shadow-lg border border-card-border
                       hover:border-primary/70 hover:shadow-glow-primary transition-all duration-300
                       flex flex-col items-center text-center group"
            variants={skillItemVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <skill.icon size={48} className={`mb-3 ${skill.color} group-hover:scale-110 transition-transform`} />
            <h3 className="text-lg font-semibold text-text mb-2">{skill.name}</h3>
            
           
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
// You can use lucide-react icons for specific technologies or import SVGs
import { Code, Database, Server, Palette, Brain } from 'lucide-react';

const skillsData = [
  { name: 'JavaScript', icon: Code, level: 90, color: 'text-yellow-400' },
  { name: 'TypeScript', icon: Code, level: 85, color: 'text-blue-500' },
  { name: 'React', icon: Code, level: 90, color: 'text-sky-400' },
  { name: 'Next.js', icon: Code, level: 85, color: 'text-neutral-300' },
  { name: 'Node.js', icon: Server, level: 80, color: 'text-green-500' },
  { name: 'Tailwind CSS', icon: Palette, level: 95, color: 'text-teal-400' },
  { name: 'Framer Motion', icon: Palette, level: 75, color: 'text-purple-500' },
  { name: 'SQL (PostgreSQL)', icon: Database, level: 70, color: 'text-indigo-400' },
  { name: 'MongoDB', icon: Database, level: 70, color: 'text-emerald-500' },
  { name: 'Git & GitHub', icon: Code, level: 85, color: 'text-orange-500' },
  { name: 'REST APIs', icon: Server, level: 85, color: 'text-rose-500' },
  { name: 'Problem Solving', icon: Brain, level: 90, color: 'text-pink-500' },
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
            <div className="w-full bg-background rounded-full h-2.5 mb-1">
              <motion.div
                className={`h-2.5 rounded-full ${
                  skill.level > 80 ? 'bg-primary' : skill.level > 60 ? 'bg-secondary' : 'bg-accent'
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="text-xs text-text-dark">{skill.level}% Proficient</p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Code } from 'lucide-react'; // Assuming you use these icons

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional image
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  // index?: number; // Only if used for staggered animation not handled by AnimatePresence parent
}

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export default function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  liveUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout // Crucial for smooth grid re-arrangement
      className="bg-card border border-card-border rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-glow-primary transition-shadow duration-300 flex flex-col group h-full"
    >
      {imageUrl && (
        <div className="relative w-full aspect-[16/9] mb-5 rounded-lg overflow-hidden border border-card-border/50">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            onError={(e) => (e.currentTarget.src = '/placeholder-fallback.jpg')} // Fallback image
          />
        </div>
      )}
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-text-dark text-sm mb-4 flex-grow leading-relaxed">
        {description}
      </p>
      <div className="mb-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-background border border-card-border/70 text-accent px-2.5 py-1 rounded-full text-xs font-medium mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-card-border/50">
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-text-dark hover:text-primary transition-colors duration-200 text-sm font-medium group/link"
          >
            <ExternalLink size={18} className="mr-1.5 group-hover/link:text-primary transition-colors" />
            Live Site
          </Link>
        )}
        {repoUrl && (
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-text-dark hover:text-primary transition-colors duration-200 text-sm font-medium group/link"
          >
            <Code size={18} className="mr-1.5 group-hover/link:text-primary transition-colors" />
            Code
          </Link>
        )}
      </div>
    </motion.div>
  );
}
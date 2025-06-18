import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-card-border py-8 text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-primary transition-colors">
            <Twitter size={24} />
          </a>
        </div>
        <p className="text-text-dark text-sm">
          © {year} John Rodolfo Delgado. All rights reserved.
        </p>
        <p className="text-xs text-text-dark/70 mt-2">
          Built with Next.js, React, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
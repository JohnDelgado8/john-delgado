'use client';

import { useState, useMemo, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectCard from '@/components/ui/ProjectCard';

const projectsData = [
  // Ensure you have more than 6 projects here for testing "Load More"
  { title: 'Futuristic Dashboard', description: '...', imageUrl: '/chinchincasinoapp.png', tags: ['Next.js', 'React', 'TailwindCSS', 'Chart.js', 'TypeScript'], liveUrl: 'https://chinchincasinoapp.com/', repoUrl: '#', category: 'Casinos with Technical SEO' },
  
  { title: 'AI Content Generator', description: '...', imageUrl: '/placeholder-project-2.jpg', tags: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'], liveUrl: '#', category: 'Website' },
  { title: 'E-commerce Platform X', description: '...', imageUrl: '/placeholder-project-3.jpg', tags: ['Next.js', 'Stripe', 'GraphQL', 'PostgreSQL', 'AWS'], repoUrl: '#', category: 'E-commerce' },
  { title: 'Mobile Game UI Kit', description: '...', imageUrl: '/placeholder-project-4.jpg', tags: ['UI/UX', 'Figma', 'Mobile Design'], category: 'Website' },
  { title: 'Data Analytics Tool', description: '...', imageUrl: '/placeholder-project-5.jpg', tags: ['Python', 'Flask', 'D3.js', 'Pandas'], liveUrl: '#', repoUrl: '#', category: 'E-commerce' },
  { title: 'Smart Home Controller', description: '...', imageUrl: '/placeholder-project-6.jpg', tags: ['React', 'Firebase', 'IoT'], liveUrl: '#', repoUrl: '#', category: 'Casinos with Technical SEO' },
  { title: 'Project 7', description: 'Description for project 7.', imageUrl: '/placeholder-project-7.jpg', tags: ['Vue.js', 'Nuxt'], liveUrl: '#', category: 'Website' },
  { title: 'Project 8 - AI', description: 'Description for project 8.', imageUrl: '/placeholder-project-8.jpg', tags: ['Python', 'TensorFlow'], repoUrl: '#', category: 'E-commerce' },
  { title: 'Project 9 - Design', description: 'Description for project 9.', imageUrl: '/placeholder-project-9.jpg', tags: ['Illustrator', 'Branding'], category: 'Casinos with Technical SEO' },
  { title: 'Project 10 - E-com', description: 'Description for project 10.', imageUrl: '/placeholder-project-10.jpg', tags: ['Shopify', 'Liquid'], category: 'E-commerce' },
];

const ITEMS_PER_PAGE = 6; // Number of projects to show initially and per "load more" click

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(ITEMS_PER_PAGE);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(projectsData.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  // This filters all projects by category first
  const allFilteredProjectsByCategory = useMemo(() => {
    if (selectedCategory === 'All') {
      return projectsData;
    }
    return projectsData.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  // Then, this takes the currently visible slice from the category-filtered projects
  const currentlyVisibleProjects = useMemo(() => {
    return allFilteredProjectsByCategory.slice(0, visibleItemsCount);
  }, [allFilteredProjectsByCategory, visibleItemsCount]);

  // Reset visibleItemsCount when category changes
  useEffect(() => {
    setVisibleItemsCount(ITEMS_PER_PAGE);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    setVisibleItemsCount(prevCount => prevCount + ITEMS_PER_PAGE);
    // Alternatively, to load all remaining:
    // setVisibleItemsCount(allFilteredProjectsByCategory.length);
  };

  // Determine if the "Load More" button should be shown
  const showLoadMoreButton = visibleItemsCount < allFilteredProjectsByCategory.length;

  return (
    <AnimatedSection id="projects" className="py-16 sm:py-24">
      <h2 className="text-4xl font-bold text-center mb-8 sm:mb-12 text-text">
        My <span className="text-primary">Creations</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16 px-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300
                        border-2 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
                        ${
                          selectedCategory === category
                            ? 'bg-primary text-background border-primary shadow-glow-primary focus:ring-primary'
                            : 'bg-card text-text-dark border-card-border hover:border-primary hover:text-primary focus:ring-primary/50'
                        }`}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.15 } }}
            layout
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 px-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {currentlyVisibleProjects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {currentlyVisibleProjects.length === 0 && selectedCategory !== "All" && ( // Show only if a filter is active and yields no results
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-text-dark mt-12 text-lg"
        >
          No projects found in the  {selectedCategory} category.
        </motion.p>
      )}
      {currentlyVisibleProjects.length === 0 && selectedCategory === "All" && projectsData.length > 0 && ( // Should not happen if projectsData is not empty
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-text-dark mt-12 text-lg"
        >
          No projects to display.
        </motion.p>
      )}


      {showLoadMoreButton && (
        <div className="text-center mt-12 sm:mt-16">
          <motion.button
            onClick={handleLoadMore}
            className="bg-accent text-white font-semibold px-8 py-3 rounded-lg
                       text-lg hover:bg-primary hover:text-background transition-all duration-300
                       shadow-lg hover:shadow-glow-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.15 } }}
            layout
          >
            Load More
          </motion.button>
        </div>
      )}
    </AnimatedSection>
  );
}
'use client';

import { useState, useMemo, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectCard from '@/components/ui/ProjectCard';

const projectsData = [
  // Ensure you have more than 6 projects here for testing "Load More"
  // Casino Website
  { title: 'Chinchincasino App', description: 'Casino website with handling on servers and hosting', imageUrl: '/chinchincasinoapp.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://chinchincasinoapp.com/', category: 'Website with Technical SEO' },
  { title: 'Tabgold SA', description: 'Casino website with handling on servers and hosting', imageUrl: '/tabgold.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://tabgold.co/', category: 'Website with Technical SEO' },
 { title: 'Chinchin-casino', description: 'Casino website with handling on servers and hosting', imageUrl: '/chinchin-casino.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://chinchin-casino.com/', category: 'Website with Technical SEO' },
 { title: 'Jojobet TR', description: 'Casino website with handling on servers and hosting', imageUrl: '/jojobet-tr.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://jojobet-tr.co/', category: 'Website with Technical SEO' },
 { title: 'Yeti Casino', description: 'Casino website with handling on servers and hosting', imageUrl: '/yeti-casino.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://yeti-casino.net/', category: 'Website with Technical SEO' },
 { title: 'Jojobetlink', description: 'Casino website with handling on servers and hosting', imageUrl: '/jojobetlink.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://jojobetlink.com/', category: 'Website with Technical SEO' },
  { title: 'Betfred News', description: 'Casino website with handling on servers and hosting', imageUrl: '/betfred.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://betfred.news/', category: 'Website with Technical SEO' },
  { title: 'Grandpashabetgiris', description: 'Casino website with handling on servers and hosting', imageUrl: '/grandpashabet.png', tags: ['Wordpress', 'Elementor', 'PHP', 'Technical On Page', 'Javascript'], liveUrl: 'https://xn--grandpashabetgiri-gkd.com/', category: 'Website with Technical SEO' },
 // end of casino websie

 //start of custom code
 { title: 'Pagespeed Diagnostics Tool', description: 'Useful tool that is like Google Pagespeed Insights', imageUrl: '/pagespeed.jpg', tags: ['Next.js', 'Typescript', 'Prisma', 'Tailwind', 'Lighthouse API'], repoUrl: 'https://github.com/JohnDelgado8/pagespeed-diagnostics', category: 'Custom Code' },
 { title: 'Livescores', description: 'Global Livescores', imageUrl: '/oyuntaktik.png', tags: ['Next.js', 'Typescript', 'Prisma', 'Tailwind', 'Rest API'], liveUrl: 'https://oyuntaktik.com/en',  category: 'Custom Code' },
{ title: 'All in one Tools', description: 'Image Converter, Documents Converter, Background Remover, AI humanizer (much accurate), and Video Transcriber', imageUrl: '/all-in-one.png', tags: ['Next.js', 'Typescript', 'Sharp', 'Reactjs', 'Tailwind', 'Open AI API'], repoUrl: 'https://github.com/JohnDelgado8/allinone-converter', category: 'Custom Code' },
{ title: 'Microsoft Teams Clone', description: 'Real-time livechat', imageUrl: '/teams.png', tags: ['Next.js', 'Typescript', 'Reactjs', 'Tailwind', 'Prisma'], repoUrl: '/', category: 'Custom Code' },
{ title: 'Split Payment in Paynamics (WooCommerce)', description: 'Create a split payment features in Paynamics along with WooCommerce', imageUrl: '/split.png', tags: ['PHP', 'Javascript', 'HTML/CSS', 'MySQL'], repoUrl: 'https://github.com/JohnDelgado8/split-paynamics', category: 'Custom Code' },
{ title: 'Personal Budget Tracker', description: 'For my personal use project', imageUrl: '/budget.png', tags: ['Javascript', 'HTML/CSS', 'Tailwind CSS'], repoUrl: 'https://github.com/JohnDelgado8/budget-tracker', category: 'Custom Code' },
{ title: 'Restaurant Website', description: 'For my client', imageUrl: '/resta.png', tags: ['Javascript', 'HTML/CSS', 'Bootstrap'], repoUrl: 'https://github.com/JohnDelgado8/resturant-website', category: 'Custom Code' },
{ title: 'Netflix Clone', description: 'Netflix Clone project for fun only', imageUrl: '/netflix.png', tags: ['PHP', 'Javascript', 'HTML/CSS', 'Bootstrap'], repoUrl: 'https://github.com/JohnDelgado8/netflix-project', category: 'Custom Code' },
{ title: 'Gym Fitness Website', description: 'It`s for my first client', imageUrl: '/fitness.png', tags: ['Javascript', 'HTML/Css', 'PHP', 'Bootstrap'], repoUrl: 'https://github.com/JohnDelgado8/colossal-fitness', category: 'Custom Code' },
{ title: 'University Scheduling System', description: 'Capstone Project for my college days', imageUrl: '', tags: ['HTML/CSS', 'VueJs', 'Quasar', 'PHP', 'Insomnia', 'Tailwind'], repoUrl: 'https://github.com/JohnDelgado8/Capstone-project', category: 'Custom Code' },


//Website
  { title: 'Clinilink', description: 'Services Website', imageUrl: '/Clinilink.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://clinilinkhealth.com/', category: 'Website' },
  { title: 'HTX Customs', description: 'Services Website', imageUrl: '/htx.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://htxcustoms.com/', category: 'Website' },
  { title: 'Clear Fishing', description: 'Services Website', imageUrl: '/clear.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://www.clearfinishpainting.com.au/', category: 'Website' },
  { title: 'XMoto', description: 'Services Website', imageUrl: '/xmoto.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://xmoto.co.il/', category: 'Website' },
  { title: 'Meguronim', description: 'Services Website', imageUrl: '/megu.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://meguronim.co.il/', category: 'Website' },
  { title: 'Cozzix', description: 'Business Website', imageUrl: '/cozzix.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://cozzix.com/', category: 'Website' },
  { title: 'E-Sim', description: 'Business Website', imageUrl: '/esim.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://esim-card.com/?v=da984e42a589', category: 'Website' },
  { title: 'Kayoja', description: 'Business Website', imageUrl: '/kayoja.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://kayoja.com/', category: 'Website' },
  { title: 'Pishpeshim', description: 'Business Website', imageUrl: '/pish.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://pishpeshim.co.il/', category: 'Website' },
  { title: 'Florida Garage Doors', description: 'Services Website', imageUrl: '/florida.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://florida-garagedoors.com/', category: 'Website' },
  { title: 'Precision Wound Care Group', description: 'Services Website', imageUrl: '/precision.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://precisionwoundcaregroup.com/', category: 'Website' },
  { title: 'Captain Locksmith', description: 'Services Website', imageUrl: '/captain.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://captain-locksmith.com/', category: 'Website' },
  { title: 'Angels Luxury', description: 'Services Website', imageUrl: '/angels.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://angelsluxuryrentals.com/', category: 'Website' },
  { title: 'Bestizz', description: 'Services Website', imageUrl: '/bestizz.png', tags: ['Elementor', 'PHP', 'Javascript'], liveUrl: 'https://bestizz.com/', category: 'Website' },

// E-commerce
  { title: 'Adventure Primal', description: 'Business Website with a lot of products', imageUrl: 'adventure.png', tags: ['Elementor', 'PHP', 'Javascript', 'WooCommerce'], liveUrl: 'https://adventureprimal.com.au/',  category: 'WooCommerce' }, 
  { title: 'Antunes', description: 'Business Website with a lot of products', imageUrl: 'antunes.png', tags: ['Elementor', 'PHP', 'Javascript', 'WooCommerce'], liveUrl: 'https://antunes.com/',  category: 'WooCommerce' },
  { title: 'Hermosa', description: 'Business Website with a lot of products', imageUrl: 'hermosa.png', tags: ['Elementor', 'PHP', 'Javascript', 'WooCommerce'], liveUrl: 'https://www-dev.hermosa.co.il/',  category: 'WooCommerce' }, 
  { title: 'Soul Drummer', description: 'Business Website with a lot of products', imageUrl: 'soul-drummer.png', tags: ['Elementor', 'PHP', 'Javascript', 'WooCommerce'], liveUrl: 'https://souldrummer.com.au/',  category: 'WooCommerce' }, 
   { title: 'Amusement', description: 'Business Website with a lot of products', imageUrl: 'amusement.png', tags: ['Elementor', 'PHP', 'Javascript', 'WooCommerce'], liveUrl: 'https://amusements.global/',  category: 'WooCommerce' }, 


  // Shopify
  { title: 'Gift Spack Co.', description: 'Business Website with a lot of products', imageUrl: 'gift.png', tags: ['Javascript', 'Shopify'], liveUrl: 'https://giftspark.co/',  category: 'Shopify' }, 
  { title: 'Edgartown Bicycles', description: 'Business Website with a lot of products', imageUrl: 'bike.png', tags: ['Javascript', 'Shopify'], liveUrl: 'https://944264-a1.myshopify.com/',  category: 'Shopify' }, 
  
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
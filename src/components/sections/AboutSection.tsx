import AnimatedSection from '@/components/ui/AnimatedSection';
import Image from 'next/image'; // Use Next.js Image for optimization

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="bg-card/30">
      <h2 className="text-4xl font-bold text-center mb-12">
        About <span className="text-primary">Me</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group w-full max-w-md mx-auto md:mx-0">
          {/* Placeholder for profile picture */}
          <div className="aspect-square rounded-lg overflow-hidden shadow-2xl
                          border-2 border-primary/50 group-hover:border-primary transition-all duration-300
                          transform group-hover:scale-105">
            <Image
              src="/profile.jpg" // Replace with your image path in /public
              alt="Your Name"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              priority // If it's above the fold or important
            />
          </div>
          <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-accent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-secondary rounded-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
        </div>
        <div className="space-y-6 text-lg text-text-dark">
          <p>
            Hello! I'm [Your Name], a dedicated and results-oriented Full-Stack Developer and Technical SEO Specialist with a strong passion for creating innovative and user-centric web applications. I thrive on solving complex problems and continuously learning new technologies.
          </p>
          <p>
            My journey into web development started with a fascination for how interactive digital experiences are built. Since then, I've honed my skills in both front-end and back-end development, working with technologies like React, Next.js, Node.js, and various databases.
          </p>
          <p>
            As a Technical SEO Specialist, I utilize tools such as SEMrush, Ahrefs, Screaming Frog, and Google Search Console (GSC) to ensure websites are optimized for performance, crawlability, and search visibility. I also have experience managing hosting environments and VPS servers, ensuring smooth deployment and scalability.

I believe in writing clean, efficient, and maintainable code. My goal is to transform ideas into impactful digital solutions that not only look great but also perform flawlessly—with enhanced speed, accessibility, and SEO readiness.
          </p>
          <a
            href="/johndelgado.pdf" // Place your CV in the /public folder
            download
            className="inline-block mt-4 bg-secondary text-white font-semibold px-6 py-3 rounded-lg
                       text-md hover:bg-accent transition-all duration-300
                       shadow-md hover:shadow-glow-accent transform hover:scale-105"
          >
            Download CV
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
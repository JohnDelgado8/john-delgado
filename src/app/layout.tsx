import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Or your chosen futuristic font
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';



const inter = Inter({ subsets: ['latin'] }); // Configure your font

export const metadata: Metadata = {
  title: 'John Delgado Portfolio',
  description: 'A modern portfolio showcasing my skills and projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        
         
        <CustomCursor />
        <Navbar />
        <main className="pt-20 min-h-screen"> {/* pt-20 to offset fixed navbar height */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
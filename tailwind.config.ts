import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define your futuristic color palette
        background: '#0A0A0A', // Very dark grey, almost black
        primary: '#00F0FF',    // Bright cyan/electric blue
        secondary: '#8A2BE2',  // Blue-violet
        accent: '#FF00E6',     // Bright magenta/pink
        text: '#E0E0E0',       // Light grey for text
        'text-dark': '#A0A0A0', // Darker grey for secondary text
        card: '#1A1A1A',       // Dark card background
        'card-border': '#2A2A2A', // Slightly lighter border for cards
      },
      fontFamily: {
        // Add a futuristic font if you have one, otherwise stick to sans
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
        // Example: If you added a custom font like 'Orbitron' via Google Fonts
        // orbitron: ['Orbitron', 'sans-serif'],
      },
      
      animation: {
        'text-gradient': 'text-gradient 1.5s linear infinite',
        'border-pulse': 'border-pulse 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
      },
      keyframes: {
        'text-gradient': {
          to: {
            backgroundPosition: '200% center',
          },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(0, 240, 255, 0.4)' }, // primary with alpha
          '50%': { borderColor: 'rgba(0, 240, 255, 0.8)' },    // primary with more alpha
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      boxShadow: {
        'glow-primary': '0 0 15px 5px rgba(0, 240, 255, 0.3)', // primary glow
        'glow-accent': '0 0 15px 5px rgba(255, 0, 230, 0.3)', // accent glow
      }
    },
  },
  plugins: [],
};
export default config;
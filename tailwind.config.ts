import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'brand-gradient':
          'radial-gradient(circle at top left, rgba(124,58,237,0.30), transparent 35%), radial-gradient(circle at top right, rgba(59,130,246,0.28), transparent 30%), linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 100%)'
      },
      boxShadow: {
        glass: '0 10px 40px rgba(2,6,23,0.25)',
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        }
      }
    }
  },
  plugins: []
};

export default config;

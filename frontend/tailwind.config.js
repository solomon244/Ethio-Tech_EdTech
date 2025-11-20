/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F8A5F', // Ethiopian green
          dark: '#0A5A40',
          light: '#3FBF8A',
        },
        accent: '#F2B705', // Ethiopian yellow
        danger: '#C4281C', // Ethiopian red
        stone: {
          50: '#f8fafc',
          100: '#eef2ff',
          300: '#cbd5f5',
          500: '#64748b',
          700: '#334155',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 50px -24px rgba(15, 138, 95, 0.4)',
      },
    },
  },
  plugins: [],
};


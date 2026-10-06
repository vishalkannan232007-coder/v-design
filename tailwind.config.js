/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#111111',
          mid: '#1a1a1a',
          border: '#222222',
        },
        ash: {
          DEFAULT: '#888888',
          light: '#aaaaaa',
          dark: '#555555',
        },
        cream: {
          DEFAULT: '#f0ebe3',
          bright: '#faf8f5',
        },
        gold: {
          DEFAULT: '#c9a96e',
          light: '#e5c99a',
          dark: '#a07840',
        },
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
    },
  },
  plugins: [],
}

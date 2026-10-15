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
        display: ['Syne', 'Outfit', 'sans-serif'],
        space: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        charcoal: {
          950: '#060608',
          900: '#0b0b0f',
          850: '#111116',
          800: '#171720',
          700: '#22222d',
          600: '#30303e',
          500: '#444456',
        },
        lime: {
          DEFAULT: '#d4ff00',
          hover: '#e0ff33',
          muted: '#a8cc00',
          subtle: 'rgba(212, 255, 0, 0.08)',
          glow: 'rgba(212, 255, 0, 0.25)',
        },
        warm: {
          white: '#fbfbfa',
          cream: '#eae8e1',
          muted: '#9a9a9f',
          dim: '#606068',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.22em',
        widest3: '0.32em',
        widest4: '0.42em',
      },
      fontSize: {
        '10xl': '9.5rem',
        '11xl': '11.5rem',
        '12xl': '13.5rem',
        '13xl': '15.5rem',
      },
    },
  },
  plugins: [],
}


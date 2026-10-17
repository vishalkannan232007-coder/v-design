/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
      },
      colors: {
        charcoal: {
          950: '#090B09', // Deep charcoal
          900: '#141712', // Elevated charcoal
          850: '#191E16',
          800: '#232920',
          700: '#343B30',
          600: '#4D5647',
          500: '#6B7564',
        },
        olive: {
          DEFAULT: '#858B42', // Muted olive
          light: '#9EA550',
          dark: '#5E622F',
          subtle: 'rgba(133, 139, 66, 0.12)',
          glow: 'rgba(133, 139, 66, 0.25)',
        },
        lime: {
          DEFAULT: '#C8F52F', // Refined lime
          hover: '#D6FB4C',
          muted: '#858B42',
          subtle: 'rgba(200, 245, 47, 0.12)',
          glow: 'rgba(200, 245, 47, 0.35)',
        },
        solar: {
          DEFAULT: '#d97757',
          hover: '#ea8b65',
          amber: '#f59e0b',
          core: '#fff4cc',
          subtle: 'rgba(217, 119, 87, 0.08)',
          glow: 'rgba(217, 119, 87, 0.16)',
        },
        warm: {
          ivory: '#F3F0E8',
          white: '#F3F0E8',
          cream: '#E8E4D8',
          muted: '#A3A096',
          dim: '#6E6B63',
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


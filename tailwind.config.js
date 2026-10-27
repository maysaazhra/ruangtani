/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orbitani: {
          dark: '#0a1f14',   // Ultra dark green background Orbitani
          deep: '#1c4234',   // Primary brand green Orbitani
          800: '#1c4234',
          700: '#235341',
          600: '#2d6a4f',    // Accent forest green
          500: '#40916c',
          400: '#52b788',
          300: '#74c69d',
          200: '#95d5b2',    // Mint green accent
          100: '#dbf0e3',    // Light mint selection
          50: '#f0fdf4',
        },
        tani: {
          50: '#f2fbf5',
          100: '#e1f7e8',
          200: '#c5eed2',
          300: '#97deb0',
          400: '#5fc588',
          500: '#34aa66',
          600: '#2d6a4f',
          700: '#235341',
          800: '#1c4234',
          900: '#143528',
          950: '#0a1f14',
        },
        orbGold: {
          DEFAULT: '#c9a96e', // Warm gold signature Orbitani
          hover: '#b8985c',
          light: '#f5ece0',
          dark: '#9d7c43'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

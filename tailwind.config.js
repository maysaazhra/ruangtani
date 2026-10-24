/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tani: {
          50: '#f2fbf5',
          100: '#e1f7e8',
          200: '#c5eed2',
          300: '#97deb0',
          400: '#5fc588',
          500: '#34aa66',
          600: '#258b51',
          700: '#1e6e42',
          800: '#166534', // Hijau Tua utama Pertanian
          900: '#14532d',
          950: '#072e18',
        },
        dawuhan: {
          cream: '#fdfbf7',
          card: '#ffffff',
          gold: '#d97706',
          earth: '#854d0e',
          accent: '#047857'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

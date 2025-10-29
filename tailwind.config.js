/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bowler': ['Bowler', 'sans-serif'],
        'pt': ['Pt', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',    // 32px
        '5xl': '2.5rem',  // 40px
        '6xl': '3rem',    // 48px
        '7xl': '4rem',    // 64px
        '8xl': '5rem',    // 80px
      },
      spacing: {
        '212': '53rem', // თუ გჭირდება max-w-212
      },
    },
  },
  plugins: [],
}
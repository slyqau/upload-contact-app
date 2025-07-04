/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#31809C',    // Bleu principal
        dark: '#241D18',       // Marron foncé
        light: '#FAF9F6',      // Presque blanc
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

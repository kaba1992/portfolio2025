/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'categorieBox': '0 35px 60px -15px rgba(1, 1, 1, 0.7)',
      },
      textColor: {
        'blue-400': '#6495ED',
        'secondary': '#00FF00',
        'danger': '#FF0000',
      },
      backgroundColor: {
        'blue-400': '#6495ED',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      },
      fontFamily: {
        'titre': ['Notable', 'sans-serif'],
    
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'categorieBox': '0 35px 60px -15px rgba(1, 1, 1, 1)',
      }
    },
  },
  plugins: [],
}
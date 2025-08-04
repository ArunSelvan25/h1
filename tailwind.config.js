/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Angular component templates and TS files
    "./node_modules/flowbite/**/*.js" // Include Flowbite JS for components like carousel
  ],
  theme: {
    extend: {
      // You can add your custom colors, fonts, spacing, etc. here
      colors: {
        primary: '#1E40AF',
        accent: '#E0F2FE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // Required for Flowbite components
  ],
}

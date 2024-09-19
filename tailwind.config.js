/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // Enable dark mode by default
  purge: ['./src/**/*.{html,js,ts,tsx,jsx}'], // Make sure this covers all your templates
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"], // Include TypeScript and JSX files
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      }

    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
    require('@tailwindcss/forms'), 
    require('@tailwindcss/aspect-ratio'),
  ],
};

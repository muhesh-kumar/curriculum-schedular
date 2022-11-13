/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#E5E5E5',
        primaryLight: '#E7F5EF',
        primaryDark: '#759F98',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green:{
          900: '#10A37F',
        },
        yellow:{
          900: '#FF8200',
        },
      },
      fontFamily: {
        'Mont': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

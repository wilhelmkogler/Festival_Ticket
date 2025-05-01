/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vilagos: "#db2d2a",
        sotet: "#0bb244",
      },
      fontFamily: {
        fancy: ['"Fascinate Inline"', 'cursive'],
        nicer: ['"Revalia"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}